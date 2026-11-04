package com.sba301.fuminihotel.dto;

import com.sba301.fuminihotel.entity.RoomInformation;
import java.math.BigDecimal;

public class RoomResponse {

    private Integer roomId;
    private String roomNumber;
    private String roomDetailDescription;
    private Integer roomMaxCapacity;
    private Integer roomTypeId;
    private String roomTypeName;
    private Integer roomStatus;
    private BigDecimal roomPricePerDay;

    public RoomResponse() {
    }

    public RoomResponse(RoomInformation room) {
        if (room != null) {
            this.roomId = room.getRoomId();
            this.roomNumber = room.getRoomNumber();
            this.roomDetailDescription = room.getRoomDetailDescription();
            this.roomMaxCapacity = room.getRoomMaxCapacity();
            if (room.getRoomType() != null) {
                this.roomTypeId = room.getRoomType().getRoomTypeId();
                this.roomTypeName = room.getRoomType().getRoomTypeName();
            }
            this.roomStatus = room.getRoomStatus();
            this.roomPricePerDay = room.getRoomPricePerDay();
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

    public String getRoomTypeName() {
        return roomTypeName;
    }

    public void setRoomTypeName(String roomTypeName) {
        this.roomTypeName = roomTypeName;
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

