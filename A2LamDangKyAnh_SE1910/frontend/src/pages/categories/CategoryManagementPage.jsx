import React, { useState, useEffect } from 'react';
import { categoryService } from '../../services/api';
import CategoryModal from '../../components/modals/CategoryModal';
import ConfirmModal from '../../components/common/ConfirmModal';
import AlertBanner from '../../components/common/AlertBanner';

export default function CategoryManagementPage() {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionError, setActionError] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');

  // Modals state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Confirm delete modal state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    loadCategories();
  }, [searchQuery]);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await categoryService.getAll(searchQuery);
      setCategories(data);
    } catch (err) {
      setActionError(err.message || 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setSelectedCategory(null);
    setModalMode('create');
    setModalOpen(true);
    setActionError('');
    setActionSuccess('');
  };

  const handleOpenEdit = (cat) => {
    setSelectedCategory(cat);
    setModalMode('edit');
    setModalOpen(true);
    setActionError('');
    setActionSuccess('');
  };

  const handleSaveCategory = async (formData) => {
    try {
      setIsSaving(true);
      setActionError('');
      if (modalMode === 'create') {
        await categoryService.create(formData);
        setActionSuccess(`Category '${formData.categoryName}' created successfully.`);
      } else {
        await categoryService.update(selectedCategory.categoryId, formData);
        setActionSuccess(`Category '${formData.categoryName}' updated successfully.`);
      }
      setModalOpen(false);
      loadCategories();
    } catch (err) {
      setActionError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleOpenDelete = (cat) => {
    setCategoryToDelete(cat);
    setConfirmOpen(true);
    setActionError('');
    setActionSuccess('');
  };

  // =========================================================================
  // [LUỒNG 4 - DÒNG CODE CHÍNH]: THỰC HIỆN XÓA CATEGORY VÀ BẮT RÀNG BUỘC TỪ BACKEND
  // Luồng: Staff xác nhận xóa -> Gửi DELETE /api/categories/{id} -> Nếu đang chứa bài viết
  // hoặc danh mục con, Backend ném 400 Bad Request kèm message rõ ràng
  // =========================================================================
  const handleConfirmDelete = async () => {
    if (!categoryToDelete) return;
    try {
      setIsDeleting(true);
      setActionError('');
      // DÒNG CODE CHÍNH 1: Gửi DELETE request tới API Backend
      await categoryService.delete(categoryToDelete.categoryId);
      setActionSuccess(`Category '${categoryToDelete.categoryName}' deleted successfully.`);
      setConfirmOpen(false);
      setCategoryToDelete(null);
      // DÒNG CODE CHÍNH 2: Tải lại danh sách danh mục
      loadCategories();
    } catch (err) {
      // DÒNG CODE CHÍNH 3: Bắt lỗi ràng buộc "Cannot delete category that is currently assigned to news articles"
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
          <h2 className="fw-bold text-dark mb-1">Category Management</h2>
          <p className="text-secondary mb-0 small">
            Staff role portal: Create, update, search, and manage news categories.
          </p>
        </div>
        <button className="btn btn-primary d-flex align-items-center gap-2" onClick={handleOpenCreate}>
          <i className="bi bi-folder-plus"></i>
          Create New Category
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
            placeholder="Search categories by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Categories Table */}
      <div className="app-card overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th scope="col" style={{ width: '80px' }}>ID</th>
                <th scope="col">Category Name</th>
                <th scope="col">Description</th>
                <th scope="col">Status</th>
                <th scope="col" className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-5">
                    <div className="spinner-border spinner-border-sm text-primary me-2"></div>
                    Loading categories...
                  </td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-5 text-muted">
                    <i className="bi bi-folder2-open fs-2 d-block mb-2"></i>
                    No categories found.
                  </td>
                </tr>
              ) : (
                categories.map(cat => (
                  <tr key={cat.categoryId}>
                    <td className="fw-semibold text-secondary">#{cat.categoryId}</td>
                    <td className="fw-bold text-dark">{cat.categoryName}</td>
                    <td className="text-secondary small">{cat.categoryDesciption || cat.categoryDescription || '-'}</td>
                    <td>
                      <span className={cat.isActive ? 'badge-status-active' : 'badge-status-inactive'}>
                        {cat.isActive ? 'Active (1)' : 'Inactive (0)'}
                      </span>
                    </td>
                    <td className="text-end">
                      <div className="btn-group btn-group-sm">
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => handleOpenEdit(cat)}
                          title="Edit Category"
                        >
                          <i className="bi bi-pencil"></i> Edit
                        </button>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => handleOpenDelete(cat)}
                          title="Delete Category"
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
      <CategoryModal
        show={modalOpen}
        mode={modalMode}
        category={selectedCategory}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveCategory}
        isSaving={isSaving}
      />

      <ConfirmModal
        show={confirmOpen}
        title="Delete Category"
        message={`Are you sure you want to delete category '${categoryToDelete?.categoryName}' (ID: ${categoryToDelete?.categoryId})? Note: Categories assigned to existing news articles cannot be deleted.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmOpen(false)}
        isDeleting={isDeleting}
      />
    </div>
  );
}

