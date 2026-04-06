import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.SMS_API_KEY || "anbu_sms_mgq589nm_9mgblyt069h";

export async function sendSms(recipient: string, message: string): Promise<any> {
  try {
    const response = await axios.post("https://sms.anbuinfosec.dev/api/v1/sms/send", {
      apiKey: API_KEY,
      recipient,
      message,
    });
    return response.data;
  } catch (error) {
    console.error("SMS Send Error:", error);
    throw error;
  }
}
