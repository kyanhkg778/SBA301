package com.sba301.fuminihotel.dto;

import com.sba301.fuminihotel.entity.BookingReservation;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class BookingResponse {

    private Long bookingReservationId;
    private LocalDate bookingDate;
    private BigDecimal totalPrice;
    private Long customerId;
    private String customerFullName;
    private String customerEmail;
    private Integer bookingStatus;
    private List<BookingDetailResponse> details = new ArrayList<>();

    public BookingResponse() {
    }

    public BookingResponse(BookingReservation booking) {
        if (booking != null) {
            this.bookingReservationId = booking.getBookingReservationId();
            this.bookingDate = booking.getBookingDate();
            this.totalPrice = booking.getTotalPrice();
            if (booking.getCustomer() != null) {
                this.customerId = booking.getCustomer().getCustomerId();
                this.customerFullName = booking.getCustomer().getCustomerFullName();
                this.customerEmail = booking.getCustomer().getEmailAddress();
            }
            this.bookingStatus = booking.getBookingStatus();
            if (booking.getBookingDetails() != null) {
                this.details = booking.getBookingDetails().stream()
                        .map(BookingDetailResponse::new)
                        .collect(Collectors.toList());
            }
        }
    }

    public Long getBookingReservationId() {
        return bookingReservationId;
    }

    public void setBookingReservationId(Long bookingReservationId) {
        this.bookingReservationId = bookingReservationId;
    }

    public LocalDate getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDate bookingDate) {
        this.bookingDate = bookingDate;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
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

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public Integer getBookingStatus() {
        return bookingStatus;
    }

    public void setBookingStatus(Integer bookingStatus) {
        this.bookingStatus = bookingStatus;
    }

    public List<BookingDetailResponse> getDetails() {
        return details;
    }

    public void setDetails(List<BookingDetailResponse> details) {
        this.details = details;
    }
}

