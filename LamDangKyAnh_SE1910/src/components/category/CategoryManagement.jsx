import { useState } from "react";
import { Button, Form, InputGroup, Alert, Badge } from "react-bootstrap";
import CategoryModal from "./CategoryModal";
import DeleteConfirmModal from "../common/DeleteConfirmModal";

// Trạng thái mặc định của hộp thoại Thêm/Sửa
const INITIAL_MODAL_STATE = { show: false, mode: "create", category: null };

export default function CategoryManagement({
  categories,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
  news = []
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalState, setModalState] = useState(INITIAL_MODAL_STATE);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [alertInfo, setAlertInfo] = useState(null);

  // Hiển thị thông báo (Toast Alert) tự động ẩn sau 3.5 giây
  const showAlert = (message, variant = "success") => {
    setAlertInfo({ message, variant });
    setTimeout(() => setAlertInfo(null), 3500);
  };

  // Mở Modal ở chế độ Thêm mới (Create) hoặc Cập nhật (Update)
  const handleOpenCreate = () => setModalState({ show: true, mode: "create", category: null });
  const handleOpenEdit = (category) => setModalState({ show: true, mode: "update", category });
  const handleCloseModal = () => setModalState(INITIAL_MODAL_STATE);

  // Lưu dữ liệu từ Modal (phân nhánh theo mode)
  const handleSaveModal = (categoryData) => {
    if (modalState.mode === "create") {
      onAddCategory(categoryData);
      showAlert(`Đã thêm danh mục "${categoryData.name}" thành công!`);
    } else {
      onUpdateCategory(modalState.category.id, categoryData);
      showAlert(`Đã cập nhật danh mục "${categoryData.name}" thành công!`);
    }
    handleCloseModal();
  };

  // Xác nhận xóa Danh mục (kèm kiểm tra số bài báo đang tham chiếu categoryId)
  const handleConfirmDelete = () => {
    if (!deleteTarget) return;

    const associatedNewsCount = news.filter(
      (n) => Number(n.categoryId) === Number(deleteTarget.id)
    ).length;

    onDeleteCategory(deleteTarget.id);

    if (associatedNewsCount > 0) {
      showAlert(
        `Đã xóa danh mục "${deleteTarget.name}". Lưu ý: có ${associatedNewsCount} bài báo liên quan cần cập nhật lại danh mục.`,
        "warning"
      );
    } else {
      showAlert(`Đã xóa danh mục "${deleteTarget.name}" thành công!`);
    }
    setDeleteTarget(null);
  };

  // Tìm kiếm theo tên hoặc mô tả (Derived State - không làm thay đổi mảng categories gốc)
  const keyword = searchTerm.trim().toLowerCase();
  const displayedCategories = categories.filter((cat) => {
    if (!keyword) return true;
    return (
      cat.name?.toLowerCase().includes(keyword) ||
      cat.description?.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="d-flex flex-column gap-3">
      {alertInfo && (
        <Alert variant={alertInfo.variant} dismissible onClose={() => setAlertInfo(null)} className="py-2">
          {alertInfo.message}
        </Alert>
      )}

      {/* Thanh công cụ: Tìm kiếm & Nút Thêm mới */}
      <div className="custom-card p-3 d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
        <div className="d-flex align-items-center gap-2 flex-grow-1" style={{ maxWidth: "420px" }}>
          <InputGroup>
            <InputGroup.Text className="bg-light border-end-0">🔍</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Tìm kiếm danh mục theo tên hoặc mô tả..."
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
        </div>

        <div className="d-flex align-items-center gap-2">
          <Badge bg="secondary" className="px-3 py-2 fs-6">
            Tổng cộng: {displayedCategories.length} / {categories.length}
          </Badge>
          <Button variant="primary" onClick={handleOpenCreate} className="d-flex align-items-center gap-2">
            <span>➕</span> Thêm Danh Mục (Add Category)
          </Button>
        </div>
      </div>

      {/* Bảng danh sách Danh mục */}
      <div className="custom-card overflow-hidden">
        {displayedCategories.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📁</div>
            <h5 className="fw-semibold">Không tìm thấy danh mục nào</h5>
            <p className="text-muted small">
              {searchTerm
                ? `Không có kết quả nào khớp với từ khóa "${searchTerm}".`
                : "Chưa có danh mục nào trong hệ thống. Hãy bấm nút 'Thêm Danh Mục' để bắt đầu."}
            </p>
            {searchTerm && (
              <Button variant="outline-primary" size="sm" onClick={() => setSearchTerm("")}>
                Xóa bộ lọc tìm kiếm
              </Button>
            )}
          </div>
        ) : (
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th style={{ width: "80px" }}>ID</th>
                  <th style={{ width: "240px" }}>Tên Danh Mục (Name)</th>
                  <th>Mô Tả (Description)</th>
                  <th style={{ width: "160px" }}>Số Bài Báo</th>
                  <th style={{ width: "150px" }}>Trạng Thái</th>
                  <th style={{ width: "160px" }} className="text-end">Thao Tác</th>
                </tr>
              </thead>
              <tbody>
                {displayedCategories.map((cat) => {
                  const articleCount = news.filter(
                    (n) => Number(n.categoryId) === Number(cat.id)
                  ).length;
                  const isActive = Number(cat.status) === 1;

                  return (
                    <tr key={cat.id}>
                      <td className="fw-bold text-muted">#{cat.id}</td>
                      <td className="fw-bold text-dark">{cat.name}</td>
                      <td className="text-muted small">
                        {cat.description || <span className="fst-italic">Không có mô tả</span>}
                      </td>
                      <td>
                        <span className="badge bg-light text-dark border">
                          📄 {articleCount} bài báo
                        </span>
                      </td>
                      <td>
                        <span className={isActive ? "badge-active" : "badge-inactive"}>
                          <span
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              background: isActive ? "#16a34a" : "#94a3b8"
                            }}
                          />
                          {isActive ? "Active (1)" : "Inactive (0)"}
                        </span>
                      </td>
                      <td className="text-end">
                        <div className="d-flex justify-content-end gap-2">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => handleOpenEdit(cat)}
                            title="Sửa danh mục"
                          >
                            ✏️ Sửa
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => setDeleteTarget(cat)}
                            title="Xóa danh mục"
                          >
                            🗑️ Xóa
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Hộp thoại Thêm / Cập nhật Danh mục */}
      <CategoryModal
        show={modalState.show}
        mode={modalState.mode}
        category={modalState.category}
        onSave={handleSaveModal}
        onClose={handleCloseModal}
      />

      {/* Hộp thoại Xác nhận Xóa */}
      <DeleteConfirmModal
        show={Boolean(deleteTarget)}
        title="Danh Mục"
        itemName={deleteTarget?.name}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
