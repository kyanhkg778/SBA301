import axiosInstance from './axiosInstance';

export const roomApi = {
  // Public: Xem danh sách phòng đang hoạt động (không cần login)
  getActiveRooms: (params) => axiosInstance.get('/rooms', { params }),

  // Public: Xem chi tiết 1 phòng
  getRoomById: (id) => axiosInstance.get(`/rooms/${id}`),

  // Staff: Xem tất cả phòng
  getAllRoomsForStaff: (params) => axiosInstance.get('/rooms/manage/all', { params }),

  // Staff: Thêm phòng mới
  createRoom: (data) => axiosInstance.post('/rooms', data),

  // Staff: Sửa thông tin phòng
  updateRoom: (id, data) => axiosInstance.put(`/rooms/${id}`, data),

  // Staff: Xóa phòng (áp dụng quy tắc kiểm tra booking transaction)
  deleteRoom: (id) => axiosInstance.delete(`/rooms/${id}`),

  // Danh mục loại phòng
  getRoomTypes: () => axiosInstance.get('/room-types')
};

