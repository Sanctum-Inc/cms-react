import { jwtDecode } from "jwt-decode";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { isTokenExpired } from "../../Utils/AuthUtils";
import { AuthenticationContext } from "./AuthenticationContext";
import type { JwtPayload } from "./JwtPayload";

export const AuthenticationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<JwtPayload | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const logoutTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearLogoutTimer = useCallback(() => {
    if (logoutTimer.current) {
      clearTimeout(logoutTimer.current);
      logoutTimer.current = null;
    }
  }, []);

  const logout = useCallback(() => {
    clearLogoutTimer();
    localStorage.removeItem("accessToken");
    setToken(null);
    setUser(null);
  }, [clearLogoutTimer]);

  const scheduleAutoLogout = useCallback(
    (decoded: JwtPayload) => {
      clearLogoutTimer();

      if (!decoded.exp) {
        logout();
        return;
      }
      const expiresInMs = decoded.exp * 1000 - Date.now();

      if (expiresInMs <= 0) {
        logout();
        return;
      }

      logoutTimer.current = setTimeout(() => {
        logout();
      }, expiresInMs);
    },
    [clearLogoutTimer, logout],
  );

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
  }, [clearLogoutTimer, scheduleAutoLogout]);

  const login = (jwt: string) => {
    try {
      const decoded = jwtDecode<JwtPayload>(jwt);

      if (!decoded.exp) return;
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

  // Optional safety check every 30s (covers system sleep / tab inactive cases)
  useEffect(() => {
    if (!token) return;

    const interval = setInterval(() => {
      if (isTokenExpired(token)) {
        logout();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [token, logout]);

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

export default AuthenticationProvider;
