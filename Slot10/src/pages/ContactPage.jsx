import { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      navigate("/orchids");
    }, 2000);
  };

  return (
    <Container className="py-5 text-white">
      <Card bg="dark" text="white" className="p-4 border-secondary shadow-sm max-w-xl mx-auto">
        <h3 className="fw-bold text-warning mb-3">Contact Support</h3>
        {submitted ? (
          <Alert variant="success" className="bg-success text-white border-0">
            Thank you! Your message was submitted. Redirecting to catalog...
          </Alert>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Your Name</Form.Label>
              <Form.Control type="text" required className="bg-secondary text-white border-0" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" required className="bg-secondary text-white border-0" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={3} required className="bg-secondary text-white border-0" />
            </Form.Group>
            <Button type="submit" variant="warning" className="w-100 fw-bold">
              Submit & Redirect
            </Button>
          </Form>
        )}
      </Card>
    </Container>
  );
}

export default ContactPage;
