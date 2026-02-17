import { createContext } from "react";
import type { JwtPayload } from "./JwtPayload";

type AuthContextType = {
  user: JwtPayload | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};

export const AuthenticationContext = createContext<AuthContextType | undefined>(
  undefined,
);
