import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-auto border-top border-secondary">
      <div className="container text-center">
        <div className="row align-items-center">
          <div className="col-md-6 text-md-start mb-2 mb-md-0">
            <span className="fw-bold text-warning">🏨 FUMiniHotel Management System</span>
            <span className="ms-2 text-secondary">| Assignment 03 - SBA301</span>
          </div>
          <div className="col-md-6 text-md-end text-light-emphasis">
            <span>Sinh viên: <strong>Lâm Đặng Kỳ Anh</strong> | Lớp: <strong>SE1910</strong></span>
          </div>
        </div>
        <hr className="my-3 border-secondary" />
        <small className="text-secondary">
          Kiến trúc 3 tầng RESTful API (Spring Boot 3 + MS SQL Server + Spring Security JWT) &amp; ReactJS Client (Axios + Bootstrap 5)
        </small>
      </div>
    </footer>
  );
}

