// index.js — Unified Event Logging Version (Option B)
// ONE MongoDB document per attacker request
//-----------------------------------------------------

import dotenv from "dotenv";
dotenv.config({ override: true });

import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import axios from "axios";
import sqlite3 from "sqlite3";
import { promisify } from "util";
import { MongoClient } from "mongodb";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

// --------------------------------------------------
// INIT APP
// --------------------------------------------------
const app = express();
app.set("case sensitive routing", true);
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Serve frontend + logs
app.use(express.static(path.join(process.cwd(), "public")));
const LOG_DIR = path.join(process.cwd(), "logs");
if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR);
app.use("/logs", express.static(LOG_DIR));

// --------------------------------------------------
// ENV + CONSTANTS
// --------------------------------------------------
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";

const FORENSICS_DB = "chameleon_forensics";
const EVENTS_COL = "events";
const STATES_COL = "attacker_states";
const META_COL = "meta";

const DB_PATH = path.join(process.cwd(), "honeypot.db");
const TARGET_PASSWORD = process.env.TARGET_PASSWORD || "LetMeIn2025!";
const ML_API = process.env.ML_API || "http://127.0.0.1:8000/predict";

const MERKLE_BATCH = 50;

// --------------------------------------------------
// CONNECT MONGO
// --------------------------------------------------
console.log("Connecting to MongoDB…");
const mongoClient = new MongoClient(MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
});
await mongoClient.connect();

console.log("Mongo connected.");

const db = mongoClient.db(FORENSICS_DB);
const eventsCol = db.collection(EVENTS_COL);
const statesCol = db.collection(STATES_COL);
const metaCol = db.collection(META_COL);

await metaCol.updateOne(
  { _id: "counters" },
  { $setOnInsert: { eventCounter: 0 } },
  { upsert: true }
);

// --------------------------------------------------
// SQLITE INIT
// --------------------------------------------------
if (!fs.existsSync(DB_PATH)) {
  console.error("SQLite DB missing:", DB_PATH);
  process.exit(1);
}

const sqlite = new sqlite3.Database(DB_PATH);
const sqliteAll = promisify(sqlite.all.bind(sqlite));

// --------------------------------------------------
// HELPERS
// --------------------------------------------------
function sha256(s) {
  return crypto.createHash("sha256").update(s).digest("hex");
}

function computeMerkleRoot(hashes) {
  if (hashes.length === 0) return null;
  let layer = hashes.slice();
  while (layer.length > 1) {
    const next = [];
    for (let i = 0; i < layer.length; i += 2) {
      const left = layer[i];
      const right = layer[i + 1] || layer[i];
      next.push(sha256(left + right));
    }
    layer = next;
  }
  return layer[0];
}

function detectScanner(req) {
  const ua = (req.get("User-Agent") || "").toLowerCase();
  if (ua.includes("gobuster")) return "Gobuster";
  if (ua.includes("dirsearch")) return "Dirsearch";
  if (ua.includes("sqlmap")) return "SQLmap";
  if (ua.includes("ffuf")) return "FFUF";
  if (ua.includes("burp")) return "Burp Suite";
  if (ua.includes("python-requests")) return "Python Script";
  if (ua.includes("curl/")) return "Curl";
  return null;
}

function getIP(req) {
  const xf = req.headers["x-forwarded-for"];
  if (xf && typeof xf === "string") return xf.split(",")[0].trim();
  return req.socket.remoteAddress.replace(/^::ffff:/, "");
}

async function getIPIntel(ip) {
  try {
    const r = await axios.get(`https://ipapi.co/${ip}/json/`, {
      timeout: 3000,
    });
    const d = r.data || {};
    const org = d.org || "";
    const isVPN = /vpn|proxy|hosting|cloud|aws|amazon|google/i.test(
      org.toLowerCase()
    );

    return {
      ip,
      asn: d.asn || null,
      org,
      country: d.country_name || null,
      city: d.city || null,
      region: d.region || null,
      isVPN,
    };
  } catch {
    return { ip, error: "geo_lookup_failed" };
  }
}

function entropy(s) {
  if (!s) return 0;
  const freq = {};
  for (const ch of s) freq[ch] = (freq[ch] || 0) + 1;
  let e = 0;
  const len = s.length;
  for (const c in freq) {
    const p = freq[c] / len;
    e -= p * Math.log2(p);
  }
  return e;
}

function tokenize(s) {
  return s.split(/[^a-zA-Z0-9_]/).filter(Boolean);
}

