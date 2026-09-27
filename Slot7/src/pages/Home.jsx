import { Button, Container, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <Container className="py-5 text-center text-white">
      <div className="py-5 bg-gradient-dark rounded-4 p-4 shadow mb-5 border border-secondary">
        <h1 className="display-4 fw-bold text-warning mb-3">Campus Event Navigator</h1>
        <p className="lead text-light mb-4 max-w-2xl mx-auto">
          Explore campus workshops, hackathons, guest lectures, and tech competitions seamlessly powered by client-side routing.
        </p>
        <Button
          variant="warning"
          size="lg"
          className="fw-bold px-4 py-2"
          onClick={() => navigate("/events")}
        >
          Explore All Events →
        </Button>
      </div>

      <Row className="g-4 text-start">
        <Col md={4}>
          <Card bg="dark" text="white" className="h-100 border-secondary p-3">
            <h5 className="fw-bold text-warning">Dynamic Routing</h5>
            <p className="text-muted mb-0 small">
              Deep-link into any event using unique parameter URLs like <code>/events/1</code> seamlessly.
            </p>
          </Card>
        </Col>
        <Col md={4}>
          <Card bg="dark" text="white" className="h-100 border-secondary p-3">
            <h5 className="fw-bold text-info">Instant Search</h5>
            <p className="text-muted mb-0 small">
              Filter events by category and title without reloading the browser page.
            </p>
          </Card>
        </Col>
        <Col md={4}>
          <Card bg="dark" text="white" className="h-100 border-secondary p-3">
            <h5 className="fw-bold text-success">Browser History</h5>
            <p className="text-muted mb-0 small">
              Full support for Back and Forward history navigation using React Router DOM.
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
