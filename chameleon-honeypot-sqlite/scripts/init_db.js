// scripts/init_db.js
import sqlite3 from "sqlite3";
import fs from "fs";
import path from "path";
import { promisify } from "util";

const DB_PATH = path.join(process.cwd(), "honeypot.db");

async function init() {
  if (fs.existsSync(DB_PATH)) {
    console.log(
      "honeypot.db already exists at",
      DB_PATH,
      "\nRemove it if you want to recreate."
    );
    return;
  }

  const db = new sqlite3.Database(DB_PATH);
  const run = promisify(db.run.bind(db));
  try {
    await run("PRAGMA foreign_keys = ON;");
    await run(`
      CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password_hash TEXT,
        email TEXT
      );
    `);
    await run(`
      CREATE TABLE transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        amount REAL,
        created_at TEXT,
        FOREIGN KEY(user_id) REFERENCES users(id)
      );
    `);
    await run(`
      CREATE TABLE admin_notes (
        id INTEGER PRIMARY KEY,
        note TEXT
      );
    `);

    const fakeHash =
      "$2y$10$IO14zXCwe3a7HdvuUzDoaeTxaxNbltaojDOaAw.v430eWfI.Dw6BS";
    await run(
      `INSERT INTO users (username, password_hash, email) VALUES (?, ?, ?)`,
      ["admin", fakeHash, "admin@acme.example"]
    );
    await run(
      `INSERT INTO transactions (user_id, amount, created_at) VALUES (1, 1250.00, datetime('now'))`
    );
    await run(
      `INSERT INTO admin_notes (id, note) VALUES (1, 'System started at ' || datetime('now'))`
    );

    console.log(
      "Initialized honeypot.db with fake tables and data at",
      DB_PATH
    );
  } catch (err) {
    console.error("Init error:", err);
  } finally {
    db.close();
  }
}

init().catch((e) => {
  console.error(e);
  process.exit(1);
});
