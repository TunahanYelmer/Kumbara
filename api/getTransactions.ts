import axios from "axios";
import { Transactions } from "../context/reducer";

export async function getTransactions(): Promise<Transactions[]> {
  const response = await axios.get("http://192.168.1.108:8080/transactions");
  return response.data;
}