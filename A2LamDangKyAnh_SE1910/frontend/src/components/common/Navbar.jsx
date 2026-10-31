import React from 'react';

export default function Navbar({ currentUser, activeTab, setActiveTab, onOpenLogin, onLogout }) {
  const isAdmin = currentUser?.accountRole === 1;
  const isStaff = currentUser?.accountRole === 2;

  return (
    <nav className="navbar navbar-expand-lg app-navbar px-3 py-2">
      <div className="container-fluid">
        {/* Brand */}
        <div 
          className="navbar-brand d-flex align-items-center gap-2 cursor-pointer" 
          style={{ cursor: 'pointer' }}
          onClick={() => setActiveTab('public')}
        >
          <span className="brand-badge">FUNews</span>
          <span className="fw-bold text-dark fs-5">Management System</span>
        </div>

        {/* Navigation items */}
        <div className="d-flex align-items-center gap-2">
          {/* Public Portal Button */}
          <button 
            className={`btn btn-sm ${activeTab === 'public' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setActiveTab('public')}
          >
            <i className="bi bi-newspaper me-1"></i> Public News
          </button>

          {currentUser ? (
            <>
              {/* Admin Navigation */}
              {isAdmin && (
                <button 
                  className={`btn btn-sm ${activeTab === 'accounts' ? 'btn-primary' : 'btn-outline-secondary'}`}
                  onClick={() => setActiveTab('accounts')}
                >
                  <i className="bi bi-people-fill me-1"></i> Accounts
                </button>
              )}

              {/* Staff Navigation */}
              {isStaff && (
                <>
                  <button 
                    className={`btn btn-sm ${activeTab === 'news' ? 'btn-primary' : 'btn-outline-secondary'}`}
                    onClick={() => setActiveTab('news')}
                  >
                    <i className="bi bi-file-earmark-text me-1"></i> News Articles
                  </button>
                  <button 
                    className={`btn btn-sm ${activeTab === 'categories' ? 'btn-primary' : 'btn-outline-secondary'}`}
                    onClick={() => setActiveTab('categories')}
                  >
                    <i className="bi bi-folder2 me-1"></i> Categories
                  </button>
                  <button 
                    className={`btn btn-sm ${activeTab === 'history' ? 'btn-primary' : 'btn-outline-secondary'}`}
                    onClick={() => setActiveTab('history')}
                  >
                    <i className="bi bi-clock-history me-1"></i> My History
                  </button>
                  <button 
                    className={`btn btn-sm ${activeTab === 'profile' ? 'btn-primary' : 'btn-outline-secondary'}`}
                    onClick={() => setActiveTab('profile')}
                  >
                    <i className="bi bi-person-gear me-1"></i> My Profile
                  </button>
                </>
              )}

              {/* User details badge */}
              <div className="vr mx-2"></div>
              <div className="d-flex align-items-center gap-2">
                <span className={isAdmin ? 'badge-role-admin' : 'badge-role-staff'}>
                  <i className={`bi ${isAdmin ? 'bi-shield-check' : 'bi-person-badge'} me-1`}></i>
                  {isAdmin ? 'Admin' : 'Staff'}
                </span>
                <span className="fw-semibold text-dark small d-none d-md-inline">
                  {currentUser.accountName}
                </span>
                <button 
                  className="btn btn-sm btn-outline-danger" 
                  onClick={onLogout}
                  title="Logout"
                >
                  <i className="bi bi-box-arrow-right"></i>
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="vr mx-2"></div>
              <button className="btn btn-sm btn-success" onClick={onOpenLogin}>
                <i className="bi bi-box-arrow-in-right me-1"></i> Member / Staff Login
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
