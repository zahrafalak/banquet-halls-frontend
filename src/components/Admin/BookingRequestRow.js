import React, { useState, useContext } from "react";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import HallsContext from "../../contexts/HallsContext";
import MenuContext from "../../contexts/MenuContext";

const statusVariant = {
  pending: "warning",
  confirmed: "success",
  cancelled: "danger",
  completed: "secondary",
};

const BookingRequestRow = ({ booking, onStatusChange }) => {
  const { getToken } = useAuth();
  const { hallsData } = useContext(HallsContext);
  const { menuPackages } = useContext(MenuContext);
  const [loading, setLoading] = useState(false);
  const status = booking.status?.toLowerCase() || "pending";

  const hallName = hallsData.find((h) => h.hall_id === booking.hall_id)?.name || "—";
  const menuTitle = menuPackages.find((m) => m.package_id === booking.menu_package_id)?.title || "—";

  const updateStatus = async (newStatus) => {
    try {
      setLoading(true);
      const token = await getToken();
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/v1/admin/bookings/${booking.booking_id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Update parent state directly instead of refetching the full list
      onStatusChange(booking.booking_id, newStatus);
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
      <td>{hallName}</td>
      <td>
        {new Date(booking.event_date).toLocaleDateString("en-CA", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </td>
      <td>{menuTitle}</td>
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
          disabled={loading || status === "confirmed" || status === "cancelled"}
          onClick={() => updateStatus("Confirmed")}
        >
          Confirm
        </Button>
        <Button
          size="sm"
          variant="danger"
          disabled={loading || status === "cancelled"}
          onClick={() => updateStatus("Cancelled")}
        >
          Cancel
        </Button>
      </td>
    </tr>
  );
};

export default BookingRequestRow;
