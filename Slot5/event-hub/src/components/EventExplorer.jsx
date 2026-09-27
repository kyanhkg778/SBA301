import { useState } from "react";
import { Container, Row, Col, Form, InputGroup, Card, Nav } from "react-bootstrap";
import EventCard from "./EventCard";
import EventModal from "./EventModal";

function EventExplorer({ events, registeredEvents, bookmarkedEvents, onRegister, onUnregister, onToggleBookmark }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const categories = ["All", ...new Set(events.map((e) => e.category))];

  const filteredEvents = events.filter((event) => {
    const matchesKeyword =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      activeCategory === "All" || event.category === activeCategory;

    const matchesFeatured = !featuredOnly || event.featured;

    return matchesKeyword && matchesCategory && matchesFeatured;
  });

  const handleOpenModal = (evt) => {
    setSelectedEvent(evt);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  return (
    <Container id="events" className="my-4">
      {/* Filters Bar */}
      <Card bg="dark" text="white" className="p-3 mb-4 border-secondary shadow-sm">
        <Row className="g-3 align-items-center mb-3">
          <Col md={7}>
            <Form.Label className="fw-semibold text-primary mb-1">Search Campus Events</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search event title, venue, or host club..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-secondary text-white border-0"
              />
            </InputGroup>
          </Col>

          <Col md={5} className="pt-md-4 text-md-end">
            <Form.Check
              type="switch"
              id="featured-switch"
              label="Featured Events Only"
              checked={featuredOnly}
              onChange={(e) => setFeaturedOnly(e.target.checked)}
              className="fw-semibold text-warning d-inline-block"
            />
          </Col>
        </Row>

        {/* Category Pills */}
        <Nav variant="pills" activeKey={activeCategory} onSelect={(k) => setActiveCategory(k)}>
          {categories.map((cat) => (
            <Nav.Item key={cat}>
              <Nav.Link eventKey={cat} className="px-3 py-1 me-2 mb-2 rounded-pill small">
                {cat}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </Card>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold text-white mb-0">Upcoming Events</h4>
        <span className="text-muted">
          Showing <strong className="text-primary">{filteredEvents.length}</strong> of {events.length} events
        </span>
      </div>

      {filteredEvents.length === 0 ? (
        <Card bg="dark" text="white" className="text-center p-5 border-secondary">
          <h5 className="text-primary">No Events Found</h5>
          <p className="text-muted mb-0">Try changing your search terms or selecting another category tab.</p>
        </Card>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredEvents.map((event) => (
            <Col key={event.id}>
              <EventCard
                event={event}
                isRegistered={!!registeredEvents[event.id]}
                isBookmarked={bookmarkedEvents.includes(event.id)}
                onSelect={handleOpenModal}
                onToggleBookmark={onToggleBookmark}
              />
            </Col>
          ))}
        </Row>
      )}

      <EventModal
        event={selectedEvent}
        isRegistered={selectedEvent ? !!registeredEvents[selectedEvent.id] : false}
        show={showModal}
        onHide={handleCloseModal}
        onRegister={onRegister}
        onUnregister={onUnregister}
      />
    </Container>
  );
}

export default EventExplorer;
