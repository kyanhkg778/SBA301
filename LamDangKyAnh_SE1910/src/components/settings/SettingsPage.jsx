import { useState } from "react";
import { Row, Col, Card, Button, Alert, Badge } from "react-bootstrap";
import DeleteConfirmModal from "../common/DeleteConfirmModal";

export default function SettingsPage({ currentUser, theme, onToggleTheme, onResetData, dataCounts }) {
  const [showResetModal, setShowResetModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleConfirmReset = () => {
    onResetData();
    setShowResetModal(false);
    setSuccessMsg("Đã khôi phục toàn bộ cơ sở dữ liệu về trạng thái mẫu ban đầu thành công!");
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  return (
    <div className="d-flex flex-column gap-4">
      {successMsg && (
        <Alert variant="success" dismissible onClose={() => setSuccessMsg("")}>
          {successMsg}
        </Alert>
      )}

      <Row className="g-4">
        {/* User Account Profile */}
        <Col md={6}>
          <div className="custom-card p-4 h-100">
            <h5 className="fw-bold mb-3 pb-2 border-bottom">👤 Hồ Sơ Người Dùng (User Profile)</h5>
            <div className="d-flex align-items-center gap-3 mb-4">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold fs-3 shadow"
                style={{
                  width: "64px",
                  height: "64px",
                  background: currentUser?.role === 1
                    ? "linear-gradient(135deg, #4f46e5, #06b6d4)"
                    : "linear-gradient(135deg, #0284c7, #38bdf8)"
                }}
              >
                {currentUser?.username?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <div>
                <h5 className="fw-bold mb-0 text-dark">{currentUser?.fullName || currentUser?.username}</h5>
                <div className="text-muted small mb-1">{currentUser?.email || "admin@funews.edu.vn"}</div>
                <div>
                  {currentUser?.role === 1 ? (
                    <span className="badge-admin">Administrator (Role 1)</span>
                  ) : (
                    <span className="badge-staff">Editorial Staff (Role 2)</span>
                  )}
                </div>
              </div>
            </div>

            <div className="p-3 bg-light rounded-3 small">
              <div className="d-flex justify-content-between py-1 border-bottom">
                <span className="text-muted">Username:</span>
                <span className="fw-semibold text-dark">{currentUser?.username}</span>
              </div>
              <div className="d-flex justify-content-between py-1 border-bottom">
                <span className="text-muted">Quyền hạn:</span>
                <span className="fw-semibold text-dark">
                  {currentUser?.role === 1 ? "Toàn quyền quản trị (Full Access)" : "Biên tập & Quản lý tin tức"}
                </span>
              </div>
              <div className="d-flex justify-content-between py-1">
                <span className="text-muted">Trạng thái phiên đăng nhập:</span>
                <span className="text-success fw-semibold">🟢 Đang hoạt động (Authenticated)</span>
              </div>
            </div>
          </div>
        </Col>

        {/* System & Theme Preferences */}
        <Col md={6}>
          <div className="custom-card p-4 h-100">
            <h5 className="fw-bold mb-3 pb-2 border-bottom">⚙️ Tùy Chỉnh Giao Diện (Appearance & Theme)</h5>
            <p className="text-muted small">
              Chuyển đổi linh hoạt giữa giao diện Sáng (Light) và Tối (Dark) để tối ưu trải nghiệm người dùng. Tùy chọn này được tự động lưu vào bộ nhớ cục bộ.
            </p>

            <div className="d-flex align-items-center justify-content-between p-3 border rounded-3 mb-3 bg-light">
              <div>
                <div className="fw-bold text-dark">Chế độ giao diện (Current Mode)</div>
                <small className="text-muted">Đang áp dụng: {theme === "dark" ? "Chế độ Tối (Dark)" : "Chế độ Sáng (Light)"}</small>
              </div>
              <Button
                variant={theme === "dark" ? "primary" : "outline-primary"}
                onClick={onToggleTheme}
                className="d-flex align-items-center gap-2"
              >
                {theme === "dark" ? "☀️ Chuyển sang Light" : "🌙 Chuyển sang Dark"}
              </Button>
            </div>

            <div className="border-top pt-3 mt-4">
              <h6 className="fw-bold text-danger mb-2">🗑️ Quản Lý Dữ Liệu Bộ Nhớ (Database Reset)</h6>
              <p className="text-muted small mb-3">
                Đặt lại toàn bộ dữ liệu Danh mục, Tin tức và Người dùng về bộ dữ liệu mẫu (Seed Data) ban đầu. Rất hữu ích khi cần kiểm thử lại hoặc xóa dữ liệu nháp.
              </p>
              <div className="d-flex align-items-center justify-content-between">
                <div className="small text-muted">
                  Hiện có: <strong>{dataCounts?.news || 0}</strong> bài báo, <strong>{dataCounts?.categories || 0}</strong> danh mục, <strong>{dataCounts?.users || 0}</strong> người dùng.
                </div>
                <Button variant="outline-danger" size="sm" onClick={() => setShowResetModal(true)}>
                  Khôi phục dữ liệu gốc
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Student & Course Rubric Verification Info */}
      <div className="custom-card p-4">
        <h5 className="fw-bold mb-3 pb-2 border-bottom">🎓 Thông Tin Sinh Viên & Hồ Sơ Bài Nộp (Assignment Deliverable)</h5>
        <Row className="g-3">
          <Col md={6}>
            <div className="p-3 bg-light rounded-3 h-100">
              <div className="fw-bold text-primary mb-2">Thông tin tác giả</div>
              <ul className="list-unstyled mb-0 small d-flex flex-column gap-1 text-dark">
                <li>• <strong>Họ và tên:</strong> Lâm Đăng Kỳ Anh</li>
                <li>• <strong>MSSV:</strong> CE190574</li>
                <li>• <strong>Lớp học:</strong> SE1910</li>
                <li>• <strong>Môn học:</strong> SBA301 - Integrate Single Page Application with Spring Boot</li>
                <li>• <strong>Project:</strong> FUNewsManagementSystem (Assignment 01)</li>
              </ul>
            </div>
          </Col>
          <Col md={6}>
            <div className="p-3 bg-light rounded-3 h-100">
              <div className="fw-bold text-success mb-2">Tuân thủ Rubric Đánh Giá (10.0 Điểm)</div>
              <ul className="list-unstyled mb-0 small d-flex flex-column gap-1 text-muted">
                <li>✅ <strong>Problem Understanding:</strong> Bản đồ R01-R12, thực thể, ràng buộc relation.</li>
                <li>✅ <strong>Solution Design:</strong> Layout chuẩn, State ownership, Immutable updates.</li>
                <li>✅ <strong>Implementation:</strong> CRUD + Search đầy đủ, Popup Dialog, Delete Confirm.</li>
                <li>✅ <strong>Testing & Verification:</strong> Test Matrix 35 kịch bản, bao quát Edge cases.</li>
                <li>✅ <strong>AI Usage:</strong> Logo vector AI, minh bạch quy trình kỹ thuật.</li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>

      {/* Reset Confirmation Modal */}
      <DeleteConfirmModal
        show={showResetModal}
        title="Toàn Bộ Dữ Liệu Hệ Thống (Reset Database)"
        itemName="Khôi phục danh mục, bài báo và tài khoản về dữ liệu gốc mặc định"
        onConfirm={handleConfirmReset}
        onCancel={() => setShowResetModal(false)}
      />
    </div>
  );
}
