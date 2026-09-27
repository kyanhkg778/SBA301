import { useContext } from "react";
import { Container, Navbar, Nav, Badge } from "react-bootstrap";
import UserContext from "../context/UserContext";

function AppNavbar({ totalOrchids, specialCount }) {
  const user = useContext(UserContext);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow">
      <Container>
        <Navbar.Brand href="#home" className="fw-bold fs-4 text-warning">
          🌿 Orchid Explorer
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto align-items-center">
            <Nav.Link href="#catalog" className="active">Catalog</Nav.Link>
            <Nav.Link href="#special">
              Special Collection <Badge bg="warning" text="dark">{specialCount}</Badge>
            </Nav.Link>
          </Nav>
          <div className="d-flex align-items-center text-light">
            <span className="me-2 text-muted small">Welcome,</span>
            <span className="fw-semibold text-info me-3">{user.name}</span>
            <Badge bg="secondary" className="px-2 py-1">{user.role}</Badge>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
