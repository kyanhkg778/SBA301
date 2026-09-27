import { useSearchParams } from "react-router-dom";
import { Container, Row, Col, Form, InputGroup, Card, Badge } from "react-bootstrap";
import OrchidCard from "../components/OrchidCard";
import { orchids } from "../data/orchids";

function OrchidsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("q") || "";
  const category = searchParams.get("category") || "All";

  const categories = ["All", ...new Set(orchids.map((o) => o.category))];

  const handleSearchChange = (newSearch) => {
    const params = new URLSearchParams(searchParams);
    if (newSearch) {
      params.set("q", newSearch);
    } else {
      params.delete("q");
    }
    setSearchParams(params);
  };

  const handleCategoryChange = (newCategory) => {
    const params = new URLSearchParams(searchParams);
    if (newCategory !== "All") {
      params.set("category", newCategory);
    } else {
      params.delete("category");
    }
    setSearchParams(params);
  };

  const filteredOrchids = orchids.filter((orchid) => {
    const matchesSearch = orchid.orchidName.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || orchid.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <Container className="py-4 text-white">
      <h2 className="fw-bold text-warning mb-1">Orchid Species Catalog</h2>
      <p className="text-muted mb-4">
        URL Query Syncing: <code>?q={search}&category={category}</code>
      </p>

      <Card bg="dark" text="white" className="p-3 mb-4 border-secondary shadow-sm">
        <Row className="g-3">
          <Col md={7}>
            <Form.Label className="fw-semibold text-warning mb-1">Search Species</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Type species name..."
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="bg-secondary text-white border-0"
              />
            </InputGroup>
          </Col>
          <Col md={5}>
            <Form.Label className="fw-semibold text-warning mb-1">Category Filter</Form.Label>
            <Form.Select
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="bg-secondary text-white border-0"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
      </Card>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <Badge bg="info" className="fs-6">Showing {filteredOrchids.length} species</Badge>
      </div>

      <Row xs={1} md={2} lg={3} className="g-4">
        {filteredOrchids.map((orchid) => (
          <Col key={orchid.id}>
            <OrchidCard orchid={orchid} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default OrchidsPage;
