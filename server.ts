
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { google } from "googleapis";
import { db, initDb } from "./db.js";
import { uploadToTelegram } from "./telegram.js";
import { sendSms } from "./sms.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JWT_SECRET = process.env.JWT_SECRET || "kazal-secret-key-2026";
const upload = multer({ storage: multer.memoryStorage() });

async function startServer() {
  await initDb();
  const app = express();
  app.use(express.json());
  const PORT = 3000;

  // Auth Middleware
  const authenticateToken = (req: any, res: any, next: any) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  };

  const checkPermission = (permission: string) => {
    return (req: any, res: any, next: any) => {
      if (req.user.is_primary) return next();
      
      const permissions = JSON.parse(req.user.permissions || "{}");
      if (permissions[permission]) {
        next();
      } else {
        res.status(403).json({ error: `Permission denied: ${permission}` });
      }
    };
  };

  // Email Transporter
  const transporter = nodemailer.createTransport({
    host: "mail.cyberpersons.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "smtp_93f21185c2584148",
      pass: "K5Bd16c3kuVv0rQfcbEvgur_VgoZ-q_s",
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const sendEmail = async (to: string, subject: string, html: string) => {
    try {
      await transporter.sendMail({
        from: '"Lutfur Rahman Kajal" <kazal@bartanow.com>',
        to,
        subject,
        html,
      });
    } catch (error) {
      console.error("Email Error:", error);
    }
  };

  // Log Helper
  const logAction = async (adminId: number | null, action: string, details: string) => {
    await db.execute({
      sql: "INSERT INTO logs (admin_id, action, details) VALUES (?, ?, ?)",
      args: [adminId, action, details],
    });

    // Send log to admin email
    if (action !== "VISIT") {
      await sendEmail("bartanowcom@gmail.com", `System Log: ${action}`, `
        <h3>System Log Alert</h3>
        <p><strong>Action:</strong> ${action}</p>
        <p><strong>Details:</strong> ${details}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      `);
    }
  };

  // API Proxy for Voter Search
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
      res.status(500).json({ error: "Failed to fetch voter data" });
    }
  });

  // Admin Login
  app.post("/api/admin/login", async (req, res) => {
    const { username, password } = req.body;
    try {
      const result = await db.execute({
        sql: "SELECT * FROM admins WHERE username = ?",
        args: [username],
      });
      const admin = result.rows[0];
      if (!admin || !(await bcrypt.compare(password, admin.password as string))) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Ensure slug exists
      if (!admin.slug) {
        const slug = (admin.full_name as string).toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
        await db.execute({
          sql: "UPDATE admins SET slug = ? WHERE id = ?",
          args: [slug, admin.id]
        });
        (admin as any).slug = slug;
      }

      const token = jwt.sign({ 
        id: admin.id, 
        username: admin.username, 
        is_primary: admin.is_primary,
        role: admin.role,
        permissions: admin.permissions
      }, JWT_SECRET);
      
      await logAction(admin.id as number, "LOGIN", `Admin ${username} logged in`);
      res.json({ token, admin: { 
        id: admin.id, 
        username: admin.username, 
        full_name: admin.full_name, 
        is_primary: admin.is_primary, 
        avatar: admin.avatar, 
        slug: admin.slug,
        role: admin.role,
        permissions: admin.permissions
      } });
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  });

  // News API
  app.get("/api/news", async (req, res) => {
    try {
      const result = await db.execute(`
        SELECT n.*, a.full_name as author_name, a.avatar as author_avatar, a.slug as author_slug 
        FROM news n 
        LEFT JOIN admins a ON n.author_id = a.id 
        ORDER BY n.created_at DESC
      `);
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch news" });
    }
  });

  app.get("/api/news/:slug", async (req, res) => {
    try {
      const result = await db.execute({
        sql: `
          SELECT n.*, a.full_name as author_name, a.avatar as author_avatar, a.slug as author_slug 
          FROM news n 
          LEFT JOIN admins a ON n.author_id = a.id 
          WHERE n.slug = ?
        `,
        args: [req.params.slug],
      });
      if (result.rows.length === 0) return res.status(404).json({ error: "News not found" });
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch news detail" });
    }
  });

  app.post("/api/news", authenticateToken, upload.single("image"), async (req, res) => {
    const { title, content, external_link, category, tags, meta_description } = req.body;
    const authorId = (req as any).user.id;

    let imageUrl = "";
    if (req.file) {
      imageUrl = await uploadToTelegram(req.file.buffer, req.file.originalname);
    }
    const slug = title.trim()
      .replace(/[^\w\u0980-\u09FF\s-]+/g, '') // Keep letters, numbers, spaces, and hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .toLowerCase();
    try {
      await db.execute({
        sql: "INSERT INTO news (title, slug, content, external_link, image_url, author_id, category, tags, meta_description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        args: [title, slug, content || null, external_link || null, imageUrl, authorId, category || null, tags || null, meta_description || null],
      });
      await logAction(authorId, "CREATE_NEWS", `Created news: ${title}`);
      res.json({ success: true, slug });
    } catch (error) {
      console.error("Create News Error:", error);
      res.status(500).json({ error: "Failed to create news" });
    }
  });

  // Contact API
  app.post("/api/contact", async (req, res) => {
    const { name, phone, email, subject, message, type, age, area, designation } = req.body;
    try {
      await db.execute({
        sql: "INSERT INTO messages (name, phone, email, subject, message, type, age, area, designation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        args: [name, phone || null, email || null, subject || 'No Subject', message, type || 'Message', age || null, area || null, designation || null],
      });

      // Send notification email
      await sendEmail("bartanowcom@gmail.com", `New ${type || 'Message'}: ${subject || 'No Subject'}`, `
        <h3>New ${type || 'Message'} Received</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Email:</strong> ${email || 'N/A'}</p>
        ${type === 'Volunteer' ? `
          <p><strong>Age:</strong> ${age}</p>
          <p><strong>Area:</strong> ${area}</p>
          <p><strong>Designation:</strong> ${designation}</p>
        ` : ''}
        <p><strong>Subject:</strong> ${subject || 'No Subject'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr/>
        <p>Sent from Lutfur Rahman Kajal Website</p>
      `);

      res.json({ success: true });
    } catch (error) {
      console.error("Contact Error:", error);
      res.status(500).json({ error: "Failed to send message" });
    }
  });

  app.get("/api/admin/messages", authenticateToken, async (req, res) => {
    try {
      const result = await db.execute("SELECT * FROM messages ORDER BY created_at DESC");
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  app.patch("/api/admin/messages/:id/status", authenticateToken, async (req, res) => {
    const { status } = req.body;
    try {
      await db.execute({
        sql: "UPDATE messages SET status = ? WHERE id = ?",
        args: [status, req.params.id]
      });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to update status" });
    }
  });

  app.delete("/api/admin/messages/:id", authenticateToken, async (req, res) => {
    try {
      await db.execute({
        sql: "DELETE FROM messages WHERE id = ?",
        args: [req.params.id]
      });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete message" });
    }
  });

  // Logs API
  app.get("/api/admin/logs", authenticateToken, async (req, res) => {
    try {
      const result = await db.execute(`
        SELECT l.*, a.username as admin_username 
        FROM logs l 
        LEFT JOIN admins a ON l.admin_id = a.id 
        ORDER BY l.created_at DESC 
        LIMIT 100
      `);
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch logs" });
    }
  });

  // Public Admin Profile
  app.get("/api/public/admin/:slug", async (req, res) => {
    try {
      const adminResult = await db.execute({
        sql: "SELECT id, full_name, avatar, slug, username FROM admins WHERE slug = ?",
        args: [req.params.slug]
      });
      
      if (adminResult.rows.length === 0) return res.status(404).json({ error: "Author not found" });
      
      const admin = adminResult.rows[0];
      
      const newsResult = await db.execute({
        sql: `
          SELECT n.*, a.full_name as author_name, a.avatar as author_avatar, a.slug as author_slug 
          FROM news n 
          LEFT JOIN admins a ON n.author_id = a.id 
          WHERE n.author_id = ? 
          ORDER BY n.created_at DESC
        `,
        args: [admin.id]
      });
      
      res.json({
        author: admin,
        news: newsResult.rows
      });
    } catch (error) {
      console.error("Public Profile Error:", error);
      res.status(500).json({ error: "Failed to fetch profile" });
    }
  });

  // Admin Management
  app.get("/api/admin/list", authenticateToken, async (req, res) => {
    try {
      const result = await db.execute("SELECT id, username, phone, email, full_name, avatar, is_primary FROM admins");
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch admins" });
    }
  });

  app.post("/api/admin/add", authenticateToken, upload.single("avatar"), async (req, res) => {
    if (!(req as any).user.is_primary) return res.status(403).json({ error: "Only primary admin can add admins" });
    const { username, password, phone, email, full_name } = req.body;
    
    let avatarUrl = "";
    if (req.file) {
      avatarUrl = await uploadToTelegram(req.file.buffer, req.file.originalname);
    }

    const slug = full_name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      await db.execute({
        sql: "INSERT INTO admins (username, password, phone, email, full_name, avatar, slug) VALUES (?, ?, ?, ?, ?, ?, ?)",
        args: [username, hashedPassword, phone, email || null, full_name, avatarUrl || null, slug],
      });
      await logAction((req as any).user.id, "ADD_ADMIN", `Added admin: ${username}`);
      res.json({ success: true });
    } catch (error) {
      console.error("Add Admin Error:", error);
      res.status(500).json({ error: "Failed to add admin" });
    }
  });

  // Admin Profile Update
  app.patch("/api/admin/profile", authenticateToken, upload.single("avatar"), async (req, res) => {
    const { full_name, email } = req.body;
    const adminId = (req as any).user.id;
    
    try {
      let avatarUrl = null;
      if (req.file) {
        avatarUrl = await uploadToTelegram(req.file.buffer, req.file.originalname);
      }

      const slug = full_name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
      let sql = "UPDATE admins SET full_name = ?, email = ?, slug = ?";
      let args = [full_name, email || null, slug];

      if (avatarUrl) {
        sql += ", avatar = ?";
        args.push(avatarUrl);
      }

      sql += " WHERE id = ?";
      args.push(adminId);

      await db.execute({ sql, args });
      
      // Fetch updated admin
      const result = await db.execute({
        sql: "SELECT id, username, phone, email, full_name, avatar, slug, is_primary FROM admins WHERE id = ?",
        args: [adminId]
      });
      
      const updatedAdmin = result.rows[0];
      await logAction(adminId, "UPDATE_PROFILE", `Updated profile for ${updatedAdmin.username}`);
      
      res.json({ success: true, admin: updatedAdmin });
    } catch (error) {
      console.error("Profile Update Error:", error);
      res.status(500).json({ error: "Failed to update profile" });
    }
  });

  // OTP & Password Reset
  app.post("/api/admin/reset-request", async (req, res) => {
    const { username, phone } = req.body;
    try {
      const result = await db.execute({
        sql: "SELECT * FROM admins WHERE username = ? AND phone = ?",
        args: [username, phone],
      });
      const admin = result.rows[0];
      if (!admin) return res.status(404).json({ error: "Admin not found or phone number mismatch" });
      
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins
      
      await db.execute({
        sql: "INSERT INTO otps (phone, code, expires_at) VALUES (?, ?, ?)",
        args: [phone, code, expiresAt.toISOString()],
      });

      const smsContent = `Hello ${username}, your OTP for password reset is: ${code}`;
      await sendSms(phone, smsContent);
      
      // Log the SMS content as requested
      await logAction(admin.id as number, "OTP_REQUEST", `SMS Sent to ${phone}: "${smsContent}"`);
      
      res.json({ success: true });
    } catch (error) {
      console.error("Reset Request Error:", error);
      res.status(500).json({ error: "Failed to send OTP" });
    }
  });

  app.post("/api/admin/reset-verify", async (req, res) => {
    const { username, code, newPassword } = req.body;
    try {
      const adminResult = await db.execute({
        sql: "SELECT * FROM admins WHERE username = ?",
        args: [username],
      });
      const admin = adminResult.rows[0];
      if (!admin) return res.status(404).json({ error: "Admin not found" });
      const otpResult = await db.execute({
        sql: "SELECT * FROM otps WHERE phone = ? AND code = ? AND expires_at > CURRENT_TIMESTAMP ORDER BY created_at DESC LIMIT 1",
        args: [admin.phone as string, code],
      });
      if (otpResult.rows.length === 0) return res.status(400).json({ error: "Invalid or expired OTP" });
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await db.execute({
        sql: "UPDATE admins SET password = ? WHERE id = ?",
        args: [hashedPassword, admin.id as number],
      });
      await logAction(admin.id as number, "PASSWORD_RESET", `Password reset for ${username}`);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Password reset failed" });
    }
  });

  // Dashboard Stats
  app.get("/api/admin/stats", authenticateToken, async (req, res) => {
    try {
      const newsCount = await db.execute("SELECT COUNT(*) as count FROM news");
      const adminCount = await db.execute("SELECT COUNT(*) as count FROM admins");
      const logCount = await db.execute("SELECT COUNT(*) as count FROM logs");
      const messageCount = await db.execute("SELECT COUNT(*) as count FROM messages WHERE status = 'unread'");
      
      // Simple visitor stats (last 30 days)
      const visitors = await db.execute("SELECT COUNT(*) as count FROM visitors WHERE created_at > datetime('now', '-30 days')");
      const dailyVisitors = await db.execute("SELECT COUNT(*) as count FROM visitors WHERE created_at > datetime('now', '-1 day')");

      res.json({
        news: newsCount.rows[0].count,
        admins: adminCount.rows[0].count,
        logs: logCount.rows[0].count,
        unreadMessages: messageCount.rows[0].count,
        monthlyVisitors: visitors.rows[0].count,
        dailyVisitors: dailyVisitors.rows[0].count
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  app.put("/api/news/:id", authenticateToken, upload.single("image"), async (req: any, res) => {
    const { id } = req.params;
    const { title, content, external_link, category, tags, meta_description } = req.body;
    
    try {
      // Check if user has permission to edit this news
      const newsResult = await db.execute({
        sql: "SELECT author_id, image_url FROM news WHERE id = ?",
        args: [id]
      });
      const news = newsResult.rows[0];
      if (!news) return res.status(404).json({ error: "News not found" });

      const permissions = JSON.parse(req.user.permissions || "{}");
      const isAuthor = news.author_id === req.user.id;
      const canEditOthers = permissions.edit_others_news || req.user.is_primary;

      if (!isAuthor && !canEditOthers) {
        return res.status(403).json({ error: "You can only edit your own news" });
      }

      let imageUrl = news.image_url;
      if (req.file) {
        imageUrl = await uploadToTelegram(req.file.buffer, req.file.originalname);
      }

      await db.execute({
        sql: "UPDATE news SET title = ?, content = ?, external_link = ?, category = ?, tags = ?, meta_description = ?, image_url = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
        args: [title, content, external_link, category, tags, meta_description, imageUrl, id],
      });
      await logAction(req.user.id, "EDIT_NEWS", `Edited news ID: ${id}`);
      res.json({ success: true });
    } catch (error) {
      console.error("Update News Error:", error);
      res.status(500).json({ error: "Failed to update news" });
    }
  });

  app.delete("/api/news/:id", authenticateToken, async (req: any, res) => {
    const { id } = req.params;
    try {
      // Check permission
      const newsResult = await db.execute({
        sql: "SELECT author_id FROM news WHERE id = ?",
        args: [id]
      });
      const news = newsResult.rows[0];
      if (!news) return res.status(404).json({ error: "News not found" });

      const permissions = JSON.parse(req.user.permissions || "{}");
      const isAuthor = news.author_id === req.user.id;
      const canDeleteOthers = permissions.delete_others_news || req.user.is_primary;

      if (!isAuthor && !canDeleteOthers) {
        return res.status(403).json({ error: "You can only delete your own news" });
      }

      await db.execute({
        sql: "DELETE FROM news WHERE id = ?",
        args: [id]
      });
      await logAction(req.user.id, "DELETE_NEWS", `Deleted news ID: ${id}`);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete news" });
    }
  });

  // Gallery API
  app.get("/api/gallery", async (req, res) => {
    try {
      const result = await db.execute("SELECT * FROM gallery ORDER BY created_at DESC");
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch gallery" });
    }
  });

  app.post("/api/admin/gallery", authenticateToken, upload.single('image'), async (req: any, res) => {
    const { title, type, url, category, is_featured } = req.body;
    let finalUrl = url;

    if (type === 'photo' && req.file) {
      finalUrl = await uploadToTelegram(req.file.buffer, req.file.originalname);
    }

    try {
      await db.execute({
        sql: "INSERT INTO gallery (title, type, url, category, is_featured) VALUES (?, ?, ?, ?, ?)",
        args: [title, type, finalUrl, category, is_featured ? 1 : 0]
      });
      await logAction(req.user.id, "ADD_GALLERY", `Added ${type} to gallery`);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to add gallery item" });
    }
  });

  app.delete("/api/admin/gallery/:id", authenticateToken, async (req: any, res) => {
    try {
      await db.execute({
        sql: "DELETE FROM gallery WHERE id = ?",
        args: [req.params.id]
      });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete item" });
    }
  });

  // Development Plans API
  app.get("/api/plans", async (req, res) => {
    try {
      const result = await db.execute("SELECT * FROM development_plans ORDER BY created_at DESC");
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch plans" });
    }
  });

  app.post("/api/admin/plans", authenticateToken, upload.single('image'), async (req: any, res) => {
    const { title, description, type, status, area } = req.body;
    let image_url = "";
    if (req.file) {
      image_url = await uploadToTelegram(req.file.buffer, req.file.originalname);
    }

    try {
      await db.execute({
        sql: "INSERT INTO development_plans (title, description, type, status, area, image_url) VALUES (?, ?, ?, ?, ?, ?)",
        args: [title, description, type, status, area, image_url]
      });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to add plan" });
    }
  });

  app.put("/api/admin/plans/:id", authenticateToken, async (req: any, res) => {
    const { title, description, type, status, area } = req.body;
    try {
      await db.execute({
        sql: "UPDATE development_plans SET title = ?, description = ?, type = ?, status = ?, area = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
        args: [title, description, type, status, area, req.params.id]
      });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to update plan" });
    }
  });

  app.delete("/api/admin/plans/:id", authenticateToken, async (req: any, res) => {
    try {
      await db.execute({
        sql: "DELETE FROM development_plans WHERE id = ?",
        args: [req.params.id]
      });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete plan" });
    }
  });

  // Settings API
  app.get("/api/settings", async (req, res) => {
    try {
      const result = await db.execute("SELECT * FROM settings");
      const settings: any = {};
      result.rows.forEach((row: any) => {
        settings[row.key] = row.value;
      });
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch settings" });
    }
  });

  app.post("/api/admin/settings", authenticateToken, async (req: any, res) => {
    if (!req.user.is_primary) return res.status(403).json({ error: "Only primary admin can update settings" });
    const settings = req.body; // Object with key-value pairs
    try {
      for (const [key, value] of Object.entries(settings)) {
        await db.execute({
          sql: "INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)",
          args: [key, typeof value === 'string' ? value : JSON.stringify(value)]
        });
      }
      await logAction(req.user.id, "UPDATE_SETTINGS", "Updated website settings");
      res.json({ success: true });
    } catch (error) {
      console.error("Update Settings Error:", error);
      res.status(500).json({ error: "Failed to update settings" });
    }
  });

  app.post("/api/admin/settings/logo", authenticateToken, upload.single('logo'), async (req: any, res) => {
    if (!req.user.is_primary) return res.status(403).json({ error: "Only primary admin can update logo" });
    if (!req.file) return res.status(400).json({ error: "No logo file provided" });

    try {
      const logoUrl = await uploadToTelegram(req.file.buffer, req.file.originalname);
      await db.execute({
        sql: "INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)",
        args: ["site_logo", logoUrl]
      });
      await logAction(req.user.id, "UPDATE_LOGO", "Updated website logo");
      res.json({ success: true, logoUrl });
    } catch (error) {
      res.status(500).json({ error: "Failed to update logo" });
    }
  });

  // Notices API
  app.get("/api/notices", async (req, res) => {
    try {
      const result = await db.execute("SELECT * FROM notices WHERE is_active = 1 ORDER BY created_at DESC");
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch notices" });
    }
  });

  app.get("/api/admin/notices", authenticateToken, async (req, res) => {
    try {
      const result = await db.execute("SELECT * FROM notices ORDER BY created_at DESC");
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch notices" });
    }
  });

  app.post("/api/admin/notices", authenticateToken, async (req: any, res) => {
    const { title, content, type, is_active, expires_at } = req.body;
    try {
      await db.execute({
        sql: "INSERT INTO notices (title, content, type, is_active, expires_at) VALUES (?, ?, ?, ?, ?)",
        args: [title, content, type || 'notice', is_active ? 1 : 0, expires_at || null]
      });
      await logAction(req.user.id, "ADD_NOTICE", `Added notice: ${title}`);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to add notice" });
    }
  });

  app.patch("/api/admin/notices/:id", authenticateToken, async (req: any, res) => {
    const { is_active } = req.body;
    try {
      await db.execute({
        sql: "UPDATE notices SET is_active = ? WHERE id = ?",
        args: [is_active ? 1 : 0, req.params.id]
      });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to update notice" });
    }
  });

  app.delete("/api/admin/notices/:id", authenticateToken, async (req: any, res) => {
    try {
      await db.execute({
        sql: "DELETE FROM notices WHERE id = ?",
        args: [req.params.id]
      });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete notice" });
    }
  });

  // Google Analytics Integration
  app.get("/api/admin/analytics", authenticateToken, async (req: any, res) => {
    try {
      const settingsResult = await db.execute({
        sql: "SELECT value FROM settings WHERE key = ?",
        args: ["google_analytics_config"]
      });

      if (settingsResult.rows.length === 0) {
        return res.status(404).json({ error: "Google Analytics not configured" });
      }

      const config = JSON.parse(settingsResult.rows[0].value as string);
      // In a real scenario, we would use googleapis here.
      // For now, we'll return the visitor stats from our internal table as a fallback
      // but the structure is ready for Google Analytics data.
      
      const stats = await db.execute(`
        SELECT 
          (SELECT COUNT(*) FROM visitors) as total_views,
          (SELECT COUNT(DISTINCT ip) FROM visitors) as unique_visitors,
          (SELECT COUNT(*) FROM visitors WHERE created_at > datetime('now', '-1 day')) as today_views
      `);

      const popularPages = await db.execute(`
        SELECT path, COUNT(*) as views 
        FROM visitors 
        GROUP BY path 
        ORDER BY views DESC 
        LIMIT 5
      `);

      res.json({
        total_views: stats.rows[0].total_views,
        unique_visitors: stats.rows[0].unique_visitors,
        today_views: stats.rows[0].today_views,
        popular_pages: popularPages.rows,
        // Placeholder for Google Analytics data
        ga_data: {
          impressions: 1250,
          ctr: "4.2%",
          keywords: [
            { term: "Lutfur Rahman Kajal", clicks: 450 },
            { term: "Kajal MP Cox's Bazar", clicks: 210 },
            { term: "BNP Cox's Bazar", clicks: 180 }
          ]
        }
      });
    } catch (error) {
      console.error("Analytics Error:", error);
      res.status(500).json({ error: "Failed to fetch analytics" });
    }
  });

  app.get("/api/admin/search-console", authenticateToken, async (req: any, res) => {
    try {
      const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
      const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
      const siteUrl = process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL || "https://yoursite.com";

      if (!clientEmail || !privateKey) {
        return res.status(400).json({ error: "Google Search Console credentials not configured" });
      }

      const auth = new google.auth.JWT({
        email: clientEmail,
        key: privateKey,
        scopes: ["https://www.googleapis.com/auth/webmasters.readonly"]
      });

      const searchconsole = google.webmasters({ version: "v3", auth });

      // Get data for the last 30 days
      const endDate = new Date().toISOString().split('T')[0];
      const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      const response = await searchconsole.searchanalytics.query({
        siteUrl: siteUrl,
        requestBody: {
          startDate: startDate,
          endDate: endDate,
          dimensions: ["query"],
          rowLimit: 20,
        },
      });

      res.json(response.data);
    } catch (error: any) {
      console.error("Search Console API Error:", error);
      res.status(500).json({ error: error.message || "Failed to fetch Search Console data" });
    }
  });

  // Admin Permissions
  app.patch("/api/admin/:id/permissions", authenticateToken, async (req: any, res) => {
    if (!req.user.is_primary) return res.status(403).json({ error: "Only primary admins can set permissions" });
    
    const { role, permissions, is_primary } = req.body;
    try {
      await db.execute({
        sql: "UPDATE admins SET role = ?, permissions = ?, is_primary = ? WHERE id = ?",
        args: [role, JSON.stringify(permissions), is_primary ? 1 : 0, req.params.id]
      });
      await logAction(req.user.id, "UPDATE_PERMISSIONS", `Updated permissions for admin ID: ${req.params.id}`);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to update permissions" });
    }
  });

  // Visitor Tracking
  app.use((req, res, next) => {
    if (!req.path.startsWith('/api')) {
      db.execute({
        sql: "INSERT INTO visitors (ip, path) VALUES (?, ?)",
        args: [req.ip || "unknown", req.path || "/"]
      }).catch(console.error);
    }
    next();
  });

  // Vite middleware
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

  // Delete Admin
app.delete("/api/admin/:id", authenticateToken, async (req: any, res) => {
  if (!req.user.is_primary) {
    return res.status(403).json({ error: "Only primary admins can remove other admins" });
  }

  try {
    const { id } = req.params;
    
    // Check if target is primary
    const target = await db.execute({
      sql: "SELECT is_primary FROM admins WHERE id = ?",
      args: [id]
    });

    if (target.rows.length > 0 && target.rows[0].is_primary) {
      return res.status(403).json({ error: "Primary admins cannot be removed" });
    }

    await db.execute({
      sql: "DELETE FROM admins WHERE id = ?",
      args: [id]
    });

    // Log the action
    await logAction(req.user.id, "DELETE_ADMIN", `Removed admin with ID: ${id}`);

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete admin" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
