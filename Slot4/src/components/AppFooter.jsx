import { Container } from "react-bootstrap";

function AppFooter() {
  return (
    <footer className="bg-dark text-white py-4 mt-5 border-top border-secondary">
      <Container className="text-center">
        <p className="mb-1 text-warning fw-semibold">
          SBA301 • Slot 04 Lab Exercise - Interactive Orchid Explorer
        </p>
        <p className="text-muted small mb-0">
          Built with React 19, Vite & React-Bootstrap • Context & State Architecture
        </p>
      </Container>
    </footer>
  );
}

export default AppFooter;
