import API from "@/api";
import {
  getUser,
  setUser,
  getToken,
  saveToken,
  clearUserData,
} from "@/lib/utils";
import { AuthContextProps, User, UserProfile } from "@/types";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUserState] = useState<User | null>(null);
  const [profile, setprofile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      const token = await getToken();
      const userInfo = await getUser();
      setIsAuthenticated(!!token && !!userInfo);
      setUserState(userInfo);
      setLoading(false);
    };
    initAuth();
    getProfileData();
  }, []);

  const getProfileData = async () => {
    const token = await getToken();
    if (token) {
      setLoading(true);
      try {
        const res = await API.get("/profile/detail/");
        setprofile(res.data);
      } catch (error: any) {
        console.error("Error fetching profile data:", error?.message);
        Alert.alert(
          "Error",
          "Failed to fetch profile data. check network connection"
        );
      } finally {
        setLoading(false);
      }
    }
  };

  const login = async (token: string, userData: User) => {
    await saveToken(token);
    await setUser(userData);
    setIsAuthenticated(true);
    setUserState(userData);
  };

  const logout = async () => {
    await clearUserData();
    setIsAuthenticated(false);
    setUserState(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        login,
        logout,
        profile,
        getProfileData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
