import React from "react";
import { useAuth } from "../../contexts/AuthContext";

const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <button
      className="auth-btn"
      onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
    >
      Log Out
    </button>
  );
};

export default LogoutButton;