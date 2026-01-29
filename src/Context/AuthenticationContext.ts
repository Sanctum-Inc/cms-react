import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname": string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
  "custom:user_id": string;
  "custom:firm_id": string;
  exp: number;
};


type AuthContextType = {
  user: JwtPayload | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};

// Create React context with default undefined (to force use inside provider)
const AuthenticationContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthenticationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<JwtPayload | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      setToken(storedToken);
      // Optionally decode token and set user here
      setUser(jwtDecode<JwtPayload>(storedToken));
    }

    setLoading(false);
  }, []);

  const login = (jwt: string) => {
    localStorage.setItem("accessToken", jwt);
    setToken(jwt);
    // Optionally decode token and set user
    setUser(jwtDecode<JwtPayload>(jwt));
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setToken(null);
    setUser(null);
  };

  return React.createElement(
    AuthenticationContext.Provider,
    {
      value: {
        user,
        token,
        isAuthenticated: !!token || !!localStorage.getItem("accessToken"),
        loading,
        login,
        logout,
      },
    },
    children,
  );
};

// Custom hook to consume context
export const useAuthentication = () => {
  const context = useContext(AuthenticationContext);
  if (!context) {
    throw new Error(
      "useAuthentication must be used within AuthenticationProvider",
    );
  }
  return context;
};
