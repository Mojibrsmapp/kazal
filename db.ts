import { createClient } from "@libsql/client";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.TURSO_URL || "libsql://kazal-mojibrsm.aws-ap-northeast-1.turso.io";
const authToken = process.env.TURSO_TOKEN || "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzU1MTIwMTQsImlkIjoiMDE5ZDY0YzMtMTcwMS03ZmNkLWI5MDEtYWIwYThhZTFkOTc0IiwicmlkIjoiM2I1MDQyYTItMDc1Yi00OWRhLWFiYTAtZTM5MTk0NzRkNzNlIn0.QNrXaXCuu0dRtEoYYmt3UU0wjeXcyLZDYsc6CXD1NAdQoSw037CfSxG0eCH7mfqTtZ-gzkGX8zdcBeqrKY98Cg";

export const db = createClient({
  url,
  authToken,
});

export async function initDb() {
  // Admins table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      full_name TEXT NOT NULL,
      avatar TEXT,
      slug TEXT UNIQUE,
      role TEXT DEFAULT 'Editor', -- Super Admin, Editor, Moderator
      permissions TEXT, -- JSON string of permissions
      is_primary INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Development Plans table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS development_plans (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      type TEXT NOT NULL, -- road, school, hospital, etc.
      status TEXT DEFAULT 'Running', -- Running, Completed
      area TEXT,
      image_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Gallery table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS gallery (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      type TEXT NOT NULL, -- photo, video
      url TEXT NOT NULL, -- image url or youtube embed id
      category TEXT, -- Political, Social, Family
      is_featured INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Messages table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT,
      phone TEXT,
      subject TEXT,
      message TEXT NOT NULL,
      type TEXT DEFAULT 'Message', -- Message, Volunteer
      age INTEGER,
      area TEXT,
      designation TEXT,
      status TEXT DEFAULT 'unread', -- unread, read
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Add missing columns if they don't exist
  try {
    await db.execute("ALTER TABLE messages ADD COLUMN type TEXT DEFAULT 'Message'");
  } catch (e) {}
  try {
    await db.execute("ALTER TABLE messages ADD COLUMN age INTEGER");
  } catch (e) {}
  try {
    await db.execute("ALTER TABLE messages ADD COLUMN area TEXT");
  } catch (e) {}
  try {
    await db.execute("ALTER TABLE messages ADD COLUMN designation TEXT");
  } catch (e) {}

  // Visitors table (simple log)
  await db.execute(`
    CREATE TABLE IF NOT EXISTS visitors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ip TEXT,
      path TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Add missing columns if they don't exist
  try {
    await db.execute("ALTER TABLE admins ADD COLUMN role TEXT DEFAULT 'Editor'");
  } catch (e) {}
  try {
    await db.execute("ALTER TABLE admins ADD COLUMN permissions TEXT");
  } catch (e) {}

  // News table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS news (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      content TEXT,
      external_link TEXT,
      image_url TEXT,
      author_id INTEGER,
      category TEXT,
      tags TEXT,
      meta_description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (author_id) REFERENCES admins(id)
    )
  `);

  // Add missing columns if they don't exist (for existing databases)
  try {
    await db.execute("ALTER TABLE admins ADD COLUMN slug TEXT UNIQUE");
  } catch (e) {}
  try {
    await db.execute("ALTER TABLE news ADD COLUMN author_id INTEGER");
  } catch (e) {}
  try {
    await db.execute("ALTER TABLE news ADD COLUMN category TEXT");
  } catch (e) {}
  try {
    await db.execute("ALTER TABLE news ADD COLUMN tags TEXT");
  } catch (e) {}
  try {
    await db.execute("ALTER TABLE news ADD COLUMN meta_description TEXT");
  } catch (e) {}

  // Logs table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      admin_id INTEGER,
      action TEXT NOT NULL,
      details TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (admin_id) REFERENCES admins(id)
    )
  `);

  // OTPs table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS otps (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      phone TEXT NOT NULL,
      code TEXT NOT NULL,
      expires_at DATETIME NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Settings table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )
  `);

  // Notices table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS notices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT,
      type TEXT DEFAULT 'notice', -- notice, alert, popup
      is_active INTEGER DEFAULT 1,
      expires_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Initialize default settings if not exists
  const defaultSettings = [
    { key: 'site_name', value: 'Lutfur Rahman Kajal' },
    { key: 'site_logo', value: '' },
    { key: 'facebook_url', value: 'https://facebook.com' },
    { key: 'youtube_url', value: 'https://youtube.com' },
    { key: 'footer_text', value: '© 2026 Lutfur Rahman Kajal. All rights reserved.' },
    { key: 'navbar_menu', value: JSON.stringify([
      { label: 'Home', path: '/' },
      { label: 'Biography', path: '/biography' },
      { label: 'Vision', path: '/vision' },
      { label: 'Area', path: '/area' },
      { label: 'Gallery', path: '/gallery' },
      { label: 'News', path: '/news' },
      { label: 'Contact', path: '/contact' }
    ])}
  ];

  for (const setting of defaultSettings) {
    const exists = await db.execute({
      sql: "SELECT 1 FROM settings WHERE key = ?",
      args: [setting.key]
    });
    if (exists.rows.length === 0) {
      await db.execute({
        sql: "INSERT INTO settings (key, value) VALUES (?, ?)",
        args: [setting.key, setting.value]
      });
    }
  }

  // Create default primary admin if not exists
  const result = await db.execute("SELECT * FROM admins WHERE is_primary = 1");
  if (result.rows.length === 0) {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await db.execute({
      sql: "INSERT INTO admins (username, password, phone, full_name, is_primary) VALUES (?, ?, ?, ?, ?)",
      args: ["admin", hashedPassword, "01700000000", "Primary Admin", 1],
    });
    console.log("Default primary admin created: admin / admin123");
  }

  // Ensure user's email is an admin
  const userAdmin = await db.execute({
    sql: "SELECT * FROM admins WHERE username = ?",
    args: ["bartanowcom@gmail.com"]
  });
  if (userAdmin.rows.length === 0) {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await db.execute({
      sql: "INSERT INTO admins (username, password, phone, full_name, is_primary) VALUES (?, ?, ?, ?, ?)",
      args: ["bartanowcom@gmail.com", hashedPassword, "01700000000", "Lutfur Rahman Kajal", 1],
    });
  }

  // Add sample news if empty
  const newsCheck = await db.execute("SELECT 1 FROM news LIMIT 1");
  if (newsCheck.rows.length === 0) {
    const adminId = (await db.execute("SELECT id FROM admins WHERE is_primary = 1 LIMIT 1")).rows[0].id;
    await db.execute({
      sql: `INSERT INTO news (title, slug, content, category, author_id, image_url) VALUES 
        (?, ?, ?, ?, ?, ?),
        (?, ?, ?, ?, ?, ?)`,
      args: [
        "লুৎফুর রহমান কাজলের নির্বাচনী প্রচারণা শুরু", 
        "election-campaign-starts", 
        "<p>কক্সবাজার-৩ আসনে বিএনপি মনোনীত প্রার্থী লুৎফুর রহমান কাজলের নির্বাচনী প্রচারণা উৎসবমুখর পরিবেশে শুরু হয়েছে।</p>", 
        "খবর", 
        adminId, 
        "https://image.mojib.me/uploads/General/1775299892_aece70c0-28d9-4dc1-8e43-3fa8491228a3.png",
        "রামুতে বিশাল জনসভা অনুষ্ঠিত",
        "huge-rally-in-ramu",
        "<p>রামুর ঐতিহাসিক খিজারী স্কুল মাঠে লুৎফুর রহমান কাজলের সমর্থনে এক বিশাল জনসভা অনুষ্ঠিত হয়েছে।</p>",
        "খবর",
        adminId,
        "https://image.mojib.me/uploads/General/1775299892_aece70c0-28d9-4dc1-8e43-3fa8491228a3.png"
      ]
    });
  }
}
