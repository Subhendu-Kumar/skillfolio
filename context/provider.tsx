import {
  getUser,
  setUser,
  getToken,
  saveToken,
  clearUserData,
} from "@/lib/utils";
import { AuthContextProps, User } from "@/types";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUserState] = useState<User | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      const token = await getToken();
      const userInfo = await getUser();
      setIsAuthenticated(!!token && !!userInfo);
      setUserState(userInfo);
      setLoading(false);
    };
    initAuth();
  }, []);

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
      value={{ isAuthenticated, user, loading, login, logout }}
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
