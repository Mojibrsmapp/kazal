import axios from "axios";

async function test() {
  try {
    const response = await axios.get("https://kazalbnp.com/api/voter-search");
    console.log("External API response:", response.status);
  } catch (error: any) {
    console.error("External API failed:", error.message);
  }
}

test();
