package com.sba301.fuminihotel.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Entity đại diện cho bảng RoomType trong cơ sở dữ liệu.
 * Phân loại phòng khách sạn (ví dụ: Deluxe, Suite, Standard, Family, ...).
 */
@Entity
@Table(name = "RoomType")
public class RoomType {

    // Khóa chính RoomTypeID sinh tự động tăng
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RoomTypeID")
    private Integer roomTypeId;

    // Tên loại phòng
    @Column(name = "RoomTypeName", length = 50, nullable = false)
    private String roomTypeName;

    // Mô tả chi tiết về loại phòng
    @Column(name = "TypeDescription", length = 250)
    private String typeDescription;

    // Ghi chú thêm
    @Column(name = "TypeNote", length = 250)
    private String typeNote;

    // Một loại phòng có thể được áp dụng cho nhiều phòng (1-N)
    @JsonIgnore
    @OneToMany(mappedBy = "roomType", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<RoomInformation> roomInformations = new ArrayList<>();

    // ================= Constructors =================
    public RoomType() {
    }

    public RoomType(String roomTypeName, String typeDescription, String typeNote) {
        this.roomTypeName = roomTypeName;
        this.typeDescription = typeDescription;
        this.typeNote = typeNote;
    }

    // ================= Getters & Setters =================
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

    public List<RoomInformation> getRoomInformations() {
        return roomInformations;
    }

    public void setRoomInformations(List<RoomInformation> roomInformations) {
        this.roomInformations = roomInformations;
    }
}

