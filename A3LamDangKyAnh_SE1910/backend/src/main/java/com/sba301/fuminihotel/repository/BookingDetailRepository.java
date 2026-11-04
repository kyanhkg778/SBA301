package com.sba301.fuminihotel.repository;

import com.sba301.fuminihotel.entity.BookingDetail;
import com.sba301.fuminihotel.entity.BookingDetailId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository thao tác với bảng chi tiết đặt phòng BookingDetail.
 */
@Repository
public interface BookingDetailRepository extends JpaRepository<BookingDetail, BookingDetailId> {

    // Kiểm tra xem phòng (RoomID) đã từng nằm trong bất kỳ chi tiết đặt phòng (renting transaction) nào hay chưa
    // Đây là phương thức cốt lõi giải quyết nghiệp vụ:
    // "The delete action will delete room information in the case this information is not belong to any renting transaction.
    // If the room information is already stored in a booking detail, just change the status."
    boolean existsByRoomInformation_RoomId(Integer roomId);

    // Lấy danh sách chi tiết đặt phòng của một đơn đặt phòng cụ thể
    List<BookingDetail> findByBookingReservation_BookingReservationId(Long bookingReservationId);

    // Xóa các chi tiết đặt phòng thuộc về 1 đơn đặt phòng
    void deleteByBookingReservation_BookingReservationId(Long bookingReservationId);
}

