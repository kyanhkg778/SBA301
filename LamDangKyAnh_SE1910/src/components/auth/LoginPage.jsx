import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

// Danh sách tài khoản mẫu phục vụ kiểm thử đăng nhập (Mock Authentication)
const DEMO_ACCOUNTS = [
  {
    username: "Admin",
    password: "Admin",
    profile: {
      id: 1,
      username: "Admin",
      fullName: "System Administrator",
      email: "admin@funews.edu.vn",
      role: 1
    }
  },
  {
    username: "Staff",
    password: "Staff",
    profile: {
      id: 2,
      username: "Staff",
      fullName: "Editorial Staff Member",
      email: "staff@funews.edu.vn",
      role: 2
    }
  }
];

export default function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedUser = username.trim();
    const trimmedPass = password.trim();

    if (!trimmedUser || !trimmedPass) {
      setError("Vui lòng nhập đầy đủ Tên đăng nhập và Mật khẩu.");
      return;
    }

    // Kiểm tra thông tin đăng nhập (không phân biệt hoa/thường cho username)
    const matchedAccount = DEMO_ACCOUNTS.find(
      (acc) =>
        acc.username.toLowerCase() === trimmedUser.toLowerCase() &&
        acc.password === trimmedPass
    );

    if (matchedAccount) {
      onLoginSuccess(matchedAccount.profile);
    } else {
      setError("Tên đăng nhập hoặc mật khẩu không chính xác! (Gợi ý test: Admin / Admin)");
    }
  };

  // Điền nhanh tài khoản mẫu khi bấm nút Demo
  const handleFillDemo = (user, pass) => {
    setUsername(user);
    setPassword(pass);
    setError("");
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        {/* Logo thương hiệu */}
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
            <Form.Label className="small fw-semibold text-secondary">
              Tên đăng nhập (Username)
            </Form.Label>
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
            <Form.Label className="small fw-semibold text-secondary">
              Mật khẩu (Password)
            </Form.Label>
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

          {/* Nút điền nhanh tài khoản kiểm thử */}
          <div className="pt-3 border-top mt-2">
            <div className="small text-muted fw-semibold mb-2">
              Tài khoản kiểm thử nhanh:
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

        <div className="text-center text-muted small mt-4 pt-2 border-top">
          Sinh viên: <strong>Lâm Đăng Kỳ Anh</strong> • CE190574
        </div>
      </div>
    </div>
  );
}