function payloadFingerprint(p) {
  const tokens = tokenize(p);
  return {
    length: p.length,
    entropy: entropy(p),
    tokenCount: tokens.length,
    tokens: tokens.slice(0, 10),
    specialChars: (p.match(/[^a-zA-Z0-9]/g) || []).length,
    keywords: {
      union: /union/i.test(p),
      select: /select/i.test(p),
      drop: /drop/i.test(p),
      script: /<script/i.test(p),
    },
  };
}

async function logUnified(eventDoc) {
  const serialized = JSON.stringify(eventDoc);
  const hash = sha256(serialized);

  eventDoc.hash = hash;

  await eventsCol.insertOne(eventDoc);

  const meta = await metaCol.findOneAndUpdate(
    { _id: "counters" },
    { $inc: { eventCounter: 1 } },
    { returnDocument: "after" }
  );

  const counter = meta.value.eventCounter;

  if (counter % MERKLE_BATCH === 0) {
    const batch = await eventsCol
      .find()
      .sort({ ts: -1 })
      .limit(MERKLE_BATCH)
      .toArray();
    const roots = batch.map((e) => e.hash).reverse();
    const root = computeMerkleRoot(roots);

    await metaCol.updateOne(
      { _id: "counters" },
      { $set: { lastMerkleRoot: root, lastMerkleAt: new Date() } }
    );

    await db.collection("merkle_roots").insertOne({ root, ts: new Date() });
  }
}

// --------------------------------------------------
// STATE HELPERS
// --------------------------------------------------
async function getState(ip) {
  let s = await statesCol.findOne({ ip });
  if (!s) {
    s = {
      ip,
      failed_logins: 0,
      sqli_count: 0,
      requestCount: 0,
      lastRequest: null,
      requestTimes: [],
    };
    await statesCol.insertOne(s);
  }
  return s;
}

// --------------------------------------------------
// ROUTES
// --------------------------------------------------
app.get("/", (req, res) =>
  res.sendFile(path.join(process.cwd(), "public", "index.html"))
);
app.get("/admin", (req, res) =>
  res.sendFile(path.join(process.cwd(), "public", "admin.html"))
);

