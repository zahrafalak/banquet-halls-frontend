import Carousel from "react-bootstrap/Carousel";
import carouselImageOne from "../../assets/images/elegant-wedding-hall.jpg";
import carouselImageTwo from "../../assets/images/place-setting-on-white-table.jpg";
import carouselImageThree from "../../assets/images/wedding-reception-floral-decorations.jpg";
import "./Carousel.scss";

const MainCarousel = () => {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-item__img" // Bootstrap classes to make the image responsive and cover the width
          src={carouselImageOne}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Grand Spaces</h3>
          <p>Where spacious elegance meets modern luxury.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={carouselImageTwo}
          alt="First slide"
        />

        <Carousel.Caption>
          <h3>Refined Details</h3>
          <p>Every detail, meticulously crafted for memorable moments.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={carouselImageThree}
          alt="First slide"
        />

        <Carousel.Caption>
          <h3>Elegant Dining</h3>
          <p>A blend of taste and sophistication in every setting.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default MainCarousel;
