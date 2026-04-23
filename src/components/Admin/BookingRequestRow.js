import React, { useState } from "react";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

const statusVariant = {
  pending: "warning",
  confirmed: "success",
  rejected: "danger",
};

const BookingRequestRow = ({ booking, onStatusChange }) => {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const status = booking.status?.toLowerCase() || "pending";

  const updateStatus = async (newStatus) => {
    try {
      setLoading(true);
      const token = await getToken();
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/bookings/${booking.id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Update parent state directly instead of refetching the full list
      onStatusChange(booking.id, newStatus);
    } catch (err) {
      console.error("Failed to update booking status:", err);
      alert("Failed to update status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr>
      <td>{booking.first_name} {booking.last_name}</td>
      <td>{booking.email}</td>
      <td>{booking.hall_name}</td>
      <td>
        {new Date(booking.event_date).toLocaleDateString("en-CA", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </td>
      <td>{booking.menu_package_title}</td>
      <td>
        <Badge bg={statusVariant[status] || "secondary"}>
          {booking.status}
        </Badge>
      </td>
      <td>
        {/* Disable buttons if already in that status to prevent duplicate PATCH requests */}
        <Button
          size="sm"
          variant="success"
          className="me-2"
          disabled={loading || status === "confirmed"}
          onClick={() => updateStatus("confirmed")}
        >
          Confirm
        </Button>
        <Button
          size="sm"
          variant="danger"
          disabled={loading || status === "rejected"}
          onClick={() => updateStatus("rejected")}
        >
          Reject
        </Button>
      </td>
    </tr>
  );
};

export default BookingRequestRow;
