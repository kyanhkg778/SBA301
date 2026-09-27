import { Card, Badge, Button, Row, Col } from "react-bootstrap";

function EventCard({ event, isRegistered, isBookmarked, onSelect, onToggleBookmark }) {
  return (
    <Card className="h-100 shadow-sm border-0 bg-dark text-white hover-lift">
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={event.image}
          alt={event.title}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="position-absolute top-0 start-0 m-2 d-flex gap-1">
          <Badge bg={event.featured ? "warning" : "secondary"} text={event.featured ? "dark" : "white"}>
            {event.featured ? "★ Featured" : event.category}
          </Badge>
          {isRegistered && <Badge bg="success">Registered</Badge>}
        </div>
        <Button
          variant={isBookmarked ? "warning" : "dark"}
          size="sm"
          className="position-absolute top-0 end-0 m-2 rounded-circle p-2 shadow"
          onClick={(e) => {
            e.stopPropagation();
            onToggleBookmark(event.id);
          }}
          title={isBookmarked ? "Remove Bookmark" : "Bookmark Event"}
        >
          {isBookmarked ? "★" : "☆"}
        </Button>
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title className="fw-bold fs-5 text-white mb-2">
          {event.title}
        </Card.Title>

        <div className="text-muted small mb-3">
          <div className="mb-1">📅 <strong>Date:</strong> {event.date} ({event.time})</div>
          <div className="mb-1">📍 <strong>Location:</strong> {event.location}</div>
          <div>👤 <strong>Organizer:</strong> {event.organizer}</div>
        </div>

        <Row className="align-items-center mt-auto pt-2 border-top border-secondary">
          <Col xs={6}>
            <span className="badge bg-outline-info border border-info text-info">
              {event.seats} seats
            </span>
          </Col>
          <Col xs={6} className="text-end">
            <Button
              variant={isRegistered ? "outline-success" : "primary"}
              size="sm"
              className="fw-semibold"
              onClick={() => onSelect(event)}
            >
              {isRegistered ? "View Ticket" : "Register / Info"}
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default EventCard;
