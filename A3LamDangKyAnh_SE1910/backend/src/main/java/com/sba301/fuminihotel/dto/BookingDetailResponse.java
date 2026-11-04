package com.sba301.fuminihotel.dto;

import com.sba301.fuminihotel.entity.BookingDetail;
import java.math.BigDecimal;
import java.time.LocalDate;

public class BookingDetailResponse {

    private Integer roomId;
    private String roomNumber;
    private String roomTypeName;
    private LocalDate startDate;
    private LocalDate endDate;
    private BigDecimal actualPrice;

    public BookingDetailResponse() {
    }

    public BookingDetailResponse(BookingDetail detail) {
        if (detail != null) {
            if (detail.getRoomInformation() != null) {
                this.roomId = detail.getRoomInformation().getRoomId();
                this.roomNumber = detail.getRoomInformation().getRoomNumber();
                if (detail.getRoomInformation().getRoomType() != null) {
                    this.roomTypeName = detail.getRoomInformation().getRoomType().getRoomTypeName();
                }
            }
            this.startDate = detail.getStartDate();
            this.endDate = detail.getEndDate();
            this.actualPrice = detail.getActualPrice();
        }
    }

    public Integer getRoomId() {
        return roomId;
    }

    public void setRoomId(Integer roomId) {
        this.roomId = roomId;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public String getRoomTypeName() {
        return roomTypeName;
    }

    public void setRoomTypeName(String roomTypeName) {
        this.roomTypeName = roomTypeName;
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

