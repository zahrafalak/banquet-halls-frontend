import cutleryIcon from "../../assets/icons/cutlery.svg";
import venueIcon from "../../assets/icons/venue.svg";
import calendarIcon from "../../assets/icons/calendar.svg";
import Button from "react-bootstrap/Button";
import "./Features.scss";

const Features = () => {
  return (
    <>
      <h2 className="section-heading">Features</h2>
      <div className="features">
        <div className="features__details">
          <img className="icon" src={cutleryIcon} alt="cutlery icon" />
          <h4>Premium Catering</h4>
          <p>Exquisite flavors crafted to perfection.</p>
          <Button className="cta" variant="primary">
            Explore Menu
          </Button>{" "}
        </div>
        <div className="features__details--middle">
          <img className="icon" src={venueIcon} alt="venue icon" />
          <h4>Versatile Venues</h4>
          <p>Ideal settings for any event size.</p>
          <Button className="cta" variant="primary">
            View Halls
          </Button>{" "}
        </div>
        <div className="features__details">
          <img className="icon" src={calendarIcon} alt="calendar icon" />
          <h4>Effortless Booking</h4>
          <p>Simple, quick, secure reservations.</p>
          <Button className="cta" variant="primary">
            Book Now
          </Button>{" "}
        </div>
      </div>
    </>
  );
};

export default Features;
