import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import LoginButton from "./LoginButton";

const AuthGuard = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <p>Loading...</p>;

  if (!isAuthenticated) {
    return (
      <div className="text-center mt-5">
        <h4>Please log in to access this page</h4>
        <LoginButton />
      </div>
    );
  }

  return children;
};

export default AuthGuard;