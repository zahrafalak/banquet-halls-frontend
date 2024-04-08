import "./styles/global.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import MenuPage from "./pages/MenuPage/MenuPage";
import BookingPage from "./pages/BookingPage/BookingPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Route for homepage */}
          <Route path="/" element={<HomePage />} />
          {/* Route for menu page */}
          <Route path="/" element={<MenuPage />} />
          {/* Route for booking page */}
          <Route path="/" element={<BookingPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
