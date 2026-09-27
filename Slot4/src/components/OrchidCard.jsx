import { Card, Badge, Button } from "react-bootstrap";

function OrchidCard({ orchid, onSelect }) {
  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <Card className="h-100 shadow-sm border-0 hover-lift bg-dark text-white">
      <div className="position-relative overflow-hidden">
        <Card.Img
          variant="top"
          src={orchid.image}
          alt={orchid.orchidName}
          style={{ height: "230px", objectFit: "cover" }}
        />
        {orchid.isSpecial && (
          <Badge
            bg="warning"
            text="dark"
            className="position-absolute top-0 end-0 m-2 px-3 py-2 fs-6 shadow"
          >
            ★ Special Orchid
          </Badge>
        )}
        <Badge
          bg="secondary"
          className="position-absolute bottom-0 start-0 m-2 px-2 py-1"
        >
          {orchid.category}
        </Badge>
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title className="fw-bold fs-5 text-warning mb-1">
          {orchid.orchidName}
        </Card.Title>
        <div className="text-warning mb-2 small fs-6">
          {renderStars(orchid.rating)}
          <span className="text-muted ms-2">({orchid.rating}/5)</span>
        </div>
        <Card.Text className="text-light small mb-3 flex-grow-1">
          <strong>Origin:</strong> {orchid.origin} <br />
          <strong>Color:</strong> {orchid.color}
        </Card.Text>

        <Button
          variant="outline-warning"
          className="w-100 mt-auto fw-semibold"
          onClick={() => onSelect(orchid)}
        >
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
}

export default OrchidCard;
