package com.sba301.funews.service;

import com.sba301.funews.dto.NewsArticleRequest;
import com.sba301.funews.entity.Category;
import com.sba301.funews.entity.NewsArticle;
import com.sba301.funews.entity.SystemAccount;
import com.sba301.funews.entity.Tag;
import com.sba301.funews.repository.CategoryRepository;
import com.sba301.funews.repository.NewsArticleRepository;
import com.sba301.funews.repository.SystemAccountRepository;
import com.sba301.funews.repository.TagRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
public class NewsArticleService {

    private final NewsArticleRepository newsArticleRepository;
    private final CategoryRepository categoryRepository;
    private final SystemAccountRepository accountRepository;
    private final TagRepository tagRepository;

    public NewsArticleService(
            NewsArticleRepository newsArticleRepository,
            CategoryRepository categoryRepository,
            SystemAccountRepository accountRepository,
            TagRepository tagRepository) {
        this.newsArticleRepository = newsArticleRepository;
        this.categoryRepository = categoryRepository;
        this.accountRepository = accountRepository;
        this.tagRepository = tagRepository;
    }

    public List<NewsArticle> getAllNews(String query, Short categoryId, Boolean status, Short createdById) {
        return newsArticleRepository.searchNews(query, categoryId, status, createdById);
    }

    // [Luồng 1]: Lấy danh sách tin tức active (status = true) công khai
    public List<NewsArticle> getPublicActiveNews() {
        return newsArticleRepository.findByNewsStatusTrueOrderByCreatedDateDesc();
    }

    // [Luồng 6]: Lấy lịch sử bài viết theo staff ID
    public List<NewsArticle> getStaffNewsHistory(Short staffId) {
        return newsArticleRepository.findByCreatedBy_AccountIdOrderByCreatedDateDesc(staffId);
    }

    public NewsArticle getNewsById(String id) {
        return newsArticleRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "News article with ID " + id + " not found"));
    }

    // [Luồng 5]: Tạo bài viết mới kèm liên kết tags (Many-to-Many)
    @Transactional
    public NewsArticle createNews(NewsArticleRequest req) {
        NewsArticle article = new NewsArticle();

        String id = req.getNewsArticleId();
        if (id == null || id.trim().isEmpty()) {
            id = "NA" + System.currentTimeMillis() % 1000000;
        } else {
            id = id.trim();
            if (newsArticleRepository.existsById(id)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "News article ID '" + id + "' already exists.");
            }
        }
        article.setNewsArticleId(id);

        Category category = categoryRepository.findById(req.getCategoryId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Category ID " + req.getCategoryId() + " does not exist."));
        article.setCategory(category);

        Short createdById = req.getCreatedById();
        if (createdById == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "CreatedById is required.");
        }
        SystemAccount creator = accountRepository.findById(createdById)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Account ID " + createdById + " does not exist."));
        article.setCreatedBy(creator);

        article.setNewsTitle(req.getNewsTitle());
        article.setHeadline(req.getHeadline());
        article.setNewsContent(req.getNewsContent());
        article.setNewsSource(req.getNewsSource());
        article.setNewsStatus(req.getNewsStatus() != null ? req.getNewsStatus() : true);
        article.setCreatedDate(LocalDateTime.now());

        // Gắn danh sách tags vào bài viết (bảng NewsTag)
        if (req.getTagIds() != null && !req.getTagIds().isEmpty()) {
            Set<Tag> tags = new HashSet<>(tagRepository.findAllById(req.getTagIds()));
            article.setTags(tags);
        }

        return newsArticleRepository.save(article);
    }

    @Transactional
    public NewsArticle updateNews(String id, NewsArticleRequest req) {
        NewsArticle existing = getNewsById(id);

        if (req.getCategoryId() != null) {
            Category category = categoryRepository.findById(req.getCategoryId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Category ID " + req.getCategoryId() + " does not exist."));
            existing.setCategory(category);
        }

        if (req.getUpdatedById() != null) {
            SystemAccount updater = accountRepository.findById(req.getUpdatedById())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Updater Account ID " + req.getUpdatedById() + " does not exist."));
            existing.setUpdatedBy(updater);
        }

        existing.setNewsTitle(req.getNewsTitle());
        existing.setHeadline(req.getHeadline());
        existing.setNewsContent(req.getNewsContent());
        existing.setNewsSource(req.getNewsSource());
        if (req.getNewsStatus() != null) {
            existing.setNewsStatus(req.getNewsStatus());
        }
        existing.setModifiedDate(LocalDateTime.now());

        if (req.getTagIds() != null) {
            Set<Tag> tags = new HashSet<>(tagRepository.findAllById(req.getTagIds()));
            existing.setTags(tags);
        }

        return newsArticleRepository.save(existing);
    }

    @Transactional
    public void deleteNews(String id) {
        NewsArticle existing = getNewsById(id);
        existing.getTags().clear(); // Disassociate tags from join table
        newsArticleRepository.delete(existing);
    }
}

