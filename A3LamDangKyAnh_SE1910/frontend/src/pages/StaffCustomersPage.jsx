import React, { useState, useEffect } from 'react';
import { customerApi } from '../api/customerApi';
import Modal from '../components/Modal';

export default function StaffCustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionAlert, setActionAlert] = useState(null);

  // Tìm kiếm
  const [searchQuery, setSearchQuery] = useState('');

  // Modal Thêm / Sửa
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [formData, setFormData] = useState({
    customerFullName: '',
    telephone: '',
    emailAddress: '',
    customerBirthday: '',
    customerStatus: 1,
    password: ''
  });

  // Modal Xóa
  const [deletingCustomer, setDeletingCustomer] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchCustomers = async (query = '') => {
    setLoading(true);
    setError('');
    try {
      const res = await customerApi.getCustomers(query);
      setCustomers(res.data);
    } catch (err) {
      setError('Không thể tải danh sách khách hàng.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCustomers(searchQuery.trim());
  };

  const handleOpenAddModal = () => {
    setEditingCustomer(null);
    setFormData({
      customerFullName: '',
      telephone: '',
      emailAddress: '',
      customerBirthday: '',
      customerStatus: 1,
      password: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (c) => {
    setEditingCustomer(c);
    setFormData({
      customerFullName: c.customerFullName,
      telephone: c.telephone || '',
      emailAddress: c.emailAddress,
      customerBirthday: c.customerBirthday || '',
      customerStatus: c.customerStatus,
      password: ''
    });
    setIsModalOpen(true);
  };

  const handleSaveCustomer = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (editingCustomer) {
        await customerApi.updateCustomer(editingCustomer.customerId, formData);
        setActionAlert({ type: 'success', text: `Cập nhật thông tin khách hàng '${formData.customerFullName}' thành công!` });
      } else {
        await customerApi.createCustomer(formData);
        setActionAlert({ type: 'success', text: `Thêm mới khách hàng '${formData.customerFullName}' thành công!` });
      }
      setIsModalOpen(false);
      fetchCustomers(searchQuery);
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.details
        ? Object.values(err.response?.data?.details || {}).join(', ')
        : 'Có lỗi xảy ra khi lưu khách hàng.';
      setError(msg);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingCustomer) return;
    setIsDeleting(true);
    try {
      const res = await customerApi.deleteCustomer(deletingCustomer.customerId);
      setActionAlert({ type: 'info', text: res.data.message || 'Thực hiện thao tác thành công.' });
      setDeletingCustomer(null);
      fetchCustomers(searchQuery);
    } catch (err) {
      setActionAlert({ type: 'danger', text: err.response?.data?.message || 'Có lỗi xảy ra khi xóa khách hàng.' });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-header bg-dark text-white p-3 d-flex justify-content-between align-items-center">
          <div>
            <h4 className="mb-0 fw-bold">
              <i className="bi bi-people-fill me-2 text-warning"></i> Quản Lý Khách Hàng (Staff Role)
            </h4>
            <small className="text-secondary">Tìm kiếm, thêm mới, phân quyền và quản lý tài khoản khách hàng</small>
          </div>
          <button className="btn btn-warning fw-bold" onClick={handleOpenAddModal}>
            <i className="bi bi-person-plus-fill me-1"></i> Thêm Khách Hàng
          </button>
        </div>

        <div className="card-body p-4">
          {actionAlert && (
            <div className={`alert alert-${actionAlert.type} alert-dismissible fade show d-flex align-items-center mb-4 shadow-sm`} role="alert">
              <i className="bi bi-info-circle-fill me-2 fs-5"></i>
              <div>{actionAlert.text}</div>
              <button type="button" className="btn-close" onClick={() => setActionAlert(null)}></button>
            </div>
          )}

          {error && (
            <div className="alert alert-danger d-flex align-items-center mb-4">
              <i className="bi bi-exclamation-triangle-fill me-2 fs-5"></i>
              <div>{error}</div>
            </div>
          )}

          {/* Form tìm kiếm */}
          <form onSubmit={handleSearch} className="row g-2 mb-4">
            <div className="col-md-10">
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-search"></i></span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tìm kiếm theo Tên, Email hoặc Số điện thoại..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-2 d-flex gap-1">
              <button type="submit" className="btn btn-primary flex-grow-1">
                Tìm kiếm
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => { setSearchQuery(''); fetchCustomers(''); }}
                title="Làm mới"
              >
                <i className="bi bi-arrow-clockwise"></i>
              </button>
            </div>
          </form>

          {/* Bảng danh sách khách hàng */}
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status"></div>
              <p className="mt-2 text-muted">Đang tải danh sách khách hàng...</p>
            </div>
          ) : customers.length === 0 ? (
            <div className="text-center py-5 bg-light rounded-3">
              <h5 className="text-secondary">Không tìm thấy khách hàng nào.</h5>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle border">
                <thead className="table-light">
                  <tr>
                    <th>Mã ID</th>
                    <th>Họ và tên</th>
                    <th>Email</th>
                    <th>Số điện thoại</th>
                    <th>Ngày sinh</th>
                    <th>Trạng thái</th>
                    <th className="text-center">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((c) => (
                    <tr key={c.customerId}>
                      <td>#{c.customerId}</td>
                      <td className="fw-bold text-primary">
                        <i className="bi bi-person me-1"></i>
                        {c.customerFullName}
                      </td>
                      <td>{c.emailAddress}</td>
                      <td>{c.telephone || '-'}</td>
                      <td>{c.customerBirthday || '-'}</td>
                      <td>
                        {c.customerStatus === 1 ? (
                          <span className="badge bg-success">Active (1)</span>
                        ) : (
                          <span className="badge bg-secondary">Inactive (0)</span>
                        )}
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-outline-primary btn-sm me-2"
                          onClick={() => handleOpenEditModal(c)}
                        >
                          <i className="bi bi-pencil"></i> Sửa
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => setDeletingCustomer(c)}
                        >
                          <i className="bi bi-trash"></i> Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal Thêm / Chỉnh Sửa Khách Hàng */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCustomer ? `Chỉnh Sửa Khách Hàng #${editingCustomer.customerId}` : 'Thêm Khách Hàng Mới'}
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Hủy</button>
            <button className="btn btn-primary fw-semibold" onClick={handleSaveCustomer}>
              <i className="bi bi-floppy me-1"></i> Lưu Khách Hàng
            </button>
          </>
        }
      >
        <form onSubmit={handleSaveCustomer}>
          <div className="row g-3">
            <div className="col-12">
              <label className="form-label small fw-bold">Họ và tên *</label>
              <input
                type="text"
                className="form-control"
                value={formData.customerFullName}
                onChange={(e) => setFormData({ ...formData, customerFullName: e.target.value })}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-bold">Email *</label>
              <input
                type="email"
                className="form-control"
                value={formData.emailAddress}
                onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-bold">Số điện thoại</label>
              <input
                type="tel"
                className="form-control"
                value={formData.telephone}
                onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-bold">Ngày sinh</label>
              <input
                type="date"
                className="form-control"
                value={formData.customerBirthday}
                onChange={(e) => setFormData({ ...formData, customerBirthday: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-bold">Trạng thái tài khoản *</label>
              <select
                className="form-select"
                value={formData.customerStatus}
                onChange={(e) => setFormData({ ...formData, customerStatus: Number(e.target.value) })}
              >
                <option value={1}>1 - Đang hoạt động (Active)</option>
                <option value={0}>0 - Khóa / Tạm dừng (Inactive)</option>
              </select>
            </div>
            <div className="col-12">
              <label className="form-label small fw-bold">
                {editingCustomer ? 'Mật khẩu mới (Để trống nếu không đổi)' : 'Mật khẩu (Mặc định: 123456)'}
              </label>
              <input
                type="password"
                className="form-control"
                placeholder={editingCustomer ? 'Nhập mật khẩu mới...' : 'Mặc định: 123456'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>
        </form>
      </Modal>

      {/* Modal Xác Nhận Xóa */}
      <Modal
        isOpen={Boolean(deletingCustomer)}
        onClose={() => setDeletingCustomer(null)}
        title="Xác Nhận Xóa Khách Hàng"
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setDeletingCustomer(null)} disabled={isDeleting}>
              Hủy
            </button>
            <button className="btn btn-danger fw-bold" onClick={handleConfirmDelete} disabled={isDeleting}>
              {isDeleting ? 'Đang thực hiện...' : 'Xác Nhận Xóa'}
            </button>
          </>
        }
      >
        {deletingCustomer && (
          <div>
            <p>
              Bạn có chắc chắn muốn xóa khách hàng <strong>{deletingCustomer.customerFullName}</strong> ({deletingCustomer.emailAddress})?
            </p>
            <small className="text-muted d-block">
              * Ghi chú: Nếu khách hàng đã từng phát sinh đơn đặt phòng, hệ thống sẽ tự động chuyển trạng thái tài khoản sang Inactive (0) để bảo toàn lịch sử giao dịch.
            </small>
          </div>
        )}
      </Modal>
    </div>
  );
}

