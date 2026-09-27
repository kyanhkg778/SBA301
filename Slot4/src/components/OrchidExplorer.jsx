import { useState } from "react";
import { Container, Row, Col, Form, InputGroup, Card } from "react-bootstrap";
import OrchidCard from "./OrchidCard";
import OrchidModal from "./OrchidModal";

function OrchidExplorer({ orchids }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [specialOnly, setSpecialOnly] = useState(false);
  const [activeOrchid, setActiveOrchid] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Derive categories dynamically
  const categories = ["All", ...new Set(orchids.map((o) => o.category))];

  // Derived state: filtered orchids
  const filteredOrchids = orchids.filter((orchid) => {
    const matchesSearch =
      orchid.orchidName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orchid.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orchid.color.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || orchid.category === selectedCategory;

    const matchesSpecial = !specialOnly || orchid.isSpecial;

    return matchesSearch && matchesCategory && matchesSpecial;
  });

  const handleOpenModal = (orchid) => {
    setActiveOrchid(orchid);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setActiveOrchid(null);
  };

  return (
    <Container id="catalog" className="my-4">
      <Card bg="dark" text="white" className="p-3 mb-4 border-secondary shadow-sm">
        <Row className="g-3 align-items-center">
          <Col md={5}>
            <Form.Label className="fw-semibold text-warning mb-1">
              Search Orchids
            </Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search by name, origin, or color..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-secondary text-white border-0"
              />
            </InputGroup>
          </Col>

          <Col md={4}>
            <Form.Label className="fw-semibold text-warning mb-1">
              Filter Category
            </Form.Label>
            <Form.Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-secondary text-white border-0"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col md={3} className="pt-md-4">
            <Form.Check
              type="switch"
              id="special-switch"
              label="Special Orchids Only"
              checked={specialOnly}
              onChange={(e) => setSpecialOnly(e.target.checked)}
              className="fw-semibold text-warning"
            />
          </Col>
        </Row>
      </Card>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold text-white mb-0">Orchid Catalog</h4>
        <span className="text-muted">
          Showing <strong className="text-warning">{filteredOrchids.length}</strong> of {orchids.length} species
        </span>
      </div>

      {filteredOrchids.length === 0 ? (
        <Card bg="dark" text="white" className="text-center p-5 border-secondary">
          <h5 className="text-warning">No Orchids Found</h5>
          <p className="text-muted mb-0">
            Try adjusting your search terms or filters to view available species.
          </p>
        </Card>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {filteredOrchids.map((orchid) => (
            <Col key={orchid.id}>
              <OrchidCard orchid={orchid} onSelect={handleOpenModal} />
            </Col>
          ))}
        </Row>
      )}

      <OrchidModal
        orchid={activeOrchid}
        show={showModal}
        onHide={handleCloseModal}
      />
    </Container>
  );
}

export default OrchidExplorer;
