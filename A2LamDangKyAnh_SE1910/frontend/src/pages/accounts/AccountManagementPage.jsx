import React, { useState, useEffect } from 'react';
import { accountService } from '../../services/api';
import AccountModal from '../../components/modals/AccountModal';
import ConfirmModal from '../../components/common/ConfirmModal';
import AlertBanner from '../../components/common/AlertBanner';

export default function AccountManagementPage() {
  const [accounts, setAccounts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionError, setActionError] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');

  // Modals state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Confirm delete modal state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    loadAccounts();
  }, [searchQuery]);

  const loadAccounts = async () => {
    try {
      setLoading(true);
      const data = await accountService.getAll(searchQuery);
      setAccounts(data);
    } catch (err) {
      setActionError(err.message || 'Failed to fetch accounts');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setSelectedAccount(null);
    setModalMode('create');
    setModalOpen(true);
    setActionError('');
    setActionSuccess('');
  };

  const handleOpenEdit = (account) => {
    setSelectedAccount(account);
    setModalMode('edit');
    setModalOpen(true);
    setActionError('');
    setActionSuccess('');
  };

  const handleSaveAccount = async (formData) => {
    try {
      setIsSaving(true);
      setActionError('');
      if (modalMode === 'create') {
        await accountService.create(formData);
        setActionSuccess(`Account '${formData.accountName}' created successfully.`);
      } else {
        await accountService.update(selectedAccount.accountId, formData);
        setActionSuccess(`Account '${formData.accountName}' updated successfully.`);
      }
      setModalOpen(false);
      loadAccounts();
    } catch (err) {
      setActionError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleOpenDelete = (account) => {
    setAccountToDelete(account);
    setConfirmOpen(true);
    setActionError('');
    setActionSuccess('');
  };

  // =========================================================================
  // [LUỒNG 3 - DÒNG CODE CHÍNH]: THỰC HIỆN XÓA TÀI KHOẢN VÀ XỬ LÝ RÀNG BUỘC TỪ BACKEND
  // Luồng: Admin xác nhận xóa -> Gửi DELETE /api/accounts/{id} -> Nếu có tin tức, Backend ném 400
  // và error interceptor trả về err.message hiển thị trực tiếp lên AlertBanner
  // =========================================================================
  const handleConfirmDelete = async () => {
    if (!accountToDelete) return;
    try {
      setIsDeleting(true);
      setActionError('');
      // DÒNG CODE CHÍNH 1: Gọi API xóa tài khoản
      await accountService.delete(accountToDelete.accountId);
      setActionSuccess(`Account '${accountToDelete.accountName}' deleted successfully.`);
      setConfirmOpen(false);
      setAccountToDelete(null);
      // DÒNG CODE CHÍNH 2: Tải lại danh sách sau khi xóa thành công
      loadAccounts();
    } catch (err) {
      // DÒNG CODE CHÍNH 3: Bắt thông báo lỗi ràng buộc "Cannot delete account that has created articles..."
      setActionError(err.message);
      setConfirmOpen(false);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="container py-4">
      {/* Title & Action header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <div>
          <h2 className="fw-bold text-dark mb-1">Account Management</h2>
          <p className="text-secondary mb-0 small">
            Admin role portal: Create, update, search, and delete staff & administrator accounts.
          </p>
        </div>
        <button className="btn btn-primary d-flex align-items-center gap-2" onClick={handleOpenCreate}>
          <i className="bi bi-person-plus-fill"></i>
          Create New Account
        </button>
      </div>

      {/* Notifications */}
      <AlertBanner type="success" message={actionSuccess} onClose={() => setActionSuccess('')} />
      <AlertBanner type="danger" message={actionError} onClose={() => setActionError('')} />

      {/* Search Bar */}
      <div className="app-card p-3 mb-4">
        <div className="search-input-group">
          <i className="bi bi-search"></i>
          <input
            type="text"
            className="form-control"
            placeholder="Search accounts by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Accounts Table */}
      <div className="app-card overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th scope="col" style={{ width: '80px' }}>ID</th>
                <th scope="col">Account Name</th>
                <th scope="col">Email Address</th>
                <th scope="col">Role</th>
                <th scope="col" className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-5">
                    <div className="spinner-border spinner-border-sm text-primary me-2"></div>
                    Loading accounts...
                  </td>
                </tr>
              ) : accounts.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-5 text-muted">
                    <i className="bi bi-people fs-2 d-block mb-2"></i>
                    No accounts found matching your search.
                  </td>
                </tr>
              ) : (
                accounts.map(acc => (
                  <tr key={acc.accountId}>
                    <td className="fw-semibold text-secondary">#{acc.accountId}</td>
                    <td className="fw-bold text-dark">{acc.accountName}</td>
                    <td className="text-secondary">{acc.accountEmail}</td>
                    <td>
                      <span className={acc.accountRole === 1 ? 'badge-role-admin' : 'badge-role-staff'}>
                        {acc.accountRole === 1 ? 'Admin (1)' : 'Staff (2)'}
                      </span>
                    </td>
                    <td className="text-end">
                      <div className="btn-group btn-group-sm">
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => handleOpenEdit(acc)}
                          title="Edit Account"
                        >
                          <i className="bi bi-pencil"></i> Edit
                        </button>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => handleOpenDelete(acc)}
                          title="Delete Account"
                        >
                          <i className="bi bi-trash"></i> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reusable Popup Dialogs */}
      <AccountModal
        show={modalOpen}
        mode={modalMode}
        account={selectedAccount}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveAccount}
        isSaving={isSaving}
      />

      <ConfirmModal
        show={confirmOpen}
        title="Delete System Account"
        message={`Are you sure you want to delete account '${accountToDelete?.accountName}' (ID: ${accountToDelete?.accountId})? Note: Accounts that have already authored news articles cannot be deleted.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmOpen(false)}
        isDeleting={isDeleting}
      />
    </div>
  );
}

