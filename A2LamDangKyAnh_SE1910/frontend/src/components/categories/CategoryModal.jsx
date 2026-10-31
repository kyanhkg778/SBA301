import React, { useState, useEffect } from 'react';

export default function CategoryModal({ show, mode = 'create', category = null, onClose, onSave, isSaving = false }) {
  const [formData, setFormData] = useState({
    categoryName: '',
    categoryDesciption: '',
    isActive: true
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (category && mode === 'edit') {
      setFormData({
        categoryName: category.categoryName || '',
        categoryDesciption: category.categoryDesciption || category.categoryDescription || '',
        isActive: category.isActive !== undefined ? category.isActive : true
      });
    } else {
      setFormData({
        categoryName: '',
        categoryDesciption: '',
        isActive: true
      });
    }
    setErrors({});
  }, [category, mode, show]);

  if (!show) return null;

  const validate = () => {
    const err = {};
    if (!formData.categoryName.trim()) {
      err.categoryName = 'Category name is required.';
    } else if (formData.categoryName.length > 100) {
      err.categoryName = 'Category name cannot exceed 100 characters.';
    }

    if (formData.categoryDesciption && formData.categoryDesciption.length > 500) {
      err.categoryDesciption = 'Description cannot exceed 500 characters.';
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave({
        ...formData,
        categoryName: formData.categoryName.trim(),
        categoryDesciption: formData.categoryDesciption.trim(),
        isActive: Boolean(formData.isActive)
      });
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(15, 23, 42, 0.65)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fw-bold text-dark d-flex align-items-center gap-2">
              <i className={`bi ${mode === 'create' ? 'bi-folder-plus text-primary' : 'bi-pencil-square text-warning'}`}></i>
              {mode === 'create' ? 'Create New Category' : `Update Category: ${category?.categoryName}`}
            </h5>
            <button type="button" className="btn-close" onClick={onClose} disabled={isSaving}></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {/* Category Name */}
              <div className="mb-3">
                <label className="form-label small fw-semibold">Category Name *</label>
                <input
                  type="text"
                  className={`form-control ${errors.categoryName ? 'is-invalid' : ''}`}
                  placeholder="e.g. Technology, Campus Life"
                  value={formData.categoryName}
                  onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })}
                />
                {errors.categoryName && (
                  <div className="invalid-feedback">{errors.categoryName}</div>
                )}
              </div>

              {/* Category Description */}
              <div className="mb-3">
                <label className="form-label small fw-semibold">Description</label>
                <textarea
                  className={`form-control ${errors.categoryDesciption ? 'is-invalid' : ''}`}
                  rows="3"
                  placeholder="Brief description of articles in this category..."
                  value={formData.categoryDesciption}
                  onChange={(e) => setFormData({ ...formData, categoryDesciption: e.target.value })}
                ></textarea>
                {errors.categoryDesciption && (
                  <div className="invalid-feedback">{errors.categoryDesciption}</div>
                )}
              </div>

              {/* Status Switch */}
              <div className="mb-3 form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="categoryActiveSwitch"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                />
                <label className="form-check-label fw-semibold small" htmlFor="categoryActiveSwitch">
                  Status: {formData.isActive ? 'Active (1)' : 'Inactive (0)'}
                </label>
                <div className="form-text small">
                  Inactive categories are hidden from the public news portal.
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" onClick={onClose} disabled={isSaving}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary d-flex align-items-center gap-2" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status"></span>
                    Saving...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check2-circle"></i>
                    {mode === 'create' ? 'Create Category' : 'Save Changes'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

