import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import BookingRequestRow from "./BookingRequestRow";
import "./AdminDashboard.scss";

const AdminDashboard = () => {
  const { getToken } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = await getToken();
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/admin/bookings`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setBookings(data);
      } catch (err) {
        console.error("Failed to fetch admin bookings:", err);
        setError("Failed to load booking requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [getToken]);

  const handleStatusChange = (id, newStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.booking_id === id ? { ...b, status: newStatus } : b))
    );
  };

  if (loading) return <p className="admin-dashboard__message">Loading booking requests...</p>;
  if (error) return <p className="admin-dashboard__message admin-dashboard__message--error">{error}</p>;

  return (
    <>
      <h2 className="section-heading">Admin Dashboard</h2>
      <div className="admin-dashboard">
        {bookings.length === 0 ? (
          <p className="admin-dashboard__message">No booking requests yet.</p>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Client</th>
                <th>Email</th>
                <th>Hall</th>
                <th>Date</th>
                <th>Menu Package</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <BookingRequestRow
                  key={booking.booking_id}
                  booking={booking}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
