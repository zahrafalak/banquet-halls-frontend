import "./styles/global.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  console.log('Auth0 Domain:', process.env.REACT_APP_AUTH0_DOMAIN);
console.log('Auth0 Client ID:', process.env.REACT_APP_AUTH0_CLIENT_ID);
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      }}
    >
      <BrowserRouter>
        <AuthProvider>
          <MenuProvider>
            <HallsProvider>
              <Header />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/halls" element={<HallsPage />} />
                <Route path="/booking" element={<BookingPage />} />
                <Route path="/*" element={<UnmatchedRoutes />} />
              </Routes>
              <Footer />
            </HallsProvider>
          </MenuProvider>
        </AuthProvider>
      </BrowserRouter>
    </Auth0Provider>
  );
}

export default App;