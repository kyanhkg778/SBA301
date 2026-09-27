import { Container, Card } from "react-bootstrap";

function AboutPage() {
  return (
    <Container className="py-5 text-white">
      <Card bg="dark" text="white" className="p-4 border-secondary shadow-sm">
        <h2 className="fw-bold text-warning mb-3">About Orchid Router SPA</h2>
        <p className="lead text-light">
          This project demonstrates advanced Single Page Application (SPA) declarative routing with React Router DOM v6/v7.
        </p>
        <hr className="border-secondary my-4" />
        <h5 className="fw-bold text-info mb-2">Key Routing Concepts Implemented:</h5>
        <ul>
          <li><strong>Nested Routes & Layouts:</strong> MainLayout & DashboardLayout with <code>Outlet</code>.</li>
          <li><strong>URL Query Parameters:</strong> <code>useSearchParams</code> hook for filter states.</li>
          <li><strong>Navigation Active State:</strong> Automatic styling on active <code>NavLink</code> items.</li>
          <li><strong>Dynamic Parameter Route:</strong> <code>/orchids/:id</code> parameter extraction.</li>
          <li><strong>Redirect Routes:</strong> Automatic redirection using <code>&lt;Navigate to="..." /&gt;</code>.</li>
        </ul>
      </Card>
    </Container>
  );
}

export default AboutPage;
