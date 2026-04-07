import { app } from "../server.js";
import { initDb } from "../db.js";

// Initialize DB for Vercel
initDb().catch(err => {
  console.error("Database Initialization Error:", err);
});

export default app;
