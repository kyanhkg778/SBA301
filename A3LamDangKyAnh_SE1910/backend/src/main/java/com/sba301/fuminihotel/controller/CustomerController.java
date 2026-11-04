package com.sba301.fuminihotel.controller;

import com.sba301.fuminihotel.dto.CustomerRequest;
import com.sba301.fuminihotel.dto.CustomerResponse;
import com.sba301.fuminihotel.dto.ProfileUpdateRequest;
import com.sba301.fuminihotel.security.UserPrincipal;
import com.sba301.fuminihotel.service.CustomerService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    // Staff: Danh sách / tìm kiếm khách hàng
    @GetMapping("/api/staff/customers")
    @PreAuthorize("hasRole('STAFF')")
    public ResponseEntity<List<CustomerResponse>> getCustomers(@RequestParam(required = false) String query) {
        if (query != null && !query.trim().isEmpty()) {
            return ResponseEntity.ok(customerService.searchCustomers(query.trim()));
        }
        return ResponseEntity.ok(customerService.getAllCustomers());
    }

    // Staff: Xem chi tiết 1 khách hàng
    @GetMapping("/api/staff/customers/{id}")
    @PreAuthorize("hasRole('STAFF')")
    public ResponseEntity<CustomerResponse> getCustomerById(@PathVariable Long id) {
        return ResponseEntity.ok(customerService.getCustomerById(id));
    }

    // Staff: Tạo khách hàng mới
    @PostMapping("/api/staff/customers")
    @PreAuthorize("hasRole('STAFF')")
    public ResponseEntity<CustomerResponse> createCustomer(@Valid @RequestBody CustomerRequest request) {
        return new ResponseEntity<>(customerService.createCustomer(request), HttpStatus.CREATED);
    }

    // Staff: Cập nhật thông tin khách hàng
    @PutMapping("/api/staff/customers/{id}")
    @PreAuthorize("hasRole('STAFF')")
    public ResponseEntity<CustomerResponse> updateCustomer(
            @PathVariable Long id,
            @Valid @RequestBody CustomerRequest request) {
        return ResponseEntity.ok(customerService.updateCustomer(id, request));
    }

    // Staff: Xóa khách hàng
    @DeleteMapping("/api/staff/customers/{id}")
    @PreAuthorize("hasRole('STAFF')")
    public ResponseEntity<Map<String, String>> deleteCustomer(@PathVariable Long id) {
        Map<String, String> response = new HashMap<>();
        response.put("message", customerService.deleteCustomer(id));
        return ResponseEntity.ok(response);
    }

    // Customer: Xem profile cá nhân
    @GetMapping("/api/customer/profile")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'STAFF')")
    public ResponseEntity<CustomerResponse> getMyProfile(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        return ResponseEntity.ok(customerService.getCustomerById(userPrincipal.getId()));
    }

    // Customer: Cập nhật profile cá nhân
    @PutMapping("/api/customer/profile")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'STAFF')")
    public ResponseEntity<CustomerResponse> updateMyProfile(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody ProfileUpdateRequest request) {
        return ResponseEntity.ok(customerService.updateProfile(userPrincipal.getId(), request));
    }
}
