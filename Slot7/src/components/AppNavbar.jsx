import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

function AppNavbar() {
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" sticky="top" className="shadow border-bottom border-secondary">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-warning">
          🚀 Campus Event Navigator
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/events">
              Events
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about">
              About
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
