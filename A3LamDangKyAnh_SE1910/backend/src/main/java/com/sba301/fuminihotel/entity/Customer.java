package com.sba301.fuminihotel.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Customer")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CustomerID")
    private Long customerId;

    @Column(name = "CustomerFullName", length = 100, nullable = false)
    private String customerFullName;

    @Column(name = "Telephone", length = 20)
    private String telephone;

    // Email duy nhất dùng để đăng nhập
    @Column(name = "EmailAddress", length = 100, nullable = false, unique = true)
    private String emailAddress;

    @Column(name = "CustomerBirthday")
    private LocalDate customerBirthday;

    // 1: Active, 0: Inactive
    @Column(name = "CustomerStatus", nullable = false)
    private Integer customerStatus = 1;

    // Ẩn mật khẩu khi serialize JSON trả về client
    @JsonIgnore
    @Column(name = "Password", length = 150, nullable = false)
    private String password;

    @JsonIgnore
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<BookingReservation> bookingReservations = new ArrayList<>();

    public Customer() {
    }

    public Customer(String customerFullName, String telephone, String emailAddress,
                    LocalDate customerBirthday, Integer customerStatus, String password) {
        this.customerFullName = customerFullName;
        this.telephone = telephone;
        this.emailAddress = emailAddress;
        this.customerBirthday = customerBirthday;
        this.customerStatus = customerStatus;
        this.password = password;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public String getCustomerFullName() {
        return customerFullName;
    }

    public void setCustomerFullName(String customerFullName) {
        this.customerFullName = customerFullName;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public LocalDate getCustomerBirthday() {
        return customerBirthday;
    }

    public void setCustomerBirthday(LocalDate customerBirthday) {
        this.customerBirthday = customerBirthday;
    }

    public Integer getCustomerStatus() {
        return customerStatus;
    }

    public void setCustomerStatus(Integer customerStatus) {
        this.customerStatus = customerStatus;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<BookingReservation> getBookingReservations() {
        return bookingReservations;
    }

    public void setBookingReservations(List<BookingReservation> bookingReservations) {
        this.bookingReservations = bookingReservations;
    }
}
