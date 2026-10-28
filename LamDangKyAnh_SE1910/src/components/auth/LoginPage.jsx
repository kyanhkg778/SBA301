import { useState } from "react";
import { Form, Button, Alert, Card, Badge } from "react-bootstrap";

export default function LoginPage({ onLoginSuccess }) {
  // Quản lý state cho form đăng nhập: tài khoản, mật khẩu và thông báo lỗi
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // =========================================================================
  // XỬ LÝ SUBMIT ĐĂNG NHẬP (AUTHENTICATION & VALIDATION)
  // =========================================================================
  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn chặn reload trang mặc định của HTML Form
    const trimmedUser = username.trim();
    const trimmedPass = password.trim();

    // 1. Kiểm tra validation: Bắt buộc không được để trống tài khoản hoặc mật khẩu
    if (!trimmedUser || !trimmedPass) {
      setError("Vui lòng nhập đầy đủ Tên đăng nhập và Mật khẩu.");
      return;
    }

    // 2. Xác thực tài khoản (Mock Authentication Logic theo yêu cầu đồ án):
    // - Tài khoản Admin (Admin / Admin): Cấp quyền Quản trị viên cao nhất (Role 1)
    // - Tài khoản Staff (Staff / Staff): Cấp quyền Nhân viên biên tập (Role 2)
    if (trimmedUser.toLowerCase() === "admin" && trimmedPass === "Admin") {
      onLoginSuccess({
        id: 1,
        username: "Admin",
        fullName: "System Administrator",
        email: "admin@funews.edu.vn",
        role: 1 // Role 1: Toàn quyền quản trị hệ thống
      });
    } else if (trimmedUser.toLowerCase() === "staff" && trimmedPass === "Staff") {
      onLoginSuccess({
        id: 2,
        username: "Staff",
        fullName: "Editorial Staff Member",
        email: "staff@funews.edu.vn",
        role: 2 // Role 2: Quyền nhân viên (giới hạn quyền theo nghiệp vụ)
      });
    } else {
      // Báo lỗi nếu thông tin đăng nhập không khớp
      setError("Tên đăng nhập hoặc mật khẩu không chính xác! (Gợi ý test: Admin / Admin)");
    }
  };

  // Hàm hỗ trợ điền nhanh tài khoản demo để chấm bài hoặc kiểm thử
  const handleFillDemo = (user, pass) => {
    setUsername(user);
    setPassword(pass);
    setError(""); // Xóa thông báo lỗi cũ nếu có
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        {/* Brand Logo */}
        <div className="login-logo">
          <img src="/logo.svg" alt="FUNews Logo" />
          <div className="text-muted small mt-2">Cổng Quản Trị Hệ Thống Tin Tức</div>
        </div>

        {error && (
          <Alert variant="danger" className="py-2 small mb-3">
            ⚠️ {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <Form.Group controlId="loginUsername">
            <Form.Label className="small fw-semibold text-secondary">Tên đăng nhập (Username)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập tên đăng nhập (VD: Admin)"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (error) setError("");
              }}
              autoFocus
              className="py-2"
            />
          </Form.Group>

          <Form.Group controlId="loginPassword">
            <Form.Label className="small fw-semibold text-secondary">Mật khẩu (Password)</Form.Label>
            <Form.Control
              type="password"
              placeholder="Nhập mật khẩu (VD: Admin)"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError("");
              }}
              className="py-2"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="py-2 fw-semibold mt-2 shadow-sm">
            Đăng Nhập (Login to Admin)
          </Button>

          {/* Quick Demo Credentials */}
          <div className="pt-3 border-top mt-2">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="small text-muted fw-semibold">Tài khoản kiểm thử nhanh:</span>
            </div>
            <div className="d-flex gap-2">
              <Button
                variant="outline-primary"
                size="sm"
                className="flex-grow-1 text-truncate"
                onClick={() => handleFillDemo("Admin", "Admin")}
                type="button"
              >
                🛡️ Admin / Admin
              </Button>
              <Button
                variant="outline-secondary"
                size="sm"
                className="flex-grow-1 text-truncate"
                onClick={() => handleFillDemo("Staff", "Staff")}
                type="button"
              >
                ✍️ Staff / Staff
              </Button>
            </div>
          </div>
        </Form>

        {/* Student Credential Note */}
        <div className="text-center text-muted small mt-4 pt-2 border-top">
          Sinh viên: <strong>Lâm Đăng Kỳ Anh</strong> • CE190574
        </div>
      </div>
    </div>
  );
}
