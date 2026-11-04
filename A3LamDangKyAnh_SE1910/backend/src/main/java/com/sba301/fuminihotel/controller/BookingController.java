package com.sba301.fuminihotel.controller;

import com.sba301.fuminihotel.dto.BookingCreateRequest;
import com.sba301.fuminihotel.dto.BookingResponse;
import com.sba301.fuminihotel.dto.BookingStatusUpdateRequest;
import com.sba301.fuminihotel.exception.BadRequestException;
import com.sba301.fuminihotel.security.UserPrincipal;
import com.sba301.fuminihotel.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    // Đặt phòng (Customer đặt online hoặc Staff đặt offline)
    @PostMapping("/api/bookings")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'STAFF')")
    public ResponseEntity<BookingResponse> createBooking(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody BookingCreateRequest request) {

        Long customerId = userPrincipal.isStaff() ? request.getCustomerId() : userPrincipal.getId();
        return new ResponseEntity<>(bookingService.createBooking(request, customerId, userPrincipal.isStaff()), HttpStatus.CREATED);
    }

    // Customer: Xem lịch sử đặt phòng của mình
    @GetMapping("/api/bookings/my-history")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<List<BookingResponse>> getMyBookingHistory(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        return ResponseEntity.ok(bookingService.getMyBookingHistory(userPrincipal.getId()));
    }

    // Staff: Quản lý danh sách đơn đặt phòng
    @GetMapping("/api/staff/bookings")
    @PreAuthorize("hasRole('STAFF')")
    public ResponseEntity<List<BookingResponse>> getAllBookings(
            @RequestParam(required = false) Long customerId,
            @RequestParam(required = false) Integer status,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fromDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate toDate) {

        if (customerId != null || status != null || fromDate != null || toDate != null) {
            return ResponseEntity.ok(bookingService.searchBookings(customerId, status, fromDate, toDate));
        }
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    // Xem chi tiết 1 đơn đặt phòng
    @GetMapping("/api/bookings/{id}")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'STAFF')")
    public ResponseEntity<BookingResponse> getBookingById(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        BookingResponse booking = bookingService.getBookingById(id);

        if (!userPrincipal.isStaff() && !booking.getCustomerId().equals(userPrincipal.getId())) {
            throw new BadRequestException("Không có quyền xem đơn đặt phòng của người khác.");
        }

        return ResponseEntity.ok(booking);
    }

    // Staff: Cập nhật trạng thái đơn (1: Confirmed, 2: Completed, 0: Cancelled)
    @PutMapping("/api/staff/bookings/{id}/status")
    @PreAuthorize("hasRole('STAFF')")
    public ResponseEntity<BookingResponse> updateBookingStatus(
            @PathVariable Long id,
            @Valid @RequestBody BookingStatusUpdateRequest request) {
        return ResponseEntity.ok(bookingService.updateBookingStatus(id, request.getBookingStatus()));
    }
}
