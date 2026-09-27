import { Container, Navbar, Nav, Badge } from "react-bootstrap";

function AppNavbar({ registeredCount, bookmarkedCount }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow border-bottom border-primary">
      <Container>
        <Navbar.Brand href="#home" className="fw-bold fs-4 text-primary d-flex align-items-center">
          <span className="me-2">📅</span> EventHub Campus
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="event-navbar" />
        <Navbar.Collapse id="event-navbar">
          <Nav className="me-auto">
            <Nav.Link href="#events" className="active">Events Catalog</Nav.Link>
            <Nav.Link href="#my-events">
              Registered <Badge bg="success" className="ms-1">{registeredCount}</Badge>
            </Nav.Link>
            <Nav.Link href="#bookmarks">
              Bookmarked <Badge bg="warning" text="dark" className="ms-1">{bookmarkedCount}</Badge>
            </Nav.Link>
          </Nav>
          <div className="d-flex align-items-center text-light">
            <Badge bg="outline-primary" className="border border-primary text-primary px-3 py-2 fs-6">
              SE1910 • SBA301
            </Badge>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
