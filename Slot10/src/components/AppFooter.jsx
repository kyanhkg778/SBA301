import { Container } from "react-bootstrap";

function AppFooter() {
  return (
    <footer className="bg-dark text-white py-4 mt-auto border-top border-secondary">
      <Container className="text-center">
        <p className="mb-1 text-warning fw-semibold">
          SBA301 • Slot 10 Project - React Router & SPA Architecture
        </p>
        <p className="text-muted small mb-0">
          Nested Route Layouts (Outlet), URL Query Parameters (useSearchParams), Redirects & Direct Routing Support
        </p>
      </Container>
    </footer>
  );
}

export default AppFooter;
