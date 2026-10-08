import { INITIAL_CATEGORIES, INITIAL_NEWS, INITIAL_USERS } from "../data/seedData";

const KEYS = {
  CATEGORIES: "funews_categories",
  NEWS: "funews_news",
  USERS: "funews_users",
  AUTH: "funews_auth_session",
  THEME: "funews_theme_preference"
};

export const storageService = {
  getCategories: () => {
    try {
      const data = localStorage.getItem(KEYS.CATEGORIES);
      if (!data) {
        localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
        return INITIAL_CATEGORIES;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error("Failed to load categories from localStorage", e);
      return INITIAL_CATEGORIES;
    }
  },

  saveCategories: (categories) => {
    try {
      localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(categories));
    } catch (e) {
      console.error("Failed to save categories to localStorage", e);
    }
  },

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
      localStorage.removeItem(KEYS.AUTH);
    } catch (e) {
      console.error("Failed to clear auth session", e);
    }
  },

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
