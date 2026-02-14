import { jwtDecode } from "jwt-decode";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

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

const AuthenticationContext = createContext<AuthContextType | undefined>(
  undefined,
);

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.exp * 1000 <= Date.now();
  } catch {
    return true;
  }
};

export const AuthenticationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<JwtPayload | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const logoutTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearLogoutTimer = () => {
    if (logoutTimer.current) {
      clearTimeout(logoutTimer.current);
      logoutTimer.current = null;
    }
  };

  const scheduleAutoLogout = (decoded: JwtPayload) => {
    clearLogoutTimer();

    const expiresInMs = decoded.exp * 1000 - Date.now();

    if (expiresInMs <= 0) {
      logout();
      return;
    }

    logoutTimer.current = setTimeout(() => {
      logout();
    }, expiresInMs);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");

    if (storedToken && !isTokenExpired(storedToken)) {
      const decoded = jwtDecode<JwtPayload>(storedToken);
      setToken(storedToken);
      setUser(decoded);
      scheduleAutoLogout(decoded);
    } else {
      localStorage.removeItem("accessToken");
    }

    setLoading(false);

    return () => {
      clearLogoutTimer();
    };
  }, []);

  const login = (jwt: string) => {
    try {
      const decoded = jwtDecode<JwtPayload>(jwt);

      if (decoded.exp * 1000 <= Date.now()) {
        logout();
        return;
      }

      localStorage.setItem("accessToken", jwt);
      setToken(jwt);
      setUser(decoded);
      scheduleAutoLogout(decoded);
    } catch {
      logout();
    }
  };

  const logout = () => {
    clearLogoutTimer();
    localStorage.removeItem("accessToken");
    setToken(null);
    setUser(null);
  };

  // Optional safety check every 30s (covers system sleep / tab inactive cases)
  useEffect(() => {
    if (!token) return;

    const interval = setInterval(() => {
      if (isTokenExpired(token)) {
        logout();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [token]);

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!token && !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthentication = () => {
  const context = useContext(AuthenticationContext);

  if (!context) {
    throw new Error(
      "useAuthentication must be used within AuthenticationProvider",
    );
  }

  return context;
};

export default AuthenticationProvider;
