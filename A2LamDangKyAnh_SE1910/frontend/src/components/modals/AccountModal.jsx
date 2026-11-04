import React, { useState, useEffect } from 'react';

export default function AccountModal({ show, mode = 'create', account = null, onClose, onSave, isSaving = false }) {
  const [formData, setFormData] = useState({
    accountName: '',
    accountEmail: '',
    accountRole: 2, // Default: 2 = Staff
    accountPassword: ''
  });
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (account && mode === 'edit') {
      setFormData({
        accountName: account.accountName || '',
        accountEmail: account.accountEmail || '',
        accountRole: account.accountRole || 2,
        accountPassword: account.accountPassword || ''
      });
    } else {
      setFormData({
        accountName: '',
        accountEmail: '',
        accountRole: 2,
        accountPassword: ''
      });
    }
    setValidationErrors({});
  }, [account, mode, show]);

  if (!show) return null;

  const validate = () => {
    const errors = {};
    if (!formData.accountName.trim()) {
      errors.accountName = 'Account name is required.';
    } else if (formData.accountName.length > 100) {
      errors.accountName = 'Name must not exceed 100 characters.';
    }

    if (!formData.accountEmail.trim()) {
      errors.accountEmail = 'Account email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.accountEmail.trim())) {
      errors.accountEmail = 'Please provide a valid email format.';
    }

    if (mode === 'create' && !formData.accountPassword.trim()) {
      errors.accountPassword = 'Password is required.';
    } else if (formData.accountPassword && formData.accountPassword.length > 70) {
      errors.accountPassword = 'Password must not exceed 70 characters.';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave({
        ...formData,
        accountEmail: formData.accountEmail.trim(),
        accountRole: Number(formData.accountRole)
      });
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(15, 23, 42, 0.65)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fw-bold text-dark d-flex align-items-center gap-2">
              <i className={`bi ${mode === 'create' ? 'bi-person-plus-fill text-primary' : 'bi-pencil-square text-warning'}`}></i>
              {mode === 'create' ? 'Create New System Account' : `Update Account: ${account?.accountName}`}
            </h5>
            <button type="button" className="btn-close" onClick={onClose} disabled={isSaving}></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {/* Full Name */}
              <div className="mb-3">
                <label className="form-label small fw-semibold">Account Full Name *</label>
                <input
                  type="text"
                  className={`form-control ${validationErrors.accountName ? 'is-invalid' : ''}`}
                  placeholder="e.g. Nguyen Van A"
                  value={formData.accountName}
                  onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                />
                {validationErrors.accountName && (
                  <div className="invalid-feedback">{validationErrors.accountName}</div>
                )}
              </div>

              {/* Email Address */}
              <div className="mb-3">
                <label className="form-label small fw-semibold">Email Address *</label>
                <input
                  type="email"
                  className={`form-control ${validationErrors.accountEmail ? 'is-invalid' : ''}`}
                  placeholder="e.g. staff1@funews.com"
                  value={formData.accountEmail}
                  onChange={(e) => setFormData({ ...formData, accountEmail: e.target.value })}
                />
                {validationErrors.accountEmail && (
                  <div className="invalid-feedback">{validationErrors.accountEmail}</div>
                )}
              </div>

              {/* Role Selection */}
              <div className="mb-3">
                <label className="form-label small fw-semibold">System Role *</label>
                <select
                  className="form-select"
                  value={formData.accountRole}
                  onChange={(e) => setFormData({ ...formData, accountRole: Number(e.target.value) })}
                >
                  <option value={1}>Admin (Role = 1)</option>
                  <option value={2}>Staff (Role = 2)</option>
                </select>
                <div className="form-text small">
                  Admin manages user accounts; Staff creates & manages news and categories.
                </div>
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label small fw-semibold">
                  {mode === 'create' ? 'Password *' : 'Password (leave blank to keep existing)'}
                </label>
                <input
                  type="password"
                  className={`form-control ${validationErrors.accountPassword ? 'is-invalid' : ''}`}
                  placeholder="Enter password"
                  value={formData.accountPassword}
                  onChange={(e) => setFormData({ ...formData, accountPassword: e.target.value })}
                />
                {validationErrors.accountPassword && (
                  <div className="invalid-feedback">{validationErrors.accountPassword}</div>
                )}
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
                    {mode === 'create' ? 'Create Account' : 'Save Changes'}
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

