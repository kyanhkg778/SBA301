import { INITIAL_CATEGORIES, INITIAL_NEWS, INITIAL_USERS } from "../data/seedData";

// Các khóa (Keys) cố định dùng để lưu trữ dữ liệu trong LocalStorage của trình duyệt
const KEYS = {
  CATEGORIES: "funews_categories",
  NEWS: "funews_news",
  USERS: "funews_users",
  AUTH: "funews_auth_session",
  THEME: "funews_theme_preference"
};

/**
 * Storage Service - Tầng dịch vụ lưu trữ bền vững (Persistence Layer)
 * Giúp ứng dụng giữ nguyên trạng thái CRUD khi người dùng reload F5 hoặc tắt trình duyệt.
 */
export const storageService = {
  // =========================================================================
  // 1. QUẢN LÝ DANH MỤC (CATEGORIES)
  // =========================================================================
  getCategories: () => {
    try {
      const data = localStorage.getItem(KEYS.CATEGORIES);
      // Nếu chưa có dữ liệu trong máy (lần đầu vào app), khởi tạo bằng seedData mẫu
      if (!data) {
        localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
        return INITIAL_CATEGORIES;
      }
      return JSON.parse(data); // Chuyển chuỗi JSON thành mảng JavaScript
    } catch (e) {
      console.error("Failed to load categories from localStorage", e);
      return INITIAL_CATEGORIES;
    }
  },

  saveCategories: (categories) => {
    try {
      // Chuyển mảng dữ liệu thành chuỗi JSON để lưu vào LocalStorage
      localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(categories));
    } catch (e) {
      console.error("Failed to save categories to localStorage", e);
    }
  },

  // =========================================================================
  // 2. QUẢN LÝ BÀI BÁO (NEWS ARTICLES)
  // =========================================================================
  getNews: () => {
    try {
      const data = localStorage.getItem(KEYS.NEWS);
      if (!data) {
        localStorage.setItem(KEYS.NEWS, JSON.stringify(INITIAL_NEWS));
        return INITIAL_NEWS;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error("Failed to load news from localStorage", e);
      return INITIAL_NEWS;
    }
  },

  saveNews: (news) => {
    try {
      localStorage.setItem(KEYS.NEWS, JSON.stringify(news));
    } catch (e) {
      console.error("Failed to save news to localStorage", e);
    }
  },

  // =========================================================================
  // 3. QUẢN LÝ NGƯỜI DÙNG (USERS)
  // =========================================================================
  getUsers: () => {
    try {
      const data = localStorage.getItem(KEYS.USERS);
      if (!data) {
        localStorage.setItem(KEYS.USERS, JSON.stringify(INITIAL_USERS));
        return INITIAL_USERS;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error("Failed to load users from localStorage", e);
      return INITIAL_USERS;
    }
  },

  saveUsers: (users) => {
    try {
      localStorage.setItem(KEYS.USERS, JSON.stringify(users));
    } catch (e) {
      console.error("Failed to save users to localStorage", e);
    }
  },

  // =========================================================================
  // 4. KHÔI PHỤC DỮ LIỆU GỐC (RESET ALL DATA)
  // Ghi đè toàn bộ LocalStorage về dữ liệu mẫu ban đầu (seedData)
  // =========================================================================
  resetAllData: () => {
    try {
      localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
      localStorage.setItem(KEYS.NEWS, JSON.stringify(INITIAL_NEWS));
      localStorage.setItem(KEYS.USERS, JSON.stringify(INITIAL_USERS));
      return {
        categories: INITIAL_CATEGORIES,
        news: INITIAL_NEWS,
        users: INITIAL_USERS
      };
    } catch (e) {
      console.error("Failed to reset database", e);
      return {
        categories: INITIAL_CATEGORIES,
        news: INITIAL_NEWS,
        users: INITIAL_USERS
      };
    }
  },

  // =========================================================================
  // 5. PHIÊN ĐĂNG NHẬP (AUTH SESSION PERSISTENCE)
  // Giúp người dùng F5 không bị mất phiên làm việc
  // =========================================================================
  getAuthSession: () => {
    try {
      const data = localStorage.getItem(KEYS.AUTH);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  saveAuthSession: (user) => {
    try {
      localStorage.setItem(KEYS.AUTH, JSON.stringify(user));
    } catch (e) {
      console.error("Failed to save auth session", e);
    }
  },

  clearAuthSession: () => {
    try {
      localStorage.removeItem(KEYS.AUTH); // Xóa session khi logout
    } catch (e) {
      console.error("Failed to clear auth session", e);
    }
  },

  // =========================================================================
  // 6. GIAO DIỆN (THEME PREFERENCE)
  // Lưu sở thích nền sáng (light) hoặc tối (dark) của người dùng
  // =========================================================================
  getTheme: () => {
    try {
      return localStorage.getItem(KEYS.THEME) || "light";
    } catch (e) {
      return "light";
    }
  },

  saveTheme: (theme) => {
    try {
      localStorage.setItem(KEYS.THEME, theme);
    } catch (e) {
      console.error("Failed to save theme", e);
    }
  }
};
