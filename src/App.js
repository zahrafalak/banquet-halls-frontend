import "./styles/global.scss";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Auth0Provider } from "@auth0/auth0-react";
import HomePage from "./pages/HomePage/HomePage";
import MenuPage from "./pages/MenuPage/MenuPage";
import HallsPage from "./pages/HallsPage/HallsPage";
import BookingPage from "./pages/BookingPage/BookingPage";
import UnmatchedRoutes from "./pages/UnmatchedRoutes/UnmatchedRoutes";
import { HallsProvider } from "./contexts/HallsContext";
import { MenuProvider } from "./contexts/MenuContext";
import { AuthProvider } from "./contexts/AuthContext";
import AuthGuard from "./components/Auth/AuthGuard";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const Auth0ProviderWithNavigate = ({ children }) => {
  const navigate = useNavigate();

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || "/");
  };

  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <AuthProvider>
          <MenuProvider>
            <HallsProvider>
              <Header />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/halls" element={<HallsPage />} />
                <Route
                  path="/booking"
                  element={
                    <AuthGuard>
                      <BookingPage />
                    </AuthGuard>
                  }
                />
                <Route path="/*" element={<UnmatchedRoutes />} />
              </Routes>
              <Footer />
            </HallsProvider>
          </MenuProvider>
        </AuthProvider>
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  );
}

export default App;
