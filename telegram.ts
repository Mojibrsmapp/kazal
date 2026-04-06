import axios from "axios";
import FormData from "form-data";
import dotenv from "dotenv";

dotenv.config();

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "8779299980:AAEJKCammAmra1uodwOTtW58N-LSj_dr5D0";
const CHANNEL_ID = process.env.TELEGRAM_CHANNEL_ID || "-1003609741765";

export async function uploadToTelegram(fileBuffer: Buffer, fileName: string): Promise<string> {
  const formData = new FormData();
  formData.append("chat_id", CHANNEL_ID);
  formData.append("photo", fileBuffer, { filename: fileName });

  try {
    const response = await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, formData, {
      headers: formData.getHeaders(),
    });

    if (response.data.ok) {
      const photo = response.data.result.photo;
      // Get the largest photo size
      const fileId = photo[photo.length - 1].file_id;
      
      // Get file path
      const fileResponse = await axios.get(`https://api.telegram.org/bot${BOT_TOKEN}/getFile?file_id=${fileId}`);
      if (fileResponse.data.ok) {
        const filePath = fileResponse.data.result.file_path;
        return `https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`;
      }
    }
    throw new Error("Failed to upload to Telegram");
  } catch (error) {
    console.error("Telegram Upload Error:", error);
    throw error;
  }
}
