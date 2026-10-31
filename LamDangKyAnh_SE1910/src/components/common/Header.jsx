import { Button, Badge } from "react-bootstrap";

export default function Header({ currentUser, onLogout, activeTab, theme, onToggleTheme }) {
  const getTabTitle = (tab) => {
    switch (tab) {
      case "dashboard": return "Tổng quan hệ thống";
      case "categories": return "Quản lý danh mục";
      case "news": return "Quản lý bài viết";
      case "users": return "Quản lý người dùng";
      case "settings": return "Cài đặt hệ thống";
      default: return "FUNews Management";
    }
  };

  return (
    <header className="top-navbar">
      <div className="d-flex align-items-center">
        <h5 className="mb-0 fw-semibold text-truncate fs-6 text-dark">
          {getTabTitle(activeTab)}
        </h5>
      </div>

      <div className="d-flex align-items-center gap-3">
        {/* Theme Toggle Button */}
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={onToggleTheme}
          title={`Chuyển sang chế độ ${theme === "dark" ? "Sáng" : "Tối"}`}
          className="d-flex align-items-center gap-1 px-2 py-1 rounded-pill border"
        >
          {theme === "dark" ? "☀️ Sáng" : "🌙 Tối"}
        </Button>

        {/* Current User Info */}
        <div className="d-flex align-items-center gap-2 border-start ps-3">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-sm"
            style={{
              width: "34px",
              height: "34px",
              fontSize: "0.85rem",
              background: currentUser?.role === 1
                ? "linear-gradient(135deg, #4f46e5, #06b6d4)"
                : "linear-gradient(135deg, #0284c7, #38bdf8)"
            }}
          >
            {currentUser?.username?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div className="d-none d-sm-block text-start lh-sm">
            <div className="fw-semibold text-truncate small" style={{ maxWidth: "130px" }}>
              {currentUser?.fullName || currentUser?.username}
            </div>
            <div>
              {currentUser?.role === 1 ? (
                <span className="badge-admin" style={{ fontSize: "0.65rem", padding: "0.15rem 0.45rem" }}>Admin</span>
              ) : (
                <span className="badge-staff" style={{ fontSize: "0.65rem", padding: "0.15rem 0.45rem" }}>Staff</span>
              )}
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <Button
          variant="outline-danger"
          size="sm"
          onClick={onLogout}
          className="d-flex align-items-center gap-1 ms-1 px-2 py-1"
        >
          Đăng xuất
        </Button>
      </div>
    </header>
  );
}
