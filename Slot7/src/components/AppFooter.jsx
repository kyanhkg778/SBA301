import { Container } from "react-bootstrap";

function AppFooter() {
  return (
    <footer className="bg-dark text-white py-4 mt-auto border-top border-secondary">
      <Container className="text-center">
        <p className="mb-1 text-warning fw-semibold">
          SBA301 • Slot 07 Project Guide • React Router & Navigation
        </p>
        <p className="text-muted small mb-0">
          Client-side SPA Routing with BrowserRouter, Routes, Link, useParams & useNavigate
        </p>
      </Container>
    </footer>
  );
}

export default AppFooter;
