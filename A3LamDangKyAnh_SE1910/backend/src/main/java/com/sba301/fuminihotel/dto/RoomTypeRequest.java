package com.sba301.fuminihotel.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class RoomTypeRequest {

    @NotBlank(message = "Tên loại phòng không được để trống")
    @Size(max = 50, message = "Tên loại phòng tối đa 50 ký tự")
    private String roomTypeName;

    @Size(max = 250, message = "Mô tả tối đa 250 ký tự")
    private String typeDescription;

    @Size(max = 250, message = "Ghi chú tối đa 250 ký tự")
    private String typeNote;

    public RoomTypeRequest() {
    }

    public RoomTypeRequest(String roomTypeName, String typeDescription, String typeNote) {
        this.roomTypeName = roomTypeName;
        this.typeDescription = typeDescription;
        this.typeNote = typeNote;
    }

    public String getRoomTypeName() {
        return roomTypeName;
    }

    public void setRoomTypeName(String roomTypeName) {
        this.roomTypeName = roomTypeName;
    }

    public String getTypeDescription() {
        return typeDescription;
    }

    public void setTypeDescription(String typeDescription) {
        this.typeDescription = typeDescription;
    }

    public String getTypeNote() {
        return typeNote;
    }

    public void setTypeNote(String typeNote) {
        this.typeNote = typeNote;
    }
}

