package com.sba301.funews.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "SystemAccount")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class SystemAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "AccountID")
    private Short accountId;

    @NotBlank(message = "Account name is required")
    @Size(max = 100, message = "Account name cannot exceed 100 characters")
    @Column(name = "AccountName", nullable = false, length = 100)
    private String accountName;

    @NotBlank(message = "Account email is required")
    @Email(message = "Account email must be a valid email format")
    @Size(max = 70, message = "Account email cannot exceed 70 characters")
    @Column(name = "AccountEmail", nullable = false, unique = true, length = 70)
    private String accountEmail;

    @NotNull(message = "Account role is required (1: Admin, 2: Staff)")
    @Column(name = "AccountRole", nullable = false)
    private Integer accountRole;

    @NotBlank(message = "Account password is required")
    @Size(max = 70, message = "Password cannot exceed 70 characters")
    @Column(name = "AccountPassword", nullable = false, length = 70)
    private String accountPassword;

    public SystemAccount() {}

    public SystemAccount(String accountName, String accountEmail, Integer accountRole, String accountPassword) {
        this.accountName = accountName;
        this.accountEmail = accountEmail;
        this.accountRole = accountRole;
        this.accountPassword = accountPassword;
    }

    public Short getAccountId() {
        return accountId;
    }

    public void setAccountId(Short accountId) {
        this.accountId = accountId;
    }

    public String getAccountName() {
        return accountName;
    }

    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }

    public String getAccountEmail() {
        return accountEmail;
    }

    public void setAccountEmail(String accountEmail) {
        this.accountEmail = accountEmail;
    }

    public Integer getAccountRole() {
        return accountRole;
    }

    public void setAccountRole(Integer accountRole) {
        this.accountRole = accountRole;
    }

    public String getAccountPassword() {
        return accountPassword;
    }

    public void setAccountPassword(String accountPassword) {
        this.accountPassword = accountPassword;
    }
}

