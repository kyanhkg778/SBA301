package com.sba301.funews.repository;

import com.sba301.funews.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Short> {
    List<Category> findByCategoryNameContainingIgnoreCase(String name);
    List<Category> findByIsActiveTrue();
    boolean existsByCategoryNameIgnoreCase(String name);
}

