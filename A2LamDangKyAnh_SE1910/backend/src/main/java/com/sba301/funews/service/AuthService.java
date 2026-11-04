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

    // [Luồng 2]: Đăng nhập xác thực email, mật khẩu và trả về role (1=Admin, 2=Staff)
    public LoginResponse login(LoginRequest request) {
        SystemAccount account = accountRepository.findByAccountEmailIgnoreCase(request.getEmail().trim())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password"));

        if (!account.getAccountPassword().equals(request.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        }

        return new LoginResponse(
                account.getAccountId(),
                account.getAccountName(),
                account.getAccountEmail(),
                account.getAccountRole(),
                "Login successful"
        );
    }
}

