import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useContext, useState, useEffect } from "react";
import HallsContext from "../../contexts/HallsContext";
import MenuContext from "../../contexts/MenuContext";
import { useAuth } from "../../contexts/AuthContext";
import DatePicker from "./DatePicker";
import "./BookingForm.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BookingForm = () => {
  const { user, getToken } = useAuth();
  const { hallsData } = useContext(HallsContext);
  const { menuPackages } = useContext(MenuContext);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [eventDate, setEventDate] = useState(null);
  const [hallId, setHallId] = useState("");
  const [menuId, setMenuId] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.given_name || user.name?.split(" ")[0] || "");
      setLastName(
        user.family_name || user.name?.split(" ").slice(1).join(" ") || ""
      );
      setEmail(user.email || "");
    }
  }, [user]);

  const validate = () => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!eventDate) newErrors.eventDate = "Event date is required";
    if (!hallId) newErrors.hallId = "Please select a hall";
    if (!menuId) newErrors.menuId = "Please select a menu package";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setSubmitting(true);
      const token = await getToken();
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/booking-requests`,
        {
          first_name: firstName,
          last_name: lastName,
          email,
          event_date: eventDate.toISOString().split("T")[0],
          hall_id: parseInt(hallId, 10),
          menu_package_id: parseInt(menuId, 10),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Booking request submitted successfully.");
      navigate("/");
    } catch (error) {
      console.error("Failed to create booking request:", error);
      alert("Failed to submit booking request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <h2 className="section-heading">Submit new booking request</h2>
      <Form className="booking-form" onSubmit={handleSubmit}>
        <Form.Label className="booking-form__label" htmlFor="inputFirstName">
          First Name
        </Form.Label>
        <Form.Control
          className="booking-form__input"
          type="text"
          id="inputFirstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          isInvalid={!!errors.firstName}
          autoFocus
        />
        {errors.firstName && (
          <div className="invalid-feedback d-block">{errors.firstName}</div>
        )}

        <Form.Label className="booking-form__label" htmlFor="inputLastName">
          Last Name
        </Form.Label>
        <Form.Control
          className="booking-form__input"
          type="text"
          id="inputLastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          isInvalid={!!errors.lastName}
        />
        {errors.lastName && (
          <div className="invalid-feedback d-block">{errors.lastName}</div>
        )}

        <Form.Label className="booking-form__label" htmlFor="inputEmail">
          Email address
        </Form.Label>
        <Form.Control
          className="booking-form__input"
          type="email"
          id="inputEmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          isInvalid={!!errors.email}
        />
        {errors.email && (
          <div className="invalid-feedback d-block">{errors.email}</div>
        )}

        <Form.Label className="booking-form__label">Date of Event</Form.Label>
        <DatePicker selected={eventDate} onChange={(date) => setEventDate(date)} />
        {errors.eventDate && (
          <div className="invalid-feedback d-block">{errors.eventDate}</div>
        )}

        <Form.Label className="booking-form__label">Choice of Hall</Form.Label>
        <Form.Select
          className="booking-form__input"
          id="hallSelection"
          value={hallId}
          onChange={(e) => setHallId(e.target.value)}
          isInvalid={!!errors.hallId}
        >
          <option value="" disabled>
            Choose a hall option
          </option>
          {hallsData.map((hall) => (
            <option key={hall.hall_id} value={hall.hall_id}>
              {hall.name} - CA$ {hall.price}
            </option>
          ))}
        </Form.Select>
        {errors.hallId && (
          <div className="invalid-feedback d-block">{errors.hallId}</div>
        )}

        <Form.Label className="booking-form__label">
          Choice of Menu Package
        </Form.Label>
        <Form.Select
          className="booking-form__input"
          id="menuSelection"
          value={menuId}
          onChange={(e) => setMenuId(e.target.value)}
          isInvalid={!!errors.menuId}
        >
          <option value="" disabled>
            Choose a menu option
          </option>
          {menuPackages.map((menu) => (
            <option key={menu.package_id} value={menu.package_id}>
              {menu.title} - CA$ {menu.price_per_head} per head
            </option>
          ))}
        </Form.Select>
        {errors.menuId && (
          <div className="invalid-feedback d-block">{errors.menuId}</div>
        )}

        <p className="booking-form__disclaimer">
          Submitting a request does not guarantee confirmation. You will receive
          an email once your request has been reviewed.
        </p>

        <Button
          className="cta"
          variant="primary"
          type="submit"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit Booking Request"}
        </Button>
      </Form>
    </>
  );
};

export default BookingForm;
