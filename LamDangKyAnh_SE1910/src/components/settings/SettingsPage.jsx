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
    <div className="d-flex flex-column gap-3">
      {successMsg && (
        <Alert variant="success" dismissible onClose={() => setSuccessMsg("")} className="py-2">
          {successMsg}
        </Alert>
      )}

      <Row className="g-3">
        {/* User Account Profile */}
        <Col md={6}>
          <div className="custom-card p-3 p-md-4 h-100">
            <h6 className="fw-bold mb-3 pb-2 border-bottom text-dark">👤 Thông tin tài khoản</h6>
            <div className="d-flex align-items-center gap-3 mb-3">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold fs-4 shadow-sm"
                style={{
                  width: "52px",
                  height: "52px",
                  background: currentUser?.role === 1
                    ? "linear-gradient(135deg, #4f46e5, #06b6d4)"
                    : "linear-gradient(135deg, #0284c7, #38bdf8)"
                }}
              >
                {currentUser?.username?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <div>
                <h6 className="fw-bold mb-0 text-dark">{currentUser?.fullName || currentUser?.username}</h6>
                <div className="text-muted small">{currentUser?.email || "admin@funews.edu.vn"}</div>
                <div className="mt-1">
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
                  {currentUser?.role === 1 ? "Toàn quyền quản trị" : "Biên tập tin tức"}
                </span>
              </div>
              <div className="d-flex justify-content-between py-1">
                <span className="text-muted">Trạng thái:</span>
                <span className="text-success fw-semibold">🟢 Đang hoạt động</span>
              </div>
            </div>
          </div>
        </Col>

        {/* System & Theme Preferences */}
        <Col md={6}>
          <div className="custom-card p-3 p-md-4 h-100">
            <h6 className="fw-bold mb-3 pb-2 border-bottom text-dark">⚙️ Tùy chọn hệ thống</h6>

            <div className="d-flex align-items-center justify-content-between p-3 border rounded-3 mb-3 bg-light">
              <div>
                <div className="fw-semibold text-dark small">Giao diện (Theme)</div>
                <small className="text-muted">Hiện tại: {theme === "dark" ? "Chế độ tối" : "Chế độ sáng"}</small>
              </div>
              <Button
                variant={theme === "dark" ? "primary" : "outline-secondary"}
                size="sm"
                onClick={onToggleTheme}
                className="d-flex align-items-center gap-1"
              >
                {theme === "dark" ? "☀️ Sáng" : "🌙 Tối"}
              </Button>
            </div>

            <div className="border-top pt-3">
              <h6 className="fw-bold text-danger mb-1 small">🗑️ Khôi phục dữ liệu gốc</h6>
              <p className="text-muted small mb-2">
                Đặt lại toàn bộ Danh mục, Bài viết và Tài khoản về dữ liệu mẫu ban đầu.
              </p>
              <div className="d-flex align-items-center justify-content-between">
                <div className="small text-muted">
                  Hiện có: {dataCounts?.news || 0} bài, {dataCounts?.categories || 0} danh mục.
                </div>
                <Button variant="outline-danger" size="sm" onClick={() => setShowResetModal(true)}>
                  Khôi phục
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Simplified Project Info Footer */}
      <div className="custom-card p-3 p-md-4">
        <h6 className="fw-bold mb-2 pb-2 border-bottom text-dark">🎓 Thông tin bài nộp</h6>
        <div className="small text-muted d-flex flex-wrap gap-4">
          <div>Sinh viên: <strong className="text-dark">Lâm Đăng Kỳ Anh</strong></div>
          <div>MSSV: <strong className="text-dark">CE190574</strong></div>
          <div>Lớp: <strong className="text-dark">SE1910</strong></div>
          <div>Môn: <strong className="text-dark">SBA301 - Lab & Assignment 01</strong></div>
        </div>
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
