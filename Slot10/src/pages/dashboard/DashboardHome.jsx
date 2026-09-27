import { Card, Row, Col } from "react-bootstrap";

function DashboardHome() {
  return (
    <div>
      <h4 className="fw-bold text-warning mb-3">Dashboard Summary</h4>
      <p className="text-muted">Welcome to your personal orchid collector control panel.</p>
      <Row className="g-3 mt-2">
        <Col md={6}>
          <Card bg="secondary" text="white" className="p-3 border-0">
            <h6>Favorites Tracked</h6>
            <h2 className="fw-bold text-warning mb-0">3 Species</h2>
          </Card>
        </Col>
        <Col md={6}>
          <Card bg="secondary" text="white" className="p-3 border-0">
            <h6>Account Status</h6>
            <h2 className="fw-bold text-info mb-0">Active Student</h2>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default DashboardHome;
