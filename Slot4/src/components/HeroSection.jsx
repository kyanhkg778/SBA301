import { Container, Row, Col, Card } from "react-bootstrap";

function HeroSection({ totalCount, specialCount }) {
  return (
    <div className="bg-gradient-dark text-white py-5 mb-4 border-bottom border-secondary">
      <Container>
        <Row className="align-items-center">
          <Col lg={8}>
            <h1 className="display-4 fw-bold mb-3 text-warning">
              Discover Exotic Orchids
            </h1>
            <p className="lead mb-4 text-light">
              Explore rare hybrid and natural orchid species from around the world. Filter by category, rating, and special rarity traits in real-time.
            </p>
          </Col>
          <Col lg={4}>
            <Row className="g-2">
              <Col xs={6}>
                <Card bg="dark" text="white" className="border-warning text-center p-3">
                  <h3 className="display-6 fw-bold text-warning mb-0">{totalCount}</h3>
                  <small className="text-muted text-uppercase">Total Species</small>
                </Card>
              </Col>
              <Col xs={6}>
                <Card bg="dark" text="white" className="border-info text-center p-3">
                  <h3 className="display-6 fw-bold text-info mb-0">{specialCount}</h3>
                  <small className="text-muted text-uppercase">Special Rarities</small>
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
