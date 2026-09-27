import { Modal, Button, Badge, Row, Col } from "react-bootstrap";

function OrchidModal({ orchid, show, onHide }) {
  if (!orchid) return null;

  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered className="modal-dark">
      <Modal.Header closeButton bg="dark" className="border-secondary text-white">
        <Modal.Title className="fw-bold text-warning fs-4">
          {orchid.orchidName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-white">
        <Row>
          <Col md={6} className="mb-3 mb-md-0">
            <img
              src={orchid.image}
              alt={orchid.orchidName}
              className="img-fluid rounded shadow w-100"
              style={{ maxHeight: "320px", objectFit: "cover" }}
            />
          </Col>
          <Col md={6}>
            <div className="mb-2">
              {orchid.isSpecial && (
                <Badge bg="warning" text="dark" className="me-2 px-2 py-1 fs-6">
                  ★ Special Orchid
                </Badge>
              )}
              <Badge bg="info" text="dark" className="px-2 py-1 fs-6">
                {orchid.category}
              </Badge>
            </div>

            <div className="text-warning fs-5 mb-3">
              {renderStars(orchid.rating)}
              <span className="text-muted ms-2 fs-6">({orchid.rating} out of 5)</span>
            </div>

            <ul className="list-unstyled mb-3">
              <li className="mb-2">
                <strong className="text-info">Origin:</strong> {orchid.origin}
              </li>
              <li className="mb-2">
                <strong className="text-info">Color Palette:</strong> {orchid.color}
              </li>
              <li className="mb-2">
                <strong className="text-info">Category:</strong> {orchid.category}
              </li>
            </ul>

            <h6 className="fw-bold text-warning mb-2">Description</h6>
            <p className="text-light small">{orchid.description}</p>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer className="bg-dark border-secondary">
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default OrchidModal;
