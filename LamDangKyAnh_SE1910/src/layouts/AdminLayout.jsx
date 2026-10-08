import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";

export default function AdminLayout({
  currentUser,
  onLogout,
  activeTab,
  onSelectTab,
  theme,
  onToggleTheme,
  children
}) {
  return (
    <div className="app-container">
      {/* Left Sidebar Menu */}
      <Sidebar activeTab={activeTab} onSelectTab={onSelectTab} />

      {/* Main Content Area */}
      <div className="main-wrapper">
        <Header
          currentUser={currentUser}
          onLogout={onLogout}
          activeTab={activeTab}
          theme={theme}
          onToggleTheme={onToggleTheme}
        />

        <main className="content-body">
          {children}
        </main>
      </div>
    </div>
  );
}
