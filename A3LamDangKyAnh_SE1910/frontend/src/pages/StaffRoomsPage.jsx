import React, { useState, useEffect } from 'react';
import { roomApi } from '../api/roomApi';
import Modal from '../components/Modal';

export default function StaffRoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionAlert, setActionAlert] = useState(null);

  // Bộ lọc
  const [query, setQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  // Modal Thêm / Sửa
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [formData, setFormData] = useState({
    roomNumber: '',
    roomDetailDescription: '',
    roomMaxCapacity: 2,
    roomTypeId: '',
    roomStatus: 1,
    roomPricePerDay: ''
  });

  // Modal Xóa phòng
  const [deletingRoom, setDeletingRoom] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Tải danh sách phòng cho Staff
  const fetchRooms = async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (query.trim()) params.query = query.trim();
      if (selectedType) params.roomTypeId = selectedType;
      if (selectedStatus !== '') params.status = selectedStatus;

      const res = await roomApi.getAllRoomsForStaff(params);
      setRooms(res.data);
    } catch (err) {
      setError('Không thể tải danh sách quản lý phòng.');
    } finally {
      setLoading(false);
    }
  };

  const fetchRoomTypes = async () => {
    try {
      const res = await roomApi.getRoomTypes();
      setRoomTypes(res.data);
      if (res.data.length > 0 && !formData.roomTypeId) {
        setFormData((prev) => ({ ...prev, roomTypeId: res.data[0].roomTypeId }));
      }
    } catch (err) {
      console.error('Lỗi tải room types:', err);
    }
  };

  useEffect(() => {
    fetchRooms();
    fetchRoomTypes();
  }, []);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchRooms();
  };

  // Mở modal thêm mới phòng
  const handleOpenAddModal = () => {
    setEditingRoom(null);
    setFormData({
      roomNumber: '',
      roomDetailDescription: '',
      roomMaxCapacity: 2,
      roomTypeId: roomTypes.length > 0 ? roomTypes[0].roomTypeId : '',
      roomStatus: 1,
      roomPricePerDay: ''
    });
    setIsEditModalOpen(true);
  };

  // Mở modal sửa phòng
  const handleOpenEditModal = (room) => {
    setEditingRoom(room);
    setFormData({
      roomNumber: room.roomNumber,
      roomDetailDescription: room.roomDetailDescription || '',
      roomMaxCapacity: room.roomMaxCapacity,
      roomTypeId: room.roomTypeId,
      roomStatus: room.roomStatus,
      roomPricePerDay: room.roomPricePerDay
    });
    setIsEditModalOpen(true);
  };

  // Lưu thông tin phòng (Thêm mới hoặc Cập nhật)
  const handleSaveRoom = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (editingRoom) {
        await roomApi.updateRoom(editingRoom.roomId, formData);
        setActionAlert({ type: 'success', text: `Cập nhật thông tin phòng ${formData.roomNumber} thành công!` });
      } else {
        await roomApi.createRoom(formData);
        setActionAlert({ type: 'success', text: `Thêm mới phòng ${formData.roomNumber} thành công!` });
      }
      setIsEditModalOpen(false);
      fetchRooms();
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.details
        ? Object.values(err.response?.data?.details || {}).join(', ')
        : 'Có lỗi xảy ra khi lưu thông tin phòng.';
      setError(msg);
    }
  };

  // LUỒNG XỬ LÝ XÓA PHÒNG THEO ĐỀ BÀI:
  // "The delete action will delete room information in the case this information is not belong to any renting transaction.
  // If the room information is already stored in a booking detail, just change the status."
  const handleConfirmDelete = async () => {
    if (!deletingRoom) return;
    setIsDeleting(true);
    try {
      const res = await roomApi.deleteRoom(deletingRoom.roomId);
      const data = res.data;

      // Hiển thị thông báo phản hồi chính xác kết quả theo nghiệp vụ đề bài
      if (data.deleted) {
        setActionAlert({
          type: 'success',
          text: `[XÓA VĨNH VIỄN] Phòng ${deletingRoom.roomNumber} chưa từng phát sinh giao dịch thuê nào. Đã xóa dữ liệu hoàn toàn khỏi CSDL!`
        });
      } else if (data.statusChanged) {
        setActionAlert({
          type: 'warning',
          text: `[CHUYỂN TRẠNG THÁI] Phòng ${deletingRoom.roomNumber} đã có lịch sử trong giao dịch đặt phòng (BookingDetail). Đã chuyển trạng thái sang Không hoạt động (RoomStatus = 0) theo đúng yêu cầu đề bài!`
        });
      }

      setDeletingRoom(null);
      fetchRooms();
    } catch (err) {
      setActionAlert({
        type: 'danger',
        text: err.response?.data?.message || 'Có lỗi xảy ra khi xóa phòng.'
      });
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
              <i className="bi bi-door-closed me-2 text-warning"></i> Quản Lý Thông Tin Phòng (Staff Role)
            </h4>
            <small className="text-secondary">Quản lý toàn bộ danh sách phòng, phân loại và chính sách xóa an toàn</small>
          </div>
          <button className="btn btn-warning fw-bold" onClick={handleOpenAddModal}>
            <i className="bi bi-plus-lg me-1"></i> Thêm Phòng Mới
          </button>
        </div>

        <div className="card-body p-4">
          {/* Thông báo kết quả thao tác (Đặc biệt cho việc xóa phòng) */}
          {actionAlert && (
            <div className={`alert alert-${actionAlert.type} alert-dismissible fade show d-flex align-items-center mb-4 shadow-sm`} role="alert">
              <i className={`bi ${actionAlert.type === 'success' ? 'bi-check-circle-fill' : actionAlert.type === 'warning' ? 'bi-exclamation-circle-fill' : 'bi-x-circle-fill'} me-2 fs-5`}></i>
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

          {/* Quy tắc nghiệp vụ lưu ý */}
          <div className="p-3 bg-light rounded-3 border-start border-4 border-warning mb-4">
            <span className="fw-bold text-dark d-block mb-1">
              <i className="bi bi-info-circle-fill text-warning me-1"></i> Quy định nghiệp vụ Xóa phòng (Yêu cầu Assignment 03):
            </span>
            <small className="text-secondary">
              - Nếu thông tin phòng <strong>chưa từng phát sinh</strong> bất kỳ giao dịch thuê nào: Xóa vĩnh viễn khỏi CSDL.<br />
              - Nếu thông tin phòng <strong>đã từng nằm trong</strong> chi tiết đặt phòng (BookingDetail): Không xóa bản ghi, chỉ chuyển trạng thái phòng sang <code>Inactive (0)</code>.
            </small>
          </div>

          {/* Bộ lọc tìm kiếm */}
          <form onSubmit={handleFilterSubmit} className="row g-2 align-items-end mb-4">
            <div className="col-md-4">
              <label className="form-label small fw-bold text-secondary">Số phòng / Mô tả</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nhập số phòng..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-bold text-secondary">Loại phòng</label>
              <select
                className="form-select"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="">-- Tất cả loại --</option>
                {roomTypes.map((t) => (
                  <option key={t.roomTypeId} value={t.roomTypeId}>{t.roomTypeName}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-bold text-secondary">Trạng thái</label>
              <select
                className="form-select"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">-- Tất cả trạng thái --</option>
                <option value="1">1 - Đang hoạt động (Active)</option>
                <option value="0">0 - Không hoạt động (Inactive)</option>
              </select>
            </div>
            <div className="col-md-2">
              <button type="submit" className="btn btn-primary w-100">
                <i className="bi bi-funnel me-1"></i> Lọc
              </button>
            </div>
          </form>

          {/* Bảng danh sách phòng */}
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status"></div>
              <p className="mt-2 text-muted">Đang tải danh sách phòng...</p>
            </div>
          ) : rooms.length === 0 ? (
            <div className="text-center py-5 bg-light rounded-3">
              <h5 className="text-secondary">Không tìm thấy phòng nào.</h5>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle border">
                <thead className="table-light">
                  <tr>
                    <th>Mã</th>
                    <th>Số phòng</th>
                    <th>Loại phòng</th>
                    <th>Sức chứa</th>
                    <th>Giá / ngày</th>
                    <th>Trạng thái</th>
                    <th className="text-center">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map((room) => (
                    <tr key={room.roomId}>
                      <td>#{room.roomId}</td>
                      <td className="fw-bold text-primary">
                        <i className="bi bi-door-open me-1"></i>
                        Phòng {room.roomNumber}
                      </td>
                      <td>
                        <span className="badge bg-secondary">{room.roomTypeName}</span>
                      </td>
                      <td>{room.roomMaxCapacity} người</td>
                      <td className="fw-semibold text-danger">
                        {Number(room.roomPricePerDay).toLocaleString('vi-VN')} đ
                      </td>
                      <td>
                        {room.roomStatus === 1 ? (
                          <span className="badge bg-success">Active (1)</span>
                        ) : (
                          <span className="badge bg-secondary">Inactive (0)</span>
                        )}
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-outline-primary btn-sm me-2"
                          onClick={() => handleOpenEditModal(room)}
                          title="Sửa phòng"
                        >
                          <i className="bi bi-pencil"></i> Sửa
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => setDeletingRoom(room)}
                          title="Xóa phòng (Kiểm tra nghiệp vụ đề bài)"
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

      {/* Modal Thêm / Chỉnh Sửa Phòng */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={editingRoom ? `Chỉnh Sửa Phòng ${editingRoom.roomNumber}` : 'Thêm Phòng Mới'}
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setIsEditModalOpen(false)}>
              Hủy bỏ
            </button>
            <button className="btn btn-primary fw-semibold" onClick={handleSaveRoom}>
              <i className="bi bi-floppy me-1"></i> Lưu Thông Tin
            </button>
          </>
        }
      >
        <form onSubmit={handleSaveRoom}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label small fw-bold">Số phòng *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ví dụ: 501"
                value={formData.roomNumber}
                onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-bold">Loại phòng *</label>
              <select
                className="form-select"
                value={formData.roomTypeId}
                onChange={(e) => setFormData({ ...formData, roomTypeId: e.target.value })}
                required
              >
                {roomTypes.map((t) => (
                  <option key={t.roomTypeId} value={t.roomTypeId}>{t.roomTypeName}</option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-bold">Sức chứa tối đa (người) *</label>
              <input
                type="number"
                min="1"
                className="form-control"
                value={formData.roomMaxCapacity}
                onChange={(e) => setFormData({ ...formData, roomMaxCapacity: e.target.value })}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-bold">Trạng thái phòng *</label>
              <select
                className="form-select"
                value={formData.roomStatus}
                onChange={(e) => setFormData({ ...formData, roomStatus: Number(e.target.value) })}
                required
              >
                <option value={1}>1 - Đang hoạt động (Active)</option>
                <option value={0}>0 - Tạm khóa / Ngừng hoạt động (Inactive)</option>
              </select>
            </div>
            <div className="col-12">
              <label className="form-label small fw-bold">Giá thuê mỗi ngày (VNĐ) *</label>
              <input
                type="number"
                min="0"
                step="1000"
                className="form-control"
                placeholder="Ví dụ: 800000"
                value={formData.roomPricePerDay}
                onChange={(e) => setFormData({ ...formData, roomPricePerDay: e.target.value })}
                required
              />
            </div>
            <div className="col-12">
              <label className="form-label small fw-bold">Mô tả chi tiết phòng</label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Mô tả nội thất, tầm nhìn, trang thiết bị..."
                value={formData.roomDetailDescription}
                onChange={(e) => setFormData({ ...formData, roomDetailDescription: e.target.value })}
              ></textarea>
            </div>
          </div>
        </form>
      </Modal>

      {/* Modal Xác Nhận Xóa Phòng */}
      <Modal
        isOpen={Boolean(deletingRoom)}
        onClose={() => setDeletingRoom(null)}
        title="Xác Nhận Thao Tác Xóa Phòng"
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setDeletingRoom(null)} disabled={isDeleting}>
              Hủy
            </button>
            <button className="btn btn-danger fw-bold" onClick={handleConfirmDelete} disabled={isDeleting}>
              {isDeleting ? 'Đang kiểm tra & thực hiện...' : 'Xác Nhận Xóa'}
            </button>
          </>
        }
      >
        {deletingRoom && (
          <div>
            <div className="d-flex align-items-center mb-3 text-danger">
              <i className="bi bi-shield-exclamation fs-1 me-3"></i>
              <div>
                <h5 className="mb-1 fw-bold">Bạn có chắc chắn muốn xóa Phòng {deletingRoom.roomNumber}?</h5>
                <small className="text-muted">Hệ thống sẽ tự động đối chiếu ràng buộc dữ liệu theo quy định đề bài:</small>
              </div>
            </div>
            <ul className="text-secondary small mb-0">
              <li>Nếu phòng <strong>chưa từng có đơn đặt</strong>: Sẽ được xóa vĩnh viễn khỏi CSDL.</li>
              <li>Nếu phòng <strong>đã từng phát sinh giao dịch (BookingDetail)</strong>: Hệ thống sẽ tự động chuyển trạng thái phòng sang <code>Inactive (0)</code> nhằm bảo toàn tính toàn vẹn dữ liệu kế toán và lịch sử thuê.</li>
            </ul>
          </div>
        )}
      </Modal>
    </div>
  );
}

