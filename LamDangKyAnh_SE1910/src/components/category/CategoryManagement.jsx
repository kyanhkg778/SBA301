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
          <InputGroup size="sm">
            <InputGroup.Text className="bg-light border-end-0">🔍</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Tìm kiếm danh mục..."
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
          <span className="text-muted small">
            Tổng: <strong>{displayedCategories.length}</strong> danh mục
          </span>
          <Button variant="primary" size="sm" onClick={handleOpenCreate} className="d-flex align-items-center gap-1 px-3">
            <span>+</span> Thêm danh mục
          </Button>
        </div>
      </div>

      {/* Categories Table View */}
      <div className="custom-card overflow-hidden">
        {displayedCategories.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📁</div>
            <h6 className="fw-semibold">Không tìm thấy danh mục</h6>
            <p className="text-muted small">
              {searchTerm
                ? `Không có kết quả nào khớp với "${searchTerm}".`
                : "Chưa có danh mục nào. Hãy bấm 'Thêm danh mục' để bắt đầu."}
            </p>
            {searchTerm && (
              <Button variant="outline-primary" size="sm" onClick={() => setSearchTerm("")}>
                Xóa tìm kiếm
              </Button>
            )}
          </div>
        ) : (
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th style={{ width: "70px" }}>ID</th>
                  <th style={{ width: "220px" }}>Tên danh mục</th>
                  <th>Mô tả</th>
                  <th style={{ width: "120px" }}>Bài viết</th>
                  <th style={{ width: "130px" }}>Trạng thái</th>
                  <th style={{ width: "140px" }} className="text-end">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {displayedCategories.map((cat) => {
                  const articleCount = news.filter((n) => Number(n.categoryId) === Number(cat.id)).length;
                  return (
                    <tr key={cat.id}>
                      <td className="fw-semibold text-muted">#{cat.id}</td>
                      <td>
                        <div className="fw-semibold text-dark">{cat.name}</div>
                      </td>
                      <td className="text-muted small">
                        {cat.description || <span className="fst-italic text-secondary">Không có mô tả</span>}
                      </td>
                      <td>
                        <span className="badge bg-light text-dark border">
                          {articleCount} bài
                        </span>
                      </td>
                      <td>
                        {cat.status === 1 ? (
                          <span className="badge-active">
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16a34a" }} />
                            Hoạt động
                          </span>
                        ) : (
                          <span className="badge-inactive">
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#94a3b8" }} />
                            Tạm ẩn
                          </span>
                        )}
                      </td>
                      <td className="text-end">
                        <div className="d-flex justify-content-end gap-1">
                          <Button
                            variant="light"
                            size="sm"
                            className="border text-primary py-1 px-2"
                            onClick={() => handleOpenEdit(cat)}
                            title="Sửa danh mục"
                          >
                            ✏️ Sửa
                          </Button>
                          <Button
                            variant="light"
                            size="sm"
                            className="border text-danger py-1 px-2"
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
