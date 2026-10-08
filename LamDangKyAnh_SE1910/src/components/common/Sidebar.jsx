export default function Sidebar({ activeTab, onSelectTab }) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊", badge: null },
    { id: "categories", label: "Categories", icon: "📁", badge: null },
    { id: "news", label: "News Articles", icon: "📰", badge: null },
    { id: "users", label: "User Management", icon: "👥", badge: null },
    { id: "settings", label: "System Settings", icon: "⚙️", badge: null }
  ];

  return (
    <aside className="sidebar-container">
      {/* Brand Header with AI Generated Logo */}
      <div className="sidebar-brand">
        <img
          src="/logo.svg"
          alt="FUNewsManagementSystem AI Logo"
          className="sidebar-brand-img"
        />
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

      {/* Student & Course Footer Information */}
      <div className="sidebar-footer">
        <div className="fw-bold text-white mb-1">FUNews Management</div>
        <div>SV: Lâm Đăng Kỳ Anh</div>
        <div>MSSV: CE190574 • Lớp: SE1910</div>
        <div className="text-secondary small mt-1">SBA301 Assignment 01</div>
      </div>
    </aside>
  );
}
