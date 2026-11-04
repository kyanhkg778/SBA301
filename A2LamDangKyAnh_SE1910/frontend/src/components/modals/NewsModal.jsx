import React, { useState, useEffect } from 'react';
import { categoryService, tagService } from '../../services/api';

export default function NewsModal({ show, mode = 'create', article = null, currentUser, onClose, onSave, isSaving = false }) {
  const [categories, setCategories] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [formData, setFormData] = useState({
    newsArticleId: '',
    newsTitle: '',
    headline: '',
    categoryId: '',
    newsContent: '',
    newsSource: '',
    newsStatus: true,
    tagIds: []
  });
  const [newTagInput, setNewTagInput] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (show) {
      loadDependencies();
      if (article && mode === 'edit') {
        setFormData({
          newsArticleId: article.newsArticleId || '',
          newsTitle: article.newsTitle || '',
          headline: article.headline || '',
          categoryId: article.category?.categoryId || '',
          newsContent: article.newsContent || '',
          newsSource: article.newsSource || '',
          newsStatus: article.newsStatus !== undefined ? article.newsStatus : true,
          tagIds: article.tags ? article.tags.map(t => t.tagId) : []
        });
      } else {
        setFormData({
          newsArticleId: 'NA' + Math.floor(1000 + Math.random() * 9000),
          newsTitle: '',
          headline: '',
          categoryId: '',
          newsContent: '',
          newsSource: '',
          newsStatus: true,
          tagIds: []
        });
      }
      setErrors({});
    }
  }, [show, article, mode]);

  const loadDependencies = async () => {
    try {
      const [cats, tags] = await Promise.all([
        categoryService.getActive(),
        tagService.getAll()
      ]);
      setCategories(cats);
      setAvailableTags(tags);
      if (mode === 'create' && cats.length > 0 && !formData.categoryId) {
        setFormData(prev => ({ ...prev, categoryId: cats[0].categoryId }));
      }
    } catch (err) {
      console.error('Error loading modal dependencies', err);
    }
  };

  if (!show) return null;

  const validate = () => {
    const err = {};
    if (!formData.newsArticleId.trim()) {
      err.newsArticleId = 'Article ID is required.';
    } else if (formData.newsArticleId.length > 36) {
      err.newsArticleId = 'Article ID cannot exceed 36 characters.';
    }

    if (!formData.newsTitle.trim()) {
      err.newsTitle = 'Article title is required.';
    } else if (formData.newsTitle.length > 400) {
      err.newsTitle = 'Article title cannot exceed 400 characters.';
    }

    if (formData.headline && formData.headline.length > 150) {
      err.headline = 'Headline cannot exceed 150 characters.';
    }

    if (!formData.categoryId) {
      err.categoryId = 'Please select a category.';
    }

    if (!formData.newsContent.trim()) {
      err.newsContent = 'Article content is required.';
    }

    if (formData.newsSource && formData.newsSource.length > 400) {
      err.newsSource = 'Source cannot exceed 400 characters.';
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleToggleTag = (tagId) => {
    setFormData(prev => {
      const exists = prev.tagIds.includes(tagId);
      if (exists) {
        return { ...prev, tagIds: prev.tagIds.filter(id => id !== tagId) };
      } else {
        return { ...prev, tagIds: [...prev.tagIds, tagId] };
      }
    });
  };

  const handleAddNewTag = async () => {
    if (!newTagInput.trim()) return;
    try {
      const created = await tagService.create({ tagName: newTagInput.trim(), note: 'Created via News Editor' });
      setAvailableTags(prev => [...prev, created]);
      setFormData(prev => ({ ...prev, tagIds: [...prev.tagIds, created.tagId] }));
      setNewTagInput('');
    } catch (err) {
      alert(err.message || 'Failed to create tag');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const payload = {
        newsArticleId: formData.newsArticleId.trim(),
        newsTitle: formData.newsTitle.trim(),
        headline: formData.headline.trim(),
        categoryId: Number(formData.categoryId),
        newsContent: formData.newsContent.trim(),
        newsSource: formData.newsSource.trim(),
        newsStatus: Boolean(formData.newsStatus),
        tagIds: formData.tagIds,
        createdById: currentUser?.accountId,
        updatedById: currentUser?.accountId
      };
      onSave(payload);
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(15, 23, 42, 0.7)' }}>
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fw-bold text-dark d-flex align-items-center gap-2">
              <i className={`bi ${mode === 'create' ? 'bi-file-earmark-plus text-primary' : 'bi-pencil-square text-warning'}`}></i>
              {mode === 'create' ? 'Create News Article' : `Update News Article: ${article?.newsArticleId}`}
            </h5>
            <button type="button" className="btn-close" onClick={onClose} disabled={isSaving}></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="row g-3">
                {/* Article ID */}
                <div className="col-md-4">
                  <label className="form-label small fw-semibold">Article ID *</label>
                  <input
                    type="text"
                    className={`form-control ${errors.newsArticleId ? 'is-invalid' : ''}`}
                    placeholder="e.g. NA0010"
                    value={formData.newsArticleId}
                    onChange={(e) => setFormData({ ...formData, newsArticleId: e.target.value })}
                    disabled={mode === 'edit'}
                  />
                  {errors.newsArticleId && (
                    <div className="invalid-feedback">{errors.newsArticleId}</div>
                  )}
                </div>

                {/* Category Selection */}
                <div className="col-md-5">
                  <label className="form-label small fw-semibold">Category *</label>
                  <select
                    className={`form-select ${errors.categoryId ? 'is-invalid' : ''}`}
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  >
                    <option value="">-- Choose Category --</option>
                    {categories.map(c => (
                      <option key={c.categoryId} value={c.categoryId}>
                        {c.categoryName}
                      </option>
                    ))}
                  </select>
                  {errors.categoryId && (
                    <div className="invalid-feedback">{errors.categoryId}</div>
                  )}
                </div>

                {/* News Status */}
                <div className="col-md-3 d-flex align-items-center pt-3">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="newsStatusSwitch"
                      checked={formData.newsStatus}
                      onChange={(e) => setFormData({ ...formData, newsStatus: e.target.checked })}
                    />
                    <label className="form-check-label small fw-semibold" htmlFor="newsStatusSwitch">
                      {formData.newsStatus ? 'Active (Public)' : 'Inactive (Draft)'}
                    </label>
                  </div>
                </div>

                {/* Title */}
                <div className="col-12">
                  <label className="form-label small fw-semibold">Article Title *</label>
                  <input
                    type="text"
                    className={`form-control ${errors.newsTitle ? 'is-invalid' : ''}`}
                    placeholder="Enter engaging news title..."
                    value={formData.newsTitle}
                    onChange={(e) => setFormData({ ...formData, newsTitle: e.target.value })}
                  />
                  {errors.newsTitle && (
                    <div className="invalid-feedback">{errors.newsTitle}</div>
                  )}
                </div>

                {/* Headline */}
                <div className="col-12">
                  <label className="form-label small fw-semibold">Headline (Summary subtitle)</label>
                  <input
                    type="text"
                    className={`form-control ${errors.headline ? 'is-invalid' : ''}`}
                    placeholder="Short catchphrase or subtitle..."
                    value={formData.headline}
                    onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                  />
                  {errors.headline && (
                    <div className="invalid-feedback">{errors.headline}</div>
                  )}
                </div>

                {/* News Content */}
                <div className="col-12">
                  <label className="form-label small fw-semibold">Full Article Content *</label>
                  <textarea
                    className={`form-control ${errors.newsContent ? 'is-invalid' : ''}`}
                    rows="6"
                    placeholder="Write or paste news article content..."
                    value={formData.newsContent}
                    onChange={(e) => setFormData({ ...formData, newsContent: e.target.value })}
                  ></textarea>
                  {errors.newsContent && (
                    <div className="invalid-feedback">{errors.newsContent}</div>
                  )}
                </div>

                {/* News Source */}
                <div className="col-12">
                  <label className="form-label small fw-semibold">News Source</label>
                  <input
                    type="text"
                    className={`form-control ${errors.newsSource ? 'is-invalid' : ''}`}
                    placeholder="e.g. FPT University Bulletin, Tech Desk..."
                    value={formData.newsSource}
                    onChange={(e) => setFormData({ ...formData, newsSource: e.target.value })}
                  />
                  {errors.newsSource && (
                    <div className="invalid-feedback">{errors.newsSource}</div>
                  )}
                </div>

                {/* Tags Section */}
                <div className="col-12">
                  <label className="form-label small fw-semibold d-block">Article Tags</label>
                  <div className="d-flex flex-wrap gap-2 mb-2 p-2 bg-light rounded border">
                    {availableTags.length === 0 ? (
                      <span className="small text-muted">No tags available. Create one below.</span>
                    ) : (
                      availableTags.map(tag => {
                        const selected = formData.tagIds.includes(tag.tagId);
                        return (
                          <button
                            type="button"
                            key={tag.tagId}
                            className={`btn btn-sm ${selected ? 'btn-primary' : 'btn-outline-secondary'}`}
                            onClick={() => handleToggleTag(tag.tagId)}
                          >
                            <i className={`bi ${selected ? 'bi-check2' : 'bi-plus'} me-1`}></i>
                            {tag.tagName}
                          </button>
                        );
                      })
                    )}
                  </div>

                  {/* Create New Tag Inline */}
                  <div className="input-group input-group-sm" style={{ maxWidth: '300px' }}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Add new tag name..."
                      value={newTagInput}
                      onChange={(e) => setNewTagInput(e.target.value)}
                    />
                    <button type="button" className="btn btn-outline-secondary" onClick={handleAddNewTag}>
                      + Add Tag
                    </button>
                  </div>
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
                    {mode === 'create' ? 'Publish Article' : 'Save Changes'}
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

