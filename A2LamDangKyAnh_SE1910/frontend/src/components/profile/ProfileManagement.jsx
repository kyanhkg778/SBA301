import React, { useState } from 'react';
import { accountService } from '../../services/api';

export default function ProfileManagement({ currentUser, onProfileUpdated }) {
  const [name, setName] = useState(currentUser?.accountName || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!name.trim()) {
      setError('Account name cannot be empty.');
      return;
    }

    if (password && password !== confirmPassword) {
      setError('New password and confirm password do not match.');
      return;
    }

    try {
      setLoading(true);
      const updated = await accountService.updateProfile(currentUser.accountId, {
        accountName: name.trim(),
        accountPassword: password || undefined
      });
      setMessage('Profile updated successfully!');
      setPassword('');
      setConfirmPassword('');
      if (onProfileUpdated) {
        onProfileUpdated({
          ...currentUser,
          accountName: updated.accountName
        });
      }
    } catch (err) {
      setError(err.message || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: '650px' }}>
      <div className="app-card p-4">
        <div className="d-flex align-items-center gap-3 mb-4 border-bottom pb-3">
          <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{ width: '56px', height: '56px', fontSize: '1.5rem' }}>
            <i className="bi bi-person-fill"></i>
          </div>
          <div>
            <h4 className="fw-bold mb-0 text-dark">Staff Profile Management</h4>
            <p className="text-secondary small mb-0">Update your account display name and password.</p>
          </div>
        </div>

        {message && (
          <div className="alert alert-success d-flex align-items-center gap-2 py-2" role="alert">
            <i className="bi bi-check-circle-fill"></i>
            <div>{message}</div>
          </div>
        )}

        {error && (
          <div className="alert alert-danger d-flex align-items-center gap-2 py-2" role="alert">
            <i className="bi bi-exclamation-octagon-fill"></i>
            <div>{error}</div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Read-only info */}
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label small fw-semibold text-secondary">Account ID</label>
              <input type="text" className="form-control bg-light" value={`#${currentUser?.accountId}`} disabled />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold text-secondary">System Role</label>
              <input type="text" className="form-control bg-light" value={currentUser?.accountRole === 1 ? 'Administrator' : 'Staff Member'} disabled />
            </div>
            <div className="col-12">
              <label className="form-label small fw-semibold text-secondary">Email Address (Login Identity)</label>
              <input type="text" className="form-control bg-light" value={currentUser?.accountEmail || ''} disabled />
              <div className="form-text small">Email cannot be modified directly; please contact Administrator.</div>
            </div>
          </div>

          <hr className="my-4" />

          {/* Editable fields */}
          <div className="mb-3">
            <label className="form-label small fw-semibold">Display Full Name *</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label small fw-semibold">New Password (leave empty to keep current password)</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {password && (
            <div className="mb-3">
              <label className="form-label small fw-semibold">Confirm New Password *</label>
              <input
                type="password"
                className="form-control"
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}

          <div className="d-flex justify-content-end gap-2 mt-4">
            <button type="submit" className="btn btn-primary d-flex align-items-center gap-2" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status"></span>
                  Updating Profile...
                </>
              ) : (
                <>
                  <i className="bi bi-save"></i>
                  Save Profile
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

