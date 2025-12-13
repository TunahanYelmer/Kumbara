import axios from "axios";

const BASE_URL = "http://192.168.1.108:8082";

export async function patchUser(
  givenName: string,
  photoUrl: string,
  jwtToken: string
): Promise<void> {
  try {
    await axios.patch(
      `${BASE_URL}/auth/google`,
      { givenName, photoUrl },
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": `application/json`
        }
      }
    );
  } catch (error) {
    console.error("Error updating the user :", error);
    throw error;
  }
}
