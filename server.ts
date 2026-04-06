
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API Proxy for Voter Search to avoid CORS
  app.get("/api/voter-search", async (req, res) => {
    try {
      const { name, father, mother, birth } = req.query;
      let url = "https://kazalbnp.com/api/voter-search";
      
      const params = new URLSearchParams();
      if (name) params.append("name", name as string);
      if (father) params.append("father", father as string);
      if (mother) params.append("mother", mother as string);
      if (birth) params.append("birth", birth as string);

      const response = await axios.get(`${url}?${params.toString()}`);
      res.json(response.data);
    } catch (error) {
      console.error("Proxy Error:", error);
      res.status(500).json({ error: "Failed to fetch voter data from external API" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