// --------------------------------------------------
//  POST /admin (UNIFIED EVENT)
// --------------------------------------------------
app.post("/admin", async (req, res) => {
  const ip = getIP(req);
  const state = await getState(ip);
  const scanner = detectScanner(req);

  const username = req.body.username || "";
  const password = req.body.password || "";
  const payload = `${username} ${password}`;

  // Prepare unified event doc
  const eventDoc = {
    event_id: uuidv4(),
    ts: new Date(),
    ip,
    scanner,
    ipIntel: {},
    deviceFp: {},
    payloadFp: {},
    behavioral: {},
    loginAttempt: {},
    deception: {},
  };

  // Collect IP intel
  const ipIntel = await getIPIntel(ip);
  eventDoc.ipIntel = ipIntel;

  // Device fingerprint
  const deviceFp = {
    userAgent: req.get("User-Agent") || "",
    acceptLang: req.get("Accept-Language") || "",
    screen: req.body.screen || null,
    timezone: req.body.timezone || null,
  };
  eventDoc.deviceFp = deviceFp;

  // Payload fingerprint
  const pfp = payloadFingerprint(payload);
  eventDoc.payloadFp = pfp;

  // Behavior timing
  const now = Date.now();
  let delta = null;
  if (state.lastRequest) delta = now - new Date(state.lastRequest).getTime();

  const updatedDeltas = [...(state.requestTimes || [])];
  if (delta !== null) updatedDeltas.push(delta);

  await statesCol.updateOne(
    { ip },
    {
      $set: {
        lastRequest: new Date(now),
        requestTimes: updatedDeltas.slice(-200),
        requestCount: (state.requestCount || 0) + 1,
      },
    }
  );

  eventDoc.behavioral = {
    delta,
    requestCount: state.requestCount + 1,
    failed_logins: state.failed_logins,
  };

  // -----------------------------
  // BAN CHECK
  // -----------------------------
  if (state.failed_logins >= 7) {
    eventDoc.loginAttempt.status = "banned";
    eventDoc.deception.banned = true;
    await logUnified(eventDoc);

    return res
      .status(403)
      .send(`<h3>Your IP has been temporarily blocked.</h3>`);
  }

  // -----------------------------
  // CORRECT LOGIN
  // -----------------------------
  if (username === "admin" && password === TARGET_PASSWORD) {
    eventDoc.loginAttempt = {
      username,
      passwordPreview: password.slice(0, 100),
      mlLabel: "override",
      mlConf: 1,
      status: "correct",
    };

    // Give deceptive OTP cookie
    const session = {
      username,
      otp_status: "Not Verified",
      created: new Date().toISOString(),
    };

    res.cookie(
      "session",
      Buffer.from(JSON.stringify(session)).toString("base64"),
      {
        httpOnly: false,
        maxAge: 1800000,
      }
    );

    await logUnified(eventDoc);

    return res.send(`
      <h3>Two-Factor Authentication</h3>
      <form method="POST" action="/otp-verify">
        <input name="code" placeholder="Enter code">
        <button>Verify</button>
      </form>
    `);
  }

  // ML classification
  let ml;
  try {
    ml = (await axios.post(ML_API, { query: payload }, { timeout: 4000 })).data;
  } catch {
    ml = { label: "normal", confidence: 0.4 };
  }

  // false admin override
  if (username.toLowerCase() === "admin") {
    ml.label = "normal";
    ml.confidence = 1.0;
  }

  eventDoc.loginAttempt = {
    username,
    passwordPreview: password.slice(0, 100),
    mlLabel: ml.label,
    mlConf: ml.confidence,
    status: "failed",
  };

  // -----------------------------
  // SQLi hint (ML detected)
  // -----------------------------
  if (ml.label === "injected") {
    eventDoc.deception.hint = "users_table";
    await logUnified(eventDoc);

    return res.send(`
      <h3>Server Error</h3>
      <pre style="color:gray">Information schema suggests table 'users'</pre>
    `);
  }

  // -----------------------------
  // SELECT * FROM 'users' → leak
  // -----------------------------
  if (payload.toLowerCase().includes("select * from 'users'")) {
    let rows = [];
    try {
      rows = await sqliteAll(`SELECT * FROM 'users'`);
    } catch (e) {
      rows = [{ error: e.message }];
    }

    eventDoc.deception.tableLeak = true;
    eventDoc.deception.leakedRows = rows;

    await logUnified(eventDoc);

    return res.send(`
      <h2>Partial Database Dump</h2>
      <pre>${JSON.stringify(rows, null, 2)}</pre>
      <p style="color:gray">-- Error 1064: packet loss detected</p>
    `);
  }

  // -----------------------------
  // Failed login tracking
  // -----------------------------
  const newFails = (state.failed_logins || 0) + 1;
  await statesCol.updateOne(
    { ip },
    { $set: { failed_logins: newFails, lastSeen: new Date() } }
  );

  // tarpit: >3 attempts → 5s delay
  if (newFails > 3 && newFails < 7) {
    eventDoc.deception.tarpitDelay = 5000;
    await new Promise((r) => setTimeout(r, 5000));
  }

  await logUnified(eventDoc);

  return res.status(401).send(`<h3>Invalid username or password.</h3>`);
});

// --------------------------------------------------
// OTP VERIFY
// --------------------------------------------------
app.post("/otp-verify", async (req, res) => {
  const ip = getIP(req);
  const cookie = req.cookies.session || "";
  let parsed = {};
  try {
    parsed = JSON.parse(Buffer.from(cookie, "base64").toString());
  } catch {}

  const eventDoc = {
    event_id: uuidv4(),
    ts: new Date(),
    ip,
    otpCode: req.body.code,
    parsedCookie: parsed,
  };

  await logUnified(eventDoc);

  if (/^\d{4,8}$/.test(req.body.code)) {
    return res.send(`
      <h3>Verification Successful</h3>
      <p>Upload ID</p>
      <form method="POST" enctype="multipart/form-data" action="/upload-id">
        <input type="file" name="idfile">
        <button>Upload</button>
      </form>
    `);
  }

  return res.send(`<h3>Invalid Code</h3>`);
});

// --------------------------------------------------
// UPLOAD ID
// --------------------------------------------------
app.post(
  "/upload-id",
  bodyParser.raw({ type: "*/*", limit: "10mb" }),
  async (req, res) => {
    const ip = getIP(req);

    await logUnified({
      event_id: uuidv4(),
      ts: new Date(),
      ip,
      uploadSize: req.body.length,
    });

    return res.send(`<h3>ID uploaded. Manual review 24–72 hours.</h3>`);
  }
);

// --------------------------------------------------
// HEALTH
// --------------------------------------------------
app.get("/health", (req, res) => res.json({ ok: true }));

// --------------------------------------------------
app.listen(PORT, () =>
  console.log(`Chameleon Honeypot (Unified Event vB) running on port ${PORT}`)
);
