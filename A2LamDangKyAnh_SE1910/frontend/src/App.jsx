import React, { useState, useEffect } from 'react';
import Navbar from './components/common/Navbar';
import LoginModal from './components/auth/LoginModal';
import PublicNewsView from './components/public/PublicNewsView';
import AccountManagement from './components/accounts/AccountManagement';
import CategoryManagement from './components/categories/CategoryManagement';
import NewsManagement from './components/news/NewsManagement';
import ProfileManagement from './components/profile/ProfileManagement';
import NewsHistory from './components/profile/NewsHistory';

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
      {/* Top Navbar */}
      <Navbar
        currentUser={currentUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenLogin={() => setLoginModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-grow-1">
        {activeTab === 'public' && <PublicNewsView />}
        {activeTab === 'accounts' && currentUser?.accountRole === 1 && <AccountManagement />}
        {activeTab === 'news' && currentUser?.accountRole === 2 && <NewsManagement currentUser={currentUser} />}
        {activeTab === 'categories' && currentUser?.accountRole === 2 && <CategoryManagement />}
        {activeTab === 'history' && currentUser?.accountRole === 2 && <NewsHistory currentUser={currentUser} />}
        {activeTab === 'profile' && currentUser?.accountRole === 2 && (
          <ProfileManagement
            currentUser={currentUser}
            onProfileUpdated={handleProfileUpdated}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-top py-3 text-center text-muted small mt-auto">
        <div className="container">
          <span>FUNewsManagementSystem &bull; Assignment 02 SBA301 &bull; Student: <strong>LamDangKyAnh</strong> (Class: <strong>SE1910</strong>)</span>
        </div>
      </footer>

      {/* Authentication Modal */}
      <LoginModal
        show={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

