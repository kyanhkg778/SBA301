import { Container } from "react-bootstrap";

function AppFooter() {
  return (
    <footer className="bg-dark text-white py-4 mt-5 border-top border-secondary">
      <Container className="text-center">
        <p className="mb-1 text-info fw-semibold">
          SBA301 • Slot 09 Project - Fetching & Caching Data Lab
        </p>
        <p className="text-muted small mb-0">
          Built with Promises, Fetch API, Axios Interceptors, AbortController & In-Memory TTL Cache
        </p>
      </Container>
    </footer>
  );
}

export default AppFooter;
