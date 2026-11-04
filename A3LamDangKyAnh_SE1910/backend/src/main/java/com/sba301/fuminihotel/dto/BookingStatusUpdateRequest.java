package com.sba301.fuminihotel.dto;

import jakarta.validation.constraints.NotNull;

public class BookingStatusUpdateRequest {

    @NotNull(message = "Trạng thái đặt phòng không được để trống")
    private Integer bookingStatus;

    public BookingStatusUpdateRequest() {
    }

    public BookingStatusUpdateRequest(Integer bookingStatus) {
        this.bookingStatus = bookingStatus;
    }

    public Integer getBookingStatus() {
        return bookingStatus;
    }

    public void setBookingStatus(Integer bookingStatus) {
        this.bookingStatus = bookingStatus;
    }
}

