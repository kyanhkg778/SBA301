package com.sba301.fuminihotel.repository;

import com.sba301.fuminihotel.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository thao tác với bảng Customer trong CSDL SQL Server.
 */
@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    // Tìm kiếm khách hàng theo địa chỉ Email (phục vụ đăng nhập và kiểm tra trùng lặp)
    Optional<Customer> findByEmailAddress(String emailAddress);

    // Kiểm tra xem Email đã tồn tại trong hệ thống hay chưa
    boolean existsByEmailAddress(String emailAddress);

    // Tìm kiếm khách hàng theo từ khóa (tên, email hoặc số điện thoại)
    @Query("SELECT c FROM Customer c WHERE " +
           "(:query IS NULL OR LOWER(c.customerFullName) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "OR LOWER(c.emailAddress) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "OR LOWER(c.telephone) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<Customer> searchCustomers(@Param("query") String query);
}

