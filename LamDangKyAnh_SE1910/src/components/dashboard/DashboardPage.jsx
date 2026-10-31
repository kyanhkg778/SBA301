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
    <div className="d-flex flex-column gap-3">
      {/* Sleek Greeting Header */}
      <div className="custom-card p-3 p-md-4 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
          <h4 className="fw-bold mb-1 text-dark">Tổng quan hệ thống</h4>
          <p className="text-muted small mb-0">
            Theo dõi dữ liệu tin tức, danh mục và người dùng theo thời gian thực.
          </p>
        </div>
        <div className="d-flex gap-2">
          <Button variant="primary" size="sm" className="px-3" onClick={() => onSelectTab("news")}>
            + Soạn bài viết
          </Button>
          <Button variant="outline-secondary" size="sm" className="px-3" onClick={() => onSelectTab("categories")}>
            + Thêm danh mục
          </Button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <Row className="g-3">
        <Col lg={3} sm={6}>
          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ background: "#eef2ff", color: "#4f46e5" }}>
              📰
            </div>
            <div>
              <div className="text-muted small fw-medium">Tổng bài viết</div>
              <div className="fs-4 fw-bold text-dark">{totalNews}</div>
              <div className="small text-success">
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
              <div className="text-muted small fw-medium">Danh mục</div>
              <div className="fs-4 fw-bold text-dark">{totalCategories}</div>
              <div className="small text-primary">
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
              <div className="text-muted small fw-medium">Người dùng</div>
              <div className="fs-4 fw-bold text-dark">{totalUsers}</div>
              <div className="small text-secondary">
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
              <div className="text-muted small fw-medium">Hệ thống</div>
              <div className="fs-4 fw-bold text-success">Hoạt động tốt</div>
              <div className="small text-muted">
                Bộ nhớ: Đã đồng bộ
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Main Content Grid: Recent News + Categories preview */}
      <Row className="g-3">
        {/* Recent Articles */}
        <Col lg={8}>
          <div className="custom-card p-3 h-100">
            <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
              <div>
                <h6 className="fw-bold mb-0 text-dark">Bài viết mới nhất</h6>
                <small className="text-muted">Danh sách bài viết được cập nhật gần đây</small>
              </div>
              <Button variant="link" size="sm" className="text-decoration-none p-0" onClick={() => onSelectTab("news")}>
                Xem tất cả ({totalNews}) →
              </Button>
            </div>

            {recentNews.length === 0 ? (
              <div className="text-center py-4 text-muted small">Chưa có bài viết nào.</div>
            ) : (
              <div className="d-flex flex-column gap-2">
                {recentNews.map((item) => {
                  const cat = categories.find((c) => Number(c.id) === Number(item.categoryId));
                  return (
                    <div
                      key={item.id}
                      className="p-2 p-md-3 rounded-3 border bg-light bg-opacity-25 d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2"
                    >
                      <div className="flex-grow-1" style={{ maxWidth: "560px" }}>
                        <div className="d-flex align-items-center gap-2 mb-1">
                          <span className="badge bg-secondary-subtle text-secondary border small" style={{ fontSize: "0.7rem" }}>
                            {cat ? cat.name : `#${item.categoryId}`}
                          </span>
                          {item.status === 1 ? (
                            <span className="badge-active" style={{ fontSize: "0.65rem", padding: "0.15rem 0.45rem" }}>
                              Xuất bản
                            </span>
                          ) : (
                            <span className="badge-inactive" style={{ fontSize: "0.65rem", padding: "0.15rem 0.45rem" }}>
                              Nháp
                            </span>
                          )}
                        </div>
                        <h6 className="fw-semibold text-dark mb-1 text-truncate" style={{ fontSize: "0.95rem" }}>{item.title}</h6>
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
              <h6 className="fw-bold mb-3 pb-2 border-bottom text-dark">Thao tác nhanh</h6>
              <div className="d-grid gap-2">
                <Button variant="outline-primary" size="sm" className="text-start d-flex align-items-center gap-2 py-2" onClick={() => onSelectTab("news")}>
                  <span>✍️</span> Viết bài báo mới
                </Button>
                <Button variant="outline-secondary" size="sm" className="text-start d-flex align-items-center gap-2 py-2" onClick={() => onSelectTab("categories")}>
                  <span>📁</span> Thêm danh mục mới
                </Button>
                <Button variant="outline-info" size="sm" className="text-start d-flex align-items-center gap-2 py-2" onClick={() => onSelectTab("users")}>
                  <span>👤</span> Quản lý người dùng
                </Button>
                <Button variant="outline-dark" size="sm" className="text-start d-flex align-items-center gap-2 py-2" onClick={() => onSelectTab("settings")}>
                  <span>⚙️</span> Cài đặt & khôi phục dữ liệu
                </Button>
              </div>
            </div>

            {/* Categories Status Summary */}
            <div className="custom-card p-3">
              <h6 className="fw-bold mb-3 pb-2 border-bottom text-dark">Phân bổ danh mục</h6>
              <div className="d-flex flex-column gap-2">
                {categories.slice(0, 5).map((c) => {
                  const count = news.filter((n) => Number(n.categoryId) === Number(c.id)).length;
                  return (
                    <div key={c.id} className="d-flex align-items-center justify-content-between p-2 rounded bg-light small">
                      <span className="fw-medium text-dark text-truncate" style={{ maxWidth: "180px" }}>
                        {c.name}
                      </span>
                      <span className="badge bg-white text-secondary border">
                        {count} bài
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
