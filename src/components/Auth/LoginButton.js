import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "react-bootstrap";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth();

  return (
    <Button
      variant="outline-light"
      onClick={() => loginWithRedirect()}
    >
      Log In
    </Button>
  );
};

export default LoginButton;