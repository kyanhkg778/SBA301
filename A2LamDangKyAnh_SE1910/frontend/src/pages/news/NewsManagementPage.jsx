import React, { useState, useEffect } from 'react';
import { newsService, categoryService } from '../../services/api';
import NewsModal from '../../components/modals/NewsModal';
import NewsDetailModal from '../../components/modals/NewsDetailModal';
import ConfirmModal from '../../components/common/ConfirmModal';
import AlertBanner from '../../components/common/AlertBanner';

export default function NewsManagementPage({ currentUser }) {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionError, setActionError] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');

  // Modals state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Preview Modal state
  const [previewArticle, setPreviewArticle] = useState(null);

  // Confirm delete modal state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadNews();
  }, [searchQuery, selectedCategory, selectedStatus]);

  const loadCategories = async () => {
    try {
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories', err);
    }
  };

  const loadNews = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchQuery.trim()) params.query = searchQuery.trim();
      if (selectedCategory) params.categoryId = selectedCategory;
      if (selectedStatus !== '') params.status = selectedStatus === 'true';

      const data = await newsService.getAll(params);
      setArticles(data);
    } catch (err) {
      setActionError(err.message || 'Failed to fetch news articles');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setSelectedArticle(null);
    setModalMode('create');
    setModalOpen(true);
    setActionError('');
    setActionSuccess('');
  };

  const handleOpenEdit = (article) => {
    setSelectedArticle(article);
    setModalMode('edit');
    setModalOpen(true);
    setActionError('');
    setActionSuccess('');
  };

  const handleSaveArticle = async (formData) => {
    try {
      setIsSaving(true);
      setActionError('');
      if (modalMode === 'create') {
        await newsService.create(formData);
        setActionSuccess(`News article '${formData.newsTitle}' created successfully.`);
      } else {
        await newsService.update(selectedArticle.newsArticleId, formData);
        setActionSuccess(`News article '${formData.newsTitle}' updated successfully.`);
      }
      setModalOpen(false);
      loadNews();
    } catch (err) {
      setActionError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleOpenDelete = (article) => {
    setArticleToDelete(article);
    setConfirmOpen(true);
    setActionError('');
    setActionSuccess('');
  };

  const handleConfirmDelete = async () => {
    if (!articleToDelete) return;
    try {
      setIsDeleting(true);
      setActionError('');
      await newsService.delete(articleToDelete.newsArticleId);
      setActionSuccess(`Article '${articleToDelete.newsTitle}' deleted successfully.`);
      setConfirmOpen(false);
      setArticleToDelete(null);
      loadNews();
    } catch (err) {
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
          <h2 className="fw-bold text-dark mb-1">News Article Management</h2>
          <p className="text-secondary mb-0 small">
            Staff role portal: Full CRUD operations, tag assignments, and status controls for news articles.
          </p>
        </div>
        <button className="btn btn-primary d-flex align-items-center gap-2" onClick={handleOpenCreate}>
          <i className="bi bi-file-earmark-plus-fill"></i>
          Create New Article
        </button>
      </div>

      {/* Notifications */}
      <AlertBanner type="success" message={actionSuccess} onClose={() => setActionSuccess('')} />
      <AlertBanner type="danger" message={actionError} onClose={() => setActionError('')} />

      {/* Filter and Search Bar */}
      <div className="app-card p-3 mb-4">
        <div className="row g-3">
          <div className="col-md-5">
            <div className="search-input-group">
              <i className="bi bi-search"></i>
              <input
                type="text"
                className="form-control"
                placeholder="Search by title, headline, or source..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">-- All Categories --</option>
              {categories.map(c => (
                <option key={c.categoryId} value={c.categoryId}>{c.categoryName}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">-- All Statuses --</option>
              <option value="true">Active (1)</option>
              <option value="false">Inactive / Draft (0)</option>
            </select>
          </div>
        </div>
      </div>

      {/* News Table */}
      <div className="app-card overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th scope="col" style={{ width: '90px' }}>ID</th>
                <th scope="col">Title & Category</th>
                <th scope="col">Author</th>
                <th scope="col">Status</th>
                <th scope="col">Tags</th>
                <th scope="col">Created Date</th>
                <th scope="col" className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-5">
                    <div className="spinner-border spinner-border-sm text-primary me-2"></div>
                    Loading news articles...
                  </td>
                </tr>
              ) : articles.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-5 text-muted">
                    <i className="bi bi-journal-x fs-2 d-block mb-2"></i>
                    No articles found matching your criteria.
                  </td>
                </tr>
              ) : (
                articles.map(item => (
                  <tr key={item.newsArticleId}>
                    <td className="fw-semibold text-secondary">
                      <code>{item.newsArticleId}</code>
                    </td>
                    <td>
                      <div className="fw-bold text-dark">{item.newsTitle}</div>
                      <div className="small text-muted d-flex align-items-center gap-1">
                        <span className="badge bg-light text-dark border">
                          {item.category?.categoryName || 'General'}
                        </span>
                        {item.newsSource && (
                          <span>&bull; Source: {item.newsSource}</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="small fw-semibold">{item.createdBy?.accountName || 'Unknown'}</div>
                      <div className="text-muted" style={{ fontSize: '0.75rem' }}>{item.createdBy?.accountEmail}</div>
                    </td>
                    <td>
                      <span className={item.newsStatus ? 'badge-status-active' : 'badge-status-inactive'}>
                        {item.newsStatus ? 'Active (1)' : 'Inactive (0)'}
                      </span>
                    </td>
                    <td>
                      <div style={{ maxWidth: '200px' }}>
                        {item.tags && item.tags.length > 0 ? (
                          item.tags.map(t => (
                            <span key={t.tagId} className="tag-pill">
                              {t.tagName}
                            </span>
                          ))
                        ) : (
                          <span className="text-muted small">None</span>
                        )}
                      </div>
                    </td>
                    <td className="small text-muted">
                      {item.createdDate ? new Date(item.createdDate).toLocaleDateString() : '-'}
                    </td>
                    <td className="text-end">
                      <div className="btn-group btn-group-sm">
                        <button
                          className="btn btn-outline-info"
                          onClick={() => setPreviewArticle(item)}
                          title="Preview Article"
                        >
                          <i className="bi bi-eye"></i> View
                        </button>
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => handleOpenEdit(item)}
                          title="Edit Article"
                        >
                          <i className="bi bi-pencil"></i> Edit
                        </button>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => handleOpenDelete(item)}
                          title="Delete Article"
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
      <NewsModal
        show={modalOpen}
        mode={modalMode}
        article={selectedArticle}
        currentUser={currentUser}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveArticle}
        isSaving={isSaving}
      />

      {/* Reusable Reading Modal */}
      <NewsDetailModal
        article={previewArticle}
        onClose={() => setPreviewArticle(null)}
      />

      <ConfirmModal
        show={confirmOpen}
        title="Delete News Article"
        message={`Are you sure you want to permanently delete news article '${articleToDelete?.newsTitle}' (ID: ${articleToDelete?.newsArticleId})?`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmOpen(false)}
        isDeleting={isDeleting}
      />
    </div>
  );
}
