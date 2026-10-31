import { useState } from "react";
import { Button, Form, InputGroup, Alert, Badge, Row, Col } from "react-bootstrap";
import NewsModal from "./NewsModal";
import DeleteConfirmModal from "../common/DeleteConfirmModal";

export default function NewsManagement({ news, categories, onAddNews, onUpdateNews, onDeleteNews, currentUser }) {
  // 1. Quản lý State cho tìm kiếm, bộ lọc danh mục, bộ lọc trạng thái và popup modal
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [modalState, setModalState] = useState({ show: false, mode: "create", newsItem: null });
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, newsItem: null });
  const [alertInfo, setAlertInfo] = useState(null);

  // Hiển thị thông báo Toast trong 3.5s
  const showAlert = (message, variant = "success") => {
    setAlertInfo({ message, variant });
    setTimeout(() => setAlertInfo(null), 3500);
  };

  // Hàm tra cứu tên danh mục dựa vào categoryId (Foreign Key Lookup)
  const getCategoryName = (catId) => {
    const cat = categories.find((c) => Number(c.id) === Number(catId));
    return cat ? cat.name : `Danh mục #${catId}`;
  };

  // =========================================================================
  // XỬ LÝ MỞ MODAL & KIỂM TRA RÀNG BUỘC NGHIỆP VỤ (BUSINESS RULE)
  // Bắt buộc phải có ít nhất 1 danh mục mới được phép tạo bài báo mới
  // =========================================================================
  const handleOpenCreate = () => {
    if (categories.length === 0) {
      showAlert("Vui lòng tạo ít nhất một Danh mục trước khi thêm Bài báo.", "warning");
      return;
    }
    setModalState({ show: true, mode: "create", newsItem: null });
  };

  // Mở popup chỉnh sửa bài báo
  const handleOpenEdit = (item) => {
    setModalState({ show: true, mode: "update", newsItem: item });
  };

  // =========================================================================
  // XỬ LÝ LƯU BÀI BÁO (CREATE HOẶC UPDATE)
  // =========================================================================
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

  // Mở popup xác nhận xóa bài báo
  const handleOpenDelete = (item) => {
    setDeleteConfirm({ show: true, newsItem: item });
  };

  // Xác nhận xóa bài báo khỏi hệ thống
  const handleConfirmDelete = () => {
    if (deleteConfirm.newsItem) {
      onDeleteNews(deleteConfirm.newsItem.id);
      showAlert(`Đã xóa bài báo "${deleteConfirm.newsItem.title}" thành công!`);
    }
    setDeleteConfirm({ show: false, newsItem: null });
  };

  // =========================================================================
  // BỘ LỌC ĐA TIÊU CHÍ (MULTI-CRITERIA FILTERING)
  // Kết hợp đồng thời 3 điều kiện: Từ khóa + Danh mục + Trạng thái xuất bản
  // Không làm biến đổi (mutate) mảng gốc `news`
  // =========================================================================
  const normalizedKeyword = searchTerm.trim().toLowerCase();
  const displayedNews = news.filter((item) => {
    // 1. Kiểm tra từ khóa: Tìm trong Tiêu đề (title), Nội dung (content) hoặc Mảng Thẻ (tags)
    const matchesKeyword =
      !normalizedKeyword ||
      item.title?.toLowerCase().includes(normalizedKeyword) ||
      item.content?.toLowerCase().includes(normalizedKeyword) ||
      (Array.isArray(item.tags) && item.tags.some((t) => t.toLowerCase().includes(normalizedKeyword)));

    // 2. Kiểm tra bộ lọc Danh mục (Category): Lấy "all" hoặc so khớp categoryId
    const matchesCategory =
      categoryFilter === "all" || Number(item.categoryId) === Number(categoryFilter);

    // 3. Kiểm tra bộ lọc Trạng thái: 1 (Published), 0 (Draft) hoặc "all"
    const matchesStatus =
      statusFilter === "all" || Number(item.status) === Number(statusFilter);

    // Bài viết phải thỏa mãn đồng thời cả 3 điều kiện trên
    return matchesKeyword && matchesCategory && matchesStatus;
  });

  // Reset toàn bộ bộ lọc về trạng thái ban đầu
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
          <Col lg={5} md={5}>
            <InputGroup size="sm">
              <InputGroup.Text className="bg-light border-end-0">🔍</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Tìm bài viết theo tiêu đề, nội dung, tag..."
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
              size="sm"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">Tất cả danh mục</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col lg={2} md={2} sm={6}>
            <Form.Select
              size="sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="1">Xuất bản</option>
              <option value="0">Bản nháp</option>
            </Form.Select>
          </Col>

          <Col lg={2} md={2} className="text-md-end mt-2 mt-md-0">
            <Button variant="primary" size="sm" onClick={handleOpenCreate} className="w-100 d-flex align-items-center justify-content-center gap-1">
              <span>+</span> Viết bài
            </Button>
          </Col>
        </Row>
      </div>

      {/* News Table / List View */}
      <div className="custom-card overflow-hidden">
        {displayedNews.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📰</div>
            <h6 className="fw-semibold">Không tìm thấy bài viết</h6>
            <p className="text-muted small">
              {searchTerm || categoryFilter !== "all" || statusFilter !== "all"
                ? "Không có bài viết nào phù hợp với bộ lọc hiện tại."
                : "Chưa có bài viết nào. Hãy nhấn 'Viết bài' để bắt đầu."}
            </p>
            {(searchTerm || categoryFilter !== "all" || statusFilter !== "all") && (
              <Button variant="outline-primary" size="sm" onClick={handleResetFilters}>
                Đặt lại bộ lọc
              </Button>
            )}
          </div>
        ) : (
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th style={{ width: "60px" }}>ID</th>
                  <th style={{ minWidth: "260px" }}>Tiêu đề & Nội dung</th>
                  <th style={{ width: "150px" }}>Danh mục</th>
                  <th style={{ width: "120px" }}>Tác giả</th>
                  <th style={{ width: "120px" }}>Trạng thái</th>
                  <th style={{ width: "110px" }}>Ngày tạo</th>
                  <th style={{ width: "130px" }} className="text-end">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {displayedNews.map((item) => (
                  <tr key={item.id}>
                    <td className="fw-semibold text-muted">#{item.id}</td>
                    <td>
                      <div className="fw-semibold text-dark mb-1">{item.title}</div>
                      <div className="text-muted small text-truncate" style={{ maxWidth: "400px" }}>
                        {item.content}
                      </div>
                      {Array.isArray(item.tags) && item.tags.length > 0 && (
                        <div className="d-flex flex-wrap gap-1 mt-1">
                          {item.tags.map((tag, idx) => (
                            <span key={idx} className="badge bg-light text-secondary border" style={{ fontSize: "0.68rem" }}>
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </td>
                    <td>
                      <span className="badge bg-light text-primary border">
                        {getCategoryName(item.categoryId)}
                      </span>
                    </td>
                    <td>
                      <span className="text-dark small">
                        {item.createdBy || "Admin"}
                      </span>
                    </td>
                    <td>
                      {item.status === 1 ? (
                        <span className="badge-active">
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16a34a" }} />
                          Xuất bản
                        </span>
                      ) : (
                        <span className="badge-inactive">
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#94a3b8" }} />
                          Bản nháp
                        </span>
                      )}
                    </td>
                    <td className="text-muted small">
                      {item.createdAt || "Hôm nay"}
                    </td>
                    <td className="text-end">
                      <div className="d-flex justify-content-end gap-1">
                        <Button
                          variant="light"
                          size="sm"
                          className="border text-primary py-1 px-2"
                          onClick={() => handleOpenEdit(item)}
                          title="Sửa bài viết"
                        >
                          ✏️ Sửa
                        </Button>
                        <Button
                          variant="light"
                          size="sm"
                          className="border text-danger py-1 px-2"
                          onClick={() => handleOpenDelete(item)}
                          title="Xóa bài viết"
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
