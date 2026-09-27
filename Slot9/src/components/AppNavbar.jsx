import { Container, Navbar, Badge } from "react-bootstrap";

function AppNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow border-bottom border-secondary">
      <Container>
        <Navbar.Brand href="#home" className="fw-bold text-info fs-4">
          📡 Fetching & Caching Data Lab
        </Navbar.Brand>
        <div className="d-flex align-items-center gap-2">
          <Badge bg="outline-info" className="border border-info text-info px-3 py-2">
            SBA301 • Slot 09
          </Badge>
        </div>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
