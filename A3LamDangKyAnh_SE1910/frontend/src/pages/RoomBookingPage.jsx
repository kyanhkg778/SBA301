import React, { useState, useEffect } from 'react';
import { roomApi } from '../api/roomApi';
import { bookingApi } from '../api/bookingApi';
import { customerApi } from '../api/customerApi';
import { useAuth } from '../context/AuthContext';

export default function RoomBookingPage({ preselectedRoom, setActivePage }) {
  const { user, isStaff } = useAuth();

  // Danh sách phòng khả dụng
  const [rooms, setRooms] = useState([]);
  // Danh sách khách hàng (chỉ cần khi Staff đặt phòng)
  const [customers, setCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState('');

  // Ngày nhận phòng (mặc định ngày mai) và ngày trả phòng (mặc định ngày kia)
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const dayAfterTomorrowStr = new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0];

  const [startDate, setStartDate] = useState(tomorrowStr);
  const [endDate, setEndDate] = useState(dayAfterTomorrowStr);

  // Danh sách ID các phòng được chọn (cho phép chọn 1 hoặc NHIỀU phòng)
  const [selectedRoomIds, setSelectedRoomIds] = useState(
    preselectedRoom ? [preselectedRoom.roomId] : []
  );

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Tải danh sách phòng
  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      try {
        const roomsRes = await roomApi.getActiveRooms();
        setRooms(roomsRes.data);

        // Nếu là Staff, tải thêm danh sách khách hàng để chọn
        if (isStaff) {
          const custRes = await customerApi.getCustomers();
          setCustomers(custRes.data);
          if (custRes.data.length > 0) {
            setSelectedCustomerId(custRes.data[0].customerId);
          }
        }
      } catch (err) {
        setError('Không thể tải danh sách phòng khả dụng.');
      } finally {
        setLoading(false);
      }
    };
    initData();
  }, [isStaff]);

  // Tính số đêm thuê
  const calculateDays = () => {
    if (!startDate || !endDate) return 1;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const days = calculateDays();

  // Bật/tắt chọn phòng
  const toggleRoomSelection = (roomId) => {
    setSelectedRoomIds((prev) =>
      prev.includes(roomId) ? prev.filter((id) => id !== roomId) : [...prev, roomId]
    );
  };

  // Tính danh sách các phòng đã chọn kèm đơn giá và thành tiền
  const selectedRoomsList = rooms.filter((r) => selectedRoomIds.includes(r.roomId));
  const grandTotal = selectedRoomsList.reduce(
    (sum, r) => sum + Number(r.roomPricePerDay) * days,
    0
  );

  // Xử lý gửi đơn đặt phòng
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (new Date(startDate) >= new Date(endDate)) {
      setError('Ngày nhận phòng phải trước ngày trả phòng ít nhất 1 ngày.');
      return;
    }

    if (selectedRoomIds.length === 0) {
      setError('Vui lòng chọn ít nhất một phòng để đặt.');
      return;
    }

    if (isStaff && !selectedCustomerId) {
      setError('Vui lòng chọn khách hàng nhận phòng.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        customerId: isStaff ? selectedCustomerId : user.id,
        bookingDate: new Date().toISOString().split('T')[0],
        bookingStatus: 1, // 1 = Confirmed
        items: selectedRoomsList.map((room) => ({
          roomId: room.roomId,
          startDate: startDate,
          endDate: endDate,
          actualPrice: Number(room.roomPricePerDay) * days
        }))
      };

      await bookingApi.createBooking(payload);
      setSuccess('Tạo đơn đặt phòng thành công! Đang chuyển hướng...');
      setTimeout(() => {
        setActivePage(isStaff ? 'staff-bookings' : 'my-bookings');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể tạo đơn đặt phòng.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-header bg-warning text-dark p-3">
          <h4 className="mb-0 fw-bold">
            <i className="bi bi-calendar-check-fill me-2"></i>
            {isStaff ? 'Tạo Đơn Đặt Phòng Mới (Staff Offline Booking)' : 'Đặt Phòng Trực Tuyến (Online Booking)'}
          </h4>
          <small className="text-dark-50">
            Cho phép chọn một hoặc nhiều phòng cùng lúc với bảng tính giá tức thì
          </small>
        </div>

        <div className="card-body p-4">
          {error && (
            <div className="alert alert-danger d-flex align-items-center mb-3">
              <i className="bi bi-exclamation-triangle-fill me-2 fs-5"></i>
              <div>{error}</div>
            </div>
          )}

          {success && (
            <div className="alert alert-success d-flex align-items-center mb-3">
              <i className="bi bi-check-circle-fill me-2 fs-5"></i>
              <div>{success}</div>
            </div>
          )}

          <form onSubmit={handleBookingSubmit}>
            {/* Lựa chọn khách hàng (Nếu là Staff) */}
            {isStaff && (
              <div className="row mb-4">
                <div className="col-md-6">
                  <label className="form-label fw-bold text-danger">
                    <i className="bi bi-person-fill me-1"></i> Chọn khách hàng nhận phòng *
                  </label>
                  <select
                    className="form-select border-danger"
                    value={selectedCustomerId}
                    onChange={(e) => setSelectedCustomerId(e.target.value)}
                    required
                  >
                    <option value="">-- Chọn khách hàng --</option>
                    {customers.map((c) => (
                      <option key={c.customerId} value={c.customerId}>
                        #{c.customerId} - {c.customerFullName} ({c.emailAddress} - {c.telephone})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Chọn thời gian lưu trú */}
            <div className="row g-3 p-3 bg-light rounded-3 mb-4">
              <div className="col-md-5">
                <label className="form-label fw-bold text-secondary">
                  <i className="bi bi-box-arrow-in-right me-1"></i> Ngày nhận phòng (Check-in) *
                </label>
                <input
                  type="date"
                  className="form-control"
                  value={startDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-5">
                <label className="form-label fw-bold text-secondary">
                  <i className="bi bi-box-arrow-right me-1"></i> Ngày trả phòng (Check-out) *
                </label>
                <input
                  type="date"
                  className="form-control"
                  value={endDate}
                  min={startDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-2 text-center d-flex flex-column justify-content-center">
                <span className="small text-muted">Thời gian lưu trú:</span>
                <span className="fs-5 fw-bold text-primary">{days} đêm</span>
              </div>
            </div>

            {/* Danh sách phòng để chọn */}
            <h5 className="fw-bold mb-3 text-secondary">
              <i className="bi bi-check2-square me-1"></i> Chọn Phòng Cần Thuê (Hỗ trợ chọn nhiều phòng)
            </h5>

            {loading ? (
              <div className="text-center py-4">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-2 text-muted">Đang tải danh sách phòng...</p>
              </div>
            ) : rooms.length === 0 ? (
              <div className="alert alert-info">Hiện không có phòng nào sẵn sàng phục vụ.</div>
            ) : (
              <div className="table-responsive mb-4">
                <table className="table table-hover align-middle border">
                  <thead className="table-light">
                    <tr>
                      <th style={{ width: '60px' }} className="text-center">Chọn</th>
                      <th>Số phòng</th>
                      <th>Loại phòng</th>
                      <th>Sức chứa</th>
                      <th>Mô tả tiện nghi</th>
                      <th className="text-end">Đơn giá / ngày</th>
                      <th className="text-end">Thành tiền ({days} đêm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rooms.map((room) => {
                      const isSelected = selectedRoomIds.includes(room.roomId);
                      const roomSubtotal = Number(room.roomPricePerDay) * days;
                      return (
                        <tr
                          key={room.roomId}
                          className={isSelected ? 'table-warning' : ''}
                          style={{ cursor: 'pointer' }}
                          onClick={() => toggleRoomSelection(room.roomId)}
                        >
                          <td className="text-center" onClick={(e) => e.stopPropagation()}>
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={isSelected}
                              onChange={() => toggleRoomSelection(room.roomId)}
                            />
                          </td>
                          <td className="fw-bold text-primary">
                            <i className="bi bi-door-closed-fill me-1"></i>
                            Phòng {room.roomNumber}
                          </td>
                          <td>
                            <span className="badge bg-secondary">{room.roomTypeName}</span>
                          </td>
                          <td>{room.roomMaxCapacity} người</td>
                          <td className="text-muted small text-truncate" style={{ maxWidth: '250px' }}>
                            {room.roomDetailDescription}
                          </td>
                          <td className="text-end fw-semibold">
                            {Number(room.roomPricePerDay).toLocaleString('vi-VN')} đ
                          </td>
                          <td className="text-end fw-bold text-danger">
                            {roomSubtotal.toLocaleString('vi-VN')} đ
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* Tóm tắt đơn đặt phòng */}
            <div className="card bg-light border-0 p-3 mb-4">
              <div className="row align-items-center">
                <div className="col-md-7">
                  <h6 className="fw-bold mb-1">Tóm tắt đơn đặt phòng:</h6>
                  <p className="mb-0 text-muted small">
                    Đã chọn: <strong>{selectedRoomIds.length} phòng</strong> ({selectedRoomsList.map((r) => `Phòng ${r.roomNumber}`).join(', ') || 'Chưa chọn'})
                    | Số đêm: <strong>{days} đêm</strong> (Từ {startDate} đến {endDate})
                  </p>
                </div>
                <div className="col-md-5 text-md-end mt-3 mt-md-0">
                  <span className="small text-muted d-block">Tổng số tiền thanh toán:</span>
                  <span className="fs-3 fw-bold text-danger">
                    {grandTotal.toLocaleString('vi-VN')} VNĐ
                  </span>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setActivePage('rooms')}
              >
                <i className="bi bi-arrow-left me-1"></i> Quay lại danh sách phòng
              </button>
              <button
                type="submit"
                className="btn btn-success btn-lg px-4 fw-bold"
                disabled={submitting || selectedRoomIds.length === 0}
              >
                {submitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Đang tạo đơn đặt phòng...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check2-circle me-1"></i> Xác Nhận Đặt Phòng
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

