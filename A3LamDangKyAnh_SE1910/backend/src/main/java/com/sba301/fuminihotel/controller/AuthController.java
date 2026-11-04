package com.sba301.fuminihotel.controller;

import com.sba301.fuminihotel.dto.AuthRequest;
import com.sba301.fuminihotel.dto.AuthResponse;
import com.sba301.fuminihotel.dto.RegisterRequest;
import com.sba301.fuminihotel.entity.Customer;
import com.sba301.fuminihotel.security.UserPrincipal;
import com.sba301.fuminihotel.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // Đăng nhập trả về JWT (Staff hoặc Customer)
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    // Đăng ký tài khoản Customer
    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@Valid @RequestBody RegisterRequest request) {
        Customer customer = authService.register(request);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Đăng ký thành công.");
        response.put("customerId", customer.getCustomerId());
        response.put("email", customer.getEmailAddress());

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Lấy thông tin user hiện tại
    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> getCurrentUser(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        if (userPrincipal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Map<String, Object> profile = new HashMap<>();
        profile.put("id", userPrincipal.getId());
        profile.put("email", userPrincipal.getUsername());
        profile.put("fullName", userPrincipal.getFullName());
        profile.put("authorities", userPrincipal.getAuthorities());
        profile.put("isStaff", userPrincipal.isStaff());

        return ResponseEntity.ok(profile);
    }
}
