import { useState } from "react";
import { Button, Form, InputGroup, Alert, Badge, Row, Col } from "react-bootstrap";
import NewsModal from "./NewsModal";
import DeleteConfirmModal from "../common/DeleteConfirmModal";

export default function NewsManagement({ news, categories, onAddNews, onUpdateNews, onDeleteNews, currentUser }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [modalState, setModalState] = useState({ show: false, mode: "create", newsItem: null });
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, newsItem: null });
  const [alertInfo, setAlertInfo] = useState(null);

  const showAlert = (message, variant = "success") => {
    setAlertInfo({ message, variant });
    setTimeout(() => setAlertInfo(null), 3500);
  };

  // Helper map for Category Name
  const getCategoryName = (catId) => {
    const cat = categories.find((c) => Number(c.id) === Number(catId));
    return cat ? cat.name : `Danh mục #${catId}`;
  };

  // Open Create Dialog
  const handleOpenCreate = () => {
    if (categories.length === 0) {
      showAlert("Vui lòng tạo ít nhất một Danh mục trước khi thêm Bài báo.", "warning");
      return;
    }
    setModalState({ show: true, mode: "create", newsItem: null });
  };

  // Open Edit Dialog
  const handleOpenEdit = (item) => {
    setModalState({ show: true, mode: "update", newsItem: item });
  };

  // Save Modal
  const handleSaveModal = (data) => {
    if (modalState.mode === "create") {
      onAddNews(data);
      showAlert(`Đã tạo bài báo "${data.title}" thành công!`);
    } else {
      onUpdateNews(modalState.newsItem.id, data);
      showAlert(`Đã cập nhật bài báo "${data.title}" thành công!`);
    }
    setModalState({ show: false, mode: "create", newsItem: null });
  };

  // Open Delete Confirm
  const handleOpenDelete = (item) => {
    setDeleteConfirm({ show: true, newsItem: item });
  };

  // Confirm Delete
  const handleConfirmDelete = () => {
    if (deleteConfirm.newsItem) {
      onDeleteNews(deleteConfirm.newsItem.id);
      showAlert(`Đã xóa bài báo "${deleteConfirm.newsItem.title}" thành công!`);
    }
    setDeleteConfirm({ show: false, newsItem: null });
  };

  // Search and Filter logic without mutating source list
  const normalizedKeyword = searchTerm.trim().toLowerCase();
  const displayedNews = news.filter((item) => {
    const matchesKeyword =
      !normalizedKeyword ||
      item.title?.toLowerCase().includes(normalizedKeyword) ||
      item.content?.toLowerCase().includes(normalizedKeyword) ||
      (Array.isArray(item.tags) && item.tags.some((t) => t.toLowerCase().includes(normalizedKeyword)));

    const matchesCategory =
      categoryFilter === "all" || Number(item.categoryId) === Number(categoryFilter);

    const matchesStatus =
      statusFilter === "all" || Number(item.status) === Number(statusFilter);

    return matchesKeyword && matchesCategory && matchesStatus;
  });

  const handleResetFilters = () => {
    setSearchTerm("");
    setCategoryFilter("all");
    setStatusFilter("all");
  };

  return (
    <div className="d-flex flex-column gap-3">
      {/* Toast Feedback Alert */}
      {alertInfo && (
        <Alert variant={alertInfo.variant} dismissible onClose={() => setAlertInfo(null)} className="py-2">
          {alertInfo.message}
        </Alert>
      )}

      {/* Filter and Action Bar */}
      <div className="custom-card p-3">
        <Row className="g-2 align-items-center justify-content-between">
          <Col lg={5} md={6}>
            <InputGroup>
              <InputGroup.Text className="bg-light border-end-0">🔍</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Tìm kiếm bài báo theo tiêu đề, nội dung, thẻ tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-start-0"
              />
              {searchTerm && (
                <Button variant="outline-secondary" onClick={() => setSearchTerm("")}>
                  ✕
                </Button>
              )}
            </InputGroup>
          </Col>

          <Col lg={3} md={3} sm={6}>
            <Form.Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">-- Tất cả danh mục --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col lg={2} md={3} sm={6}>
            <Form.Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">-- Tất cả trạng thái --</option>
              <option value="1">🟢 Xuất bản (Active)</option>
              <option value="0">⚪ Bản nháp (Inactive)</option>
            </Form.Select>
          </Col>

          <Col lg={2} className="text-lg-end mt-2 mt-lg-0">
            <Button variant="primary" onClick={handleOpenCreate} className="w-100 d-flex align-items-center justify-content-center gap-1">
              <span>➕</span> Viết Bài Mới
            </Button>
          </Col>
        </Row>
      </div>

      {/* News Table / List View */}
      <div className="custom-card overflow-hidden">
        {displayedNews.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📰</div>
            <h5 className="fw-semibold">Không tìm thấy bài báo nào</h5>
            <p className="text-muted small">
              {searchTerm || categoryFilter !== "all" || statusFilter !== "all"
                ? "Không có bài báo nào phù hợp với bộ lọc hiện tại."
                : "Chưa có bài báo nào được tạo. Hãy nhấn 'Viết Bài Mới' để bắt đầu."}
            </p>
            {(searchTerm || categoryFilter !== "all" || statusFilter !== "all") && (
              <Button variant="outline-primary" size="sm" onClick={handleResetFilters}>
                Đặt lại toàn bộ bộ lọc (Reset Filters)
              </Button>
            )}
          </div>
        ) : (
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th style={{ width: "70px" }}>ID</th>
                  <th style={{ minWidth: "280px" }}>Tiêu Đề & Tóm Tắt</th>
                  <th style={{ width: "170px" }}>Danh Mục</th>
                  <th style={{ width: "130px" }}>Tác Giả</th>
                  <th style={{ width: "140px" }}>Trạng Thái</th>
                  <th style={{ width: "130px" }}>Ngày Đăng</th>
                  <th style={{ width: "150px" }} className="text-end">Thao Tác</th>
                </tr>
              </thead>
              <tbody>
                {displayedNews.map((item) => (
                  <tr key={item.id}>
                    <td className="fw-bold text-muted">#{item.id}</td>
                    <td>
                      <div className="fw-bold text-dark mb-1">{item.title}</div>
                      <div className="text-muted small text-truncate" style={{ maxWidth: "420px" }}>
                        {item.content}
                      </div>
                      {Array.isArray(item.tags) && item.tags.length > 0 && (
                        <div className="d-flex flex-wrap gap-1 mt-1">
                          {item.tags.map((tag, idx) => (
                            <span key={idx} className="badge bg-light text-secondary border" style={{ fontSize: "0.7rem" }}>
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </td>
                    <td>
                      <span className="badge bg-light text-primary border">
                        📁 {getCategoryName(item.categoryId)}
                      </span>
                    </td>
                    <td>
                      <span className="text-dark small fw-semibold">
                        👤 {item.createdBy || "Admin"}
                      </span>
                    </td>
                    <td>
                      {item.status === 1 ? (
                        <span className="badge-active">
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16a34a" }} />
                          Published (1)
                        </span>
                      ) : (
                        <span className="badge-inactive">
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#94a3b8" }} />
                          Draft (0)
                        </span>
                      )}
                    </td>
                    <td className="text-muted small">
                      {item.createdAt || "Hôm nay"}
                    </td>
                    <td className="text-end">
                      <div className="d-flex justify-content-end gap-2">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleOpenEdit(item)}
                          title="Sửa bài báo"
                        >
                          ✏️ Sửa
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleOpenDelete(item)}
                          title="Xóa bài báo"
                        >
                          🗑️ Xóa
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* News Modal */}
      <NewsModal
        show={modalState.show}
        mode={modalState.mode}
        newsItem={modalState.newsItem}
        categories={categories}
        currentUser={currentUser}
        onSave={handleSaveModal}
        onClose={() => setModalState({ show: false, mode: "create", newsItem: null })}
      />

      {/* Delete Confirmation */}
      <DeleteConfirmModal
        show={deleteConfirm.show}
        title="Bài Báo"
        itemName={deleteConfirm.newsItem?.title}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteConfirm({ show: false, newsItem: null })}
      />
    </div>
  );
}
