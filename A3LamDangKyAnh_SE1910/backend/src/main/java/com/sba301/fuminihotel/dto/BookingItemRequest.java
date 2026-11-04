package com.sba301.fuminihotel.dto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;

public class BookingItemRequest {

    @NotNull(message = "Mã phòng (RoomID) không được để trống")
    private Integer roomId;

    @NotNull(message = "Ngày bắt đầu nhận phòng không được để trống")
    private LocalDate startDate;

    @NotNull(message = "Ngày trả phòng không được để trống")
    private LocalDate endDate;

    // Tùy chọn: Nếu để null, hệ thống sẽ tự động tính = roomPricePerDay * số ngày
    private BigDecimal actualPrice;

    public BookingItemRequest() {
    }

    public BookingItemRequest(Integer roomId, LocalDate startDate, LocalDate endDate, BigDecimal actualPrice) {
        this.roomId = roomId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.actualPrice = actualPrice;
    }

    public Integer getRoomId() {
        return roomId;
    }

    public void setRoomId(Integer roomId) {
        this.roomId = roomId;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public BigDecimal getActualPrice() {
        return actualPrice;
    }

    public void setActualPrice(BigDecimal actualPrice) {
        this.actualPrice = actualPrice;
    }
}

