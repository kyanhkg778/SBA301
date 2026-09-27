import { Row, Col, Card } from "react-bootstrap";

function ProductStats({ products }) {
  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.active).length;
  const totalValue = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const outOfStock = products.filter((p) => p.quantity === 0).length;

  return (
    <Row className="g-3 mb-4">
      <Col md={3} sm={6}>
        <Card className="border-0 shadow-sm bg-dark text-white p-3">
          <small className="text-muted text-uppercase fw-semibold">Total Products</small>
          <h3 className="fw-bold text-warning mb-0">{totalProducts}</h3>
        </Card>
      </Col>
      <Col md={3} sm={6}>
        <Card className="border-0 shadow-sm bg-dark text-white p-3">
          <small className="text-muted text-uppercase fw-semibold">Active Items</small>
          <h3 className="fw-bold text-success mb-0">{activeProducts}</h3>
        </Card>
      </Col>
      <Col md={3} sm={6}>
        <Card className="border-0 shadow-sm bg-dark text-white p-3">
          <small className="text-muted text-uppercase fw-semibold">Total Inventory Value</small>
          <h3 className="fw-bold text-info mb-0">${totalValue.toLocaleString()}</h3>
        </Card>
      </Col>
      <Col md={3} sm={6}>
        <Card className="border-0 shadow-sm bg-dark text-white p-3">
          <small className="text-muted text-uppercase fw-semibold">Out of Stock</small>
          <h3 className="fw-bold text-danger mb-0">{outOfStock}</h3>
        </Card>
      </Col>
    </Row>
  );
}

export default ProductStats;
