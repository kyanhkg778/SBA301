import { useState, useEffect } from "react";
import LoginPage from "./components/auth/LoginPage";
import AdminLayout from "./layouts/AdminLayout";
import DashboardPage from "./components/dashboard/DashboardPage";
import CategoryManagement from "./components/category/CategoryManagement";
import NewsManagement from "./components/news/NewsManagement";
import UserManagement from "./components/users/UserManagement";
import SettingsPage from "./components/settings/SettingsPage";
import { storageService } from "./services/storageService";

// Hàm hỗ trợ tự động sinh ID tăng dần (Max ID + 1)
const getNextId = (list) =>
  list.length > 0 ? Math.max(...list.map((item) => Number(item.id))) + 1 : 1;

export default function App() {
  // 1. State Quản lý Phiên đăng nhập, Điều hướng Tab & Giao diện (Theme)
  const [currentUser, setCurrentUser] = useState(() => storageService.getAuthSession());
  const [activeTab, setActiveTab] = useState("dashboard");
  const [theme, setTheme] = useState(() => storageService.getTheme());

  // 2. State Dữ liệu Thực thể (Khởi tạo Lazy Initialization từ LocalStorage)
  const [categories, setCategories] = useState(() => storageService.getCategories());
  const [news, setNews] = useState(() => storageService.getNews());
  const [users, setUsers] = useState(() => storageService.getUsers());

  // Đồng bộ giao diện Sáng / Tối lên thẻ gốc <html>
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    storageService.saveTheme(theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // --- XỬ LÝ ĐĂNG NHẬP / ĐĂNG XUẤT ---
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    storageService.saveAuthSession(user);
    setActiveTab("dashboard");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    storageService.clearAuthSession();
  };

  // --- CRUD DANH MỤC (CATEGORIES) - Cập nhật bất biến (Immutable) ---
  const handleAddCategory = (categoryData) => {
    setCategories((prev) => {
      const updated = [...prev, { id: getNextId(prev), ...categoryData }];
      storageService.saveCategories(updated);
      return updated;
    });
  };

  const handleUpdateCategory = (id, categoryData) => {
    setCategories((prev) => {
      const updated = prev.map((cat) =>
        Number(cat.id) === Number(id) ? { ...cat, ...categoryData, id: Number(id) } : cat
      );
      storageService.saveCategories(updated);
      return updated;
    });
  };

  const handleDeleteCategory = (id) => {
    setCategories((prev) => {
      const updated = prev.filter((cat) => Number(cat.id) !== Number(id));
      storageService.saveCategories(updated);
      return updated;
    });
  };

  // --- CRUD BÀI BÁO (NEWS ARTICLES) - Cập nhật bất biến (Immutable) ---
  const handleAddNews = (newsData) => {
    setNews((prev) => {
      const newArticle = {
        id: getNextId(prev),
        createdAt: new Date().toISOString().split("T")[0],
        ...newsData
      };
      const updated = [newArticle, ...prev];
      storageService.saveNews(updated);
      return updated;
    });
  };

  const handleUpdateNews = (id, newsData) => {
    setNews((prev) => {
      const updated = prev.map((item) =>
        Number(item.id) === Number(id) ? { ...item, ...newsData, id: Number(id) } : item
      );
      storageService.saveNews(updated);
      return updated;
    });
  };

  const handleDeleteNews = (id) => {
    setNews((prev) => {
      const updated = prev.filter((item) => Number(item.id) !== Number(id));
      storageService.saveNews(updated);
      return updated;
    });
  };

  // --- CRUD NGƯỜI DÙNG (USERS) - Cập nhật bất biến (Immutable) ---
  const handleAddUser = (userData) => {
    setUsers((prev) => {
      const updated = [...prev, { id: getNextId(prev), ...userData }];
      storageService.saveUsers(updated);
      return updated;
    });
  };

  const handleUpdateUser = (id, userData) => {
    setUsers((prev) => {
      const updated = prev.map((u) =>
        Number(u.id) === Number(id) ? { ...u, ...userData, id: Number(id) } : u
      );
      storageService.saveUsers(updated);
      return updated;
    });
  };

  const handleDeleteUser = (id) => {
    setUsers((prev) => {
      const updated = prev.filter((u) => Number(u.id) !== Number(id));
      storageService.saveUsers(updated);
      return updated;
    });
  };

  // --- KHÔI PHỤC DỮ LIỆU GỐC (SEED DATA) ---
  const handleResetAllData = () => {
    const fresh = storageService.resetAllData();
    setCategories(fresh.categories);
    setNews(fresh.news);
    setUsers(fresh.users);
  };

  // Bảo vệ Route: Nếu chưa đăng nhập thì hiển thị màn hình Login
  if (!currentUser) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  // Đã đăng nhập: Hiển thị bố cục quản trị AdminLayout và trang tương ứng theo activeTab
  return (
    <AdminLayout
      currentUser={currentUser}
      onLogout={handleLogout}
      activeTab={activeTab}
      onSelectTab={setActiveTab}
      theme={theme}
      onToggleTheme={handleToggleTheme}
    >
      {activeTab === "dashboard" && (
        <DashboardPage
          categories={categories}
          news={news}
          users={users}
          onSelectTab={setActiveTab}
        />
      )}

      {activeTab === "categories" && (
        <CategoryManagement
          categories={categories}
          news={news}
          onAddCategory={handleAddCategory}
          onUpdateCategory={handleUpdateCategory}
          onDeleteCategory={handleDeleteCategory}
        />
      )}

      {activeTab === "news" && (
        <NewsManagement
          news={news}
          categories={categories}
          currentUser={currentUser}
          onAddNews={handleAddNews}
          onUpdateNews={handleUpdateNews}
          onDeleteNews={handleDeleteNews}
        />
      )}

      {activeTab === "users" && (
        <UserManagement
          users={users}
          currentUser={currentUser}
          onAddUser={handleAddUser}
          onUpdateUser={handleUpdateUser}
          onDeleteUser={handleDeleteUser}
        />
      )}

      {activeTab === "settings" && (
        <SettingsPage
          currentUser={currentUser}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          onResetData={handleResetAllData}
          dataCounts={{
            categories: categories.length,
            news: news.length,
            users: users.length
          }}
        />
      )}
    </AdminLayout>
  );
}
