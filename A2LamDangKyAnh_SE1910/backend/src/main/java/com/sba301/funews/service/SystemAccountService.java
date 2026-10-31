package com.sba301.funews.service;

import com.sba301.funews.dto.ProfileUpdateRequest;
import com.sba301.funews.entity.SystemAccount;
import com.sba301.funews.repository.NewsArticleRepository;
import com.sba301.funews.repository.SystemAccountRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class SystemAccountService {

    private final SystemAccountRepository accountRepository;
    private final NewsArticleRepository newsArticleRepository;

    public SystemAccountService(SystemAccountRepository accountRepository, NewsArticleRepository newsArticleRepository) {
        this.accountRepository = accountRepository;
        this.newsArticleRepository = newsArticleRepository;
    }

    public List<SystemAccount> getAllAccounts(String query) {
        if (query != null && !query.trim().isEmpty()) {
            return accountRepository.searchAccounts(query.trim());
        }
        return accountRepository.findAll();
    }

    public SystemAccount getAccountById(Short id) {
        return accountRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Account with ID " + id + " not found"));
    }

    @Transactional
    public SystemAccount createAccount(SystemAccount account) {
        if (accountRepository.existsByAccountEmailIgnoreCase(account.getAccountEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email " + account.getAccountEmail() + " is already in use.");
        }
        if (account.getAccountRole() == null || (account.getAccountRole() != 1 && account.getAccountRole() != 2)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid role. Role must be 1 (Admin) or 2 (Staff).");
        }
        return accountRepository.save(account);
    }

    @Transactional
    public SystemAccount updateAccount(Short id, SystemAccount details) {
        SystemAccount existing = getAccountById(id);

        if (!existing.getAccountEmail().equalsIgnoreCase(details.getAccountEmail())) {
            if (accountRepository.existsByAccountEmailIgnoreCase(details.getAccountEmail())) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email " + details.getAccountEmail() + " is already taken.");
            }
            existing.setAccountEmail(details.getAccountEmail());
        }

        existing.setAccountName(details.getAccountName());
        if (details.getAccountRole() != null) {
            existing.setAccountRole(details.getAccountRole());
        }
        if (details.getAccountPassword() != null && !details.getAccountPassword().trim().isEmpty()) {
            existing.setAccountPassword(details.getAccountPassword());
        }

        return accountRepository.save(existing);
    }

    @Transactional
    public void deleteAccount(Short id) {
        SystemAccount existing = getAccountById(id);

        // PDF Business Rule:
        // "the delete action will delete an account in the case this account is not belong to any news articles (created),
        // if the account is already created any news article, cannot delete."
        if (newsArticleRepository.existsByCreatedBy_AccountId(id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Cannot delete account: Account '" + existing.getAccountName() + "' (ID: " + id + ") has already created news articles in the system.");
        }

        accountRepository.delete(existing);
    }

    @Transactional
    public SystemAccount updateProfile(Short id, ProfileUpdateRequest req) {
        SystemAccount existing = getAccountById(id);
        existing.setAccountName(req.getAccountName());
        if (req.getAccountPassword() != null && !req.getAccountPassword().trim().isEmpty()) {
            existing.setAccountPassword(req.getAccountPassword());
        }
        return accountRepository.save(existing);
    }
}
