package com.sba301.funews.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "Category")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CategoryID")
    private Short categoryId;

    @NotBlank(message = "Category name is required")
    @Size(max = 100, message = "Category name cannot exceed 100 characters")
    @Column(name = "CategoryName", nullable = false, length = 100)
    private String categoryName;

    @Column(name = "CategoryDesciption", length = 500)
    private String categoryDesciption;

    @Column(name = "ParentCategoryID")
    private Short parentCategoryId;

    @Column(name = "IsActive")
    private Boolean isActive = true;

    public Category() {}

    public Category(String categoryName, String categoryDesciption, Short parentCategoryId, Boolean isActive) {
        this.categoryName = categoryName;
        this.categoryDesciption = categoryDesciption;
        this.parentCategoryId = parentCategoryId;
        this.isActive = isActive != null ? isActive : true;
    }

    public Short getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Short categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getCategoryDesciption() {
        return categoryDesciption;
    }

    public void setCategoryDesciption(String categoryDesciption) {
        this.categoryDesciption = categoryDesciption;
    }

    // Alias helper for convenience
    public String getCategoryDescription() {
        return categoryDesciption;
    }

    public void setCategoryDescription(String description) {
        this.categoryDesciption = description;
    }

    public Short getParentCategoryId() {
        return parentCategoryId;
    }

    public void setParentCategoryId(Short parentCategoryId) {
        this.parentCategoryId = parentCategoryId;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
}

