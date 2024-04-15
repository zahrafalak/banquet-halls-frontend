import Card from "react-bootstrap/Card";

function HallsCard() {
  return (
    <Card className="card">
      <Card.Img
        className="card__image"
        variant="top"
        src="holder.js/100px180"
      />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default HallsCard;
