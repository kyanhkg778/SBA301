import { Container, Row, Col, Card } from "react-bootstrap";

function HeroSection({ totalEvents, registeredCount, bookmarkedCount }) {
  return (
    <div className="bg-gradient-dark text-white py-5 mb-4 border-bottom border-secondary">
      <Container>
        <Row className="align-items-center">
          <Col lg={7}>
            <span className="badge bg-primary px-3 py-2 text-uppercase mb-2">Campus Activities 2026</span>
            <h1 className="display-4 fw-bold mb-3 text-white">
              Campus Event Explorer
            </h1>
            <p className="lead mb-4 text-light">
              Stay connected with upcoming technology workshops, startup competitions, security CTFs, and academic forums. Register and save your spot with a single click.
            </p>
          </Col>
          <Col lg={5}>
            <Row className="g-3">
              <Col xs={4}>
                <Card bg="dark" text="white" className="border-primary text-center p-3">
                  <h3 className="fw-bold text-primary mb-0">{totalEvents}</h3>
                  <small className="text-muted">Total Events</small>
                </Card>
              </Col>
              <Col xs={4}>
                <Card bg="dark" text="white" className="border-success text-center p-3">
                  <h3 className="fw-bold text-success mb-0">{registeredCount}</h3>
                  <small className="text-muted">Registered</small>
                </Card>
              </Col>
              <Col xs={4}>
                <Card bg="dark" text="white" className="border-warning text-center p-3">
                  <h3 className="fw-bold text-warning mb-0">{bookmarkedCount}</h3>
                  <small className="text-muted">Saved</small>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HeroSection;
