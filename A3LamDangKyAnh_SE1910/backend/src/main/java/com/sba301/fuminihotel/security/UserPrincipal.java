package com.sba301.fuminihotel.security;

import com.sba301.fuminihotel.entity.Customer;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

public class UserPrincipal implements UserDetails {

    private final Long id;
    private final String email;
    private final String fullName;
    private final String password;
    private final boolean isStaff;
    private final Collection<? extends GrantedAuthority> authorities;

    public UserPrincipal(Long id, String email, String fullName, String password, boolean isStaff,
                         Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.email = email;
        this.fullName = fullName;
        this.password = password;
        this.isStaff = isStaff;
        this.authorities = authorities;
    }

    // Khởi tạo UserPrincipal cho Staff (ROLE_STAFF)
    public static UserPrincipal createStaff(String email, String password, String name) {
        List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_STAFF"));
        return new UserPrincipal(0L, email, name, password, true, authorities);
    }

    // Khởi tạo UserPrincipal cho Customer (ROLE_CUSTOMER)
    public static UserPrincipal createCustomer(Customer customer) {
        List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_CUSTOMER"));
        return new UserPrincipal(
                customer.getCustomerId(),
                customer.getEmailAddress(),
                customer.getCustomerFullName(),
                customer.getPassword(),
                false,
                authorities
        );
    }

    public Long getId() {
        return id;
    }

    public String getFullName() {
        return fullName;
    }

    public boolean isStaff() {
        return isStaff;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
