import axios from "axios";

export async function getBalance(): Promise<number> {
  const response = await axios.get("http://192.168.1.108:8080/balance");
  return response.data.balance;
}