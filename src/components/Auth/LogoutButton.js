import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "react-bootstrap";

const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <Button
      variant="outline-light"
      onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;