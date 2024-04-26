import Card from "react-bootstrap/Card";

function HallsCard({ hallDetails }) {
  return (
    <Card className="card">
      <Card.Img
        className="card__image"
        variant="top"
        src={hallDetails.hallImage_url}
      />
      <Card.Body>
        <Card.Title>{hallDetails.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Maximum capacity: {hallDetails.capacity}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          CA$ {hallDetails.price}
        </Card.Subtitle>
        <Card.Text>{hallDetails.description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default HallsCard;
