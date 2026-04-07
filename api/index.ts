import { app } from "../server.js";
import { initDb } from "../db.js";

  let isDbInitialized = false;

  const handler = async (req: any, res: any) => {
    if (!isDbInitialized) {
      try {
        await initDb();
        isDbInitialized = true;
      } catch (err) {
        console.error("Database Initialization Error:", err);
      }
    }
    return app(req, res);
  };

  export default handler;
