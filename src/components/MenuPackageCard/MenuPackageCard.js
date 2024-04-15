import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import "./MenuPackageCard.scss";

function MenuPackageCard({ packageData }) {
  return (
    <Card className="card">
      <Card.Img
        className="card__image"
        variant="top"
        src={packageData.image_url}
      />
      <Card.Body>
        <Card.Title>{packageData.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          CA${packageData.price_per_head} per head
        </Card.Subtitle>
        <Card.Text>{packageData.description}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
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
  );
}

export default MenuPackageCard;
