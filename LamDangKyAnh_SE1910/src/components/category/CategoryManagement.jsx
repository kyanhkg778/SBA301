import { useState } from "react";
import { Button, Form, InputGroup, Table, Alert, Badge } from "react-bootstrap";
import CategoryModal from "./CategoryModal";
import DeleteConfirmModal from "../common/DeleteConfirmModal";

export default function CategoryManagement({ categories, onAddCategory, onUpdateCategory, onDeleteCategory, news = [] }) {
  // 1. Quản lý State cục bộ: từ khóa tìm kiếm, trạng thái mở Modal, Modal xác nhận xóa, thông báo Toast
  const [searchTerm, setSearchTerm] = useState("");
  const [modalState, setModalState] = useState({ show: false, mode: "create", category: null });
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, category: null });
  const [alertInfo, setAlertInfo] = useState(null);

  // Hiển thị thông báo tạm thời và tự động ẩn sau 3.5 giây
  const showAlert = (message, variant = "success") => {
    setAlertInfo({ message, variant });
    setTimeout(() => setAlertInfo(null), 3500);
  };

  // Mở popup Thêm mới danh mục
  const handleOpenCreate = () => {
    setModalState({ show: true, mode: "create", category: null });
  };

  // Mở popup Cập nhật danh mục với dữ liệu hiện tại
  const handleOpenEdit = (category) => {
    setModalState({ show: true, mode: "update", category });
  };

  // =========================================================================
  // XỬ LÝ LƯU DANH MỤC (CREATE / UPDATE HANDLER)
  // Phân biệt chế độ tạo mới hay cập nhật dựa vào modalState.mode
  // =========================================================================
  const handleSaveModal = (categoryData) => {
    if (modalState.mode === "create") {
      onAddCategory(categoryData);
      showAlert(`Đã thêm danh mục "${categoryData.name}" thành công!`);
    } else {
      onUpdateCategory(modalState.category.id, categoryData);
      showAlert(`Đã cập nhật danh mục "${categoryData.name}" thành công!`);
    }
    setModalState({ show: false, mode: "create", category: null });
  };

  // Mở dialog xác nhận xóa danh mục
  const handleOpenDelete = (category) => {
    setDeleteConfirm({ show: true, category });
  };

  // =========================================================================
  // XỬ LÝ XÓA DANH MỤC & RÀNG BUỘC TOÀN VẸN DỮ LIỆU (CASCADE CHECK)
  // Kiểm tra xem danh mục đang xóa có bài báo nào đang tham chiếu đến không
  // =========================================================================
  const handleConfirmDelete = () => {
    if (deleteConfirm.category) {
      const catId = deleteConfirm.category.id;
      // Đếm số lượng bài báo thuộc danh mục này
      const associatedNewsCount = news.filter((n) => Number(n.categoryId) === Number(catId)).length;
      
      onDeleteCategory(catId);
      // Nếu có bài báo liên quan, cảnh báo người dùng cập nhật lại bài báo
      if (associatedNewsCount > 0) {
        showAlert(
          `Đã xóa danh mục "${deleteConfirm.category.name}". Lưu ý: có ${associatedNewsCount} bài báo liên quan cần cập nhật lại danh mục.`,
          "warning"
        );
      } else {
        showAlert(`Đã xóa danh mục "${deleteConfirm.category.name}" thành công!`);
      }
    }
    setDeleteConfirm({ show: false, category: null });
  };

  // =========================================================================
  // TÌM KIẾM DỮ LIỆU DANH MỤC (CLIENT-SIDE SEARCH FILTER)
  // Chuẩn hóa từ khóa về chữ thường (trim & toLowerCase) để tìm kiếm không phân biệt hoa/thường
  // Không làm thay đổi mảng gốc (categories), chỉ tính toán lại mảng hiển thị (displayedCategories)
  // =========================================================================
  const normalizedKeyword = searchTerm.trim().toLowerCase();
  const displayedCategories = categories.filter((cat) => {
    if (!normalizedKeyword) return true; // Nếu không nhập từ khóa thì lấy tất cả
    const nameMatch = cat.name?.toLowerCase().includes(normalizedKeyword);
    const descMatch = cat.description?.toLowerCase().includes(normalizedKeyword);
    return nameMatch || descMatch; // Khớp với tên hoặc mô tả
  });

  return (
    <div className="d-flex flex-column gap-3">
      {/* Toast Feedback Alert */}
      {alertInfo && (
        <Alert variant={alertInfo.variant} dismissible onClose={() => setAlertInfo(null)} className="py-2">
          {alertInfo.message}
        </Alert>
      )}

      {/* Action Header: Search & Create Button */}
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

      {/* Categories Table View */}
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
                  const articleCount = news.filter((n) => Number(n.categoryId) === Number(cat.id)).length;
                  return (
                    <tr key={cat.id}>
                      <td className="fw-bold text-muted">#{cat.id}</td>
                      <td>
                        <div className="fw-bold text-dark">{cat.name}</div>
                      </td>
                      <td className="text-muted small">
                        {cat.description || <span className="fst-italic">Không có mô tả</span>}
                      </td>
                      <td>
                        <span className="badge bg-light text-dark border">
                          📄 {articleCount} bài báo
                        </span>
                      </td>
                      <td>
                        {cat.status === 1 ? (
                          <span className="badge-active">
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16a34a" }} />
                            Active (1)
                          </span>
                        ) : (
                          <span className="badge-inactive">
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#94a3b8" }} />
                            Inactive (0)
                          </span>
                        )}
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
                            onClick={() => handleOpenDelete(cat)}
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

      {/* Popup Dialog for Create/Update */}
      <CategoryModal
        show={modalState.show}
        mode={modalState.mode}
        category={modalState.category}
        onSave={handleSaveModal}
        onClose={() => setModalState({ show: false, mode: "create", category: null })}
      />

      {/* Confirmation Dialog for Delete */}
      <DeleteConfirmModal
        show={deleteConfirm.show}
        title="Danh Mục"
        itemName={deleteConfirm.category?.name}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteConfirm({ show: false, category: null })}
      />
    </div>
  );
}
