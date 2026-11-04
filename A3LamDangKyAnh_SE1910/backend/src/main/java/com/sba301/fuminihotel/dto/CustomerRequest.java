package com.sba301.fuminihotel.dto;

import jakarta.validation.constraints.*;
import java.time.LocalDate;

public class CustomerRequest {

    @NotBlank(message = "Họ và tên không được để trống")
    @Size(max = 100, message = "Họ tên không vượt quá 100 ký tự")
    private String customerFullName;

    @Pattern(regexp = "^[0-9]{9,15}$", message = "Số điện thoại phải từ 9 đến 15 chữ số")
    private String telephone;

    @NotBlank(message = "Email không được để trống")
    @Email(message = "Email không đúng định dạng")
    private String emailAddress;

    private LocalDate customerBirthday;

    private Integer customerStatus = 1;

    // Mật khẩu: bắt buộc khi tạo mới, tùy chọn khi cập nhật
    private String password;

    public CustomerRequest() {
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
}

