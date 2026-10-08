import { Row, Col, Button, Card, Badge } from "react-bootstrap";

export default function DashboardPage({ categories, news, users, onSelectTab }) {
  // Compute summary metrics (derived state)
  const totalNews = news.length;
  const publishedNews = news.filter((n) => Number(n.status) === 1).length;
  const draftNews = totalNews - publishedNews;

  const totalCategories = categories.length;
  const activeCategories = categories.filter((c) => Number(c.status) === 1).length;

  const totalUsers = users.length;
  const adminUsers = users.filter((u) => Number(u.role) === 1).length;
  const staffUsers = users.filter((u) => Number(u.role) === 2).length;

  // Recent 4 news articles
  const recentNews = [...news].reverse().slice(0, 4);

  return (
    <div className="d-flex flex-column gap-4">
      {/* Welcome Banner */}
      <div
        className="p-4 rounded-4 text-white shadow-sm"
        style={{
          background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #0369a1 100%)",
          border: "1px solid rgba(255, 255, 255, 0.15)"
        }}
      >
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
          <div>
            <div className="badge bg-white text-primary px-3 py-1 mb-2 fw-semibold rounded-pill">
              ⭐ SBA301 Assignment 01 • ReactJS SPA
            </div>
            <h3 className="fw-bold mb-1">FUNews Management System</h3>
            <p className="mb-0 text-white-50" style={{ maxWidth: "600px" }}>
              Hệ thống quản trị tin tức toàn diện cho FPT University. Quản lý danh mục, bài viết xuất bản, tài khoản người dùng và sẵn sàng kết nối Spring Boot REST API.
            </p>
          </div>
          <div className="d-flex gap-2">
            <Button variant="light" className="fw-semibold px-3 text-primary" onClick={() => onSelectTab("news")}>
              📰 Quản lý bài báo
            </Button>
            <Button variant="outline-light" className="px-3" onClick={() => onSelectTab("categories")}>
              📁 Danh mục
            </Button>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <Row className="g-3">
        <Col lg={3} sm={6}>
          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ background: "#e0e7ff", color: "#4f46e5" }}>
              📰
            </div>
            <div>
              <div className="text-muted small fw-medium">Tổng số bài báo</div>
              <div className="fs-3 fw-bold text-dark">{totalNews}</div>
              <div className="small text-success fw-medium">
                {publishedNews} xuất bản • {draftNews} nháp
              </div>
            </div>
          </div>
        </Col>

        <Col lg={3} sm={6}>
          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ background: "#e0f2fe", color: "#0284c7" }}>
              📁
            </div>
            <div>
              <div className="text-muted small fw-medium">Tổng số danh mục</div>
              <div className="fs-3 fw-bold text-dark">{totalCategories}</div>
              <div className="small text-primary fw-medium">
                {activeCategories} kích hoạt • {totalCategories - activeCategories} ẩn
              </div>
            </div>
          </div>
        </Col>

        <Col lg={3} sm={6}>
          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ background: "#fef3c7", color: "#d97706" }}>
              👥
            </div>
            <div>
              <div className="text-muted small fw-medium">Tài khoản quản trị</div>
              <div className="fs-3 fw-bold text-dark">{totalUsers}</div>
              <div className="small text-secondary fw-medium">
                {adminUsers} Admin • {staffUsers} Staff
              </div>
            </div>
          </div>
        </Col>

        <Col lg={3} sm={6}>
          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ background: "#dcfce7", color: "#16a34a" }}>
              ⚡
            </div>
            <div>
              <div className="text-muted small fw-medium">Trạng thái hệ thống</div>
              <div className="fs-4 fw-bold text-success">Sẵn sàng (100%)</div>
              <div className="small text-muted">
                LocalStorage Hydrated
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Main Content Grid: Recent News + Categories preview */}
      <Row className="g-4">
        {/* Recent Articles */}
        <Col lg={8}>
          <div className="custom-card p-3">
            <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
              <div>
                <h6 className="fw-bold mb-0">Bài Báo Mới Cập Nhật (Recent Articles)</h6>
                <small className="text-muted">Các tin tức được tạo gần đây nhất trong cơ sở dữ liệu</small>
              </div>
              <Button variant="link" size="sm" className="text-decoration-none p-0" onClick={() => onSelectTab("news")}>
                Xem tất cả ({totalNews}) →
              </Button>
            </div>

            {recentNews.length === 0 ? (
              <div className="text-center py-4 text-muted small">Chưa có bài báo nào.</div>
            ) : (
              <div className="d-flex flex-column gap-3">
                {recentNews.map((item) => {
                  const cat = categories.find((c) => Number(c.id) === Number(item.categoryId));
                  return (
                    <div
                      key={item.id}
                      className="p-3 rounded-3 border bg-light bg-opacity-50 d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2"
                    >
                      <div className="flex-grow-1" style={{ maxWidth: "560px" }}>
                        <div className="d-flex align-items-center gap-2 mb-1">
                          <Badge bg="primary" style={{ fontSize: "0.7rem" }}>
                            {cat ? cat.name : `Category #${item.categoryId}`}
                          </Badge>
                          {item.status === 1 ? (
                            <span className="badge-active" style={{ fontSize: "0.65rem", padding: "0.2rem 0.5rem" }}>
                              Published
                            </span>
                          ) : (
                            <span className="badge-inactive" style={{ fontSize: "0.65rem", padding: "0.2rem 0.5rem" }}>
                              Draft
                            </span>
                          )}
                        </div>
                        <h6 className="fw-bold text-dark mb-1 text-truncate">{item.title}</h6>
                        <p className="text-muted small mb-0 text-truncate">{item.content}</p>
                      </div>
                      <div className="text-sm-end text-muted small flex-shrink-0">
                        <div>Tác giả: <strong>{item.createdBy || "Admin"}</strong></div>
                        <div>{item.createdAt || "Hôm nay"}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </Col>

        {/* Quick Links & Categories Overview */}
        <Col lg={4}>
          <div className="d-flex flex-column gap-3">
            {/* Quick Actions Card */}
            <div className="custom-card p-3">
              <h6 className="fw-bold mb-3 pb-2 border-bottom">Thao Tác Nhanh (Quick Actions)</h6>
              <div className="d-grid gap-2">
                <Button variant="outline-primary" className="text-start d-flex align-items-center gap-2" onClick={() => onSelectTab("news")}>
                  <span>✍️</span> Soạn bài báo mới
                </Button>
                <Button variant="outline-secondary" className="text-start d-flex align-items-center gap-2" onClick={() => onSelectTab("categories")}>
                  <span>📁</span> Thêm danh mục mới
                </Button>
                <Button variant="outline-info" className="text-start d-flex align-items-center gap-2" onClick={() => onSelectTab("users")}>
                  <span>👤</span> Quản lý thành viên
                </Button>
                <Button variant="outline-dark" className="text-start d-flex align-items-center gap-2" onClick={() => onSelectTab("settings")}>
                  <span>⚙️</span> Cài đặt & Khôi phục dữ liệu
                </Button>
              </div>
            </div>

            {/* Categories Status Summary */}
            <div className="custom-card p-3">
              <h6 className="fw-bold mb-3 pb-2 border-bottom">Danh Mục Nổi Bật (Categories)</h6>
              <div className="d-flex flex-column gap-2">
                {categories.map((c) => {
                  const count = news.filter((n) => Number(n.categoryId) === Number(c.id)).length;
                  return (
                    <div key={c.id} className="d-flex align-items-center justify-content-between p-2 rounded bg-light small">
                      <span className="fw-semibold text-dark text-truncate" style={{ maxWidth: "180px" }}>
                        {c.name}
                      </span>
                      <span className="badge bg-white text-primary border">
                        {count} bài viết
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
