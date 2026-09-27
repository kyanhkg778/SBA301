import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Container className="py-5 text-center text-white">
      <div className="py-5 bg-gradient-dark rounded-4 p-5 border border-danger">
        <h1 className="display-1 fw-bold text-danger">404</h1>
        <h2 className="fw-bold text-warning mb-3">Page Not Found</h2>
        <p className="lead text-light mb-4">
          The requested URL client route does not exist in the routing table.
        </p>
        <Button as={Link} to="/" variant="warning" size="lg" className="fw-bold px-4">
          Return to Home Page
        </Button>
      </div>
    </Container>
  );
}

export default NotFound;
