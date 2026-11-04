package com.sba301.funews.service;

import com.sba301.funews.dto.LoginRequest;
import com.sba301.funews.dto.LoginResponse;
import com.sba301.funews.entity.SystemAccount;
import com.sba301.funews.repository.SystemAccountRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

    private final SystemAccountRepository accountRepository;

    public AuthService(SystemAccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    // =========================================================================
    // [LUỒNG 2 - DÒNG CODE CHÍNH]: XÁC THỰC THÀNH VIÊN VÀ PHÂN QUYỀN (Authentication)
    // Đặc tả PDF: "Member (Staff) authentication by Email and Password."
    // Role 1 = Admin, Role 2 = Staff
    // =========================================================================
    public LoginResponse login(LoginRequest request) {
        // [BƯỚC 1]: Tìm kiếm tài khoản theo Email (không phân biệt hoa thường)
        SystemAccount account = accountRepository.findByAccountEmailIgnoreCase(request.getEmail().trim())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password"));

        // [BƯỚC 2]: So khớp mật khẩu đăng nhập
        if (!account.getAccountPassword().equals(request.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        }

        // [BƯỚC 3]: Trả về DTO thông tin người dùng và quyền hạn AccountRole (Admin=1, Staff=2)
        return new LoginResponse(
                account.getAccountId(),
                account.getAccountName(),
                account.getAccountEmail(),
                account.getAccountRole(),
                "Login successful"
        );
    }
}

