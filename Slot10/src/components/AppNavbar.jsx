import { Container, Nav, Navbar, Badge } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

function AppNavbar() {
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" sticky="top" className="shadow border-bottom border-warning">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-warning fs-4">
          🌸 Orchid SPA Router
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="spa-navbar" />
        <Navbar.Collapse id="spa-navbar">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/orchids">
              Orchid Catalog
            </Nav.Link>
            <Nav.Link as={NavLink} to="/dashboard">
              Dashboard
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact">
              Contact
            </Nav.Link>
          </Nav>
          <div className="d-flex align-items-center">
            <Badge bg="warning" text="dark" className="px-3 py-2 fs-6 fw-bold">
              Slot 10 • SPA Architecture
            </Badge>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
