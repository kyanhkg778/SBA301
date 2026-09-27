import { Container, Row, Col, Nav, Card } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <Container className="py-4">
      <h3 className="fw-bold text-warning mb-3">User Management Dashboard</h3>
      <Row className="g-4">
        <Col md={3}>
          <Card bg="dark" text="white" className="border-secondary p-2">
            <Nav variant="pills" className="flex-column">
              <Nav.Link as={NavLink} to="/dashboard" end className="mb-1 text-white">
                📊 Dashboard Overview
              </Nav.Link>
              <Nav.Link as={NavLink} to="/dashboard/favorites" className="mb-1 text-white">
                ⭐ Favorite Orchids
              </Nav.Link>
              <Nav.Link as={NavLink} to="/dashboard/profile" className="text-white">
                👤 Student Profile
              </Nav.Link>
            </Nav>
          </Card>
        </Col>

        <Col md={9}>
          <Card bg="dark" text="white" className="border-secondary p-4">
            <Outlet />
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default DashboardLayout;
