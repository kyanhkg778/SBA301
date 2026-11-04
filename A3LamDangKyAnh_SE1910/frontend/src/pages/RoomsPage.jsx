import React, { useState, useEffect } from 'react';
import { roomApi } from '../api/roomApi';
import { useAuth } from '../context/AuthContext';
import Modal from '../components/Modal';

export default function RoomsPage({ onSelectRoomForBooking, setActivePage }) {
  const { isAuthenticated, isCustomer } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Bộ lọc tìm kiếm
  const [query, setQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Modal chi tiết phòng
  const [detailRoom, setDetailRoom] = useState(null);

  // Tải danh sách phòng công khai và danh mục loại phòng
  const fetchRooms = async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (query.trim()) params.query = query.trim();
      if (selectedType) params.roomTypeId = selectedType;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;

      const response = await roomApi.getActiveRooms(params);
      setRooms(response.data);
    } catch (err) {
      setError('Không thể tải danh sách phòng. Vui lòng kiểm tra kết nối với Backend Server.');
    } finally {
      setLoading(false);
    }
  };

  const fetchRoomTypes = async () => {
    try {
      const res = await roomApi.getRoomTypes();
      setRoomTypes(res.data);
    } catch (err) {
      console.error('Lỗi tải danh mục loại phòng:', err);
    }
  };

  useEffect(() => {
    fetchRooms();
    fetchRoomTypes();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRooms();
  };

  const handleReset = () => {
    setQuery('');
    setSelectedType('');
    setMinPrice('');
    setMaxPrice('');
    setTimeout(fetchRooms, 0);
  };

  const handleBookNow = (room) => {
    if (!isAuthenticated) {
      alert('Vui lòng đăng nhập tài khoản Khách hàng để tiến hành đặt phòng.');
      setActivePage('login');
      return;
    }
    if (onSelectRoomForBooking) {
      onSelectRoomForBooking(room);
    }
    setActivePage('book');
  };

  return (
    <div className="container py-4">
      {/* Banner giới thiệu */}
      <div className="p-4 p-md-5 mb-4 rounded-3 text-white shadow-sm" style={{ background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)' }}>
        <div className="col-md-9 px-0">
          <h1 className="display-5 fw-bold">🏨 Khám Phá Phòng Tại FUMiniHotel</h1>
          <p className="lead my-3">
            Hệ thống quản lý khách sạn hiện đại, tiện nghi đẳng cấp, đặt phòng trực tuyến nhanh chóng với tính năng bảo mật Spring Security &amp; JWT.
          </p>
          <div className="d-flex gap-2">
            <span className="badge bg-warning text-dark fs-6 px-3 py-2">
              <i className="bi bi-shield-check me-1"></i> Public Room Access
            </span>
            <span className="badge bg-light text-dark fs-6 px-3 py-2">
              <i className="bi bi-check2-circle me-1"></i> Giá phòng minh bạch
            </span>
          </div>
        </div>
      </div>

      {/* Thanh tìm kiếm và bộ lọc */}
      <div className="card shadow-sm border-0 mb-4 bg-light">
        <div className="card-body p-3">
          <form onSubmit={handleSearch} className="row g-2 align-items-end">
            <div className="col-md-4">
              <label className="form-label small fw-bold text-secondary mb-1">
                <i className="bi bi-search me-1"></i>Từ khóa (Số phòng / Mô tả)
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Ví dụ: 101, VIP, Deluxe..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label small fw-bold text-secondary mb-1">
                <i className="bi bi-tags me-1"></i>Loại phòng
              </label>
              <select
                className="form-select"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="">-- Tất cả loại phòng --</option>
                {roomTypes.map((t) => (
                  <option key={t.roomTypeId} value={t.roomTypeId}>
                    {t.roomTypeName}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label small fw-bold text-secondary mb-1">
                <i className="bi bi-cash-stack me-1"></i>Khoảng giá (VNĐ/ngày)
              </label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <span className="input-group-text">-</span>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="col-md-2 d-flex gap-1">
              <button type="submit" className="btn btn-primary flex-grow-1">
                <i className="bi bi-funnel me-1"></i> Lọc
              </button>
              <button type="button" className="btn btn-outline-secondary" onClick={handleReset} title="Xóa bộ lọc">
                <i className="bi bi-arrow-counterclockwise"></i>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Thông báo lỗi nếu có */}
      {error && (
        <div className="alert alert-danger shadow-sm d-flex align-items-center" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2 fs-5"></i>
          <div>{error}</div>
        </div>
      )}

      {/* Danh sách phòng */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Đang tải...</span>
          </div>
          <p className="mt-2 text-muted">Đang tải danh sách phòng từ hệ thống...</p>
        </div>
      ) : rooms.length === 0 ? (
        <div className="text-center py-5 bg-light rounded-3 shadow-sm">
          <i className="bi bi-door-closed display-3 text-muted"></i>
          <h4 className="mt-3 text-secondary">Không tìm thấy phòng phù hợp</h4>
          <p className="text-muted">Hãy thử thay đổi điều kiện tìm kiếm hoặc khoảng giá.</p>
          <button className="btn btn-outline-primary" onClick={handleReset}>
            Xem tất cả phòng
          </button>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {rooms.map((room) => (
            <div key={room.roomId} className="col">
              <div className="card h-100 shadow-sm border-0 room-card">
                <div className="card-header bg-white border-0 pt-3 pb-0 d-flex justify-content-between align-items-center">
                  <span className="badge bg-primary fs-6 px-3 py-2">
                    <i className="bi bi-door-open-fill me-1"></i>Phòng {room.roomNumber}
                  </span>
                  <span className="badge bg-light text-primary border">
                    {room.roomTypeName || 'Loại phòng'}
                  </span>
                </div>

                <div className="card-body">
                  <div className="mb-2 text-muted small">
                    <i className="bi bi-people-fill text-info me-1"></i>
                    Sức chứa: <strong>{room.roomMaxCapacity} người</strong>
                  </div>
                  <p className="card-text text-secondary text-truncate-2" style={{ minHeight: '48px' }}>
                    {room.roomDetailDescription || 'Đầy đủ tiện nghi hiện đại, điều hòa, bình nóng lạnh, wifi.'}
                  </p>
                  <div className="mt-3 pt-2 border-top d-flex align-items-baseline justify-content-between">
                    <span className="text-muted small">Giá thuê theo ngày:</span>
                    <span className="fs-5 fw-bold text-danger">
                      {Number(room.roomPricePerDay).toLocaleString('vi-VN')} đ
                    </span>
                  </div>
                </div>

                <div className="card-footer bg-white border-0 pb-3 d-flex gap-2">
                  <button
                    className="btn btn-outline-secondary btn-sm flex-grow-1"
                    onClick={() => setDetailRoom(room)}
                  >
                    <i className="bi bi-info-circle me-1"></i> Chi tiết
                  </button>
                  <button
                    className="btn btn-warning btn-sm flex-grow-1 fw-semibold"
                    onClick={() => handleBookNow(room)}
                  >
                    <i className="bi bi-cart-plus me-1"></i> Đặt ngay
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal xem chi tiết phòng */}
      <Modal
        isOpen={Boolean(detailRoom)}
        onClose={() => setDetailRoom(null)}
        title={`Thông Tin Chi Tiết: Phòng ${detailRoom?.roomNumber}`}
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setDetailRoom(null)}>
              Đóng
            </button>
            <button
              className="btn btn-warning fw-semibold"
              onClick={() => {
                const r = detailRoom;
                setDetailRoom(null);
                handleBookNow(r);
              }}
            >
              <i className="bi bi-calendar-check me-1"></i> Đặt phòng này
            </button>
          </>
        }
      >
        {detailRoom && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
              <div>
                <span className="text-muted small">Mã phòng: </span>
                <strong>#{detailRoom.roomId}</strong>
              </div>
              <span className="badge bg-success">Đang hoạt động</span>
            </div>

            <div className="row g-3">
              <div className="col-6">
                <span className="text-muted small d-block">Loại phòng:</span>
                <strong className="fs-6 text-primary">{detailRoom.roomTypeName}</strong>
              </div>
              <div className="col-6">
                <span className="text-muted small d-block">Sức chứa tối đa:</span>
                <strong>{detailRoom.roomMaxCapacity} người</strong>
              </div>
              <div className="col-12">
                <span className="text-muted small d-block">Mô tả chi tiết:</span>
                <p className="mt-1 p-3 bg-light rounded text-secondary">
                  {detailRoom.roomDetailDescription || 'Không có mô tả bổ sung.'}
                </p>
              </div>
              <div className="col-12">
                <span className="text-muted small d-block">Đơn giá thuê:</span>
                <span className="fs-4 fw-bold text-danger">
                  {Number(detailRoom.roomPricePerDay).toLocaleString('vi-VN')} VNĐ / ngày
                </span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

