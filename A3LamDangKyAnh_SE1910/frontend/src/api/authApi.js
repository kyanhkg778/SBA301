import axiosInstance from './axiosInstance';

export const authApi = {
  // Đăng nhập (dành cho cả Staff và Customer)
  login: (credentials) => axiosInstance.post('/auth/login', credentials),

  // Đăng ký tài khoản khách hàng mới
  register: (data) => axiosInstance.post('/auth/register', data),

  // Lấy thông tin user hiện tại
  getCurrentUser: () => axiosInstance.get('/auth/me'),

  // Lấy profile cá nhân của customer
  getProfile: () => axiosInstance.get('/customer/profile'),

  // Cập nhật profile cá nhân
  updateProfile: (data) => axiosInstance.put('/customer/profile', data)
};

