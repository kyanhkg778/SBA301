import { Container, Card } from "react-bootstrap";

function About() {
  return (
    <Container className="py-5 text-white">
      <Card bg="dark" text="white" className="p-4 border-secondary shadow-sm">
        <h2 className="fw-bold text-warning mb-3">About Campus Event Navigator</h2>
        <p className="lead text-light">
          Campus Event Navigator is an SBA301 hands-on React Router DOM navigation practice application.
        </p>
        <hr className="border-secondary my-4" />
        <h5 className="fw-bold text-info mb-2">Key Routing Concepts Demonstrated:</h5>
        <ul className="text-light">
          <li className="mb-2"><strong>BrowserRouter & Routes:</strong> Client-side routing configuration.</li>
          <li className="mb-2"><strong>Link & NavLink:</strong> Declarative SPA navigation without full page reloads.</li>
          <li className="mb-2"><strong>Dynamic Parameters:</strong> Route pattern matching with <code>useParams()</code> for resource detail views.</li>
          <li className="mb-2"><strong>Programmatic Navigation:</strong> <code>useNavigate()</code> for programmatic page switching and back navigation.</li>
          <li className="mb-2"><strong>Wildcard Routes:</strong> Client-side 404 handler for unknown URLs.</li>
        </ul>
      </Card>
    </Container>
  );
}

export default About;
