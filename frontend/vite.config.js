import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/logs": "http://localhost:3001",
      "/health": "http://localhost:3001",
      "/.system.log": "http://localhost:3001",
      "/backup.zip": "http://localhost:3001",
    },
  },
});
