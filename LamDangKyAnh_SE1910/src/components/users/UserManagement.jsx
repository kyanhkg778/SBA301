import { useState } from "react";
import { Button, Form, InputGroup, Alert, Badge } from "react-bootstrap";
import UserModal from "./UserModal";
import DeleteConfirmModal from "../common/DeleteConfirmModal";

export default function UserManagement({ users, onAddUser, onUpdateUser, onDeleteUser, currentUser }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [modalState, setModalState] = useState({ show: false, mode: "create", user: null });
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, user: null });
  const [alertInfo, setAlertInfo] = useState(null);

  const showAlert = (message, variant = "success") => {
    setAlertInfo({ message, variant });
    setTimeout(() => setAlertInfo(null), 3500);
  };

  const handleOpenCreate = () => {
    setModalState({ show: true, mode: "create", user: null });
  };

  const handleOpenEdit = (user) => {
    setModalState({ show: true, mode: "update", user });
  };

  const handleSaveModal = (data) => {
    if (modalState.mode === "create") {
      // Check unique username
      const exists = users.some((u) => u.username.toLowerCase() === data.username.toLowerCase());
      if (exists) {
        showAlert(`Tên đăng nhập "${data.username}" đã tồn tại trên hệ thống.`, "danger");
        return;
      }
      onAddUser(data);
      showAlert(`Đã tạo tài khoản "${data.username}" thành công!`);
    } else {
      onUpdateUser(modalState.user.id, data);
      showAlert(`Đã cập nhật tài khoản "${data.username}" thành công!`);
    }
    setModalState({ show: false, mode: "create", user: null });
  };

  const handleOpenDelete = (user) => {
    if (currentUser && currentUser.username === user.username) {
      showAlert("Bạn không thể xóa tài khoản của chính mình đang đăng nhập!", "danger");
      return;
    }
    setDeleteConfirm({ show: true, user });
  };

  const handleConfirmDelete = () => {
    if (deleteConfirm.user) {
      onDeleteUser(deleteConfirm.user.id);
      showAlert(`Đã xóa người dùng "${deleteConfirm.user.username}" thành công!`);
    }
    setDeleteConfirm({ show: false, user: null });
  };

  // Search and filter without mutating source list
  const normalizedKeyword = searchTerm.trim().toLowerCase();
  const displayedUsers = users.filter((u) => {
    const matchesKeyword =
      !normalizedKeyword ||
      u.username?.toLowerCase().includes(normalizedKeyword) ||
      u.fullName?.toLowerCase().includes(normalizedKeyword) ||
      u.email?.toLowerCase().includes(normalizedKeyword);

    const matchesRole =
      roleFilter === "all" || Number(u.role) === Number(roleFilter);

    return matchesKeyword && matchesRole;
  });

  return (
    <div className="d-flex flex-column gap-3">
      {/* Toast Feedback Alert */}
      {alertInfo && (
        <Alert variant={alertInfo.variant} dismissible onClose={() => setAlertInfo(null)} className="py-2">
          {alertInfo.message}
        </Alert>
      )}

      {/* Action Header */}
      <div className="custom-card p-3 d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
        <div className="d-flex align-items-center gap-2 flex-grow-1" style={{ maxWidth: "520px" }}>
          <InputGroup>
            <InputGroup.Text className="bg-light border-end-0">🔍</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Tìm kiếm người dùng theo username, họ tên, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-start-0"
            />
            {searchTerm && (
              <Button variant="outline-secondary" onClick={() => setSearchTerm("")}>
                ✕
              </Button>
            )}
          </InputGroup>

          <Form.Select
            style={{ width: "160px" }}
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="all">Tất cả vai trò</option>
            <option value="1">Admin (1)</option>
            <option value="2">Staff (2)</option>
          </Form.Select>
        </div>

        <div className="d-flex align-items-center gap-2">
          <Badge bg="secondary" className="px-3 py-2 fs-6">
            Tổng cộng: {displayedUsers.length} / {users.length}
          </Badge>
          <Button variant="primary" onClick={handleOpenCreate} className="d-flex align-items-center gap-2">
            <span>➕</span> Thêm Tài Khoản (Add User)
          </Button>
        </div>
      </div>

      {/* Users Table */}
      <div className="custom-card overflow-hidden">
        {displayedUsers.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">👥</div>
            <h5 className="fw-semibold">Không tìm thấy tài khoản người dùng</h5>
            <p className="text-muted small">
              {searchTerm || roleFilter !== "all"
                ? "Không có tài khoản nào phù hợp với điều kiện tìm kiếm."
                : "Chưa có tài khoản nào trong hệ thống."}
            </p>
            {(searchTerm || roleFilter !== "all") && (
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => {
                  setSearchTerm("");
                  setRoleFilter("all");
                }}
              >
                Xóa bộ lọc tìm kiếm
              </Button>
            )}
          </div>
        ) : (
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th style={{ width: "80px" }}>ID</th>
                  <th style={{ width: "180px" }}>Tên Đăng Nhập</th>
                  <th>Họ Và Tên</th>
                  <th>Email</th>
                  <th style={{ width: "140px" }}>Vai Trò (Role)</th>
                  <th style={{ width: "140px" }}>Trạng Thái</th>
                  <th style={{ width: "160px" }} className="text-end">Thao Tác</th>
                </tr>
              </thead>
              <tbody>
                {displayedUsers.map((u) => (
                  <tr key={u.id}>
                    <td className="fw-bold text-muted">#{u.id}</td>
                    <td>
                      <div className="fw-bold text-dark">{u.username}</div>
                    </td>
                    <td>{u.fullName || "-"}</td>
                    <td className="text-muted small">{u.email || "-"}</td>
                    <td>
                      {Number(u.role) === 1 ? (
                        <span className="badge-admin">🛡️ Admin (1)</span>
                      ) : (
                        <span className="badge-staff">✍️ Staff (2)</span>
                      )}
                    </td>
                    <td>
                      {Number(u.status) === 1 ? (
                        <span className="badge-active">
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16a34a" }} />
                          Active (1)
                        </span>
                      ) : (
                        <span className="badge-inactive">
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#94a3b8" }} />
                          Inactive (0)
                        </span>
                      )}
                    </td>
                    <td className="text-end">
                      <div className="d-flex justify-content-end gap-2">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleOpenEdit(u)}
                          title="Sửa thông tin"
                        >
                          ✏️ Sửa
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleOpenDelete(u)}
                          title="Xóa tài khoản"
                          disabled={currentUser && currentUser.username === u.username}
                        >
                          🗑️ Xóa
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* User Modal */}
      <UserModal
        show={modalState.show}
        mode={modalState.mode}
        user={modalState.user}
        onSave={handleSaveModal}
        onClose={() => setModalState({ show: false, mode: "create", user: null })}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        show={deleteConfirm.show}
        title="Người Dùng"
        itemName={`${deleteConfirm.user?.username} (${deleteConfirm.user?.fullName})`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteConfirm({ show: false, user: null })}
      />
    </div>
  );
}
