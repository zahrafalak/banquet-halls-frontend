import React from "react";
import { useBookings } from "../../contexts/BookingsContext";
import BookingCard from "./BookingCard";
import "./MyBookings.scss";

const MyBookings = () => {
  const { bookings, loading, error } = useBookings();

  if (loading) return <p className="my-bookings__message">Loading your bookings...</p>;
  if (error) return <p className="my-bookings__message my-bookings__message--error">{error}</p>;

  return (
    <>
      <h2 className="section-heading">My Bookings</h2>
      <div className="my-bookings">
        {bookings.length === 0 ? (
          <p className="my-bookings__message">You have no bookings yet.</p>
        ) : (
          bookings.map((booking) => (
            <BookingCard key={booking.booking_id} booking={booking} />
          ))
        )}
      </div>
    </>
  );
};

export default MyBookings;
