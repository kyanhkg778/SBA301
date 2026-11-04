import React, { useState } from 'react';
import { authApi } from '../api/authApi';

export default function RegisterPage({ setActivePage }) {
  const [formData, setFormData] = useState({
    customerFullName: '',
    telephone: '',
    emailAddress: '',
    customerBirthday: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Kiểm tra mật khẩu khớp nhau
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu và xác nhận mật khẩu không trùng khớp.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Mật khẩu phải có độ dài tối thiểu 6 ký tự.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        customerFullName: formData.customerFullName.trim(),
        telephone: formData.telephone.trim(),
        emailAddress: formData.emailAddress.trim(),
        customerBirthday: formData.customerBirthday,
        password: formData.password
      };

      await authApi.register(payload);
      setSuccess('Đăng ký tài khoản thành công! Bạn có thể chuyển sang trang đăng nhập ngay.');
      setTimeout(() => {
        setActivePage('login');
      }, 2000);
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.details
        ? Object.values(err.response?.data?.details || {}).join(', ')
        : 'Đăng ký thất bại. Vui lòng kiểm tra lại thông tin nhập.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-6">
          <div className="card shadow border-0 rounded-3">
            <div className="card-body p-4 p-md-5">
              <div className="text-center mb-4">
                <div className="avatar-circle mx-auto mb-2 bg-success text-white d-flex align-items-center justify-content-center rounded-circle" style={{ width: '60px', height: '60px', fontSize: '28px' }}>
                  <i className="bi bi-person-plus-fill"></i>
                </div>
                <h3 className="fw-bold">Đăng Ký Tài Khoản Khách Hàng</h3>
                <p className="text-muted small">
                  Tạo tài khoản thành viên để đặt phòng trực tuyến và quản lý đơn đặt phòng
                </p>
              </div>

              {error && (
                <div className="alert alert-danger py-2 px-3 small d-flex align-items-center mb-3">
                  <i className="bi bi-exclamation-triangle-fill me-2 fs-5"></i>
                  <div>{error}</div>
                </div>
              )}

              {success && (
                <div className="alert alert-success py-2 px-3 small d-flex align-items-center mb-3">
                  <i className="bi bi-check-circle-fill me-2 fs-5"></i>
                  <div>{success}</div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Họ và tên *</label>
                  <input
                    type="text"
                    name="customerFullName"
                    className="form-control"
                    placeholder="Nguyễn Văn A"
                    value={formData.customerFullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label small fw-bold">Số điện thoại *</label>
                    <input
                      type="tel"
                      name="telephone"
                      className="form-control"
                      placeholder="0912345678"
                      value={formData.telephone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label small fw-bold">Ngày sinh *</label>
                    <input
                      type="date"
                      name="customerBirthday"
                      className="form-control"
                      value={formData.customerBirthday}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold">Địa chỉ Email *</label>
                  <input
                    type="email"
                    name="emailAddress"
                    className="form-control"
                    placeholder="example@gmail.com"
                    value={formData.emailAddress}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label small fw-bold">Mật khẩu *</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Tối thiểu 6 ký tự"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-4">
                    <label className="form-label small fw-bold">Xác nhận mật khẩu *</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      className="form-control"
                      placeholder="Nhập lại mật khẩu"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100 py-2 fw-semibold"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Đang xử lý đăng ký...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check2-circle me-1"></i> Hoàn Tất Đăng Ký
                    </>
                  )}
                </button>
              </form>

              <div className="text-center mt-4 pt-3 border-top">
                <span className="text-muted small">Đã có tài khoản? </span>
                <button
                  type="button"
                  className="btn btn-link btn-sm p-0 text-decoration-none fw-semibold"
                  onClick={() => setActivePage('login')}
                >
                  Đăng nhập tại đây
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

