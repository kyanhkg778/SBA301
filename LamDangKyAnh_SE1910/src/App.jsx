import { useState, useEffect } from "react";
import LoginPage from "./components/auth/LoginPage";
import AdminLayout from "./layouts/AdminLayout";
import DashboardPage from "./components/dashboard/DashboardPage";
import CategoryManagement from "./components/category/CategoryManagement";
import NewsManagement from "./components/news/NewsManagement";
import UserManagement from "./components/users/UserManagement";
import SettingsPage from "./components/settings/SettingsPage";
import { storageService } from "./services/storageService";

export default function App() {
  // =========================================================================
  // 1. STATE QUẢN LÝ ỨNG DỤNG (APPLICATION STATE)
  // Sử dụng Lazy Initialization: Hàm trong useState() chỉ chạy 1 lần duy nhất 
  // khi component mount để đọc LocalStorage, tối ưu hiệu năng không đọc lại ở mỗi re-render.
  // =========================================================================

  // Lưu thông tin người dùng đang đăng nhập (null nếu chưa đăng nhập)
  const [currentUser, setCurrentUser] = useState(() => storageService.getAuthSession());

  // Lưu tab màn hình đang được chọn (dashboard, categories, news, users, settings)
  const [activeTab, setActiveTab] = useState("dashboard");

  // Lưu theme giao diện hiện tại ("light" hoặc "dark")
  const [theme, setTheme] = useState(() => storageService.getTheme());

  // Dữ liệu thực thể chính của hệ thống, lấy dữ liệu đã lưu từ LocalStorage
  const [categories, setCategories] = useState(() => storageService.getCategories());
  const [news, setNews] = useState(() => storageService.getNews());
  const [users, setUsers] = useState(() => storageService.getUsers());

  // =========================================================================
  // 2. SIDE EFFECTS (ĐỒNG BỘ GIAO DIỆN & PERSISTENCE)
  // Gắn thuộc tính data-theme vào thẻ <html> để CSS selector áp dụng màu Dark/Light
  // =========================================================================
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    storageService.saveTheme(theme); // Lưu cấu hình theme vào LocalStorage
  }, [theme]);

  // Hàm đảo trạng thái Theme giữa "light" và "dark"
  const handleToggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // =========================================================================
  // 3. XỬ LÝ XÁC THỰC (AUTHENTICATION HANDLERS)
  // =========================================================================
  // Đăng nhập thành công: Lưu user vào state và LocalStorage, điều hướng về Dashboard
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    storageService.saveAuthSession(user);
    setActiveTab("dashboard");
  };

  // Đăng xuất: Xóa user khỏi state và xóa session trong LocalStorage
  const handleLogout = () => {
    setCurrentUser(null);
    storageService.clearAuthSession();
  };

  // =========================================================================
  // 4. QUẢN LÝ DANH MỤC (CATEGORY CRUD - IMMUTABLE UPDATES)
  // Nguyên tắc: Luôn tạo mảng mới bằng spread operator (...prev), không mutate mảng cũ
  // =========================================================================
  const handleAddCategory = (categoryData) => {
    setCategories((prev) => {
      // Tự động sinh ID tiếp theo: Lấy Max ID hiện có + 1 (hoặc 1 nếu mảng rỗng)
      const nextId = prev.length > 0 ? Math.max(...prev.map((c) => Number(c.id))) + 1 : 1;
      const newCategory = { id: nextId, ...categoryData };
      const updated = [...prev, newCategory]; // Ghép phần tử mới vào cuối mảng
      storageService.saveCategories(updated); // Đồng bộ ngay vào LocalStorage
      return updated;
    });
  };

  const handleUpdateCategory = (id, categoryData) => {
    setCategories((prev) => {
      // Dùng .map() duyệt qua từng item: nếu khớp ID thì ghi đè dữ liệu mới, ngược lại giữ nguyên
      const updated = prev.map((cat) =>
        Number(cat.id) === Number(id) ? { ...cat, ...categoryData, id: Number(id) } : cat
      );
      storageService.saveCategories(updated);
      return updated;
    });
  };

  const handleDeleteCategory = (id) => {
    setCategories((prev) => {
      // Dùng .filter() để loại bỏ phần tử có ID trùng khớp, giữ lại các phần tử khác
      const updated = prev.filter((cat) => Number(cat.id) !== Number(id));
      storageService.saveCategories(updated);
      return updated;
    });
  };

  // =========================================================================
  // 5. QUẢN LÝ BÀI BÁO (NEWS CRUD - IMMUTABLE UPDATES)
  // =========================================================================
  const handleAddNews = (newsData) => {
    setNews((prev) => {
      // Tự động sinh ID tăng dần và tự động gán ngày tạo (createdAt) hôm nay dạng YYYY-MM-DD
      const nextId = prev.length > 0 ? Math.max(...prev.map((n) => Number(n.id))) + 1 : 1;
      const newArticle = {
        id: nextId,
        createdAt: new Date().toISOString().split("T")[0],
        ...newsData
      };
      const updated = [newArticle, ...prev]; // Đưa bài viết mới lên đầu danh sách
      storageService.saveNews(updated);
      return updated;
    });
  };

  const handleUpdateNews = (id, newsData) => {
    setNews((prev) => {
      // Cập nhật thông tin bài viết theo ID
      const updated = prev.map((item) =>
        Number(item.id) === Number(id) ? { ...item, ...newsData, id: Number(id) } : item
      );
      storageService.saveNews(updated);
      return updated;
    });
  };

  const handleDeleteNews = (id) => {
    setNews((prev) => {
      // Lọc bỏ bài viết có ID cần xóa
      const updated = prev.filter((item) => Number(item.id) !== Number(id));
      storageService.saveNews(updated);
      return updated;
    });
  };

  // =========================================================================
  // 6. QUẢN LÝ NGƯỜI DÙNG (USER CRUD - IMMUTABLE UPDATES)
  // =========================================================================
  const handleAddUser = (userData) => {
    setUsers((prev) => {
      const nextId = prev.length > 0 ? Math.max(...prev.map((u) => Number(u.id))) + 1 : 1;
      const newUser = { id: nextId, ...userData };
      const updated = [...prev, newUser];
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

  // =========================================================================
  // 7. KHÔI PHỤC DỮ LIỆU GỐC (RESET TO DEFAULT SEED DATA)
  // =========================================================================
  const handleResetAllData = () => {
    const fresh = storageService.resetAllData();
    setCategories(fresh.categories);
    setNews(fresh.news);
    setUsers(fresh.users);
  };

  // =========================================================================
  // 8. BẢO VỆ ROUTE (ROUTE GUARDING)
  // Nếu chưa có phiên đăng nhập (!currentUser), chặn truy cập và hiển thị LoginPage
  // =========================================================================
  if (!currentUser) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  // Render Admin Master Layout with active view
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
