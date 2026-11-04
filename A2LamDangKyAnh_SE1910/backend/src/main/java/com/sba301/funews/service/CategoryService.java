package com.sba301.funews.service;

import com.sba301.funews.entity.Category;
import com.sba301.funews.repository.CategoryRepository;
import com.sba301.funews.repository.NewsArticleRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final NewsArticleRepository newsArticleRepository;

    public CategoryService(CategoryRepository categoryRepository, NewsArticleRepository newsArticleRepository) {
        this.categoryRepository = categoryRepository;
        this.newsArticleRepository = newsArticleRepository;
    }

    public List<Category> getAllCategories(String search) {
        if (search != null && !search.trim().isEmpty()) {
            return categoryRepository.findByCategoryNameContainingIgnoreCase(search.trim());
        }
        return categoryRepository.findAll();
    }

    public List<Category> getActiveCategories() {
        return categoryRepository.findByIsActiveTrue();
    }

    public Category getCategoryById(Short id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category with ID " + id + " not found"));
    }

    @Transactional
    public Category createCategory(Category category) {
        if (categoryRepository.existsByCategoryNameIgnoreCase(category.getCategoryName().trim())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Category name '" + category.getCategoryName() + "' already exists.");
        }
        category.setCategoryName(category.getCategoryName().trim());
        if (category.getIsActive() == null) {
            category.setIsActive(true);
        }
        return categoryRepository.save(category);
    }

    @Transactional
    public Category updateCategory(Short id, Category details) {
        Category existing = getCategoryById(id);

        String trimmedName = details.getCategoryName().trim();
        if (!existing.getCategoryName().equalsIgnoreCase(trimmedName)) {
            if (categoryRepository.existsByCategoryNameIgnoreCase(trimmedName)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Category name '" + trimmedName + "' already exists.");
            }
            existing.setCategoryName(trimmedName);
        }

        existing.setCategoryDesciption(details.getCategoryDesciption());
        existing.setParentCategoryId(details.getParentCategoryId());
        if (details.getIsActive() != null) {
            existing.setIsActive(details.getIsActive());
        }

        return categoryRepository.save(existing);
    }

    // =========================================================================
    // [LUỒNG 4 - DÒNG CODE CHÍNH]: RÀNG BUỘC XÓA DANH MỤC CỦA STAFF (Business Constraint)
    // Đặc tả PDF: "The delete action will delete an item in the case this item
    // is not belong to any news articles. If the item is already stored in a news article cannot delete."
    // =========================================================================
    @Transactional
    public void deleteCategory(Short id) {
        Category existing = getCategoryById(id);

        // [BƯỚC 1 - KIỂM TRA KHÓA NGOẠI]: Kiểm tra xem danh mục này có đang chứa bài viết nào không
        boolean isUsedInNews = newsArticleRepository.existsByCategory_CategoryId(id);

        // [BƯỚC 2 - CHẶN XÓA]: Nếu đang có bài viết sử dụng -> ném lỗi HTTP 400 Bad Request
        if (isUsedInNews) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Cannot delete category: Category '" + existing.getCategoryName() + "' (ID: " + id + ") is currently assigned to one or more news articles.");
        }

        // [BƯỚC 3 - XÓA AN TOÀN]: Chỉ xóa khi không có bài viết nào liên kết
        categoryRepository.delete(existing);
    }
}

