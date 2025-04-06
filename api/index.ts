import axios from "axios";
import { BASE_URL } from "@/config";
import { clearUserData, getToken } from "@/lib/utils";
import { router } from "expo-router";

const API = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Async request interceptor for SecureStore
API.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Optional: response interceptor to catch token-related errors
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Auto-logout logic
      await clearUserData(); // remove token/user
      router.replace("/signin"); // or navigation.navigate("Login")
    }
    return Promise.reject(error);
  }
);

export default API;
