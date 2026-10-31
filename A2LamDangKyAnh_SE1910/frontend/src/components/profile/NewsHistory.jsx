import React, { useState, useEffect } from 'react';
import { newsService } from '../../services/api';

export default function NewsHistory({ currentUser }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [previewArticle, setPreviewArticle] = useState(null);

  useEffect(() => {
    if (currentUser?.accountId) {
      loadHistory();
    }
  }, [currentUser]);

  const loadHistory = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await newsService.getStaffHistory(currentUser.accountId);
      setHistory(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch personal news history');
    } finally {
      setLoading(false);
    }
  };

  const totalCount = history.length;
  const activeCount = history.filter(h => h.newsStatus).length;
  const draftCount = totalCount - activeCount;

  return (
    <div className="container py-4">
      {/* Title */}
      <div className="mb-4">
        <h2 className="fw-bold text-dark mb-1">My News Authoring History</h2>
        <p className="text-secondary mb-0 small">
          Review all publications and draft articles created by <strong>{currentUser?.accountName}</strong>.
        </p>
      </div>

      {/* KPI Summary Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="app-card p-3 border-start border-4 border-primary">
            <div className="text-secondary small fw-semibold">Total Authored</div>
            <div className="fs-3 fw-bold text-dark mt-1">{totalCount}</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="app-card p-3 border-start border-4 border-success">
            <div className="text-secondary small fw-semibold">Published (Active)</div>
            <div className="fs-3 fw-bold text-success mt-1">{activeCount}</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="app-card p-3 border-start border-4 border-warning">
            <div className="text-secondary small fw-semibold">Drafts (Inactive)</div>
            <div className="fs-3 fw-bold text-warning mt-1">{draftCount}</div>
          </div>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger py-2 d-flex align-items-center gap-2 mb-4">
          <i className="bi bi-exclamation-octagon-fill"></i>
          <span>{error}</span>
        </div>
      )}

      {/* History Table */}
      <div className="app-card overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th scope="col" style={{ width: '90px' }}>ID</th>
                <th scope="col">Title & Category</th>
                <th scope="col">Status</th>
                <th scope="col">Tags</th>
                <th scope="col">Created Date</th>
                <th scope="col">Last Modified</th>
                <th scope="col" className="text-end">Preview</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-5">
                    <div className="spinner-border spinner-border-sm text-primary me-2"></div>
                    Loading authoring history...
                  </td>
                </tr>
              ) : history.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-5 text-muted">
                    <i className="bi bi-journal-check fs-2 d-block mb-2"></i>
                    You have not authored any news articles yet.
                  </td>
                </tr>
              ) : (
                history.map(item => (
                  <tr key={item.newsArticleId}>
                    <td className="fw-semibold text-secondary">
                      <code>{item.newsArticleId}</code>
                    </td>
                    <td>
                      <div className="fw-bold text-dark">{item.newsTitle}</div>
                      <div className="small text-muted">
                        <span className="badge bg-light text-dark border me-1">
                          {item.category?.categoryName || 'General'}
                        </span>
                        {item.headline && <span>&bull; {item.headline}</span>}
                      </div>
                    </td>
                    <td>
                      <span className={item.newsStatus ? 'badge-status-active' : 'badge-status-inactive'}>
                        {item.newsStatus ? 'Active (Public)' : 'Inactive (Draft)'}
                      </span>
                    </td>
                    <td>
                      {item.tags && item.tags.length > 0 ? (
                        item.tags.map(t => (
                          <span key={t.tagId} className="tag-pill">
                            {t.tagName}
                          </span>
                        ))
                      ) : (
                        <span className="text-muted small">-</span>
                      )}
                    </td>
                    <td className="small text-muted">
                      {item.createdDate ? new Date(item.createdDate).toLocaleString() : '-'}
                    </td>
                    <td className="small text-muted">
                      {item.modifiedDate ? new Date(item.modifiedDate).toLocaleString() : 'Never'}
                    </td>
                    <td className="text-end">
                      <button
                        className="btn btn-sm btn-outline-info"
                        onClick={() => setPreviewArticle(item)}
                        title="Preview Content"
                      >
                        <i className="bi bi-eye"></i> View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Preview Dialog */}
      {previewArticle && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(15, 23, 42, 0.7)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <div>
                  <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-2 py-1 rounded-pill small mb-1">
                    {previewArticle.category?.categoryName}
                  </span>
                  <h5 className="modal-title fw-bold text-dark mt-1">
                    {previewArticle.newsTitle}
                  </h5>
                </div>
                <button type="button" className="btn-close" onClick={() => setPreviewArticle(null)}></button>
              </div>
              <div className="modal-body">
                {previewArticle.headline && (
                  <p className="fst-italic text-muted border-start border-3 border-info ps-3">
                    {previewArticle.headline}
                  </p>
                )}
                <div className="small text-secondary mb-3 d-flex gap-3">
                  <span><strong>ID:</strong> {previewArticle.newsArticleId}</span>
                  <span><strong>Status:</strong> {previewArticle.newsStatus ? 'Published' : 'Draft'}</span>
                  <span><strong>Created:</strong> {previewArticle.createdDate}</span>
                </div>
                <div style={{ whiteSpace: 'pre-line', lineHeight: '1.7' }}>
                  {previewArticle.newsContent}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setPreviewArticle(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
