import axiosInstance from './axiosInstance';

export const bookingApi = {
  // Tạo đơn đặt phòng (Customer đặt online hoặc Staff đặt offline)
  createBooking: (data) => axiosInstance.post('/bookings', data),

  // Customer: Xem lịch sử đặt phòng của bản thân
  getMyBookingHistory: () => axiosInstance.get('/bookings/my-history'),

  // Staff: Xem tất cả đơn đặt phòng (hỗ trợ lọc)
  getAllBookings: (params) => axiosInstance.get('/staff/bookings', { params }),

  // Xem chi tiết một đơn đặt phòng
  getBookingById: (id) => axiosInstance.get(`/bookings/${id}`),

  // Staff: Cập nhật trạng thái đơn đặt phòng
  updateBookingStatus: (id, bookingStatus) =>
    axiosInstance.put(`/staff/bookings/${id}/status`, { bookingStatus })
};

