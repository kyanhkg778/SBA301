import { useState, useEffect } from "react";
import { Modal, Button, Form, Alert, Row, Col } from "react-bootstrap";

export default function UserModal({ show, mode, user, onSave, onClose }) {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    role: 2, // Default: Staff
    status: 1
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (show) {
      if (mode === "update" && user) {
        setFormData({
          username: user.username || "",
          fullName: user.fullName || "",
          email: user.email || "",
          role: user.role !== undefined ? Number(user.role) : 2,
          status: user.status !== undefined ? Number(user.status) : 1
        });
      } else {
        setFormData({
          username: "",
          fullName: "",
          email: "",
          role: 2,
          status: 1
        });
      }
      setError("");
    }
  }, [show, mode, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: (name === "role" || name === "status") ? Number(value) : value
    }));
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedUsername = formData.username.trim();
    const trimmedFullName = formData.fullName.trim();
    const trimmedEmail = formData.email.trim();

    if (!trimmedUsername) {
      setError("Tên đăng nhập không được để trống (Username is required).");
      return;
    }

    if (!trimmedFullName) {
      setError("Họ và tên không được để trống (Full Name is required).");
      return;
    }

    if (!trimmedEmail || !trimmedEmail.includes("@")) {
      setError("Vui lòng nhập định dạng email hợp lệ (Valid email is required).");
      return;
    }

    onSave({
      username: trimmedUsername,
      fullName: trimmedFullName,
      email: trimmedEmail,
      role: Number(formData.role),
      status: Number(formData.status)
    });
  };

  const isUpdate = mode === "update";

  return (
    <Modal show={show} onHide={onClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold fs-5">
          {isUpdate ? "✏️ Cập Nhật Người Dùng (Update User)" : "➕ Thêm Tài Khoản Mới (Create User)"}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body className="d-flex flex-column gap-3">
          {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}

          <Form.Group controlId="userUsername">
            <Form.Label className="small fw-semibold">
              Tên Đăng Nhập (Username) <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="VD: staff_marketing, editor_tech..."
              value={formData.username}
              onChange={handleChange}
              disabled={isUpdate && user?.username === "Admin"}
              autoFocus
              isInvalid={!!error && !formData.username.trim()}
            />
          </Form.Group>

          <Form.Group controlId="userFullName">
            <Form.Label className="small fw-semibold">
              Họ Và Tên (Full Name) <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              placeholder="VD: Nguyễn Văn A..."
              value={formData.fullName}
              onChange={handleChange}
              isInvalid={!!error && !formData.fullName.trim()}
            />
          </Form.Group>

          <Form.Group controlId="userEmail">
            <Form.Label className="small fw-semibold">
              Địa Chỉ Email <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="user@funews.edu.vn"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!error && (!formData.email.trim() || !formData.email.includes("@"))}
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group controlId="userRole">
                <Form.Label className="small fw-semibold">Vai Trò (Role)</Form.Label>
                <Form.Select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value={1}>🛡️ Quản trị viên (Admin - 1)</option>
                  <option value={2}>✍️ Biên tập viên (Staff - 2)</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="userStatus">
                <Form.Label className="small fw-semibold">Trạng Thái (Status)</Form.Label>
                <Form.Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value={1}>🟢 Kích hoạt (Active - 1)</option>
                  <option value={0}>⚪ Khóa / Ngưng (Inactive - 0)</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Hủy bỏ (Cancel)
          </Button>
          <Button variant="primary" type="submit">
            {isUpdate ? "Lưu thay đổi (Save Changes)" : "Tạo tài khoản (Create User)"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
