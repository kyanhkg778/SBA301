import React, { useState, useEffect } from 'react';
import { bookingApi } from '../api/bookingApi';
import Modal from '../components/Modal';

export default function StaffBookingsPage({ setActivePage }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionAlert, setActionAlert] = useState(null);

  // Bộ lọc
  const [selectedStatus, setSelectedStatus] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  // Modal Chi Tiết
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Modal Đổi Trạng Thái
  const [statusUpdatingBooking, setStatusUpdatingBooking] = useState(null);
  const [newStatus, setNewStatus] = useState(1);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (selectedStatus !== '') params.status = selectedStatus;
      if (fromDate) params.fromDate = fromDate;
      if (toDate) params.toDate = toDate;

      const res = await bookingApi.getAllBookings(params);
      setBookings(res.data);
    } catch (err) {
      setError('Không thể tải danh sách đơn đặt phòng.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    fetchBookings();
  };

  const handleOpenStatusModal = (booking) => {
    setStatusUpdatingBooking(booking);
    setNewStatus(booking.bookingStatus);
  };

  const handleSaveStatus = async () => {
    if (!statusUpdatingBooking) return;
    setIsUpdating(true);
    try {
      await bookingApi.updateBookingStatus(statusUpdatingBooking.bookingReservationId, newStatus);
      setActionAlert({
        type: 'success',
        text: `Cập nhật trạng thái đơn #${statusUpdatingBooking.bookingReservationId} thành công!`
      });
      setStatusUpdatingBooking(null);
      fetchBookings();
    } catch (err) {
      setActionAlert({
        type: 'danger',
        text: err.response?.data?.message || 'Có lỗi xảy ra khi cập nhật trạng thái đơn.'
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 1:
        return <span className="badge bg-success px-2 py-1"><i className="bi bi-check-circle me-1"></i>Đã xác nhận (1)</span>;
      case 2:
        return <span className="badge bg-primary px-2 py-1"><i className="bi bi-flag me-1"></i>Hoàn thành (2)</span>;
      case 0:
        return <span className="badge bg-danger px-2 py-1"><i className="bi bi-x-circle me-1"></i>Đã hủy (0)</span>;
      default:
        return <span className="badge bg-secondary px-2 py-1">Không xác định</span>;
    }
  };

  return (
    <div className="container py-4">
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-header bg-dark text-white p-3 d-flex justify-content-between align-items-center">
          <div>
            <h4 className="mb-0 fw-bold">
              <i className="bi bi-receipt me-2 text-warning"></i> Quản Lý Đơn Đặt Phòng (Staff Role)
            </h4>
            <small className="text-secondary">Theo dõi, kiểm tra chi tiết các phòng đặt và cập nhật tiến độ thanh toán</small>
          </div>
          <button className="btn btn-warning fw-bold" onClick={() => setActivePage('book')}>
            <i className="bi bi-plus-circle me-1"></i> Tạo Đơn Offline
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

          {/* Bộ lọc tìm kiếm */}
          <form onSubmit={handleFilter} className="row g-2 align-items-end mb-4">
            <div className="col-md-3">
              <label className="form-label small fw-bold text-secondary">Trạng thái đơn</label>
              <select
                className="form-select"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">-- Tất cả trạng thái --</option>
                <option value="1">1 - Đã xác nhận (Confirmed)</option>
                <option value="2">2 - Hoàn thành (Completed)</option>
                <option value="0">0 - Đã hủy (Cancelled)</option>
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label small fw-bold text-secondary">Từ ngày đặt</label>
              <input
                type="date"
                className="form-control"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label small fw-bold text-secondary">Đến ngày đặt</label>
              <input
                type="date"
                className="form-control"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>

            <div className="col-md-3 d-flex gap-1">
              <button type="submit" className="btn btn-primary flex-grow-1">
                <i className="bi bi-funnel me-1"></i> Lọc đơn
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => { setSelectedStatus(''); setFromDate(''); setToDate(''); setTimeout(fetchBookings, 0); }}
                title="Làm mới"
              >
                <i className="bi bi-arrow-clockwise"></i>
              </button>
            </div>
          </form>

          {/* Bảng danh sách đơn đặt phòng */}
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status"></div>
              <p className="mt-2 text-muted">Đang tải danh sách đơn đặt phòng...</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-5 bg-light rounded-3">
              <h5 className="text-secondary">Không tìm thấy đơn đặt phòng nào.</h5>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle border">
                <thead className="table-light">
                  <tr>
                    <th>Mã đơn</th>
                    <th>Khách hàng</th>
                    <th>Email liên hệ</th>
                    <th>Ngày đặt</th>
                    <th>Số phòng</th>
                    <th className="text-end">Tổng tiền</th>
                    <th>Trạng thái</th>
                    <th className="text-center">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.bookingReservationId}>
                      <td className="fw-bold text-primary">#{b.bookingReservationId}</td>
                      <td>
                        <span className="fw-semibold">{b.customerFullName || 'Khách vãng lai'}</span>
                      </td>
                      <td className="text-muted small">{b.customerEmail}</td>
                      <td>{b.bookingDate}</td>
                      <td>
                        <span className="badge bg-light text-dark border">
                          {b.details ? b.details.length : 0} phòng
                        </span>
                      </td>
                      <td className="text-end fw-bold text-danger">
                        {Number(b.totalPrice).toLocaleString('vi-VN')} đ
                      </td>
                      <td>{getStatusBadge(b.bookingStatus)}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-outline-primary btn-sm me-2"
                          onClick={() => setSelectedBooking(b)}
                          title="Xem chi tiết đơn"
                        >
                          <i className="bi bi-eye"></i> Chi tiết
                        </button>
                        <button
                          className="btn btn-outline-warning btn-sm"
                          onClick={() => handleOpenStatusModal(b)}
                          title="Cập nhật trạng thái"
                        >
                          <i className="bi bi-arrow-repeat"></i> Trạng thái
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

      {/* Modal Xem Chi Tiết Đơn Đặt Phòng */}
      <Modal
        isOpen={Boolean(selectedBooking)}
        onClose={() => setSelectedBooking(null)}
        title={`Chi Tiết Đơn Đặt Phòng #${selectedBooking?.bookingReservationId}`}
        size="lg"
        footer={
          <button className="btn btn-secondary" onClick={() => setSelectedBooking(null)}>
            Đóng
          </button>
        }
      >
        {selectedBooking && (
          <div>
            <div className="row g-3 mb-4 p-3 bg-light rounded-3">
              <div className="col-md-6">
                <span className="text-muted small d-block">Khách hàng đặt:</span>
                <strong>{selectedBooking.customerFullName}</strong> ({selectedBooking.customerEmail})
              </div>
              <div className="col-md-3">
                <span className="text-muted small d-block">Ngày đặt:</span>
                <strong>{selectedBooking.bookingDate}</strong>
              </div>
              <div className="col-md-3">
                <span className="text-muted small d-block">Trạng thái:</span>
                <div>{getStatusBadge(selectedBooking.bookingStatus)}</div>
              </div>
              <div className="col-12 mt-2 pt-2 border-top d-flex justify-content-between align-items-center">
                <span className="text-muted small">Tổng giá trị đơn thanh toán:</span>
                <span className="fs-4 fw-bold text-danger">
                  {Number(selectedBooking.totalPrice).toLocaleString('vi-VN')} VNĐ
                </span>
              </div>
            </div>

            <h6 className="fw-bold text-secondary mb-3">
              <i className="bi bi-door-open-fill me-1"></i> Danh sách phòng trong giao dịch (Booking Details):
            </h6>

            <div className="table-responsive">
              <table className="table table-bordered align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Số phòng</th>
                    <th>Loại phòng</th>
                    <th>Ngày nhận (StartDate)</th>
                    <th>Ngày trả (EndDate)</th>
                    <th className="text-end">Giá tính thực tế (ActualPrice)</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedBooking.details?.map((detail, index) => (
                    <tr key={index}>
                      <td className="fw-bold text-primary">Phòng {detail.roomNumber}</td>
                      <td>{detail.roomTypeName || '-'}</td>
                      <td>{detail.startDate}</td>
                      <td>{detail.endDate}</td>
                      <td className="text-end fw-semibold text-danger">
                        {Number(detail.actualPrice).toLocaleString('vi-VN')} đ
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal Cập Nhật Trạng Thái Đơn */}
      <Modal
        isOpen={Boolean(statusUpdatingBooking)}
        onClose={() => setStatusUpdatingBooking(null)}
        title={`Cập Nhật Trạng Thái Đơn #${statusUpdatingBooking?.bookingReservationId}`}
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setStatusUpdatingBooking(null)} disabled={isUpdating}>
              Hủy
            </button>
            <button className="btn btn-primary fw-semibold" onClick={handleSaveStatus} disabled={isUpdating}>
              {isUpdating ? 'Đang cập nhật...' : 'Lưu Trạng Thái'}
            </button>
          </>
        }
      >
        {statusUpdatingBooking && (
          <div>
            <p className="mb-3">
              Chọn trạng thái mới cho đơn đặt phòng của <strong>{statusUpdatingBooking.customerFullName}</strong>:
            </p>
            <div className="mb-3">
              <select
                className="form-select form-select-lg"
                value={newStatus}
                onChange={(e) => setNewStatus(Number(e.target.value))}
              >
                <option value={1}>1 - Đã xác nhận (Confirmed)</option>
                <option value={2}>2 - Đã hoàn thành (Completed)</option>
                <option value={0}>0 - Đã hủy đơn (Cancelled)</option>
              </select>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

