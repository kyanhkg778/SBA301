import { Button, Badge } from "react-bootstrap";

export default function Header({ currentUser, onLogout, activeTab, theme, onToggleTheme }) {
  const getTabTitle = (tab) => {
    switch (tab) {
      case "dashboard": return "Bảng Điều Khiển (Dashboard Overview)";
      case "categories": return "Quản Lý Danh Mục Tin Tức (Category Management)";
      case "news": return "Quản Lý Bài Báo & Tin Tức (News Articles Management)";
      case "users": return "Quản Lý Tài Khoản Người Dùng (User Management)";
      case "settings": return "Cài Đặt Hệ Thống & Thông Tin (System Settings)";
      default: return "FUNews Management";
    }
  };

  return (
    <header className="top-navbar">
      <div className="d-flex align-items-center gap-3">
        <h5 className="mb-0 fw-bold text-truncate" style={{ fontSize: "1.1rem" }}>
          {getTabTitle(activeTab)}
        </h5>
      </div>

      <div className="d-flex align-items-center gap-3">
        {/* Theme Toggle Button */}
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={onToggleTheme}
          title={`Switch to ${theme === "dark" ? "Light" : "Dark"} mode`}
          className="d-flex align-items-center gap-1 px-2 py-1"
        >
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </Button>

        {/* Current User Info */}
        <div className="d-flex align-items-center gap-2 border-start ps-3">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-sm"
            style={{
              width: "36px",
              height: "36px",
              background: currentUser?.role === 1
                ? "linear-gradient(135deg, #4f46e5, #06b6d4)"
                : "linear-gradient(135deg, #0284c7, #38bdf8)"
            }}
          >
            {currentUser?.username?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div className="d-none d-md-block text-start">
            <div className="fw-semibold text-truncate small" style={{ maxWidth: "140px" }}>
              {currentUser?.fullName || currentUser?.username}
            </div>
            <div>
              {currentUser?.role === 1 ? (
                <span className="badge-admin">Admin</span>
              ) : (
                <span className="badge-staff">Staff</span>
              )}
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <Button
          variant="outline-danger"
          size="sm"
          onClick={onLogout}
          className="d-flex align-items-center gap-1 ms-1"
        >
          Đăng xuất
        </Button>
      </div>
    </header>
  );
}
