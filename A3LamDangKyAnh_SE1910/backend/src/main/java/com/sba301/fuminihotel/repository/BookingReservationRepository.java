package com.sba301.fuminihotel.repository;

import com.sba301.fuminihotel.entity.BookingReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

/**
 * Repository thao tác với bảng BookingReservation.
 */
@Repository
public interface BookingReservationRepository extends JpaRepository<BookingReservation, Long> {

    // Lấy lịch sử đặt phòng của một khách hàng cụ thể, sắp xếp theo ngày đặt mới nhất
    List<BookingReservation> findByCustomer_CustomerIdOrderByBookingDateDesc(Long customerId);

    // Lấy tất cả đơn đặt phòng sắp xếp theo ID giảm dần (mới nhất lên đầu)
    List<BookingReservation> findAllByOrderByBookingReservationIdDesc();

    // Tìm kiếm đơn đặt phòng theo khách hàng hoặc ngày đặt
    @Query("SELECT b FROM BookingReservation b WHERE " +
           "(:customerId IS NULL OR b.customer.customerId = :customerId) AND " +
           "(:status IS NULL OR b.bookingStatus = :status) AND " +
           "(:fromDate IS NULL OR b.bookingDate >= :fromDate) AND " +
           "(:toDate IS NULL OR b.bookingDate <= :toDate) " +
           "ORDER BY b.bookingReservationId DESC")
    List<BookingReservation> searchBookings(@Param("customerId") Long customerId,
                                            @Param("status") Integer status,
                                            @Param("fromDate") LocalDate fromDate,
                                            @Param("toDate") LocalDate toDate);
}

