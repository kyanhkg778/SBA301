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

    // =========================================================================
    // [LUỒNG 1 - DÒNG CODE CHÍNH]: XEM TIN TỨC CÔNG KHAI (Public News View)
    // Đặc tả PDF: "Do not need authentication to view the news article (news status must be active)"
    // =========================================================================
    public List<NewsArticle> getPublicActiveNews() {
        // Chỉ lấy các bài viết có NewsStatus = true (1), sắp xếp ngày mới nhất lên đầu
        return newsArticleRepository.findByNewsStatusTrueOrderByCreatedDateDesc();
    }

    // =========================================================================
    // [LUỒNG 6 - DÒNG CODE CHÍNH]: XEM LỊCH SỬ BÀI VIẾT DO STAFF TẠO (Staff History)
    // Đặc tả PDF: "View news history created by him/her"
    // =========================================================================
    public List<NewsArticle> getStaffNewsHistory(Short staffId) {
        // Lọc bài viết theo CreatedByID của nhân viên đang đăng nhập
        return newsArticleRepository.findByCreatedBy_AccountIdOrderByCreatedDateDesc(staffId);
    }

    public NewsArticle getNewsById(String id) {
        return newsArticleRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "News article with ID " + id + " not found"));
    }

    // =========================================================================
    // [LUỒNG 5 - DÒNG CODE CHÍNH]: TẠO BÀI VIẾT MỚI KÈM QUAN HỆ TAGS (Many-to-Many)
    // Đặc tả PDF: "News article management (includes tags)"
    // =========================================================================
    @Transactional
    public NewsArticle createNews(NewsArticleRequest req) {
        NewsArticle article = new NewsArticle();

        // [BƯỚC 1]: Xử lý khóa chính NewsArticleID (nhập tay hoặc sinh tự động)
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

        // [BƯỚC 2]: Liên kết khóa ngoại Category (bắt buộc)
        Category category = categoryRepository.findById(req.getCategoryId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Category ID " + req.getCategoryId() + " does not exist."));
        article.setCategory(category);

        // [BƯỚC 3]: Liên kết khóa ngoại CreatedBy (Staff đang đăng nhập)
        Short createdById = req.getCreatedById();
        if (createdById == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "CreatedById is required.");
        }
        SystemAccount creator = accountRepository.findById(createdById)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Account ID " + createdById + " does not exist."));
        article.setCreatedBy(creator);

        // [BƯỚC 4]: Thiết lập nội dung, trạng thái xuất bản và thời gian tạo
        article.setNewsTitle(req.getNewsTitle());
        article.setHeadline(req.getHeadline());
        article.setNewsContent(req.getNewsContent());
        article.setNewsSource(req.getNewsSource());
        article.setNewsStatus(req.getNewsStatus() != null ? req.getNewsStatus() : true);
        article.setCreatedDate(LocalDateTime.now());

        // [BƯỚC 5 - XỬ LÝ QUAN HỆ NHIỀU - NHIỀU]: Gắn danh sách Tags vào bảng trung gian NewsTag
        if (req.getTagIds() != null && !req.getTagIds().isEmpty()) {
            Set<Tag> tags = new HashSet<>(tagRepository.findAllById(req.getTagIds()));
            article.setTags(tags);
        }

        // [BƯỚC 6]: Lưu vào cơ sở dữ liệu qua Spring Data JPA
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

