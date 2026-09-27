import { useContext } from "react";
import { Container, Navbar, Button, Badge } from "react-bootstrap";
import { ThemeContext } from "../context/ThemeContext";

function AppNavbar({ productCount }) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Navbar
      bg={theme === "dark" ? "dark" : "light"}
      variant={theme === "dark" ? "dark" : "light"}
      expand="lg"
      className="shadow-sm border-bottom border-secondary mb-4"
    >
      <Container>
        <Navbar.Brand href="#home" className="fw-bold fs-4 text-warning d-flex align-items-center">
          ⚡ Product Manager Pro
        </Navbar.Brand>
        <div className="d-flex align-items-center gap-3">
          <Badge bg="info" className="fs-6 px-3 py-2">
            {productCount} Items in Catalog
          </Badge>
          <Button
            variant={theme === "dark" ? "outline-warning" : "outline-dark"}
            onClick={toggleTheme}
            size="sm"
            className="fw-bold"
          >
            {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </Button>
        </div>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
