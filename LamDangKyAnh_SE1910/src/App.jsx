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
  // Authentication State
  const [currentUser, setCurrentUser] = useState(() => storageService.getAuthSession());

  // Navigation State
  const [activeTab, setActiveTab] = useState("dashboard");

  // Theme State
  const [theme, setTheme] = useState(() => storageService.getTheme());

  // Entity Data States (Hydrated from localStorage)
  const [categories, setCategories] = useState(() => storageService.getCategories());
  const [news, setNews] = useState(() => storageService.getNews());
  const [users, setUsers] = useState(() => storageService.getUsers());

  // Apply Theme Attribute to Document Root
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    storageService.saveTheme(theme);
  }, [theme]);

  // Toggle Theme Handler
  const handleToggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Auth Handlers
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    storageService.saveAuthSession(user);
    setActiveTab("dashboard");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    storageService.clearAuthSession();
  };

  // Category CRUD Handlers (Immutable updates)
  const handleAddCategory = (categoryData) => {
    setCategories((prev) => {
      const nextId = prev.length > 0 ? Math.max(...prev.map((c) => Number(c.id))) + 1 : 1;
      const newCategory = { id: nextId, ...categoryData };
      const updated = [...prev, newCategory];
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

  // News CRUD Handlers (Immutable updates)
  const handleAddNews = (newsData) => {
    setNews((prev) => {
      const nextId = prev.length > 0 ? Math.max(...prev.map((n) => Number(n.id))) + 1 : 1;
      const newArticle = {
        id: nextId,
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

  // User CRUD Handlers (Immutable updates)
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

  // Reset to Default Seed Data
  const handleResetAllData = () => {
    const fresh = storageService.resetAllData();
    setCategories(fresh.categories);
    setNews(fresh.news);
    setUsers(fresh.users);
  };

  // Render Login Page if not authenticated
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
