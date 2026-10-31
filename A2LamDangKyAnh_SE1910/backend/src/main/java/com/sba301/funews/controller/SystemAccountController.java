package com.sba301.funews.controller;

import com.sba301.funews.dto.ProfileUpdateRequest;
import com.sba301.funews.entity.SystemAccount;
import com.sba301.funews.service.SystemAccountService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
public class SystemAccountController {

    private final SystemAccountService accountService;

    public SystemAccountController(SystemAccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping
    public ResponseEntity<List<SystemAccount>> getAllAccounts(@RequestParam(required = false) String query) {
        return ResponseEntity.ok(accountService.getAllAccounts(query));
    }

    @GetMapping("/{id}")
    public ResponseEntity<SystemAccount> getAccountById(@PathVariable Short id) {
        return ResponseEntity.ok(accountService.getAccountById(id));
    }

    @PostMapping
    public ResponseEntity<SystemAccount> createAccount(@Valid @RequestBody SystemAccount account) {
        return ResponseEntity.status(HttpStatus.CREATED).body(accountService.createAccount(account));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SystemAccount> updateAccount(@PathVariable Short id, @Valid @RequestBody SystemAccount account) {
        return ResponseEntity.ok(accountService.updateAccount(id, account));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAccount(@PathVariable Short id) {
        accountService.deleteAccount(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/profile")
    public ResponseEntity<SystemAccount> updateProfile(@PathVariable Short id, @Valid @RequestBody ProfileUpdateRequest req) {
        return ResponseEntity.ok(accountService.updateProfile(id, req));
    }
}
