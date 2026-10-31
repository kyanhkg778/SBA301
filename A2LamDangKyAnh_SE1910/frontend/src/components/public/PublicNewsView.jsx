import React, { useState, useEffect } from 'react';
import { newsService, categoryService } from '../../services/api';

export default function PublicNewsView() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Reading dialog modal
  const [readingArticle, setReadingArticle] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError('');
      const [newsData, catData] = await Promise.all([
        newsService.getPublic(),
        categoryService.getActive()
      ]);
      setArticles(newsData);
      setCategories(catData);
    } catch (err) {
      setError(err.message || 'Failed to load public news articles');
    } finally {
      setLoading(false);
    }
  };

  // Filter articles based on selected category and search input
  const filteredArticles = articles.filter(item => {
    const matchesCategory = selectedCategory === 'ALL' || item.category?.categoryId?.toString() === selectedCategory.toString();
    const matchesQuery = !searchQuery.trim() || 
      item.newsTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.headline?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.newsContent?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.newsSource?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="container py-4">
      {/* Hero Header */}
      <div className="text-center mb-5">
        <h1 className="fw-bold text-dark mb-2">FUNews Campus Portal</h1>
        <p className="text-secondary fs-5 max-w-600 mx-auto">
          Stay updated with official academic announcements, research achievements, and university lifestyle.
        </p>
      </div>

      {/* Search and Category Filter Toolbar */}
      <div className="app-card p-3 mb-4">
        <div className="row g-3 align-items-center">
          <div className="col-md-6">
            <div className="search-input-group">
              <i className="bi bi-search"></i>
              <input
                type="text"
                className="form-control"
                placeholder="Search articles by title, keywords, or source..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6 d-flex flex-wrap gap-2 justify-content-md-end align-items-center">
            <span className="small fw-semibold text-secondary me-1">Category:</span>
            <button
              className={`btn btn-sm ${selectedCategory === 'ALL' ? 'btn-primary' : 'btn-outline-secondary'}`}
              onClick={() => setSelectedCategory('ALL')}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat.categoryId}
                className={`btn btn-sm ${selectedCategory === cat.categoryId.toString() ? 'btn-primary' : 'btn-outline-secondary'}`}
                onClick={() => setSelectedCategory(cat.categoryId.toString())}
              >
                {cat.categoryName}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error Feedback */}
      {error && (
        <div className="alert alert-danger d-flex align-items-center gap-2">
          <i className="bi bi-exclamation-octagon-fill"></i>
          <span>{error}</span>
        </div>
      )}

      {/* Loading state */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading news...</span>
          </div>
          <div className="mt-2 text-secondary">Fetching latest publications...</div>
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="text-center py-5 text-secondary app-card">
          <i className="bi bi-newspaper fs-1 text-muted"></i>
          <h5 className="mt-3">No active news articles found</h5>
          <p className="text-muted">Try clearing your search query or selecting a different category.</p>
        </div>
      ) : (
        <div className="row g-4">
          {filteredArticles.map(article => (
            <div key={article.newsArticleId} className="col-md-6 col-lg-4">
              <div 
                className="card h-100 app-card shadow-sm border-0 d-flex flex-column cursor-pointer"
                style={{ cursor: 'pointer', transition: 'transform 0.15s ease' }}
                onClick={() => setReadingArticle(article)}
              >
                <div className="card-body d-flex flex-column p-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-2 py-1 rounded-pill small">
                      {article.category?.categoryName || 'General'}
                    </span>
                    <span className="small text-muted">
                      <i className="bi bi-calendar3 me-1"></i>
                      {article.createdDate ? new Date(article.createdDate).toLocaleDateString() : 'Recent'}
                    </span>
                  </div>

                  <h5 className="card-title fw-bold text-dark mb-2 line-clamp-2">
                    {article.newsTitle}
                  </h5>

                  {article.headline && (
                    <p className="card-subtitle text-muted small mb-3 fst-italic">
                      {article.headline}
                    </p>
                  )}

                  <p className="card-text text-secondary small flex-grow-1" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {article.newsContent}
                  </p>

                  {/* Tags */}
                  {article.tags && article.tags.length > 0 && (
                    <div className="mt-3 mb-2">
                      {article.tags.map(t => (
                        <span key={t.tagId} className="tag-pill">
                          #{t.tagName}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-3 pt-3 border-top d-flex justify-content-between align-items-center small text-muted">
                    <span>
                      <i className="bi bi-person me-1"></i>
                      {article.createdBy?.accountName || 'Staff'}
                    </span>
                    <span className="text-primary fw-semibold">
                      Read full story <i className="bi bi-arrow-right"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reading Article Modal */}
      {readingArticle && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(15, 23, 42, 0.7)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <div>
                  <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-2 py-1 rounded-pill small mb-1">
                    {readingArticle.category?.categoryName}
                  </span>
                  <h4 className="modal-title fw-bold text-dark mt-1">
                    {readingArticle.newsTitle}
                  </h4>
                </div>
                <button type="button" className="btn-close" onClick={() => setReadingArticle(null)}></button>
              </div>

              <div className="modal-body">
                {readingArticle.headline && (
                  <div className="lead fs-6 text-muted mb-3 fst-italic border-start border-3 border-primary ps-3 py-1">
                    {readingArticle.headline}
                  </div>
                )}

                <div className="d-flex flex-wrap gap-3 small text-secondary py-2 border-bottom mb-4">
                  <span><i className="bi bi-person-circle me-1"></i> Author: <strong>{readingArticle.createdBy?.accountName}</strong></span>
                  <span><i className="bi bi-clock me-1"></i> Published: <strong>{readingArticle.createdDate}</strong></span>
                  {readingArticle.newsSource && (
                    <span><i className="bi bi-link-45deg me-1"></i> Source: <strong>{readingArticle.newsSource}</strong></span>
                  )}
                </div>

                <div className="article-content text-dark" style={{ whiteSpace: 'pre-line', lineHeight: '1.8' }}>
                  {readingArticle.newsContent}
                </div>

                {readingArticle.tags && readingArticle.tags.length > 0 && (
                  <div className="mt-4 pt-3 border-top">
                    <span className="fw-semibold small text-secondary me-2">Article Tags:</span>
                    {readingArticle.tags.map(t => (
                      <span key={t.tagId} className="tag-pill">
                        #{t.tagName}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setReadingArticle(null)}>
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
