import { Card, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function OrchidCard({ orchid }) {
  return (
    <Card className="h-100 shadow-sm border-0 bg-dark text-white hover-lift">
      <div className="position-relative overflow-hidden">
        <Card.Img
          variant="top"
          src={orchid.image}
          alt={orchid.orchidName}
          style={{ height: "200px", objectFit: "cover" }}
        />
        {orchid.isSpecial && (
          <Badge bg="warning" text="dark" className="position-absolute top-0 end-0 m-2">
            ★ Special
          </Badge>
        )}
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title className="fw-bold text-warning mb-1">{orchid.orchidName}</Card.Title>
        <div className="text-muted small mb-2">Category: <Badge bg="secondary">{orchid.category}</Badge></div>
        <Card.Text className="text-light small flex-grow-1">{orchid.description}</Card.Text>
        <Button
          as={Link}
          to={`/orchids/${orchid.id}`}
          variant="outline-warning"
          size="sm"
          className="w-100 mt-auto fw-bold"
        >
          View Full Details →
        </Button>
      </Card.Body>
    </Card>
  );
}

export default OrchidCard;
