import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

function MenuPackageCard({ packageData }) {
  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
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
    </>
  );
}

export default MenuPackageCard;
