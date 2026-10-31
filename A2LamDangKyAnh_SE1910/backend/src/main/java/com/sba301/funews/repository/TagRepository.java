package com.sba301.funews.repository;

import com.sba301.funews.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TagRepository extends JpaRepository<Tag, Integer> {
    List<Tag> findByTagNameContainingIgnoreCase(String name);
    Optional<Tag> findByTagNameIgnoreCase(String name);
}

