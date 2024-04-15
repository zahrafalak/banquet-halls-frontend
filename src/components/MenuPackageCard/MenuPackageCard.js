import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import "./MenuPackageCard.scss";

function MenuPackageCard({ packageData }) {
  return (
    <div className="menu">
      <Card className="menu-card">
        <Card.Img
          className="menu-card__image"
          variant="top"
          src={packageData.image_url}
        />
        <Card.Body>
          <Card.Title>{packageData.title}</Card.Title>
          <Card.Text>{packageData.description}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>
            Price Per Head: CA$ {packageData.price_per_head}
          </ListGroup.Item>
          <ListGroup.Item>
            Appetizers: {packageData.contents.appetizers.join(", ")}
          </ListGroup.Item>
          <ListGroup.Item>
            Mains: {packageData.contents.mains.join(", ")}
          </ListGroup.Item>
          <ListGroup.Item>
            Desserts: {packageData.contents.desserts.join(", ")}
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
}

export default MenuPackageCard;
