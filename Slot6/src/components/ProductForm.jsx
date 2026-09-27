import { useState, useEffect } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";

function ProductForm({ onSave, editingProduct, onCancelEdit }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Smartphones");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [active, setActive] = useState(true);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setCategory(editingProduct.category);
      setPrice(editingProduct.price);
      setQuantity(editingProduct.quantity);
      setActive(editingProduct.active);
      setDescription(editingProduct.description || "");
    } else {
      resetForm();
    }
  }, [editingProduct]);

  const resetForm = () => {
    setName("");
    setCategory("Smartphones");
    setPrice("");
    setQuantity("");
    setActive(true);
    setDescription("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || quantity === "") return;

    const productData = {
      id: editingProduct ? editingProduct.id : `prod-${Date.now()}`,
      name,
      category,
      price: parseFloat(price),
      quantity: parseInt(quantity, 10),
      active,
      description
    };

    onSave(productData);
    resetForm();
  };

  return (
    <Card bg="dark" text="white" className="p-4 border-secondary shadow-sm mb-4">
      <h5 className="fw-bold text-warning mb-3">
        {editingProduct ? "✏️ Edit Product Record" : "➕ Add New Product"}
      </h5>
      <Form onSubmit={handleSubmit}>
        <Row className="g-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label className="small fw-semibold text-light">Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. iPad Air M2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-secondary text-white border-0"
              />
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group>
              <Form.Label className="small fw-semibold text-light">Category</Form.Label>
              <Form.Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-secondary text-white border-0"
              >
                <option value="Smartphones">Smartphones</option>
                <option value="Laptops">Laptops</option>
                <option value="Audio">Audio</option>
                <option value="Monitors">Monitors</option>
                <option value="Peripherals">Peripherals</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group>
              <Form.Label className="small fw-semibold text-light">Price ($)</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                placeholder="999.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="bg-secondary text-white border-0"
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group>
              <Form.Label className="small fw-semibold text-light">Quantity Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="10"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                className="bg-secondary text-white border-0"
              />
            </Form.Group>
          </Col>

          <Col md={4} className="d-flex align-items-center pt-md-4">
            <Form.Check
              type="switch"
              id="active-switch"
              label="Active Listing"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
              className="fw-semibold text-info"
            />
          </Col>

          <Col md={4} className="d-flex align-items-center justify-content-end pt-md-4 gap-2">
            {editingProduct && (
              <Button variant="outline-secondary" onClick={onCancelEdit}>
                Cancel
              </Button>
            )}
            <Button type="submit" variant={editingProduct ? "warning" : "success"} className="fw-bold px-4">
              {editingProduct ? "Update Product" : "Save Product"}
            </Button>
          </Col>

          <Col md={12}>
            <Form.Group>
              <Form.Label className="small fw-semibold text-light">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Product specifications and features..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-secondary text-white border-0"
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}

export default ProductForm;
