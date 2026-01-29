import React, { type JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuthentication } from "../Context/AuthenticationContext";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuthentication();

  if (loading) return null; // or spinner

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
