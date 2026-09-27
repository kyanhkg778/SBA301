import { Table, Badge, Button, Card } from "react-bootstrap";

function ProductList({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return (
      <Card bg="dark" text="white" className="text-center p-5 border-secondary">
        <h5 className="text-warning">No Products Matched</h5>
        <p className="text-muted mb-0">Try changing your search keywords or filter settings.</p>
      </Card>
    );
  }

  return (
    <Card bg="dark" text="white" className="border-secondary shadow-sm overflow-hidden mb-4">
      <Table responsive hover variant="dark" className="align-middle mb-0">
        <thead>
          <tr className="table-dark text-warning border-bottom border-secondary">
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>
                <div className="fw-bold text-white">{p.name}</div>
                <small className="text-muted">{p.description}</small>
              </td>
              <td>
                <Badge bg="secondary">{p.category}</Badge>
              </td>
              <td className="fw-bold text-info">${p.price.toFixed(2)}</td>
              <td>
                {p.quantity > 0 ? (
                  <span className="text-light">{p.quantity} units</span>
                ) : (
                  <Badge bg="danger">Out of Stock</Badge>
                )}
              </td>
              <td>
                <Badge bg={p.active ? "success" : "secondary"}>
                  {p.active ? "Active" : "Inactive"}
                </Badge>
              </td>
              <td className="text-end">
                <Button
                  variant="outline-warning"
                  size="sm"
                  className="me-2"
                  onClick={() => onEdit(p)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => onDelete(p.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
}

export default ProductList;
