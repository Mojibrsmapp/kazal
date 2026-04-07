import { createClient } from "@libsql/client";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.TURSO_URL || "libsql://kazal-mojibrsm.aws-ap-northeast-1.turso.io";
const authToken = process.env.TURSO_TOKEN || "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzU1MTIwMTQsImlkIjoiMDE5ZDY0YzMtMTcwMS03ZmNkLWI5MDEtYWIwYThhZTFkOTc0IiwicmlkIjoiM2I1MDQyYTItMDc1Yi00OWRhLWFiYTAtZTM5MTk0NzRkNzNlIn0.QNrXaXCuu0dRtEoYYmt3UU0wjeXcyLZDYsc6CXD1NAdQoSw037CfSxG0eCH7mfqTtZ-gzkGX8zdcBeqrKY98Cg";

const db = createClient({
  url,
  authToken,
});

async function test() {
  try {
    const result = await db.execute("PRAGMA table_info(news)");
    console.log("Table info for news:", result.rows);
    
    const galleryInfo = await db.execute("PRAGMA table_info(gallery)");
    console.log("Table info for gallery:", galleryInfo.rows);
  } catch (error) {
    console.error("Failed to get table info:", error);
  }
}

test();
