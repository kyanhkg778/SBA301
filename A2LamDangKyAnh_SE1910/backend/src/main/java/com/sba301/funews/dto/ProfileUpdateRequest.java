package com.sba301.funews.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ProfileUpdateRequest {
    @NotBlank(message = "Account name is required")
    @Size(max = 100, message = "Name cannot exceed 100 characters")
    private String accountName;

    @Size(max = 70, message = "Password cannot exceed 70 characters")
    private String accountPassword;

    public ProfileUpdateRequest() {}

    public String getAccountName() {
        return accountName;
    }

    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }

    public String getAccountPassword() {
        return accountPassword;
    }

    public void setAccountPassword(String accountPassword) {
        this.accountPassword = accountPassword;
    }
}
