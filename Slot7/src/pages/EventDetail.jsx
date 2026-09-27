import { Alert, Badge, Button, Card, Container } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { events } from "../data/events";

function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find((item) => item.id === id);

  if (!event) {
    return (
      <Container className="py-5 text-white">
        <Alert variant="warning" className="bg-dark text-warning border-warning">
          <Alert.Heading className="fw-bold">Event Not Found</Alert.Heading>
          <p className="text-light">
            No local campus event was found matching ID: <strong>{id}</strong>.
          </p>
          <Button as={Link} to="/events" variant="warning" className="fw-semibold">
            ← Back to Events List
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5 text-white">
      <Card className="shadow-sm bg-dark text-white border-secondary p-2">
        <Card.Body>
          <div className="mb-3">
            <Badge bg={event.featured ? "warning" : "secondary"} text={event.featured ? "dark" : "white"} className="fs-6">
              {event.category}
            </Badge>
          </div>
          <Card.Title as="h2" className="fw-bold text-warning mb-3">
            {event.title}
          </Card.Title>
          <Card.Text className="lead text-light mb-4">{event.description}</Card.Text>
          <hr className="border-secondary" />

          <div className="row mb-4">
            <div className="col-md-6">
              <p className="mb-2"><strong>📅 Date:</strong> {event.date}</p>
              <p className="mb-2"><strong>📍 Location:</strong> {event.location}</p>
            </div>
            <div className="col-md-6">
              <p className="mb-2"><strong>👤 Organizer:</strong> {event.organizer}</p>
              <p className="mb-2"><strong>💺 Available Seats:</strong> {event.seats} seats</p>
            </div>
          </div>

          <div className="d-flex gap-2">
            <Button as={Link} to="/events" variant="primary" className="fw-semibold">
              ← Back to Events List
            </Button>
            <Button variant="outline-secondary" onClick={() => navigate(-1)} className="fw-semibold">
              Go Back (Browser History)
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default EventDetail;
