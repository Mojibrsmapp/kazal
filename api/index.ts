import { app } from "../server";
import { initDb } from "../db.js";

// Initialize DB for Vercel
initDb().catch(console.error);

export default app;
