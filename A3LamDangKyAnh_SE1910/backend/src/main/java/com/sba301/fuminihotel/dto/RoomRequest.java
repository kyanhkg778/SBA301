package com.sba301.fuminihotel.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public class RoomRequest {

    @NotBlank(message = "Số phòng không được để trống")
    @Size(max = 50, message = "Số phòng không vượt quá 50 ký tự")
    private String roomNumber;

    @Size(max = 500, message = "Mô tả phòng không vượt quá 500 ký tự")
    private String roomDetailDescription;

    @NotNull(message = "Sức chứa tối đa không được để trống")
    @Min(value = 1, message = "Sức chứa tối đa phải từ 1 người trở lên")
    private Integer roomMaxCapacity;

    @NotNull(message = "Loại phòng (RoomTypeID) không được để trống")
    private Integer roomTypeId;

    @NotNull(message = "Trạng thái phòng không được để trống")
    private Integer roomStatus;

    @NotNull(message = "Giá thuê mỗi ngày không được để trống")
    @DecimalMin(value = "0.0", inclusive = false, message = "Giá thuê phòng phải lớn hơn 0")
    private BigDecimal roomPricePerDay;

    public RoomRequest() {
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public String getRoomDetailDescription() {
        return roomDetailDescription;
    }

    public void setRoomDetailDescription(String roomDetailDescription) {
        this.roomDetailDescription = roomDetailDescription;
    }

    public Integer getRoomMaxCapacity() {
        return roomMaxCapacity;
    }

    public void setRoomMaxCapacity(Integer roomMaxCapacity) {
        this.roomMaxCapacity = roomMaxCapacity;
    }

    public Integer getRoomTypeId() {
        return roomTypeId;
    }

    public void setRoomTypeId(Integer roomTypeId) {
        this.roomTypeId = roomTypeId;
    }

    public Integer getRoomStatus() {
        return roomStatus;
    }

    public void setRoomStatus(Integer roomStatus) {
        this.roomStatus = roomStatus;
    }

    public BigDecimal getRoomPricePerDay() {
        return roomPricePerDay;
    }

    public void setRoomPricePerDay(BigDecimal roomPricePerDay) {
        this.roomPricePerDay = roomPricePerDay;
    }
}

