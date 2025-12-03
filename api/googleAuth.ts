import axios from "axios";

const BASE_URL = "http://192.168.1.108:8082";

/**
 * Authenticates with backend using Google ID token
 * @param googleIdToken - The ID token received from Google Sign-In
 * @returns JWT token from your backend
 */
export async function authenticateWithGoogle(
  googleIdToken: string
): Promise<string> {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/google`,
      {
        id_token: googleIdToken
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    // Backend returns: { "token": "your_jwt_token" }
    return response.data.token;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error(
        "Error authenticating with Google:",
        err.response?.status,
        err.response?.data
      );
    } else {
      console.error("Unknown error during Google authentication:", err);
    }
    throw err;
  }
}
