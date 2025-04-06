import { jwtDecode } from "jwt-decode";
import { TOKEN_KEY, USER_KEY } from "@/config";
import * as SecureStore from "expo-secure-store";

// Save JWT Token
export const saveToken = async (token: string): Promise<void> => {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
};

// Get and validate token
export const getToken = async (): Promise<string | null> => {
  const token = await SecureStore.getItemAsync(TOKEN_KEY);
  if (token) {
    try {
      const decoded: any = jwtDecode(token);
      const now = Date.now() / 1000;
      if (decoded.exp && decoded.exp < now) {
        await clearUserData();
        return null;
      }
      return token;
    } catch (error) {
      console.error("Invalid token", error);
      await clearUserData();
      return null;
    }
  }
  return null;
};

// Save user info
export const setUser = async (user: object): Promise<void> => {
  await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
};

// Get user info
export const getUser = async (): Promise<any | null> => {
  const userData = await SecureStore.getItemAsync(USER_KEY);
  return userData ? JSON.parse(userData) : null;
};

// Clear all
export const clearUserData = async (): Promise<void> => {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
  await SecureStore.deleteItemAsync(USER_KEY);
};
