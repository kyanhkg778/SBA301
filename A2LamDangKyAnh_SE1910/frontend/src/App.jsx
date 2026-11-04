import React, { useState } from 'react';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import LoginModal from './components/modals/LoginModal';
import PublicNewsPage from './pages/public/PublicNewsPage';
import AccountManagementPage from './pages/accounts/AccountManagementPage';
import CategoryManagementPage from './pages/categories/CategoryManagementPage';
import NewsManagementPage from './pages/news/NewsManagementPage';
import NewsHistoryPage from './pages/profile/NewsHistoryPage';
import ProfilePage from './pages/profile/ProfilePage';

const AUTH_STORAGE_KEY = 'funews_current_user';

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [activeTab, setActiveTab] = useState('public');
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    // Default redirect to role workspace
    if (user.accountRole === 1) {
      setActiveTab('accounts');
    } else {
      setActiveTab('news');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setActiveTab('public');
  };

  const handleProfileUpdated = (updatedUser) => {
    setCurrentUser(updatedUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedUser));
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Reusable Top Navbar */}
      <Navbar
        currentUser={currentUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenLogin={() => setLoginModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Content Area (Pages) */}
      <main className="flex-grow-1">
        {activeTab === 'public' && <PublicNewsPage />}
        {activeTab === 'accounts' && currentUser?.accountRole === 1 && <AccountManagementPage />}
        {activeTab === 'news' && currentUser?.accountRole === 2 && <NewsManagementPage currentUser={currentUser} />}
        {activeTab === 'categories' && currentUser?.accountRole === 2 && <CategoryManagementPage />}
        {activeTab === 'history' && currentUser?.accountRole === 2 && <NewsHistoryPage currentUser={currentUser} />}
        {activeTab === 'profile' && currentUser?.accountRole === 2 && (
          <ProfilePage
            currentUser={currentUser}
            onProfileUpdated={handleProfileUpdated}
          />
        )}
      </main>

      {/* Reusable Footer */}
      <Footer />

      {/* Reusable Authentication Modal */}
      <LoginModal
        show={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
