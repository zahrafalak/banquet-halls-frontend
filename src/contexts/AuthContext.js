import React, { createContext, useCallback, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
  const {
  user,
  isAuthenticated,
  isLoading,
  loginWithRedirect,
  logout,
  getAccessTokenSilently,
} = useAuth0();

  const isAdmin = user?.["https://banquet-halls-api/roles"]?.includes("admin");

  // Stable between renders, so effects that depend on it don't refetch on every Auth0 update
  const getToken = useCallback(
    () =>
      getAccessTokenSilently({
        authorizationParams: {
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        },
      }),
    [getAccessTokenSilently]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        isAdmin,
        loginWithRedirect,
        logout,
        getToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;