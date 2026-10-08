import { useState, useEffect } from "react";
import { Modal, Button, Form, Alert, Row, Col } from "react-bootstrap";

export default function NewsModal({ show, mode, newsItem, categories, currentUser, onSave, onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    categoryId: "",
    status: 1,
    tagsInput: "",
    createdBy: ""
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (show) {
      if (mode === "update" && newsItem) {
        setFormData({
          title: newsItem.title || "",
          content: newsItem.content || "",
          categoryId: newsItem.categoryId !== undefined ? String(newsItem.categoryId) : "",
          status: newsItem.status !== undefined ? Number(newsItem.status) : 1,
          tagsInput: Array.isArray(newsItem.tags) ? newsItem.tags.join(", ") : "",
          createdBy: newsItem.createdBy || currentUser?.username || "Admin"
        });
      } else {
        const defaultCatId = categories.length > 0 ? String(categories[0].id) : "";
        setFormData({
          title: "",
          content: "",
          categoryId: defaultCatId,
          status: 1,
          tagsInput: "",
          createdBy: currentUser?.username || "Admin"
        });
      }
      setError("");
    }
  }, [show, mode, newsItem, categories, currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "status" ? Number(value) : value
    }));
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = formData.title.trim();
    const trimmedContent = formData.content.trim();

    if (!trimmedTitle) {
      setError("Tiêu đề bài báo không được để trống (Title is required).");
      return;
    }

    if (!trimmedContent) {
      setError("Nội dung bài báo không được để trống (Content is required).");
      return;
    }

    if (!formData.categoryId) {
      setError("Vui lòng chọn danh mục cho bài báo (Category is required).");
      return;
    }

    const tagsArray = formData.tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    onSave({
      title: trimmedTitle,
      content: trimmedContent,
      categoryId: Number(formData.categoryId),
      status: Number(formData.status),
      tags: tagsArray,
      createdBy: formData.createdBy || "Admin"
    });
  };

  const isUpdate = mode === "update";

  return (
    <Modal show={show} onHide={onClose} centered size="lg" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold fs-5">
          {isUpdate ? "✏️ Cập Nhật Bài Báo (Update News Article)" : "➕ Soạn Bài Báo Mới (Create News Article)"}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body className="d-flex flex-column gap-3">
          {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}

          <Form.Group controlId="newsTitle">
            <Form.Label className="small fw-semibold">
              Tiêu Đề Bài Báo (Article Title) <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Nhập tiêu đề tin tức nổi bật..."
              value={formData.title}
              onChange={handleChange}
              autoFocus
              isInvalid={!!error && !formData.title.trim()}
            />
            <Form.Control.Feedback type="invalid">
              Vui lòng nhập tiêu đề bài báo.
            </Form.Control.Feedback>
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group controlId="newsCategory">
                <Form.Label className="small fw-semibold">
                  Danh Mục (Category) <span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                >
                  <option value="">-- Chọn danh mục --</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name} {cat.status === 0 ? "(Tạm ẩn)" : ""}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="newsStatus">
                <Form.Label className="small fw-semibold">Trạng Thái Xuất Bản (Status)</Form.Label>
                <Form.Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value={1}>🟢 Xuất bản (Active / Published - 1)</option>
                  <option value={0}>⚪ Bản nháp (Inactive / Draft - 0)</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="newsContent">
            <Form.Label className="small fw-semibold">
              Nội Dung Bài Báo (Content) <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="content"
              placeholder="Nhập toàn văn nội dung bài báo, thông cáo báo chí hoặc thông tin sự kiện..."
              value={formData.content}
              onChange={handleChange}
              isInvalid={!!error && !formData.content.trim()}
            />
            <Form.Control.Feedback type="invalid">
              Vui lòng nhập nội dung bài báo.
            </Form.Control.Feedback>
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group controlId="newsTags">
                <Form.Label className="small fw-semibold">Tags (Nhãn phân loại, cách nhau bằng dấu phẩy)</Form.Label>
                <Form.Control
                  type="text"
                  name="tagsInput"
                  placeholder="VD: AI, Innovation, FPTU, SinhVien"
                  value={formData.tagsInput}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="newsAuthor">
                <Form.Label className="small fw-semibold">Tác Giả (Created By / Author)</Form.Label>
                <Form.Control
                  type="text"
                  name="createdBy"
                  value={formData.createdBy}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Hủy bỏ (Cancel)
          </Button>
          <Button variant="primary" type="submit">
            {isUpdate ? "Lưu thay đổi (Save Changes)" : "Xuất bản bài báo (Create Article)"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
