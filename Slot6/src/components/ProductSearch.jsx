import { useRef } from "react";
import { Form, InputGroup, Button, Row, Col, Card } from "react-bootstrap";

function ProductSearch({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  categories
}) {
  const searchInputRef = useRef(null);

  const handleFocusSearch = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <Card bg="dark" text="white" className="p-3 mb-4 border-secondary shadow-sm">
      <Row className="g-3 align-items-center">
        <Col md={5}>
          <Form.Label className="fw-semibold text-warning mb-1">
            Search Inventory (useRef demo)
          </Form.Label>
          <InputGroup>
            <Form.Control
              ref={searchInputRef}
              type="text"
              placeholder="Type to filter products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-secondary text-white border-0"
            />
            <Button variant="outline-warning" onClick={handleFocusSearch}>
              🔍 Focus Input
            </Button>
          </InputGroup>
        </Col>

        <Col md={4}>
          <Form.Label className="fw-semibold text-warning mb-1">Filter Category</Form.Label>
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

        <Col md={3}>
          <Form.Label className="fw-semibold text-warning mb-1">Sort By</Form.Label>
          <Form.Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-secondary text-white border-0"
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
          </Form.Select>
        </Col>
      </Row>
    </Card>
  );
}

export default ProductSearch;
