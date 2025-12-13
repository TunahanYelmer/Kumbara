import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

const JWT_TOKEN_KEY = "jwt_token";

interface User {
  email: string | null;
  name: string | null;
  givenName: string | null;
  photo: string | null;
  id: string | null;
}
/**
 * Store JWT token in AsyncStorage
 */
export async function storeToken(token: string): Promise<void> {
  try {
    await AsyncStorage.setItem(JWT_TOKEN_KEY, token);
  } catch (error) {
    console.error("Error storing token:", error);
    throw error;
  }
}
/**
 * Store Google Authanticated User in AsyncStorage
 * @param email User email
 * @param name User name
 * @param givenName first name of the user
 * @param photo users google profile picture
 * @param id user id
 */
export async function storeUser(
  email?: string | null,
  name?: string | null,
  givenName?: string | null,
  photo?: string | null,
  id?: string | null
): Promise<void> {
  try {
    if (email) await AsyncStorage.setItem("Email", email);
    if (name) await AsyncStorage.setItem("Name", name);
    if (givenName) await AsyncStorage.setItem("GivenName", givenName);
    if (photo) await AsyncStorage.setItem("Photo", photo);
    if (id) await AsyncStorage.setItem("ID", id);
  } catch (error) {
    console.error("Error storing user:", error);
    throw error;
  }
}
export async function getUser(): Promise<User | null> {
  try {
    const id = await AsyncStorage.getItem("ID");
    if (!id) {
      return null;
    }
    const email = await AsyncStorage.getItem("Email");
    const name = await AsyncStorage.getItem("Name");
    const givenName = await AsyncStorage.getItem("GivenName");
    const photo = await AsyncStorage.getItem("Photo");

    return { email, name, givenName, photo, id };
  } catch (error) {
    console.error("Error retrieving user:", error);
    throw error;
  }
}

/**
 * Retrieve JWT token from AsyncStorage
 */
export async function getToken(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(JWT_TOKEN_KEY);
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
}

/**
 * Remove JWT token from AsyncStorage (logout)
 */
export async function clearToken(): Promise<void> {
  try {
    await AsyncStorage.removeItem(JWT_TOKEN_KEY);
  } catch (error) {
    console.error("Error clearing token:", error);
    throw error;
  }
}

/**
 * Get Token
 * Check if user is authenticated (has valid token)
 * Check if token is expired
 * Multiply the token exp by 1000 to match units (seconds to miliseconds)
 */
export async function isAuthenticated(): Promise<boolean> {
  const token = await getToken();
  if (token) {
    const decodedToken = jwtDecode(token);
    const time = Date.now();
    if (decodedToken.exp && decodedToken.exp * 1000 >= time) {
      return true;
    } else {
      await clearToken();
    }
  }

  return false;
}
