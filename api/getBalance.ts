import axios from "axios";

const BASE_URL = "http://192.168.1.108:8082";

export async function getBalance(jwtToken: string): Promise<number> {
  try {
    const response = await axios.get(`${BASE_URL}/balance`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": `application/json`
      }
    });
    return response.data.balance;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error(
        "Error fetching balance:",
        err.response?.status,
        err.response?.data
      );
    } else {
      console.error("Unknown error fetching balance:", err);
    }
    throw err;
  }
}
