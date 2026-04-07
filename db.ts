import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "kazal_portfolio",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const db = {
  async execute(params: string | { sql: string; args?: any[] }) {
    const sql = typeof params === "string" ? params : params.sql;
    const args = typeof params === "string" ? [] : params.args || [];
    
    // Convert ? to MySQL style if needed (mysql2 uses ? already)
    const [rows] = await pool.execute(sql, args);
    return { rows: rows as any[] };
  }
};

export async function initDb() {
  // Admins table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS admins (
      id INT PRIMARY KEY AUTO_INCREMENT,
      username VARCHAR(255) UNIQUE NOT NULL,
      password TEXT NOT NULL,
      phone VARCHAR(20) NOT NULL,
      email VARCHAR(255),
      full_name VARCHAR(255) NOT NULL,
      avatar TEXT,
      slug VARCHAR(255) UNIQUE,
      role VARCHAR(50) DEFAULT 'Editor',
      permissions TEXT,
      is_primary TINYINT DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Development Plans table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS development_plans (
      id INT PRIMARY KEY AUTO_INCREMENT,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      type VARCHAR(50) NOT NULL,
      status VARCHAR(50) DEFAULT 'Running',
      area VARCHAR(255),
      image_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  // Gallery table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS gallery (
      id INT PRIMARY KEY AUTO_INCREMENT,
      title VARCHAR(255),
      type VARCHAR(50) NOT NULL,
      url TEXT NOT NULL,
      category VARCHAR(100),
      is_featured TINYINT DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Messages table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS messages (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255),
      phone VARCHAR(20),
      subject VARCHAR(255),
      message TEXT NOT NULL,
      type VARCHAR(50) DEFAULT 'Message',
      age INT,
      area VARCHAR(255),
      designation VARCHAR(255),
      status VARCHAR(50) DEFAULT 'unread',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Visitors table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS visitors (
      id INT PRIMARY KEY AUTO_INCREMENT,
      ip VARCHAR(45),
      path VARCHAR(255),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // News table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS news (
      id INT PRIMARY KEY AUTO_INCREMENT,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) UNIQUE NOT NULL,
      content TEXT,
      external_link TEXT,
      image_url TEXT,
      author_id INT,
      category VARCHAR(100),
      tags TEXT,
      meta_description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (author_id) REFERENCES admins(id)
    )
  `);

  // Logs table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS logs (
      id INT PRIMARY KEY AUTO_INCREMENT,
      admin_id INT,
      action VARCHAR(100) NOT NULL,
      details TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (admin_id) REFERENCES admins(id)
    )
  `);

  // OTPs table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS otps (
      id INT PRIMARY KEY AUTO_INCREMENT,
      phone VARCHAR(20) NOT NULL,
      code VARCHAR(10) NOT NULL,
      expires_at DATETIME NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Settings table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS settings (
      \`key\` VARCHAR(100) PRIMARY KEY,
      value TEXT NOT NULL
    )
  `);

  // Notices table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS notices (
      id INT PRIMARY KEY AUTO_INCREMENT,
      title VARCHAR(255) NOT NULL,
      content TEXT,
      type VARCHAR(50) DEFAULT 'notice',
      is_active TINYINT DEFAULT 1,
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
      sql: "SELECT 1 FROM settings WHERE `key` = ?",
      args: [setting.key]
    });
    if (exists.rows.length === 0) {
      await db.execute({
        sql: "INSERT INTO settings (`key`, value) VALUES (?, ?)",
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
    const adminIdResult = await db.execute("SELECT id FROM admins WHERE is_primary = 1 LIMIT 1");
    if (adminIdResult.rows.length > 0) {
      const adminId = adminIdResult.rows[0].id;
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
}
