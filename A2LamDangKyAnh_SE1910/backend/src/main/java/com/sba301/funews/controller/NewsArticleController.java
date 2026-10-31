package com.sba301.funews.controller;

import com.sba301.funews.dto.NewsArticleRequest;
import com.sba301.funews.entity.NewsArticle;
import com.sba301.funews.service.NewsArticleService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/news")
public class NewsArticleController {

    private final NewsArticleService newsArticleService;

    public NewsArticleController(NewsArticleService newsArticleService) {
        this.newsArticleService = newsArticleService;
    }

    @GetMapping
    public ResponseEntity<List<NewsArticle>> getAllNews(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) Short categoryId,
            @RequestParam(required = false) Boolean status,
            @RequestParam(required = false) Short createdById) {
        return ResponseEntity.ok(newsArticleService.getAllNews(query, categoryId, status, createdById));
    }

    // Public view: active news only, no authentication required
    @GetMapping("/public")
    public ResponseEntity<List<NewsArticle>> getPublicActiveNews() {
        return ResponseEntity.ok(newsArticleService.getPublicActiveNews());
    }

    // Staff news history
    @GetMapping("/history/{staffId}")
    public ResponseEntity<List<NewsArticle>> getStaffNewsHistory(@PathVariable Short staffId) {
        return ResponseEntity.ok(newsArticleService.getStaffNewsHistory(staffId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<NewsArticle> getNewsById(@PathVariable String id) {
        return ResponseEntity.ok(newsArticleService.getNewsById(id));
    }

    @PostMapping
    public ResponseEntity<NewsArticle> createNews(@Valid @RequestBody NewsArticleRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(newsArticleService.createNews(req));
    }

    @PutMapping("/{id}")
    public ResponseEntity<NewsArticle> updateNews(@PathVariable String id, @Valid @RequestBody NewsArticleRequest req) {
        return ResponseEntity.ok(newsArticleService.updateNews(id, req));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNews(@PathVariable String id) {
        newsArticleService.deleteNews(id);
        return ResponseEntity.noContent().build();
    }
}
