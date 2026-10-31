import React from 'react';

export default function ConfirmModal({ show, title, message, onConfirm, onCancel, confirmText = "Delete", isDeleting = false }) {
  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(15, 23, 42, 0.65)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title d-flex align-items-center gap-2 text-danger">
              <i className="bi bi-exclamation-triangle-fill"></i>
              {title || "Confirm Deletion"}
            </h5>
            <button type="button" className="btn-close" onClick={onCancel} disabled={isDeleting}></button>
          </div>
          <div className="modal-body">
            <p className="mb-0 text-secondary">{message || "Are you sure you want to delete this item? This action cannot be undone."}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-secondary" onClick={onCancel} disabled={isDeleting}>
              Cancel
            </button>
            <button type="button" className="btn btn-danger d-flex align-items-center gap-2" onClick={onConfirm} disabled={isDeleting}>
              {isDeleting ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Deleting...
                </>
              ) : (
                <>
                  <i className="bi bi-trash"></i>
                  {confirmText}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
