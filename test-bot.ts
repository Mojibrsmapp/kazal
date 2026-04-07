import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "8779299980:AAEJKCammAmra1uodwOTtW58N-LSj_dr5D0";

async function test() {
  try {
    const response = await axios.get(`https://api.telegram.org/bot${BOT_TOKEN}/getMe`);
    console.log("Bot info:", response.data);
  } catch (error: any) {
    console.error("Bot check failed:", error.message);
  }
}

test();
