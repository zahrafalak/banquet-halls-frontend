import React from "react";
import { BookingsProvider } from "../../contexts/BookingsContext";
import MyBookings from "../../components/MyBookings/MyBookings";

const MyBookingsPage = () => {
  return (
    <BookingsProvider>
      <MyBookings />
    </BookingsProvider>
  );
};

export default MyBookingsPage;
