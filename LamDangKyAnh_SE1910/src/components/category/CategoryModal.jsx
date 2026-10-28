import { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const DEFAULT_FORM = {
  name: "",
  description: "",
  status: 1
};

export default function CategoryModal({ show, mode, category, onSave, onClose }) {
  const [formData, setFormData] = useState(DEFAULT_FORM);
  const [error, setError] = useState("");
  const isUpdate = mode === "update";

  // Đồng bộ dữ liệu vào Form mỗi khi mở Modal
  useEffect(() => {
    if (!show) return;

    if (isUpdate && category) {
      setFormData({
        name: category.name || "",
        description: category.description || "",
        status: category.status !== undefined ? Number(category.status) : 1
      });
    } else {
      setFormData(DEFAULT_FORM);
    }
    setError("");
  }, [show, isUpdate, category]);

  // Xử lý thay đổi giá trị các ô nhập liệu (Controlled Inputs)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "status" ? Number(value) : value
    }));
    if (error) setError("");
  };

  // Kiểm tra hợp lệ (Validation) và gửi dữ liệu lên component cha
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = formData.name.trim();

    if (!trimmedName) {
      setError("Tên danh mục không được để trống (Category Name is required).");
      return;
    }

    onSave({
      ...formData,
      name: trimmedName,
      description: formData.description.trim()
    });
  };

  return (
    <Modal show={show} onHide={onClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold fs-5">
          {isUpdate ? "✏️ Cập Nhật Danh Mục (Update Category)" : "➕ Thêm Danh Mục Mới (Create Category)"}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body className="d-flex flex-column gap-3">
          {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}

          {isUpdate && category && (
            <Form.Group>
              <Form.Label className="small fw-semibold text-muted">ID Danh mục</Form.Label>
              <Form.Control type="text" value={category.id} disabled readOnly className="bg-light" />
            </Form.Group>
          )}

          <Form.Group controlId="categoryName">
            <Form.Label className="small fw-semibold">
              Tên Danh Mục (Category Name) <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="VD: Công nghệ, Đời sống sinh viên..."
              value={formData.name}
              onChange={handleChange}
              autoFocus
              isInvalid={Boolean(error) && !formData.name.trim()}
            />
            <Form.Control.Feedback type="invalid">
              Vui lòng nhập tên danh mục.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="categoryDesc">
            <Form.Label className="small fw-semibold">Mô Tả (Description)</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              placeholder="Nhập mô tả chi tiết cho danh mục..."
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="categoryStatus">
            <Form.Label className="small fw-semibold">Trạng Thái (Status)</Form.Label>
            <Form.Select name="status" value={formData.status} onChange={handleChange}>
              <option value={1}>🟢 Kích hoạt (Active - 1)</option>
              <option value={0}>⚪ Tạm ẩn / Không kích hoạt (Inactive - 0)</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Hủy bỏ (Cancel)
          </Button>
          <Button variant="primary" type="submit">
            {isUpdate ? "Lưu thay đổi (Save Changes)" : "Thêm mới (Create)"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
