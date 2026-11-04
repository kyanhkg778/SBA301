import React from 'react';

export default function AlertBanner({ type = 'danger', message, onClose }) {
  if (!message) return null;

  const isSuccess = type === 'success';

  return (
    <div 
      className={`alert alert-${type} alert-dismissible fade show d-flex align-items-center gap-2 py-2 mb-3 shadow-sm`} 
      role="alert"
    >
      <i className={`bi ${isSuccess ? 'bi-check-circle-fill' : 'bi-exclamation-octagon-fill'} fs-5`}></i>
      <div className="flex-grow-1 small">{message}</div>
      {onClose && (
        <button 
          type="button" 
          className="btn-close" 
          onClick={onClose} 
          aria-label="Close"
        ></button>
      )}
    </div>
  );
}

