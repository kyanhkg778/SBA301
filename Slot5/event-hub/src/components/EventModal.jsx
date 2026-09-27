import { useState } from "react";
import { Modal, Button, Form, Alert, Badge, Row, Col } from "react-bootstrap";

function EventModal({ event, isRegistered, show, onHide, onRegister, onUnregister }) {
  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!event) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!studentName || !studentId || !email) return;
    onRegister(event.id, { studentName, studentId, email });
    setSubmitted(true);
  };

  const handleCancelRegistration = () => {
    onUnregister(event.id);
    setSubmitted(false);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered className="modal-dark">
      <Modal.Header closeButton bg="dark" className="border-secondary text-white">
        <Modal.Title className="fw-bold text-primary fs-4">
          {event.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-white">
        <Row className="mb-4">
          <Col md={5}>
            <img
              src={event.image}
              alt={event.title}
              className="img-fluid rounded shadow w-100"
              style={{ maxHeight: "240px", objectFit: "cover" }}
            />
          </Col>
          <Col md={7}>
            <div className="mb-2">
              <Badge bg="primary" className="me-2">{event.category}</Badge>
              <Badge bg={event.featured ? "warning" : "secondary"} text={event.featured ? "dark" : "white"}>
                {event.featured ? "★ Featured" : "Standard"}
              </Badge>
            </div>
            <p className="text-light small mb-3">{event.description}</p>

            <ul className="list-unstyled text-muted small">
              <li>📍 <strong>Location:</strong> {event.location}</li>
              <li>📅 <strong>Date:</strong> {event.date} ({event.time})</li>
              <li>👥 <strong>Organizer:</strong> {event.organizer}</li>
              <li>💺 <strong>Capacity:</strong> {event.seats} attendees max</li>
            </ul>
          </Col>
        </Row>

        <hr className="border-secondary" />

        {isRegistered ? (
          <Alert variant="success" className="bg-success text-white border-0">
            <Alert.Heading className="fs-5 fw-bold">✓ Registration Confirmed!</Alert.Heading>
            <p className="mb-2 small">
              You are registered for this event. Please arrive 10 minutes before start time with your Student ID card.
            </p>
            <Button variant="outline-light" size="sm" onClick={handleCancelRegistration}>
              Cancel Registration
            </Button>
          </Alert>
        ) : (
          <div>
            <h5 className="fw-bold text-primary mb-3">Quick Registration Form</h5>
            {submitted && (
              <Alert variant="success" className="py-2">
                Registration submitted successfully!
              </Alert>
            )}
            <Form onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="small text-muted">Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g. Nguyen Van A"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      required
                      className="bg-secondary text-white border-0"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="small text-muted">Student ID</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g. SE181234"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      required
                      className="bg-secondary text-white border-0"
                    />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label className="small text-muted">Student Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="e.g. student@fpt.edu.vn"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-secondary text-white border-0"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button type="submit" variant="primary" className="mt-3 w-100 fw-bold">
                Confirm Event Seat
              </Button>
            </Form>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer className="bg-dark border-secondary">
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EventModal;
