package com.sba301.fuminihotel.security;

import com.sba301.fuminihotel.entity.Customer;
import com.sba301.fuminihotel.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Value("${hotel.staff.email}")
    private String staffEmail;

    @Value("${hotel.staff.password}")
    private String staffPassword;

    @Value("${hotel.staff.name}")
    private String staffName;

    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;

    public CustomUserDetailsService(CustomerRepository customerRepository, @Lazy PasswordEncoder passwordEncoder) {
        this.customerRepository = customerRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // 1. Kiểm tra tài khoản Staff lấy từ application.properties theo đề bài
        if (staffEmail.equalsIgnoreCase(email)) {
            return UserPrincipal.createStaff(staffEmail, passwordEncoder.encode(staffPassword), staffName);
        }

        // 2. Tìm kiếm Customer trong CSDL
        Customer customer = customerRepository.findByEmailAddress(email)
                .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy tài khoản: " + email));

        if (customer.getCustomerStatus() != null && customer.getCustomerStatus() == 0) {
            throw new UsernameNotFoundException("Tài khoản đang bị khóa.");
        }

        return UserPrincipal.createCustomer(customer);
    }
}
