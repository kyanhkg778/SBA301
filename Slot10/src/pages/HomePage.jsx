import { Container, Button, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <Container className="py-5 text-center text-white">
      <div className="py-5 bg-gradient-dark rounded-4 p-5 shadow border border-secondary mb-5">
        <h1 className="display-4 fw-bold text-warning mb-3">Orchid Router SPA</h1>
        <p className="lead text-light max-w-2xl mx-auto mb-4">
          Complete React SPA architecture featuring Declarative Routing, Nested Outlet Layouts, Dynamic Query Filtering (`useSearchParams`), and Direct URL routing.
        </p>
        <div className="d-flex justify-content-center gap-3">
          <Button variant="warning" size="lg" className="fw-bold px-4" onClick={() => navigate("/orchids")}>
            Browse Orchid Catalog →
          </Button>
          <Button variant="outline-info" size="lg" className="fw-bold px-4" onClick={() => navigate("/dashboard")}>
            View Dashboard
          </Button>
        </div>
      </div>

      <Row className="g-4 text-start">
        <Col md={4}>
          <Card bg="dark" text="white" className="h-100 border-secondary p-3">
            <h5 className="fw-bold text-warning">Nested Layouts</h5>
            <p className="text-muted small mb-0">
              Shared layout hierarchies utilizing <code>&lt;Outlet /&gt;</code> for seamless nested component rendering.
            </p>
          </Card>
        </Col>
        <Col md={4}>
          <Card bg="dark" text="white" className="h-100 border-secondary p-3">
            <h5 className="fw-bold text-info">Query Param State</h5>
            <p className="text-muted small mb-0">
              Sync search and category filters directly with the URL query parameters using <code>useSearchParams</code>.
            </p>
          </Card>
        </Col>
        <Col md={4}>
          <Card bg="dark" text="white" className="h-100 border-secondary p-3">
            <h5 className="fw-bold text-success">Client-Side Navigation</h5>
            <p className="text-muted small mb-0">
              Zero full-page browser reloads for smooth single page app user experience.
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
