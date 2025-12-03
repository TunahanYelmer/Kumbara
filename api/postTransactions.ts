import axios from "axios";

const BASE_URL = "http://192.168.1.108:8082";

export async function postTransaction(
  type: "deposit" | "withdraw",
  amount: number,
  category?: string,
  jwtToken: string
): Promise<void> {
  try {
    await axios.post(`${BASE_URL}/transactions`, {
      type,
      amount,
      category: category || null,
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    });
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error(
        "Error posting transaction:",
        err.response?.status,
        err.response?.data
      );
    } else {
      console.error("Unknown error posting transaction:", err);
    }
    throw err;
  }
}
