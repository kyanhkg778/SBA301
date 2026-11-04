package com.sba301.fuminihotel.service;

import com.sba301.fuminihotel.dto.*;
import com.sba301.fuminihotel.entity.BookingDetail;
import com.sba301.fuminihotel.entity.BookingReservation;
import com.sba301.fuminihotel.entity.Customer;
import com.sba301.fuminihotel.entity.RoomInformation;
import com.sba301.fuminihotel.exception.BadRequestException;
import com.sba301.fuminihotel.exception.ResourceNotFoundException;
import com.sba301.fuminihotel.repository.BookingDetailRepository;
import com.sba301.fuminihotel.repository.BookingReservationRepository;
import com.sba301.fuminihotel.repository.CustomerRepository;
import com.sba301.fuminihotel.repository.RoomInformationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingService {

    private final BookingReservationRepository bookingReservationRepository;
    private final BookingDetailRepository bookingDetailRepository;
    private final CustomerRepository customerRepository;
    private final RoomInformationRepository roomInformationRepository;

    public BookingService(BookingReservationRepository bookingReservationRepository,
                          BookingDetailRepository bookingDetailRepository,
                          CustomerRepository customerRepository,
                          RoomInformationRepository roomInformationRepository) {
        this.bookingReservationRepository = bookingReservationRepository;
        this.bookingDetailRepository = bookingDetailRepository;
        this.customerRepository = customerRepository;
        this.roomInformationRepository = roomInformationRepository;
    }

    // Đặt phòng online hoặc offline (1 hoặc nhiều phòng)
    @Transactional
    public BookingResponse createBooking(BookingCreateRequest request, Long currentCustomerId, boolean isStaff) {
        Long customerId = isStaff && request.getCustomerId() != null ? request.getCustomerId() : currentCustomerId;

        if (customerId == null || customerId <= 0) {
            throw new BadRequestException("Vui lòng chọn khách hàng đặt phòng.");
        }

        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy khách hàng: " + customerId));

        if (customer.getCustomerStatus() != null && customer.getCustomerStatus() == 0) {
            throw new BadRequestException("Tài khoản khách hàng đang bị khóa.");
        }

        if (request.getItems() == null || request.getItems().isEmpty()) {
            throw new BadRequestException("Đơn đặt phòng cần ít nhất một phòng.");
        }

        // Tạo đơn đặt phòng
        BookingReservation reservation = new BookingReservation();
        reservation.setCustomer(customer);
        reservation.setBookingDate(request.getBookingDate() != null ? request.getBookingDate() : LocalDate.now());
        reservation.setBookingStatus(request.getBookingStatus() != null ? request.getBookingStatus() : 1);
        reservation.setTotalPrice(BigDecimal.ZERO);

        BigDecimal grandTotal = BigDecimal.ZERO;
        BookingReservation savedReservation = bookingReservationRepository.save(reservation);

        // Duyệt từng phòng trong đơn và tính tiền theo số ngày
        for (BookingItemRequest item : request.getItems()) {
            if (item.getStartDate() == null || item.getEndDate() == null) {
                throw new BadRequestException("Ngày nhận/trả phòng không được để trống.");
            }
            if (!item.getStartDate().isBefore(item.getEndDate())) {
                throw new BadRequestException("Ngày nhận phòng phải trước ngày trả phòng.");
            }

            RoomInformation room = roomInformationRepository.findById(item.getRoomId())
                    .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy phòng: " + item.getRoomId()));

            long days = ChronoUnit.DAYS.between(item.getStartDate(), item.getEndDate());
            if (days < 1) days = 1;

            BigDecimal itemActualPrice = item.getActualPrice() != null && item.getActualPrice().compareTo(BigDecimal.ZERO) > 0
                    ? item.getActualPrice()
                    : room.getRoomPricePerDay().multiply(BigDecimal.valueOf(days));

            // Lưu chi tiết từng phòng
            BookingDetail detail = new BookingDetail(savedReservation, room, item.getStartDate(), item.getEndDate(), itemActualPrice);
            savedReservation.addBookingDetail(detail);

            grandTotal = grandTotal.add(itemActualPrice);
        }

        savedReservation.setTotalPrice(grandTotal);
        return new BookingResponse(bookingReservationRepository.save(savedReservation));
    }

    public List<BookingResponse> getAllBookings() {
        return bookingReservationRepository.findAllByOrderByBookingReservationIdDesc().stream()
                .map(BookingResponse::new)
                .collect(Collectors.toList());
    }

    // Lịch sử đặt phòng của khách hàng
    public List<BookingResponse> getMyBookingHistory(Long customerId) {
        return bookingReservationRepository.findByCustomer_CustomerIdOrderByBookingDateDesc(customerId).stream()
                .map(BookingResponse::new)
                .collect(Collectors.toList());
    }

    public BookingResponse getBookingById(Long id) {
        BookingReservation booking = bookingReservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy đơn đặt phòng: " + id));
        return new BookingResponse(booking);
    }

    @Transactional
    public BookingResponse updateBookingStatus(Long id, Integer status) {
        BookingReservation booking = bookingReservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy đơn đặt phòng: " + id));

        booking.setBookingStatus(status);
        return new BookingResponse(bookingReservationRepository.save(booking));
    }

    public List<BookingResponse> searchBookings(Long customerId, Integer status, LocalDate fromDate, LocalDate toDate) {
        return bookingReservationRepository.searchBookings(customerId, status, fromDate, toDate).stream()
                .map(BookingResponse::new)
                .collect(Collectors.toList());
    }
}
