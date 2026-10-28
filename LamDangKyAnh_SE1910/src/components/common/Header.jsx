import { Button } from "react-bootstrap";

// Bản đồ ánh xạ mã Tab sang tiêu đề hiển thị trên thanh Header
const TAB_TITLES = {
  dashboard: "Bảng Điều Khiển (Dashboard Overview)",
  categories: "Quản Lý Danh Mục Tin Tức (Category Management)",
  news: "Quản Lý Bài Báo & Tin Tức (News Articles Management)",
  users: "Quản Lý Tài Khoản Người Dùng (User Management)",
  settings: "Cài Đặt Hệ Thống & Thông Tin (System Settings)"
};

export default function Header({ currentUser, onLogout, activeTab, theme, onToggleTheme }) {
  const isAdmin = currentUser?.role === 1;
  const avatarBg = isAdmin
    ? "linear-gradient(135deg, #4f46e5, #06b6d4)"
    : "linear-gradient(135deg, #0284c7, #38bdf8)";

  return (
    <header className="top-navbar">
      {/* Tiêu đề trang hiện tại */}
      <div className="d-flex align-items-center gap-3">
        <h5 className="mb-0 fw-bold text-truncate" style={{ fontSize: "1.1rem" }}>
          {TAB_TITLES[activeTab] || "FUNews Management"}
        </h5>
      </div>

      {/* Khu vực tiện ích: Đổi giao diện, Thông tin User & Đăng xuất */}
      <div className="d-flex align-items-center gap-3">
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={onToggleTheme}
          title={`Chuyển sang giao diện ${theme === "dark" ? "Sáng" : "Tối"}`}
          className="d-flex align-items-center gap-1 px-2 py-1"
        >
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </Button>

        <div className="d-flex align-items-center gap-2 border-start ps-3">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-sm"
            style={{ width: "36px", height: "36px", background: avatarBg }}
          >
            {currentUser?.username?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div className="d-none d-md-block text-start">
            <div className="fw-semibold text-truncate small" style={{ maxWidth: "140px" }}>
              {currentUser?.fullName || currentUser?.username}
            </div>
            <div>
              <span className={isAdmin ? "badge-admin" : "badge-staff"}>
                {isAdmin ? "Admin" : "Staff"}
              </span>
            </div>
          </div>
        </div>

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
