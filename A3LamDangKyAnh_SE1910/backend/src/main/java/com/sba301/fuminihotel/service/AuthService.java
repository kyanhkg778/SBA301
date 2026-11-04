package com.sba301.fuminihotel.service;

import com.sba301.fuminihotel.dto.AuthRequest;
import com.sba301.fuminihotel.dto.AuthResponse;
import com.sba301.fuminihotel.dto.RegisterRequest;
import com.sba301.fuminihotel.entity.Customer;
import com.sba301.fuminihotel.exception.BadRequestException;
import com.sba301.fuminihotel.repository.CustomerRepository;
import com.sba301.fuminihotel.security.JwtTokenProvider;
import com.sba301.fuminihotel.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    @Value("${hotel.staff.email}")
    private String staffEmail;

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(AuthenticationManager authenticationManager,
                       JwtTokenProvider tokenProvider,
                       CustomerRepository customerRepository,
                       PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
        this.customerRepository = customerRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Đăng nhập: xác thực qua CustomUserDetailsService rồi sinh JWT
    public AuthResponse login(AuthRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        String jwt = tokenProvider.generateToken(authentication);

        String primaryRole = userPrincipal.getAuthorities().stream()
                .findFirst()
                .map(GrantedAuthority::getAuthority)
                .orElse("ROLE_CUSTOMER");

        return new AuthResponse(
                jwt,
                userPrincipal.getId(),
                userPrincipal.getUsername(),
                userPrincipal.getFullName(),
                primaryRole,
                userPrincipal.isStaff()
        );
    }

    // Đăng ký khách hàng mới: mã hóa mật khẩu bằng BCrypt
    @Transactional
    public Customer register(RegisterRequest request) {
        if (staffEmail.equalsIgnoreCase(request.getEmailAddress())) {
            throw new BadRequestException("Email này dành riêng cho quản trị viên.");
        }

        if (customerRepository.existsByEmailAddress(request.getEmailAddress())) {
            throw new BadRequestException("Email '" + request.getEmailAddress() + "' đã được sử dụng.");
        }

        Customer newCustomer = new Customer();
        newCustomer.setCustomerFullName(request.getCustomerFullName());
        newCustomer.setTelephone(request.getTelephone());
        newCustomer.setEmailAddress(request.getEmailAddress().trim().toLowerCase());
        newCustomer.setCustomerBirthday(request.getCustomerBirthday());
        newCustomer.setCustomerStatus(1);
        newCustomer.setPassword(passwordEncoder.encode(request.getPassword()));

        return customerRepository.save(newCustomer);
    }
}
