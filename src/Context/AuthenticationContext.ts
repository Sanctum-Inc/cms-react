import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type User = {
  id: string;
  email: string;
  role?: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};

// Create React context with default undefined (to force use inside provider)
const AuthenticationContext = createContext<AuthContextType | undefined>(undefined);

export const AuthenticationProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");
    if (storedToken) {
      setToken(storedToken);
      // Optionally decode token and set user here
      // setUser(decodeToken(storedToken));
    }
  }, []);

  const login = (jwt: string) => {
    localStorage.setItem("auth_token", jwt);
    setToken(jwt);
    // Optionally decode token and set user
    // setUser(decodeToken(jwt));
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setToken(null);
    setUser(null);
  };

  return React.createElement(
    AuthenticationContext.Provider,
    {
      value: {
        user,
        token,
        isAuthenticated: !!token,
        login,
        logout,
      }
    },
    children
  );
};

// Custom hook to consume context
export const useAuthentication = () => {
  const context = useContext(AuthenticationContext);
  if (!context) {
    throw new Error("useAuthentication must be used within AuthenticationProvider");
  }
  return context;
};
