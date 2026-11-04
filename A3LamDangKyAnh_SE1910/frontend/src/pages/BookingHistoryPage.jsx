import React, { useState, useEffect } from 'react';
import { bookingApi } from '../api/bookingApi';
import Modal from '../components/Modal';

export default function BookingHistoryPage({ setActivePage }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);

  const fetchHistory = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await bookingApi.getMyBookingHistory();
      setHistory(res.data);
    } catch (err) {
      setError('Không thể tải lịch sử đặt phòng. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 1:
        return <span className="badge bg-success px-2 py-1"><i className="bi bi-check-circle me-1"></i>Đã xác nhận (Confirmed)</span>;
      case 2:
        return <span className="badge bg-primary px-2 py-1"><i className="bi bi-flag me-1"></i>Hoàn thành (Completed)</span>;
      case 0:
        return <span className="badge bg-danger px-2 py-1"><i className="bi bi-x-circle me-1"></i>Đã hủy (Cancelled)</span>;
      default:
        return <span className="badge bg-secondary px-2 py-1">Không xác định</span>;
    }
  };

  return (
    <div className="container py-4">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-primary text-white p-3 d-flex justify-content-between align-items-center">
          <div>
            <h4 className="mb-0 fw-bold">
              <i className="bi bi-clock-history me-2"></i> Lịch Sử Đặt Phòng Của Tôi
            </h4>
            <small className="text-white-50">Danh sách tất cả các đơn đặt phòng bạn đã thực hiện</small>
          </div>
          <button className="btn btn-light btn-sm fw-semibold" onClick={() => setActivePage('book')}>
            <i className="bi bi-plus-circle me-1"></i> Đặt thêm phòng
          </button>
        </div>

        <div className="card-body p-4">
          {error && (
            <div className="alert alert-danger d-flex align-items-center mb-3">
              <i className="bi bi-exclamation-triangle-fill me-2 fs-5"></i>
              <div>{error}</div>
            </div>
          )}

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status"></div>
              <p className="mt-2 text-muted">Đang tải lịch sử đặt phòng...</p>
            </div>
          ) : history.length === 0 ? (
            <div className="text-center py-5 bg-light rounded-3">
              <i className="bi bi-journal-x display-4 text-muted"></i>
              <h5 className="mt-3 text-secondary">Bạn chưa có đơn đặt phòng nào</h5>
              <p className="text-muted small">Hãy trải nghiệm đặt phòng tại FUMiniHotel ngay hôm nay!</p>
              <button className="btn btn-warning fw-semibold mt-2" onClick={() => setActivePage('rooms')}>
                <i className="bi bi-door-open me-1"></i> Khám phá danh sách phòng
              </button>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle border">
                <thead className="table-light">
                  <tr>
                    <th>Mã đơn</th>
                    <th>Ngày đặt</th>
                    <th>Số lượng phòng</th>
                    <th>Trạng thái</th>
                    <th className="text-end">Tổng số tiền</th>
                    <th className="text-center">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((booking) => (
                    <tr key={booking.bookingReservationId}>
                      <td className="fw-bold text-primary">#{booking.bookingReservationId}</td>
                      <td>{booking.bookingDate}</td>
                      <td>
                        <span className="badge bg-light text-dark border">
                          {booking.details ? booking.details.length : 0} phòng
                        </span>
                      </td>
                      <td>{getStatusBadge(booking.bookingStatus)}</td>
                      <td className="text-end fw-bold text-danger fs-6">
                        {Number(booking.totalPrice).toLocaleString('vi-VN')} đ
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => setSelectedBooking(booking)}
                        >
                          <i className="bi bi-eye me-1"></i> Chi tiết
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

      {/* Modal xem chi tiết đơn đặt phòng */}
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
              <div className="col-md-4">
                <span className="text-muted small d-block">Ngày tạo đơn:</span>
                <strong>{selectedBooking.bookingDate}</strong>
              </div>
              <div className="col-md-4">
                <span className="text-muted small d-block">Trạng thái:</span>
                <div>{getStatusBadge(selectedBooking.bookingStatus)}</div>
              </div>
              <div className="col-md-4">
                <span className="text-muted small d-block">Tổng thanh toán:</span>
                <span className="fs-5 fw-bold text-danger">
                  {Number(selectedBooking.totalPrice).toLocaleString('vi-VN')} đ
                </span>
              </div>
            </div>

            <h6 className="fw-bold text-secondary mb-3">
              <i className="bi bi-door-open-fill me-1"></i> Danh sách phòng trong đơn đặt:
            </h6>

            <div className="table-responsive">
              <table className="table table-bordered align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Số phòng</th>
                    <th>Loại phòng</th>
                    <th>Ngày nhận</th>
                    <th>Ngày trả</th>
                    <th className="text-end">Giá thuê</th>
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
    </div>
  );
}

