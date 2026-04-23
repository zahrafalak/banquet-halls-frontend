import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const BookingsContext = createContext();

export const BookingsProvider = ({ children }) => {
  const { isAuthenticated, getToken } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchBookings = async () => {
      try {
        setLoading(true);
        const token = await getToken();
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/my-bookings`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setBookings(data);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
        setError("Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [isAuthenticated, getToken]);

  return (
    <BookingsContext.Provider value={{ bookings, loading, error }}>
      {children}
    </BookingsContext.Provider>
  );
};

export const useBookings = () => useContext(BookingsContext);

export default BookingsContext;
