import React from 'react';

/**
 * Component Popup Dialog (Modal) tái sử dụng cho các thao tác CRUD và xem chi tiết
 */
export default function Modal({ isOpen, onClose, title, children, footer, size = '' }) {
  if (!isOpen) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.55)', zIndex: 1050 }}
    >
      <div className={`modal-dialog modal-dialog-centered ${size ? `modal-${size}` : ''}`}>
        <div className="modal-content shadow border-0">
          <div className="modal-header bg-light">
            <h5 className="modal-title fw-bold text-primary">{title}</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body p-4">
            {children}
          </div>
          {footer && (
            <div className="modal-footer bg-light">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

