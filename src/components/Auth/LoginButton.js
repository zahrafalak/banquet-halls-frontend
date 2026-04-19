import React from "react";
import { useAuth } from "../../contexts/AuthContext";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth();

  const handleLogin = () => {
    console.log('Login button clicked');
    console.log('loginWithRedirect:', loginWithRedirect);
    loginWithRedirect();
  };

  return (
    <button className="auth-btn" onClick={handleLogin}>
      Log In
    </button>
  );
};

export default LoginButton;