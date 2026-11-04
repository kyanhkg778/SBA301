import axiosInstance from './axiosInstance';

export const customerApi = {
  // Staff: Lấy danh sách hoặc tìm kiếm khách hàng
  getCustomers: (query) => axiosInstance.get('/staff/customers', { params: { query } }),

  // Staff: Lấy chi tiết khách hàng
  getCustomerById: (id) => axiosInstance.get(`/staff/customers/${id}`),

  // Staff: Tạo khách hàng mới
  createCustomer: (data) => axiosInstance.post('/staff/customers', data),

  // Staff: Cập nhật thông tin khách hàng
  updateCustomer: (id, data) => axiosInstance.put(`/staff/customers/${id}`, data),

  // Staff: Xóa khách hàng (kiểm tra đơn đặt phòng)
  deleteCustomer: (id) => axiosInstance.delete(`/staff/customers/${id}`)
};

