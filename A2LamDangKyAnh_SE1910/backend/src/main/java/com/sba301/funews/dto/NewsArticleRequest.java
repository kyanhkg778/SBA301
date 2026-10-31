package com.sba301.funews.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public class NewsArticleRequest {
    private String newsArticleId;

    @NotBlank(message = "News title is required")
    @Size(max = 400, message = "News title cannot exceed 400 characters")
    private String newsTitle;

    @Size(max = 150, message = "Headline cannot exceed 150 characters")
    private String headline;

    private String newsContent;

    @Size(max = 400, message = "News source cannot exceed 400 characters")
    private String newsSource;

    @NotNull(message = "CategoryID is required")
    private Short categoryId;

    private Boolean newsStatus = true;

    private Short createdById;
    private Short updatedById;

    private List<Integer> tagIds;

    public NewsArticleRequest() {}

    public String getNewsArticleId() {
        return newsArticleId;
    }

    public void setNewsArticleId(String newsArticleId) {
        this.newsArticleId = newsArticleId;
    }

    public String getNewsTitle() {
        return newsTitle;
    }

    public void setNewsTitle(String newsTitle) {
        this.newsTitle = newsTitle;
    }

    public String getHeadline() {
        return headline;
    }

    public void setHeadline(String headline) {
        this.headline = headline;
    }

    public String getNewsContent() {
        return newsContent;
    }

    public void setNewsContent(String newsContent) {
        this.newsContent = newsContent;
    }

    public String getNewsSource() {
        return newsSource;
    }

    public void setNewsSource(String newsSource) {
        this.newsSource = newsSource;
    }

    public Short getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Short categoryId) {
        this.categoryId = categoryId;
    }

    public Boolean getNewsStatus() {
        return newsStatus;
    }

    public void setNewsStatus(Boolean newsStatus) {
        this.newsStatus = newsStatus;
    }

    public Short getCreatedById() {
        return createdById;
    }

    public void setCreatedById(Short createdById) {
        this.createdById = createdById;
    }

    public Short getUpdatedById() {
        return updatedById;
    }

    public void setUpdatedById(Short updatedById) {
        this.updatedById = updatedById;
    }

    public List<Integer> getTagIds() {
        return tagIds;
    }

    public void setTagIds(List<Integer> tagIds) {
        this.tagIds = tagIds;
    }
}
