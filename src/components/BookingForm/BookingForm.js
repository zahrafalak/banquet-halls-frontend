import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const BookingForm = ({ hallsData }) => {
  console.log("Halls Data in BookingForm:", hallsData);
  return (
    <>
      <Form>
        <Form.Label htmlFor="inputFirstName">First Name</Form.Label>
        <Form.Control type="text" id="inputFirstName" />

        <Form.Label htmlFor="inputLastName">Last Name</Form.Label>
        <Form.Control type="text" id="inputLastName" />

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
          {/* {hallsData.map((hall) => {
            return (
              <option key={hall.hall_id} value={hall.name}>
                {hall.name}
              </option>
            );
          })} */}
        </Form.Select>

        <Form.Label>Choice of Menu Package</Form.Label>
        <Form.Select aria-label="Choice of Menu Package">
          <option>Choose a menu option</option>
          <option value="Classic Elegance">Classic Elegance</option>
          <option value="Modern Fusion">Modern Fusion</option>
          <option value="Vegetarian Delight">Vegetarian Delight</option>
        </Form.Select>

        <Button variant="primary" type="submit">
          Submit Booking Request
        </Button>
      </Form>
    </>
  );
};

export default BookingForm;
