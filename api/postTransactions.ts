import axios from "axios";

export async function postTransaction(
  type: "deposit" | "withdraw",
  amount: number,
  category?: string
): Promise<void> {
  await axios.post("http://192.168.1.108:8080/transactions", {
    type,
    amount,
    category: category || null,
  });
}