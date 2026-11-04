package com.sba301.fuminihotel.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

/**
 * Composite Key đại diện cho khóa chính 2 cột của bảng BookingDetail:
 * (BookingReservationID, RoomID)
 */
@Embeddable
public class BookingDetailId implements Serializable {

    private static final long serialVersionUID = 1L;

    @Column(name = "BookingReservationID")
    private Long bookingReservationId;

    @Column(name = "RoomID")
    private Integer roomId;

    public BookingDetailId() {
    }

    public BookingDetailId(Long bookingReservationId, Integer roomId) {
        this.bookingReservationId = bookingReservationId;
        this.roomId = roomId;
    }

    public Long getBookingReservationId() {
        return bookingReservationId;
    }

    public void setBookingReservationId(Long bookingReservationId) {
        this.bookingReservationId = bookingReservationId;
    }

    public Integer getRoomId() {
        return roomId;
    }

    public void setRoomId(Integer roomId) {
        this.roomId = roomId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BookingDetailId that = (BookingDetailId) o;
        return Objects.equals(bookingReservationId, that.bookingReservationId) &&
               Objects.equals(roomId, that.roomId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(bookingReservationId, roomId);
    }
}

