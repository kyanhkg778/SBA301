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
          <InputGroup size="sm">
            <InputGroup.Text className="bg-light border-end-0">🔍</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Tìm theo username, họ tên, email..."
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
            size="sm"
            style={{ width: "150px" }}
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="all">Tất cả vai trò</option>
            <option value="1">Admin</option>
            <option value="2">Staff</option>
          </Form.Select>
        </div>

        <div className="d-flex align-items-center gap-2">
          <span className="text-muted small">
            Tổng: <strong>{displayedUsers.length}</strong> người dùng
          </span>
          <Button variant="primary" size="sm" onClick={handleOpenCreate} className="d-flex align-items-center gap-1 px-3">
            <span>+</span> Thêm người dùng
          </Button>
        </div>
      </div>

      {/* Users Table */}
      <div className="custom-card overflow-hidden">
        {displayedUsers.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">👥</div>
            <h6 className="fw-semibold">Không tìm thấy người dùng</h6>
            <p className="text-muted small">
              {searchTerm || roleFilter !== "all"
                ? "Không có người dùng nào khớp với tìm kiếm."
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
                Xóa tìm kiếm
              </Button>
            )}
          </div>
        ) : (
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th style={{ width: "70px" }}>ID</th>
                  <th style={{ width: "160px" }}>Tài khoản</th>
                  <th>Họ và tên</th>
                  <th>Email</th>
                  <th style={{ width: "120px" }}>Vai trò</th>
                  <th style={{ width: "130px" }}>Trạng thái</th>
                  <th style={{ width: "140px" }} className="text-end">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {displayedUsers.map((u) => (
                  <tr key={u.id}>
                    <td className="fw-semibold text-muted">#{u.id}</td>
                    <td>
                      <div className="fw-semibold text-dark">{u.username}</div>
                    </td>
                    <td>{u.fullName || "-"}</td>
                    <td className="text-muted small">{u.email || "-"}</td>
                    <td>
                      {Number(u.role) === 1 ? (
                        <span className="badge-admin">Admin</span>
                      ) : (
                        <span className="badge-staff">Staff</span>
                      )}
                    </td>
                    <td>
                      {Number(u.status) === 1 ? (
                        <span className="badge-active">
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16a34a" }} />
                          Hoạt động
                        </span>
                      ) : (
                        <span className="badge-inactive">
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#94a3b8" }} />
                          Tạm khóa
                        </span>
                      )}
                    </td>
                    <td className="text-end">
                      <div className="d-flex justify-content-end gap-1">
                        <Button
                          variant="light"
                          size="sm"
                          className="border text-primary py-1 px-2"
                          onClick={() => handleOpenEdit(u)}
                          title="Sửa thông tin"
                        >
                          ✏️ Sửa
                        </Button>
                        <Button
                          variant="light"
                          size="sm"
                          className="border text-danger py-1 px-2"
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
