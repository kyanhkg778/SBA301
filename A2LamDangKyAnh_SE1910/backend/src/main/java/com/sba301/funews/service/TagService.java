package com.sba301.funews.service;

import com.sba301.funews.entity.Tag;
import com.sba301.funews.repository.TagRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class TagService {

    private final TagRepository tagRepository;

    public TagService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    public List<Tag> getAllTags(String search) {
        if (search != null && !search.trim().isEmpty()) {
            return tagRepository.findByTagNameContainingIgnoreCase(search.trim());
        }
        return tagRepository.findAll();
    }

    public Tag getTagById(Integer id) {
        return tagRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tag with ID " + id + " not found"));
    }

    @Transactional
    public Tag createTag(Tag tag) {
        String name = tag.getTagName().trim();
        tagRepository.findByTagNameIgnoreCase(name).ifPresent(t -> {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tag '" + name + "' already exists.");
        });
        tag.setTagName(name);
        return tagRepository.save(tag);
    }
}

