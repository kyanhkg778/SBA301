package com.sba301.fuminihotel.dto;

import com.sba301.fuminihotel.entity.Customer;
import java.time.LocalDate;

public class CustomerResponse {

    private Long customerId;
    private String customerFullName;
    private String telephone;
    private String emailAddress;
    private LocalDate customerBirthday;
    private Integer customerStatus;

    public CustomerResponse() {
    }

    public CustomerResponse(Customer customer) {
        if (customer != null) {
            this.customerId = customer.getCustomerId();
            this.customerFullName = customer.getCustomerFullName();
            this.telephone = customer.getTelephone();
            this.emailAddress = customer.getEmailAddress();
            this.customerBirthday = customer.getCustomerBirthday();
            this.customerStatus = customer.getCustomerStatus();
        }
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
}

