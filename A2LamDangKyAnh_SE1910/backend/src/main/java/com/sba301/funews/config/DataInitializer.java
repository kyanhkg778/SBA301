package com.sba301.funews.config;

import com.sba301.funews.entity.Category;
import com.sba301.funews.entity.NewsArticle;
import com.sba301.funews.entity.SystemAccount;
import com.sba301.funews.entity.Tag;
import com.sba301.funews.repository.CategoryRepository;
import com.sba301.funews.repository.NewsArticleRepository;
import com.sba301.funews.repository.SystemAccountRepository;
import com.sba301.funews.repository.TagRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Configuration
public class DataInitializer implements CommandLineRunner {

    private final SystemAccountRepository accountRepository;
    private final CategoryRepository categoryRepository;
    private final TagRepository tagRepository;
    private final NewsArticleRepository newsArticleRepository;

    public DataInitializer(
            SystemAccountRepository accountRepository,
            CategoryRepository categoryRepository,
            TagRepository tagRepository,
            NewsArticleRepository newsArticleRepository) {
        this.accountRepository = accountRepository;
        this.categoryRepository = categoryRepository;
        this.tagRepository = tagRepository;
        this.newsArticleRepository = newsArticleRepository;
    }

    @Override
    public void run(String... args) {
        if (accountRepository.count() == 0) {
            // Seed Accounts: Admin (role = 1), Staff (role = 2)
            SystemAccount admin = accountRepository.save(new SystemAccount("System Administrator", "admin@funews.com", 1, "admin123"));
            SystemAccount staff1 = accountRepository.save(new SystemAccount("John Doe Staff", "staff@funews.com", 2, "staff123"));
            SystemAccount staff2 = accountRepository.save(new SystemAccount("Alice Smith Reporter", "reporter@funews.com", 2, "reporter123"));
            SystemAccount staff3 = accountRepository.save(new SystemAccount("Bob Newbie", "newbie@funews.com", 2, "newbie123"));

            // Seed Categories
            Category catTech = categoryRepository.save(new Category("Technology", "Tech news, AI, Software engineering updates", null, true));
            Category catCampus = categoryRepository.save(new Category("Campus Life", "Student activities, clubs and university events", null, true));
            Category catCareer = categoryRepository.save(new Category("Career & Internship", "Job fairs, company visits and OJT opportunities", null, true));
            Category catUnused = categoryRepository.save(new Category("Unused Category", "Demo category for testing deletion rule", null, true));

            // Seed Tags
            Tag tagAi = tagRepository.save(new Tag("AI & Machine Learning", "Artificial intelligence topics"));
            Tag tagFullstack = tagRepository.save(new Tag("Fullstack", "Spring Boot and React development"));
            Tag tagCampus = tagRepository.save(new Tag("Campus Life", "Campus events and clubs"));
            Tag tagCareer = tagRepository.save(new Tag("Career", "Internships and job tips"));

            // Seed News Articles
            NewsArticle article1 = new NewsArticle();
            article1.setNewsArticleId("NA0001");
            article1.setNewsTitle("FPT University Students Showcase Cutting-Edge AI Projects");
            article1.setHeadline("Outstanding innovation exhibited at the annual technology expo");
            article1.setCreatedDate(LocalDateTime.now().minusDays(3));
            article1.setNewsContent("Students from the Software Engineering program presented groundbreaking AI projects today. The exhibition featured automated computer vision solutions, intelligent campus agents, and real-time natural language processing tools.");
            article1.setNewsSource("FUNews Tech Desk");
            article1.setCategory(catTech);
            article1.setNewsStatus(true);
            article1.setCreatedBy(staff1);
            article1.setTags(new HashSet<>(List.of(tagAi, tagFullstack)));
            newsArticleRepository.save(article1);

            NewsArticle article2 = new NewsArticle();
            article2.setNewsArticleId("NA0002");
            article2.setNewsTitle("Fall Semester 2026 Club Fair Attracts Thousands of Students");
            article2.setHeadline("Energetic atmosphere and record registration numbers recorded");
            article2.setCreatedDate(LocalDateTime.now().minusDays(1));
            article2.setNewsContent("Over 40 academic and extracurricular clubs welcomed new members during the Fall 2026 Club Fair. Music performances, robotics demonstrations, and sports challenges created an unforgettable opening week.");
            article2.setNewsSource("Campus Bulletin");
            article2.setCategory(catCampus);
            article2.setNewsStatus(true);
            article2.setCreatedBy(staff1);
            article2.setTags(new HashSet<>(List.of(tagCampus)));
            newsArticleRepository.save(article2);

            NewsArticle article3 = new NewsArticle();
            article3.setNewsArticleId("NA0003");
            article3.setNewsTitle("[Draft] Upcoming Tech Career Week Schedule Preview");
            article3.setHeadline("Leading multinational tech corporations confirm participation");
            article3.setCreatedDate(LocalDateTime.now().minusHours(5));
            article3.setNewsContent("This draft outlines the anticipated schedule and seminar topics for the upcoming Career Week. Over 30 IT enterprises will host recruitment booths.");
            article3.setNewsSource("Career Center");
            article3.setCategory(catCareer);
            article3.setNewsStatus(false); // Inactive draft
            article3.setCreatedBy(staff2);
            article3.setTags(new HashSet<>(List.of(tagCareer)));
            newsArticleRepository.save(article3);
        }
    }
}

