package com.sba301.funews.repository;

import com.sba301.funews.entity.NewsArticle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewsArticleRepository extends JpaRepository<NewsArticle, String> {

    // Constraint check for account deletion: Has this account created any news article?
    boolean existsByCreatedBy_AccountId(Short accountId);

    // Constraint check for category deletion: Is this category used in any news article?
    boolean existsByCategory_CategoryId(Short categoryId);

    // Public active news (no auth needed)
    List<NewsArticle> findByNewsStatusTrueOrderByCreatedDateDesc();

    // Staff news history
    List<NewsArticle> findByCreatedBy_AccountIdOrderByCreatedDateDesc(Short accountId);

    // Search and filter
    @Query("SELECT n FROM NewsArticle n WHERE " +
           "(:status IS NULL OR n.newsStatus = :status) AND " +
           "(:categoryId IS NULL OR n.category.categoryId = :categoryId) AND " +
           "(:createdById IS NULL OR n.createdBy.accountId = :createdById) AND " +
           "(:query IS NULL OR :query = '' OR " +
           " LOWER(n.newsTitle) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           " LOWER(n.headline) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           " LOWER(n.newsSource) LIKE LOWER(CONCAT('%', :query, '%'))) " +
           "ORDER BY n.createdDate DESC")
    List<NewsArticle> searchNews(
            @Param("query") String query,
            @Param("categoryId") Short categoryId,
            @Param("status") Boolean status,
            @Param("createdById") Short createdById
    );
}

