import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import axios from 'axios';

interface IAuthProps {
  authState?: {
    token: string | null;
    authenticated: boolean | null;
  };
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = "my-jwt";
export const BASE_URL = "http://localhost:3000/api/users/";
const AuthContext = createContext<IAuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  const register = async (email: string, password: string, name: string, surname: string, gender: string, ) => {
    try {
      return await axios.post(`${BASE_URL}reg`, { email, password, name, surname, gender })
    } catch (err) {
      return err;
    }
  }

  const login = async (email: string, password: string ) => {
    try {
      return await axios.post(`${BASE_URL}reg`, { email, password })
    } catch (err) {
      return err;
    }
  }

  const value = {};
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
