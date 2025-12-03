import AsyncStorage from '@react-native-async-storage/async-storage';

const JWT_TOKEN_KEY = 'jwt_token';

/**
 * Store JWT token in AsyncStorage
 */
export async function storeToken(token: string): Promise<void> {
  try {
    await AsyncStorage.setItem(JWT_TOKEN_KEY, token);
  } catch (error) {
    console.error('Error storing token:', error);
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
    console.error('Error retrieving token:', error);
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
    console.error('Error clearing token:', error);
    throw error;
  }
}

/**
 * Check if user is authenticated (has valid token)
 */
export async function isAuthenticated(): Promise<boolean> {
  const token = await getToken();
  return token !== null;
}
