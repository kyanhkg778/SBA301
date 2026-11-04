package com.sba301.fuminihotel.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import java.time.LocalDate;
import java.util.List;

public class BookingCreateRequest {

    // CustomerId: Tùy chọn nếu khách hàng tự đăng nhập và đặt phòng; bắt buộc nếu Staff đặt hộ
    private Long customerId;

    private LocalDate bookingDate = LocalDate.now();

    private Integer bookingStatus = 1; // 1 = Confirmed mặc định

    @NotEmpty(message = "Danh sách phòng đặt không được để trống")
    @Valid
    private List<BookingItemRequest> items;

    public BookingCreateRequest() {
    }

    public BookingCreateRequest(Long customerId, List<BookingItemRequest> items) {
        this.customerId = customerId;
        this.items = items;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public LocalDate getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDate bookingDate) {
        this.bookingDate = bookingDate;
    }

    public Integer getBookingStatus() {
        return bookingStatus;
    }

    public void setBookingStatus(Integer bookingStatus) {
        this.bookingStatus = bookingStatus;
    }

    public List<BookingItemRequest> getItems() {
        return items;
    }

    public void setItems(List<BookingItemRequest> items) {
        this.items = items;
    }
}

