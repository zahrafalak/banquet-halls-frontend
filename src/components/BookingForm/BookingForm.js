import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useContext, useState } from "react";
import HallsContext from "../../contexts/HallsContext";
import MenuContext from "../../contexts/MenuContext";

const BookingForm = () => {
  const [errors, setErrors] = useState({});
  let currentError = { ...errors };
  const { hallsData } = useContext(HallsContext);
  const { menuPackages } = useContext(MenuContext);

  const validateName = (e) => {
    const { id, value } = e.target;
    const nameRegex = /^[a-zA-Z\s]*$/; // Regex to allow only letters and spaces

    if (value.trim() === "") {
      currentError[id] = "The field cannot be blank";
    } else if (!nameRegex.test(value)) {
      currentError[id] = "Please enter a valid name";
    } else {
      currentError[id] = "";
    }
    setErrors(currentError);
    console.log(errors);
  };

  return (
    <>
      <Form>
        <Form.Label htmlFor="inputFirstName">First Name</Form.Label>
        <Form.Control
          type="text"
          id="inputFirstName"
          onBlur={validateName}
          isInvalid={errors.inputFirstName}
        />
        {errors.inputFirstName && (
          <div className="invalid-feedback">{errors.inputFirstName}</div>
        )}

        <Form.Label htmlFor="inputLastName">Last Name</Form.Label>
        <Form.Control
          type="text"
          id="inputLastName"
          onBlur={validateName}
          isInvalid={errors.inputLastName}
        />
        {errors.inputLastName && (
          <div className="invalid-feedback">{errors.inputLastName}</div>
        )}

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" />
        </Form.Group>

        <Form.Label htmlFor="inputEventDate">Date of Event</Form.Label>
        <Form.Control
          type="text"
          id="inputEventDate"
          placeholder="YYYY-MM-DD"
        />

        <Form.Label>Choice of Hall</Form.Label>
        <Form.Select aria-label="Choice of Hall">
          <option>Choose a hall option</option>
          {hallsData.map((hall) => {
            return (
              <option key={hall.hall_id} value={hall.name}>
                {hall.name} - CA$ {hall.price}
              </option>
            );
          })}
        </Form.Select>

        <Form.Label>Choice of Menu Package</Form.Label>
        <Form.Select aria-label="Choice of Menu Package">
          <option>Choose a menu option</option>

          {menuPackages.map((menu) => {
            return (
              <option key={menu.package_id} value={menu.title}>
                {menu.title} - CA$ {menu.price_per_head} per head
              </option>
            );
          })}
        </Form.Select>

        <Button variant="primary" type="submit">
          Submit Booking Request
        </Button>
      </Form>
    </>
  );
};

export default BookingForm;
