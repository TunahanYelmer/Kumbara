import axios from "axios";
import { Transactions } from "../context/state/stateReducer";

const BASE_URL = "http://192.168.1.108:8082";

export async function getTransactions(
  jwtToken: string
): Promise<Transactions[]> {
  try {
    const response = await axios.get(`${BASE_URL}/transactions`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": `application/json`
      }
    });
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error(
        "Error fetching transactions:",
        err.response?.status,
        err.response?.data
      );
    } else {
      console.error("Unknown error fetching transactions:", err);
    }
    throw err;
  }
}
