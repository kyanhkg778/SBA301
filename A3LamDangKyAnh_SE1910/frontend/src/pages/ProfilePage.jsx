import React, { useState, useEffect } from 'react';
import { authApi } from '../api/authApi';
import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { user, updateUserData } = useAuth();
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    customerFullName: '',
    telephone: '',
    customerBirthday: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await authApi.getProfile();
      setProfile(res.data);
      setFormData({
        customerFullName: res.data.customerFullName || '',
        telephone: res.data.telephone || '',
        customerBirthday: res.data.customerBirthday || '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      setError('Không thể tải thông tin hồ sơ.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (formData.newPassword) {
      if (formData.newPassword !== formData.confirmPassword) {
        setError('Mật khẩu mới và xác nhận mật khẩu không khớp.');
        return;
      }
      if (formData.newPassword.length < 6) {
        setError('Mật khẩu mới phải có tối thiểu 6 ký tự.');
        return;
      }
    }

    setSaving(true);
    try {
      const payload = {
        customerFullName: formData.customerFullName.trim(),
        telephone: formData.telephone.trim(),
        customerBirthday: formData.customerBirthday,
        newPassword: formData.newPassword ? formData.newPassword : null
      };

      const res = await authApi.updateProfile(payload);
      setMessage('Cập nhật hồ sơ cá nhân thành công!');
      updateUserData({ fullName: res.data.customerFullName });
      setFormData((prev) => ({ ...prev, newPassword: '', confirmPassword: '' }));
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể cập nhật hồ sơ cá nhân.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2 text-muted">Đang tải thông tin hồ sơ cá nhân...</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-7">
          <div className="card shadow border-0 rounded-3">
            <div className="card-header bg-primary text-white p-4">
              <div className="d-flex align-items-center">
                <div className="bg-white text-primary rounded-circle p-3 me-3 fs-3">
                  <i className="bi bi-person-badge"></i>
                </div>
                <div>
                  <h4 className="mb-0 fw-bold">Hồ Sơ Cá Nhân (My Profile)</h4>
                  <small className="text-white-50">Quản lý và cập nhật thông tin tài khoản thành viên</small>
                </div>
              </div>
            </div>

            <div className="card-body p-4 p-md-5">
              {message && (
                <div className="alert alert-success d-flex align-items-center mb-4">
                  <i className="bi bi-check-circle-fill me-2 fs-5"></i>
                  <div>{message}</div>
                </div>
              )}

              {error && (
                <div className="alert alert-danger d-flex align-items-center mb-4">
                  <i className="bi bi-exclamation-triangle-fill me-2 fs-5"></i>
                  <div>{error}</div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-bold text-secondary">Mã định danh khách hàng</label>
                    <input
                      type="text"
                      className="form-control bg-light"
                      value={`#${profile?.customerId || ''}`}
                      disabled
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-bold text-secondary">Địa chỉ Email (Định danh duy nhất)</label>
                    <input
                      type="email"
                      className="form-control bg-light"
                      value={profile?.emailAddress || ''}
                      disabled
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-bold">Họ và tên *</label>
                    <input
                      type="text"
                      name="customerFullName"
                      className="form-control"
                      value={formData.customerFullName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-bold">Số điện thoại *</label>
                    <input
                      type="tel"
                      name="telephone"
                      className="form-control"
                      value={formData.telephone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
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

                  <div className="col-12 mt-4 pt-3 border-top">
                    <h6 className="fw-bold text-secondary">
                      <i className="bi bi-key me-1"></i> Đổi Mật Khẩu (Tùy chọn)
                    </h6>
                    <small className="text-muted d-block mb-3">
                      Để trống các ô dưới đây nếu bạn không muốn thay đổi mật khẩu hiện tại.
                    </small>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-bold">Mật khẩu mới</label>
                    <input
                      type="password"
                      name="newPassword"
                      className="form-control"
                      placeholder="Tối thiểu 6 ký tự"
                      value={formData.newPassword}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-bold">Xác nhận mật khẩu mới</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      className="form-control"
                      placeholder="Nhập lại mật khẩu mới"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mt-4 pt-3 text-end border-top">
                  <button type="submit" className="btn btn-primary px-4 fw-semibold" disabled={saving}>
                    {saving ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Đang lưu...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-floppy me-1"></i> Lưu Thay Đổi
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

