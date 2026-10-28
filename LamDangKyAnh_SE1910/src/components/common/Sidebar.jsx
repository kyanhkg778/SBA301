// Danh sách các mục điều hướng trên thanh menu bên trái (Sidebar)
const MENU_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "📊" },
  { id: "categories", label: "Categories", icon: "📁" },
  { id: "news", label: "News Articles", icon: "📰" },
  { id: "users", label: "User Management", icon: "👥" },
  { id: "settings", label: "System Settings", icon: "⚙️" }
];

export default function Sidebar({ activeTab, onSelectTab }) {
  return (
    <aside className="sidebar-container">
      {/* Logo hệ thống */}
      <div className="sidebar-brand">
        <img
          src="/logo.svg"
          alt="FUNewsManagementSystem AI Logo"
          className="sidebar-brand-img"
        />
      </div>

      {/* Menu điều hướng các phân hệ */}
      <nav className="sidebar-nav">
        {MENU_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`sidebar-nav-item ${isActive ? "active" : ""}`}
              onClick={() => onSelectTab(item.id)}
            >
              <span className="sidebar-nav-icon">{item.icon}</span>
              <span className="flex-grow-1 text-start">{item.label}</span>
              {isActive && (
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: "#38bdf8",
                    display: "inline-block"
                  }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Thông tin sinh viên ở chân Sidebar */}
      <div className="sidebar-footer">
        <div className="fw-bold text-white mb-1">FUNews Management</div>
        <div>SV: Lâm Đăng Kỳ Anh</div>
        <div>MSSV: CE190574 • Lớp: SE1910</div>
        <div className="text-secondary small mt-1">SBA301 Assignment 01</div>
      </div>
    </aside>
  );
}
