import axios from "axios";

const BASE_URL = "http://192.168.1.108:8082";

export async function postBalance(balance: number): Promise<void> {
  try {
    await axios.post(`${BASE_URL}/balance`, { balance });
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error("Error posting balance:", err.response?.status, err.response?.data);
    } else {
      console.error("Unknown error posting balance:", err);
    }
    throw err;
  }
}