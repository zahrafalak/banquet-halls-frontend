import React from "react";
import { useAuth } from "../../contexts/AuthContext";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth();

  return (
    <button
      className="auth-btn"
      onClick={() => loginWithRedirect()}
    >
      Log In
    </button>
  );
};

export default LoginButton;