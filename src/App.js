import "./styles/global.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/HomePage/HomePage";
import MenuPage from "./pages/MenuPage/MenuPage";
import HallsPage from "./pages/HallsPage/HallsPage";
import BookingPage from "./pages/BookingPage/BookingPage";
import UnmatchedRoutes from "./pages/UnmatchedRoutes/UnmatchedRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Route for homepage */}
          <Route path="/" element={<HomePage />} />
          {/* Route for menu page */}
          <Route path="/menu" element={<MenuPage />} />
          {/* Route for halls page */}
          <Route path="/halls" element={<HallsPage />} />
          {/* Route for booking page */}
          <Route path="/booking" element={<BookingPage />} />
          {/* Route for unmatched path */}
          <Route path="/*" element={<UnmatchedRoutes />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
