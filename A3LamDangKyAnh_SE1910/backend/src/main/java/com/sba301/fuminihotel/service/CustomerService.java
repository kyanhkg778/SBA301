package com.sba301.fuminihotel.service;

import com.sba301.fuminihotel.dto.CustomerRequest;
import com.sba301.fuminihotel.dto.CustomerResponse;
import com.sba301.fuminihotel.dto.ProfileUpdateRequest;
import com.sba301.fuminihotel.entity.Customer;
import com.sba301.fuminihotel.exception.BadRequestException;
import com.sba301.fuminihotel.exception.ResourceNotFoundException;
import com.sba301.fuminihotel.repository.BookingReservationRepository;
import com.sba301.fuminihotel.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomerService {

    @Value("${hotel.staff.email}")
    private String staffEmail;

    private final CustomerRepository customerRepository;
    private final BookingReservationRepository bookingReservationRepository;
    private final PasswordEncoder passwordEncoder;

    public CustomerService(CustomerRepository customerRepository,
                           BookingReservationRepository bookingReservationRepository,
                           PasswordEncoder passwordEncoder) {
        this.customerRepository = customerRepository;
        this.bookingReservationRepository = bookingReservationRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<CustomerResponse> getAllCustomers() {
        return customerRepository.findAll().stream()
                .map(CustomerResponse::new)
                .collect(Collectors.toList());
    }

    public List<CustomerResponse> searchCustomers(String query) {
        return customerRepository.searchCustomers(query).stream()
                .map(CustomerResponse::new)
                .collect(Collectors.toList());
    }

    public CustomerResponse getCustomerById(Long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy khách hàng với mã: " + id));
        return new CustomerResponse(customer);
    }

    @Transactional
    public CustomerResponse createCustomer(CustomerRequest request) {
        if (staffEmail.equalsIgnoreCase(request.getEmailAddress())) {
            throw new BadRequestException("Email này dành riêng cho tài khoản Staff.");
        }

        if (customerRepository.existsByEmailAddress(request.getEmailAddress())) {
            throw new BadRequestException("Email '" + request.getEmailAddress() + "' đã tồn tại.");
        }

        Customer customer = new Customer();
        customer.setCustomerFullName(request.getCustomerFullName());
        customer.setTelephone(request.getTelephone());
        customer.setEmailAddress(request.getEmailAddress().trim().toLowerCase());
        customer.setCustomerBirthday(request.getCustomerBirthday());
        customer.setCustomerStatus(request.getCustomerStatus() != null ? request.getCustomerStatus() : 1);

        String rawPassword = StringUtils.hasText(request.getPassword()) ? request.getPassword() : "123456";
        customer.setPassword(passwordEncoder.encode(rawPassword));

        return new CustomerResponse(customerRepository.save(customer));
    }

    @Transactional
    public CustomerResponse updateCustomer(Long id, CustomerRequest request) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy khách hàng với mã: " + id));

        if (!customer.getEmailAddress().equalsIgnoreCase(request.getEmailAddress())) {
            if (staffEmail.equalsIgnoreCase(request.getEmailAddress()) ||
                customerRepository.existsByEmailAddress(request.getEmailAddress())) {
                throw new BadRequestException("Email '" + request.getEmailAddress() + "' đã tồn tại.");
            }
            customer.setEmailAddress(request.getEmailAddress().trim().toLowerCase());
        }

        customer.setCustomerFullName(request.getCustomerFullName());
        customer.setTelephone(request.getTelephone());
        customer.setCustomerBirthday(request.getCustomerBirthday());
        if (request.getCustomerStatus() != null) {
            customer.setCustomerStatus(request.getCustomerStatus());
        }

        if (StringUtils.hasText(request.getPassword())) {
            customer.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        return new CustomerResponse(customerRepository.save(customer));
    }

    // Xóa khách hàng: có đơn đặt thì chuyển status=0, chưa có thì xóa hẳn
    @Transactional
    public String deleteCustomer(Long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy khách hàng với mã: " + id));

        boolean hasBookings = !bookingReservationRepository.findByCustomer_CustomerIdOrderByBookingDateDesc(id).isEmpty();

        if (hasBookings) {
            customer.setCustomerStatus(0);
            customerRepository.save(customer);
            return "Khách hàng đã có lịch sử đặt phòng, chuyển trạng thái sang Inactive.";
        } else {
            customerRepository.delete(customer);
            return "Đã xóa vĩnh viễn khách hàng.";
        }
    }

    // Khách hàng tự cập nhật profile cá nhân
    @Transactional
    public CustomerResponse updateProfile(Long customerId, ProfileUpdateRequest request) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy khách hàng: " + customerId));

        customer.setCustomerFullName(request.getCustomerFullName());
        customer.setTelephone(request.getTelephone());
        customer.setCustomerBirthday(request.getCustomerBirthday());

        if (StringUtils.hasText(request.getNewPassword())) {
            if (request.getNewPassword().length() < 6) {
                throw new BadRequestException("Mật khẩu mới phải tối thiểu 6 ký tự.");
            }
            customer.setPassword(passwordEncoder.encode(request.getNewPassword()));
        }

        return new CustomerResponse(customerRepository.save(customer));
    }
}
