import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage({ setActivePage }) {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Vui lòng nhập đầy đủ Email và Mật khẩu.');
      return;
    }

    const res = await login(email.trim(), password);
    if (res.success) {
      // Đăng nhập thành công -> chuyển trang
      setActivePage('rooms');
    } else {
      setError(res.message);
    }
  };

  // Nút điền nhanh tài khoản Staff
  const fillStaffDemo = () => {
    setEmail('staff@fuminihotel.com');
    setPassword('staff123');
    setError('');
  };

  // Nút điền nhanh tài khoản Customer
  const fillCustomerDemo = () => {
    setEmail('customer@fuminihotel.com');
    setPassword('123456');
    setError('');
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow border-0 rounded-3">
            <div className="card-body p-4 p-md-5">
              <div className="text-center mb-4">
                <div className="avatar-circle mx-auto mb-2 bg-primary text-white d-flex align-items-center justify-content-center rounded-circle" style={{ width: '60px', height: '60px', fontSize: '28px' }}>
                  <i className="bi bi-shield-lock"></i>
                </div>
                <h3 className="fw-bold">Đăng Nhập Hệ Thống</h3>
                <p className="text-muted small">
                  Xác thực JSON Web Token (JWT) theo vai trò Staff hoặc Customer
                </p>
              </div>

              {/* Thông báo lỗi */}
              {error && (
                <div className="alert alert-danger py-2 px-3 small d-flex align-items-center mb-3" role="alert">
                  <i className="bi bi-exclamation-circle-fill me-2 fs-5"></i>
                  <div>{error}</div>
                </div>
              )}

              {/* Nút hỗ trợ điền nhanh tài khoản đánh giá bài tập */}
              <div className="mb-4 p-3 bg-light rounded-3 border">
                <span className="small fw-bold text-secondary d-block mb-2">
                  <i className="bi bi-key-fill text-warning me-1"></i>Tài khoản Demo giảng viên chấm bài:
                </span>
                <div className="d-grid gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm text-start"
                    onClick={fillStaffDemo}
                  >
                    <i className="bi bi-person-badge me-1"></i>
                    <strong>Staff (Cấu hình application.properties):</strong>
                    <div className="small text-muted ps-3">staff@fuminihotel.com / staff123</div>
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm text-start"
                    onClick={fillCustomerDemo}
                  >
                    <i className="bi bi-person me-1"></i>
                    <strong>Customer (Lưu trữ CSDL SQL Server):</strong>
                    <div className="small text-muted ps-3">customer@fuminihotel.com / 123456</div>
                  </button>
                </div>
              </div>

              {/* Form đăng nhập */}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Địa chỉ Email</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label small fw-bold">Mật khẩu</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-lock"></i></span>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 fw-semibold"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Đang xác thực JWT...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-box-arrow-in-right me-1"></i> Đăng Nhập
                    </>
                  )}
                </button>
              </form>

              <div className="text-center mt-4 pt-3 border-top">
                <span className="text-muted small">Chưa có tài khoản khách hàng? </span>
                <button
                  type="button"
                  className="btn btn-link btn-sm p-0 text-decoration-none fw-semibold"
                  onClick={() => setActivePage('register')}
                >
                  Đăng ký tài khoản mới ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

