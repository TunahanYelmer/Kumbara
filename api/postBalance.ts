import axios from "axios";

export async function postBalance(balance: number): Promise<void> {
  await axios.post("http://192.168.1.109:8080/balance", { balance });
}