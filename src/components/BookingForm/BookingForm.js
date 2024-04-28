import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useContext, useState } from "react";
import HallsContext from "../../contexts/HallsContext";
import MenuContext from "../../contexts/MenuContext";
import "./BookingForm.scss";

const BookingForm = () => {
  const [errors, setErrors] = useState({});
  let currentError = { ...errors };
  const { hallsData } = useContext(HallsContext);
  const { menuPackages } = useContext(MenuContext);

  const validateTextInput = (e) => {
    const { id, value } = e.target;
    const nameRegex = /^[a-zA-Z\s]*$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (value.trim() === "") {
      // check for empty field
      currentError[id] = "This field cannot be blank";
    } else if (id === "inputFirstName" || id === "inputLastName") {
      // validate name inputs
      if (!nameRegex.test(value)) {
        currentError[id] = "Please enter a valid name";
      } else {
        currentError[id] = "";
      }
    } else if (id === "exampleForm.ControlInput1") {
      //validate email input
      if (!emailRegex.test(value)) {
        currentError[id] = "Invalid date. Please enter a valid email address";
      } else {
        currentError[id] = "";
      }
    } else if (id === "inputEventDate") {
      //validate event date input
      if (!dateRegex.test(value)) {
        currentError[id] = "Please enter the date in YYYY-MM-DD format";
      } else {
        // validate that event date is in future
        const inputDate = new Date(value);
        const currentDate = new Date();
        if (inputDate <= currentDate) {
          currentError[id] = "Please enter a future date";
        } else {
          currentError[id] = "";
        }
      }
    }

    setErrors(currentError);
  };

  const validateDropdownSelection = (e) => {
    const { id, value } = e.target;

    if (value === "") {
      currentError[id] = "Please make a selection";
    }
    setErrors(currentError); // Update the state
  };

  const handleSubmit = (e) => {
    alert("Form submitted");
  };

  return (
    <>
      <Form className="booking-form" onSubmit={handleSubmit}>
        <Form.Label className="booking-form__label" htmlFor="inputFirstName">
          First Name
        </Form.Label>
        <Form.Control
          className="booking-form__input"
          type="text"
          id="inputFirstName"
          onBlur={validateTextInput}
          isInvalid={errors.inputFirstName}
        />
        {errors.inputFirstName && (
          <div className="invalid-feedback">{errors.inputFirstName}</div>
        )}

        <Form.Label className="booking-form__label" htmlFor="inputLastName">
          Last Name
        </Form.Label>
        <Form.Control
          className="booking-form__input"
          type="text"
          id="inputLastName"
          onBlur={validateTextInput}
          isInvalid={errors.inputLastName}
        />
        {errors.inputLastName && (
          <div className="invalid-feedback">{errors.inputLastName}</div>
        )}

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className="booking-form__label">Email address</Form.Label>
          <Form.Control
            className="booking-form__input"
            type="email"
            placeholder="name@example.com"
            onBlur={validateTextInput}
            isInvalid={errors["exampleForm.ControlInput1"]}
          />
          {errors["exampleForm.ControlInput1"] && (
            <div className="invalid-feedback">
              {errors["exampleForm.ControlInput1"]}
            </div>
          )}
        </Form.Group>

        <Form.Label className="booking-form__label" htmlFor="inputEventDate">
          Date of Event
        </Form.Label>
        <Form.Control
          className="booking-form__input"
          type="text"
          id="inputEventDate"
          placeholder="YYYY-MM-DD"
          onBlur={validateTextInput}
          isInvalid={errors.inputEventDate}
        />
        {errors.inputEventDate && (
          <div className="invalid-feedback">{errors.inputEventDate}</div>
        )}

        <Form.Label className="booking-form__label">Choice of Hall</Form.Label>
        <Form.Select
          className="booking-form__input"
          id="hallSelection"
          aria-label="Choice of Hall"
          defaultValue=""
          onBlur={validateDropdownSelection}
          isInvalid={errors.hallSelection}
        >
          <option value="" disabled>
            Choose a hall option
          </option>
          {hallsData.map((hall) => {
            return (
              <option key={hall.hall_id} value={hall.name}>
                {hall.name} - CA$ {hall.price}
              </option>
            );
          })}
        </Form.Select>
        {errors.hallSelection && (
          <div className="invalid-feedback">{errors.hallSelection}</div>
        )}

        <Form.Label className="booking-form__label">
          Choice of Menu Package
        </Form.Label>
        <Form.Select
          className="booking-form__input"
          id="menuSelection"
          aria-label="Choice of Menu Package"
          defaultValue=""
          onBlur={validateDropdownSelection}
          isInvalid={errors.menuSelection}
        >
          <option value="" disabled>
            Choose a menu option
          </option>

          {menuPackages.map((menu) => {
            return (
              <option key={menu.package_id} value={menu.title}>
                {menu.title} - CA$ {menu.price_per_head} per head
              </option>
            );
          })}
        </Form.Select>
        {errors.menuSelection && (
          <div className="invalid-feedback">{errors.menuSelection}</div>
        )}

        <Button className="cta" variant="primary" type="submit">
          Submit Booking Request
        </Button>
      </Form>
    </>
  );
};

export default BookingForm;
