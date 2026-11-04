import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ activePage, setActivePage }) {
  const { user, isAuthenticated, isStaff, isCustomer, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
      <div className="container">
        <a
          className="navbar-brand fw-bold text-warning d-flex align-items-center"
          href="#"
          onClick={(e) => { e.preventDefault(); setActivePage('rooms'); }}
        >
          <i className="bi bi-building me-2 fs-4"></i>
          FUMiniHotel
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Mục xem phòng công khai - không cần đăng nhập */}
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link text-decoration-none ${activePage === 'rooms' ? 'active text-warning fw-semibold' : ''}`}
                onClick={() => setActivePage('rooms')}
              >
                <i className="bi bi-door-open me-1"></i> Danh Sách Phòng
              </button>
            </li>

            {/* Menu dành riêng cho Customer */}
            {isAuthenticated && isCustomer && (
              <>
                <li className="nav-item">
                  <button
                    className={`nav-link btn btn-link text-decoration-none ${activePage === 'book' ? 'active text-warning fw-semibold' : ''}`}
                    onClick={() => setActivePage('book')}
                  >
                    <i className="bi bi-calendar-plus me-1"></i> Đặt Phòng Online
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link btn btn-link text-decoration-none ${activePage === 'my-bookings' ? 'active text-warning fw-semibold' : ''}`}
                    onClick={() => setActivePage('my-bookings')}
                  >
                    <i className="bi bi-clock-history me-1"></i> Lịch Sử Đặt Phòng
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link btn btn-link text-decoration-none ${activePage === 'profile' ? 'active text-warning fw-semibold' : ''}`}
                    onClick={() => setActivePage('profile')}
                  >
                    <i className="bi bi-person-circle me-1"></i> Hồ Sơ Cá Nhân
                  </button>
                </li>
              </>
            )}

            {/* Menu dành riêng cho Staff */}
            {isAuthenticated && isStaff && (
              <>
                <li className="nav-item">
                  <button
                    className={`nav-link btn btn-link text-decoration-none ${activePage === 'staff-rooms' ? 'active text-warning fw-semibold' : ''}`}
                    onClick={() => setActivePage('staff-rooms')}
                  >
                    <i className="bi bi-grid-3x3-gap me-1"></i> Quản Lý Phòng
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link btn btn-link text-decoration-none ${activePage === 'staff-customers' ? 'active text-warning fw-semibold' : ''}`}
                    onClick={() => setActivePage('staff-customers')}
                  >
                    <i className="bi bi-people me-1"></i> Quản Lý Khách Hàng
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link btn btn-link text-decoration-none ${activePage === 'staff-bookings' ? 'active text-warning fw-semibold' : ''}`}
                    onClick={() => setActivePage('staff-bookings')}
                  >
                    <i className="bi bi-receipt me-1"></i> Quản Lý Đặt Phòng
                  </button>
                </li>
              </>
            )}
          </ul>

          {/* Phần bên phải: Đăng nhập/Đăng xuất/Thông tin tài khoản */}
          <div className="d-flex align-items-center">
            {isAuthenticated ? (
              <div className="dropdown">
                <button
                  className="btn btn-outline-light dropdown-toggle d-flex align-items-center"
                  type="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-person-check-fill me-2 text-warning"></i>
                  <span>{user.fullName || user.email}</span>
                  <span className={`badge ms-2 ${isStaff ? 'bg-danger' : 'bg-primary'}`}>
                    {isStaff ? 'STAFF' : 'CUSTOMER'}
                  </span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="userDropdown">
                  <li>
                    <h6 className="dropdown-header">Đăng nhập bằng: {user.email}</h6>
                  </li>
                  {isCustomer && (
                    <li>
                      <button className="dropdown-item" onClick={() => setActivePage('profile')}>
                        <i className="bi bi-person me-2"></i>Xem thông tin hồ sơ
                      </button>
                    </li>
                  )}
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={() => {
                        logout();
                        setActivePage('rooms');
                      }}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>Đăng xuất
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="btn-group">
                <button
                  className="btn btn-outline-warning"
                  onClick={() => setActivePage('login')}
                >
                  <i className="bi bi-box-arrow-in-right me-1"></i> Đăng nhập
                </button>
                <button
                  className="btn btn-warning"
                  onClick={() => setActivePage('register')}
                >
                  <i className="bi bi-person-plus me-1"></i> Đăng ký
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

