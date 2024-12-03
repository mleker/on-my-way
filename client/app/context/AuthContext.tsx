import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

export interface IAuthState {
  token: string | null;
  authenticated: boolean; // Changed: Default value now `false` instead of nullable.
}

interface IAuthProps {
  authState: IAuthState; // Changed: Removed `?`, ensuring `authState` is always defined.
  onLogin: (email: string, password: string) => Promise<any>;
  onRegister: (
    email: string,
    password: string,
    name: string,
    surname: string,
    vehicleType: string,
    licenceNum: string
  ) => Promise<any>;
  onLogout: () => Promise<any>;
  onProfile: (token: string) => Promise<any>;
}

const TOKEN_KEY = "tester2";
const AuthContext = createContext<IAuthProps>({
  authState: { token: null, authenticated: false }, // Changed: Added default value for context.
  onLogin: async () => {}, // Added: Dummy functions for defaults.
  onRegister: async () => {},
  onLogout: async () => {},
  onProfile: async () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<IAuthState>({
    token: null,
    authenticated: false, // Changed: Default `authenticated` set to `false`.
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (token) {
        setAuthState({ token, authenticated: true });
      }
    };
    loadToken();
  }, []);

  const register = async (
    email: string,
    password: string,
    name: string,
    surname: string,
    vehicleType: string,
    licenseNum: string
  ) => {
    try {
      const res = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/reg`, {
        method: "POST",
        credentials: "include",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name, surname, vehicleType, licenseNum }),
      }).then((res) => res.json());
      if (res.token) {
        const { token } = res;
        setAuthState({ token, authenticated: true }); // No changes here.
        await SecureStore.setItemAsync(TOKEN_KEY, token);
      }
      return res;
    } catch (err) {
      console.error("Registration error:", err); // Added: Error logging.
      return null;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/login`, {
        method: "POST",
        credentials: "include",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
        .then((res) => res.json())
        .catch((err) => console.log(err));

      if (res.token) {
        const { token } = res;
        setAuthState({ token, authenticated: true }); // No changes here.
        await SecureStore.setItemAsync(TOKEN_KEY, token);
      }
      return res;
    } catch (err) {
      console.error("Login error:", err); // Added: Error logging.
      return null;
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    setAuthState({
      token: null,
      authenticated: false, // No changes here.
    });
  };

  const getProfile = async (token: string) => {
    if (!token) {
      console.error("Token is missing for getProfile"); // Added: Error handling for missing token.
      return null;
    }
    try {
      const res = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/profile`, {
        method: "GET",
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return res.json();
    } catch (err) {
      console.error("Error fetching profile:", err); // Added: Error logging for `getProfile`.
      return null;
    }
  };

  const value = {
    authState, // No changes here.
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    onProfile: getProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
