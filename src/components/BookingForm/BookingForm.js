import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useContext, useState, useRef } from "react";
import HallsContext from "../../contexts/HallsContext";
import MenuContext from "../../contexts/MenuContext";
import "./BookingForm.scss";
import {
  validateTextInput,
  validateDropdownSelection,
  validateAllFormFields,
} from "../../utils/formValidations";

const BookingForm = () => {
  const [errors, setErrors] = useState({});
  const { hallsData } = useContext(HallsContext);
  const { menuPackages } = useContext(MenuContext);
  const formRef = useRef(null);

  // calling validation functions in formValidations.js
  const handleValidation = (e, validationFunction) => {
    validationFunction(e, errors, setErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Use the validateFormFields function from validations.js
    const { formIsValid, errors: newErrors } = validateAllFormFields(formRef);

    if (!formIsValid) {
      setErrors(newErrors);
      alert("Please fill out all required fields.");
      return;
    }

    console.log("Form submitted successfully!");
  };

  return (
    <>
      <h2 className="section-heading">Submit new booking request</h2>
      <Form ref={formRef} className="booking-form" onSubmit={handleSubmit}>
        <Form.Label className="booking-form__label" htmlFor="inputFirstName">
          First Name
        </Form.Label>
        <Form.Control
          className="booking-form__input"
          type="text"
          id="inputFirstName"
          onBlur={(e) => handleValidation(e, validateTextInput)}
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
          onBlur={(e) => handleValidation(e, validateTextInput)}
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
            onBlur={(e) => handleValidation(e, validateTextInput)}
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
          onBlur={(e) => handleValidation(e, validateTextInput)}
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
          onBlur={(e) => handleValidation(e, validateDropdownSelection)}
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
          onBlur={(e) => handleValidation(e, validateDropdownSelection)}
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
