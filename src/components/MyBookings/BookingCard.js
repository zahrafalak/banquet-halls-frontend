import React from "react";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";

const statusVariant = {
  pending: "warning",
  confirmed: "success",
  rejected: "danger",
};

const BookingCard = ({ booking }) => {
  const status = booking.status?.toLowerCase() || "pending";

  return (
    <Card className="booking-card mb-3">
      <Card.Body>
        <div className="booking-card__header">
          <Card.Title>{booking.hall_name}</Card.Title>
          <Badge bg={statusVariant[status] || "secondary"} className="booking-card__badge">
            {booking.status}
          </Badge>
        </div>
        <Card.Text as="div">
          <p className="mb-1">
            <strong>Date:</strong>{" "}
            {new Date(booking.event_date).toLocaleDateString("en-CA", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="mb-1">
            <strong>Menu Package:</strong> {booking.menu_package_title}
          </p>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default BookingCard;
