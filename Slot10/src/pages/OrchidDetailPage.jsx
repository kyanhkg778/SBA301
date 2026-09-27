import { useParams, useNavigate } from "react";
import { Container, Card, Row, Col, Badge, Button, Alert } from "react-bootstrap";
import { orchids } from "../data/orchids";

function OrchidDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const orchid = orchids.find((o) => o.id === id);

  if (!orchid) {
    return (
      <Container className="py-5 text-white">
        <Alert variant="warning" className="bg-dark text-warning border-warning">
          <Alert.Heading className="fw-bold">Orchid Specimen Not Found</Alert.Heading>
          <p className="text-light">
            No specimen matches ID: <strong>{id}</strong>.
          </p>
          <Button variant="warning" onClick={() => navigate("/orchids")}>
            ← Back to Catalog
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5 text-white">
      <Card bg="dark" text="white" className="p-4 border-secondary shadow-sm">
        <Row>
          <Col md={5} className="mb-3 mb-md-0">
            <img
              src={orchid.image}
              alt={orchid.orchidName}
              className="img-fluid rounded shadow w-100"
              style={{ maxHeight: "350px", objectFit: "cover" }}
            />
          </Col>
          <Col md={7}>
            <div className="mb-2">
              <Badge bg="warning" text="dark" className="me-2 fs-6">{orchid.category}</Badge>
              {orchid.isSpecial && <Badge bg="info" text="dark" className="fs-6">★ Special Variety</Badge>}
            </div>
            <h2 className="fw-bold text-warning mb-3">{orchid.orchidName}</h2>
            <p className="lead text-light mb-4">{orchid.description}</p>

            <ul className="list-unstyled text-muted small mb-4">
              <li className="mb-2">📍 <strong>Origin:</strong> {orchid.origin}</li>
              <li className="mb-2">🎨 <strong>Color Palette:</strong> {orchid.color}</li>
              <li className="mb-2">⭐ <strong>Rating:</strong> {orchid.rating} / 5</li>
            </ul>

            <div className="d-flex gap-2">
              <Button variant="warning" className="fw-bold" onClick={() => navigate(-1)}>
                ← Go Back
              </Button>
              <Button variant="outline-light" onClick={() => navigate("/orchids")}>
                Catalog Index
              </Button>
            </div>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default OrchidDetailPage;
