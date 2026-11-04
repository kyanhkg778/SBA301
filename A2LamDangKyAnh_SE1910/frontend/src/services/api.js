import axios from 'axios';

// =========================================================================
// [KIẾN TRÚC CLIENT - AXIOS SERVICE LAYER]: TẬP TRUNG HÓA GIAO TIẾP HTTP & XỬ LÝ LỖI
// Tách biệt hoàn toàn tầng giao tiếp mạng khỏi các component giao diện (UI).
// =========================================================================

// Base API URL trỏ tới Spring Boot 3 Backend
const API_BASE_URL = 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// [HÀM BÓC TÁCH LỖI TẬP TRUNG]: Tự động lấy message nghiệp vụ từ Spring Boot (400, 401, 500)
// Nếu server trả về validation errors { details: { field: msg } }, hàm sẽ ghép chuỗi trực quan.
const handleApiError = (error) => {
  if (error.response && error.response.data) {
    const data = error.response.data;
    if (data.details) {
      // Map validation errors
      const messages = Object.entries(data.details).map(([k, v]) => `${k}: ${v}`).join(', ');
      return messages || data.message || 'Validation error';
    }
    return data.message || data.error || error.message;
  }
  return error.message || 'Network error occurred';
};

// ==========================================
// [LUỒNG 2]: AUTH SERVICE (ĐĂNG NHẬP THÀNH VIÊN)
// ==========================================
export const authService = {
  login: async (email, password) => {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
};

// ==========================================
// 2. SYSTEM ACCOUNT SERVICE (ADMIN ROLE = 1)
// ==========================================
export const accountService = {
  getAll: async (query = '') => {
    try {
      const response = await apiClient.get('/accounts', { params: query ? { query } : {} });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/accounts/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
  create: async (accountData) => {
    try {
      const response = await apiClient.post('/accounts', accountData);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
  update: async (id, accountData) => {
    try {
      const response = await apiClient.put(`/accounts/${id}`, accountData);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
  delete: async (id) => {
    try {
      const response = await apiClient.delete(`/accounts/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
  updateProfile: async (id, profileData) => {
    try {
      const response = await apiClient.put(`/accounts/${id}/profile`, profileData);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
};

// ==========================================
// 3. CATEGORY SERVICE (STAFF ROLE = 2)
// ==========================================
export const categoryService = {
  getAll: async (search = '') => {
    try {
      const response = await apiClient.get('/categories', { params: search ? { search } : {} });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
  getActive: async () => {
    try {
      const response = await apiClient.get('/categories/active');
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/categories/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
  create: async (categoryData) => {
    try {
      const response = await apiClient.post('/categories', categoryData);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
  update: async (id, categoryData) => {
    try {
      const response = await apiClient.put(`/categories/${id}`, categoryData);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
  delete: async (id) => {
    try {
      const response = await apiClient.delete(`/categories/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
};

// ==========================================
// 4. NEWS ARTICLE SERVICE (PUBLIC + STAFF)
// ==========================================
export const newsService = {
  // Public news - active news only (no auth needed)
  getPublic: async () => {
    try {
      const response = await apiClient.get('/news/public');
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
  // Search and filter news (all news for management)
  getAll: async (params = {}) => {
    try {
      const response = await apiClient.get('/news', { params });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
  // Staff news history
  getStaffHistory: async (staffId) => {
    try {
      const response = await apiClient.get(`/news/history/${staffId}`);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/news/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
  create: async (newsData) => {
    try {
      const response = await apiClient.post('/news', newsData);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
  update: async (id, newsData) => {
    try {
      const response = await apiClient.put(`/news/${id}`, newsData);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
  delete: async (id) => {
    try {
      const response = await apiClient.delete(`/news/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
};

// ==========================================
// 5. TAG SERVICE
// ==========================================
export const tagService = {
  getAll: async (search = '') => {
    try {
      const response = await apiClient.get('/tags', { params: search ? { search } : {} });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
  create: async (tagData) => {
    try {
      const response = await apiClient.post('/tags', tagData);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
};

export default apiClient;

