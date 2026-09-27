import { Container } from "react-bootstrap";

function AppFooter() {
  return (
    <footer className="bg-dark text-white py-4 mt-5 border-top border-secondary">
      <Container className="text-center">
        <p className="mb-1 text-primary fw-semibold">
          SBA301 • Slot 05 Project - EventHub Campus Event Explorer
        </p>
        <p className="text-muted small mb-0">
          Built with React 19, Vite & React-Bootstrap • Event State & Derived Data
        </p>
      </Container>
    </footer>
  );
}

export default AppFooter;
