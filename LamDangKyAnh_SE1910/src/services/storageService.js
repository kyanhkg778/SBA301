import { INITIAL_CATEGORIES, INITIAL_NEWS, INITIAL_USERS } from "../data/seedData";

// Các khóa lưu trữ trong LocalStorage của trình duyệt
const STORAGE_KEYS = {
  CATEGORIES: "funews_categories",
  NEWS: "funews_news",
  USERS: "funews_users",
  AUTH: "funews_auth_session",
  THEME: "funews_theme_preference"
};

/**
 * Hàm dùng chung để đọc dữ liệu JSON từ LocalStorage.
 * Nếu chưa có dữ liệu hoặc lỗi parse, tự động khởi tạo bằng dữ liệu mẫu (fallbackData).
 */
const readStorage = (key, fallbackData) => {
  try {
    const rawData = localStorage.getItem(key);
    if (!rawData) {
      if (fallbackData !== null) {
        localStorage.setItem(key, JSON.stringify(fallbackData));
      }
      return fallbackData;
    }
    return JSON.parse(rawData);
  } catch (error) {
    console.error(`Lỗi đọc dữ liệu từ khóa [${key}]:`, error);
    return fallbackData;
  }
};

/**
 * Hàm dùng chung để ghi dữ liệu xuống LocalStorage.
 */
const writeStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Lỗi lưu dữ liệu vào khóa [${key}]:`, error);
  }
};

export const storageService = {
  // Quản lý Danh mục (Categories)
  getCategories: () => readStorage(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES),
  saveCategories: (categories) => writeStorage(STORAGE_KEYS.CATEGORIES, categories),

  // Quản lý Bài báo (News)
  getNews: () => readStorage(STORAGE_KEYS.NEWS, INITIAL_NEWS),
  saveNews: (news) => writeStorage(STORAGE_KEYS.NEWS, news),

  // Quản lý Người dùng (Users)
  getUsers: () => readStorage(STORAGE_KEYS.USERS, INITIAL_USERS),
  saveUsers: (users) => writeStorage(STORAGE_KEYS.USERS, users),

  // Khôi phục toàn bộ dữ liệu về mặc định (Seed Data)
  resetAllData: () => {
    writeStorage(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
    writeStorage(STORAGE_KEYS.NEWS, INITIAL_NEWS);
    writeStorage(STORAGE_KEYS.USERS, INITIAL_USERS);
    return {
      categories: INITIAL_CATEGORIES,
      news: INITIAL_NEWS,
      users: INITIAL_USERS
    };
  },

  // Quản lý phiên đăng nhập (Auth Session)
  getAuthSession: () => readStorage(STORAGE_KEYS.AUTH, null),
  saveAuthSession: (user) => writeStorage(STORAGE_KEYS.AUTH, user),
  clearAuthSession: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.AUTH);
    } catch (error) {
      console.error("Lỗi xóa phiên đăng nhập:", error);
    }
  },

  // Quản lý giao diện Sáng / Tối (Theme)
  getTheme: () => {
    try {
      return localStorage.getItem(STORAGE_KEYS.THEME) || "light";
    } catch {
      return "light";
    }
  },
  saveTheme: (theme) => {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
    } catch (error) {
      console.error("Lỗi lưu giao diện:", error);
    }
  }
};
