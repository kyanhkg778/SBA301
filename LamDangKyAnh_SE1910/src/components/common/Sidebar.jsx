export default function Sidebar({ activeTab, onSelectTab }) {
  const menuItems = [
    { id: "dashboard", label: "Tổng quan", icon: "📊" },
    { id: "categories", label: "Danh mục", icon: "📁" },
    { id: "news", label: "Bài viết", icon: "📰" },
    { id: "users", label: "Người dùng", icon: "👥" },
    { id: "settings", label: "Cài đặt", icon: "⚙️" }
  ];

  return (
    <aside className="sidebar-container">
      {/* Brand Header */}
      <div className="sidebar-brand">
        <img
          src="/logo.svg"
          alt="FUNews Logo"
          className="sidebar-brand-img"
        />
        <div className="d-flex flex-column">
          <span className="fw-bold text-white fs-6 lh-1">FUNews</span>
          <span className="text-secondary small" style={{ fontSize: "0.75rem" }}>Admin Portal</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
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

      {/* Simplified Footer */}
      <div className="sidebar-footer">
        <div className="text-secondary small">© 2026 FUNews Management</div>
      </div>
    </aside>
  );
}
