import React from 'react';

export default function NewsDetailModal({ article, onClose }) {
  if (!article) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(15, 23, 42, 0.7)' }}>
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <div>
              <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-2 py-1 rounded-pill small mb-1">
                {article.category?.categoryName || 'General'}
              </span>
              <h4 className="modal-title fw-bold text-dark mt-1">
                {article.newsTitle}
              </h4>
            </div>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            {article.headline && (
              <div className="lead fs-6 text-muted mb-3 fst-italic border-start border-3 border-primary ps-3 py-1">
                {article.headline}
              </div>
            )}

            <div className="d-flex flex-wrap gap-3 small text-secondary py-2 border-bottom mb-4">
              <span><i className="bi bi-person-circle me-1"></i> Author: <strong>{article.createdBy?.accountName || 'Unknown'}</strong></span>
              <span><i className="bi bi-clock me-1"></i> Published: <strong>{article.createdDate}</strong></span>
              {article.newsSource && (
                <span><i className="bi bi-link-45deg me-1"></i> Source: <strong>{article.newsSource}</strong></span>
              )}
              <span>
                <i className="bi bi-info-circle me-1"></i> Status:{' '}
                <strong className={article.newsStatus ? 'text-success' : 'text-warning'}>
                  {article.newsStatus ? 'Published (Active)' : 'Draft (Inactive)'}
                </strong>
              </span>
            </div>

            <div className="article-content text-dark" style={{ whiteSpace: 'pre-line', lineHeight: '1.8' }}>
              {article.newsContent}
            </div>

            {article.tags && article.tags.length > 0 && (
              <div className="mt-4 pt-3 border-top">
                <span className="fw-semibold small text-secondary me-2">Article Tags:</span>
                {article.tags.map(t => (
                  <span key={t.tagId} className="tag-pill">
                    #{t.tagName}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
