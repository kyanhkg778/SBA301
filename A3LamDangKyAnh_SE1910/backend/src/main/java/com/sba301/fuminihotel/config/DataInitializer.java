package com.sba301.fuminihotel.config;

import com.sba301.fuminihotel.entity.*;
import com.sba301.fuminihotel.repository.BookingDetailRepository;
import com.sba301.fuminihotel.repository.BookingReservationRepository;
import com.sba301.fuminihotel.repository.CustomerRepository;
import com.sba301.fuminihotel.repository.RoomInformationRepository;
import com.sba301.fuminihotel.repository.RoomTypeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

// Khởi tạo dữ liệu mẫu ban đầu
@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    private final RoomTypeRepository roomTypeRepository;
    private final RoomInformationRepository roomInformationRepository;
    private final CustomerRepository customerRepository;
    private final BookingReservationRepository bookingReservationRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(RoomTypeRepository roomTypeRepository,
                           RoomInformationRepository roomInformationRepository,
                           CustomerRepository customerRepository,
                           BookingReservationRepository bookingReservationRepository,
                           PasswordEncoder passwordEncoder) {
        this.roomTypeRepository = roomTypeRepository;
        this.roomInformationRepository = roomInformationRepository;
        this.customerRepository = customerRepository;
        this.bookingReservationRepository = bookingReservationRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        try {
            initRoomTypesAndRooms();
            initCustomersAndBookings();
            logger.info("Khởi tạo dữ liệu mẫu thành công.");
        } catch (Exception ex) {
            logger.warn("Dữ liệu ban đầu đã tồn tại: {}", ex.getMessage());
        }
    }

    private void initRoomTypesAndRooms() {
        if (roomTypeRepository.count() == 0) {
            RoomType standard = new RoomType("Standard", "Phòng tiêu chuẩn tiện nghi cơ bản", "Tầng 1-2");
            RoomType deluxe = new RoomType("Deluxe", "Phòng cao cấp view thành phố", "Tầng 3-4");
            RoomType suite = new RoomType("Executive Suite", "Phòng Suite có phòng khách riêng", "Tầng 5");
            RoomType family = new RoomType("Family Suite", "Phòng gia đình 2 giường đôi", "Tầng 2-3");

            roomTypeRepository.saveAll(Arrays.asList(standard, deluxe, suite, family));

            RoomInformation r101 = new RoomInformation("101", "Phòng Standard 1 giường đôi", 2, standard, 1, new BigDecimal("450000.00"));
            RoomInformation r102 = new RoomInformation("102", "Phòng Standard 2 giường đơn", 2, standard, 1, new BigDecimal("480000.00"));
            RoomInformation r201 = new RoomInformation("201", "Phòng Deluxe King bed", 2, deluxe, 1, new BigDecimal("850000.00"));
            RoomInformation r202 = new RoomInformation("202", "Phòng Deluxe view công viên", 3, deluxe, 1, new BigDecimal("950000.00"));
            RoomInformation r301 = new RoomInformation("301", "Phòng VIP minibar miễn phí", 4, suite, 1, new BigDecimal("1800000.00"));
            RoomInformation r401 = new RoomInformation("401", "Phòng Family Suite gia đình", 5, family, 1, new BigDecimal("1400000.00"));
            RoomInformation r402 = new RoomInformation("402", "Phòng Family Suite 2 phòng ngủ", 6, family, 1, new BigDecimal("1650000.00"));

            roomInformationRepository.saveAll(Arrays.asList(r101, r102, r201, r202, r301, r401, r402));
        }
    }

    private void initCustomersAndBookings() {
        if (customerRepository.count() == 0) {
            Customer c1 = new Customer("Nguyễn Văn An", "0901234567", "customer@fuminihotel.com",
                    LocalDate.of(1998, 5, 20), 1, passwordEncoder.encode("123456"));
            Customer c2 = new Customer("Trần Thị Mai", "0912345678", "mai.tran@gmail.com",
                    LocalDate.of(2000, 8, 15), 1, passwordEncoder.encode("123456"));
            Customer c3 = new Customer("Lê Hoàng Nam", "0987654321", "nam.le@yahoo.com",
                    LocalDate.of(1995, 11, 10), 1, passwordEncoder.encode("123456"));

            customerRepository.saveAll(Arrays.asList(c1, c2, c3));

            // Tạo sẵn 1 đơn đặt phòng mẫu để test nghiệp vụ xóa phòng
            List<RoomInformation> rooms = roomInformationRepository.findAll();
            if (!rooms.isEmpty()) {
                RoomInformation room101 = rooms.stream().filter(r -> "101".equals(r.getRoomNumber())).findFirst().orElse(rooms.get(0));
                RoomInformation room201 = rooms.stream().filter(r -> "201".equals(r.getRoomNumber())).findFirst().orElse(rooms.get(1));

                BookingReservation booking = new BookingReservation();
                booking.setCustomer(c1);
                booking.setBookingDate(LocalDate.now().minusDays(2));
                booking.setBookingStatus(1);
                booking.setTotalPrice(BigDecimal.ZERO);

                BookingReservation savedBooking = bookingReservationRepository.save(booking);

                LocalDate start = LocalDate.now().plusDays(1);
                LocalDate end = LocalDate.now().plusDays(3);

                BigDecimal price1 = room101.getRoomPricePerDay().multiply(BigDecimal.valueOf(2));
                BigDecimal price2 = room201.getRoomPricePerDay().multiply(BigDecimal.valueOf(2));

                BookingDetail d1 = new BookingDetail(savedBooking, room101, start, end, price1);
                BookingDetail d2 = new BookingDetail(savedBooking, room201, start, end, price2);

                savedBooking.addBookingDetail(d1);
                savedBooking.addBookingDetail(d2);
                savedBooking.setTotalPrice(price1.add(price2));

                bookingReservationRepository.save(savedBooking);
            }
        }
    }
}
