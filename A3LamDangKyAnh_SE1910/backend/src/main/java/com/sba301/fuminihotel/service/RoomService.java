package com.sba301.fuminihotel.service;

import com.sba301.fuminihotel.dto.RoomRequest;
import com.sba301.fuminihotel.dto.RoomResponse;
import com.sba301.fuminihotel.entity.RoomInformation;
import com.sba301.fuminihotel.entity.RoomType;
import com.sba301.fuminihotel.exception.BadRequestException;
import com.sba301.fuminihotel.exception.ResourceNotFoundException;
import com.sba301.fuminihotel.repository.BookingDetailRepository;
import com.sba301.fuminihotel.repository.RoomInformationRepository;
import com.sba301.fuminihotel.repository.RoomTypeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class RoomService {

    private final RoomInformationRepository roomInformationRepository;
    private final RoomTypeRepository roomTypeRepository;
    private final BookingDetailRepository bookingDetailRepository;

    public RoomService(RoomInformationRepository roomInformationRepository,
                       RoomTypeRepository roomTypeRepository,
                       BookingDetailRepository bookingDetailRepository) {
        this.roomInformationRepository = roomInformationRepository;
        this.roomTypeRepository = roomTypeRepository;
        this.bookingDetailRepository = bookingDetailRepository;
    }

    public List<RoomResponse> getAllRooms() {
        return roomInformationRepository.findAll().stream()
                .map(RoomResponse::new)
                .collect(Collectors.toList());
    }

    // Public: xem danh sách phòng đang hoạt động (không cần đăng nhập)
    public List<RoomResponse> getActiveRooms() {
        return roomInformationRepository.findByRoomStatus(1).stream()
                .map(RoomResponse::new)
                .collect(Collectors.toList());
    }

    public RoomResponse getRoomById(Integer id) {
        RoomInformation room = roomInformationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy phòng với mã: " + id));
        return new RoomResponse(room);
    }

    public List<RoomResponse> searchRooms(String query, Integer roomTypeId, Integer status,
                                          BigDecimal minPrice, BigDecimal maxPrice) {
        return roomInformationRepository.searchRooms(query, roomTypeId, status, minPrice, maxPrice).stream()
                .map(RoomResponse::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public RoomResponse createRoom(RoomRequest request) {
        if (roomInformationRepository.existsByRoomNumber(request.getRoomNumber())) {
            throw new BadRequestException("Số phòng '" + request.getRoomNumber() + "' đã tồn tại.");
        }

        RoomType roomType = roomTypeRepository.findById(request.getRoomTypeId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy loại phòng: " + request.getRoomTypeId()));

        RoomInformation room = new RoomInformation();
        room.setRoomNumber(request.getRoomNumber().trim());
        room.setRoomDetailDescription(request.getRoomDetailDescription());
        room.setRoomMaxCapacity(request.getRoomMaxCapacity());
        room.setRoomType(roomType);
        room.setRoomStatus(request.getRoomStatus() != null ? request.getRoomStatus() : 1);
        room.setRoomPricePerDay(request.getRoomPricePerDay());

        return new RoomResponse(roomInformationRepository.save(room));
    }

    @Transactional
    public RoomResponse updateRoom(Integer id, RoomRequest request) {
        RoomInformation room = roomInformationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy phòng với mã: " + id));

        if (!room.getRoomNumber().equalsIgnoreCase(request.getRoomNumber())) {
            if (roomInformationRepository.existsByRoomNumber(request.getRoomNumber())) {
                throw new BadRequestException("Số phòng '" + request.getRoomNumber() + "' đã tồn tại.");
            }
            room.setRoomNumber(request.getRoomNumber().trim());
        }

        if (!room.getRoomType().getRoomTypeId().equals(request.getRoomTypeId())) {
            RoomType newType = roomTypeRepository.findById(request.getRoomTypeId())
                    .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy loại phòng: " + request.getRoomTypeId()));
            room.setRoomType(newType);
        }

        room.setRoomDetailDescription(request.getRoomDetailDescription());
        room.setRoomMaxCapacity(request.getRoomMaxCapacity());
        room.setRoomStatus(request.getRoomStatus());
        room.setRoomPricePerDay(request.getRoomPricePerDay());

        return new RoomResponse(roomInformationRepository.save(room));
    }

    // Nghiệp vụ xóa phòng: nếu đã có giao dịch trong BookingDetail thì đổi status=0, chưa có thì xóa DB
    @Transactional
    public Map<String, Object> deleteRoom(Integer id) {
        RoomInformation room = roomInformationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy phòng với mã: " + id));

        // Kiểm tra phòng đã từng được đặt chưa
        boolean hasRentingTransaction = bookingDetailRepository.existsByRoomInformation_RoomId(id);

        Map<String, Object> result = new HashMap<>();
        result.put("roomId", id);
        result.put("roomNumber", room.getRoomNumber());

        if (hasRentingTransaction) {
            // Đã có lịch sử đặt -> chỉ đổi trạng thái sang 0 (Inactive)
            room.setRoomStatus(0);
            roomInformationRepository.save(room);

            result.put("deleted", false);
            result.put("statusChanged", true);
            result.put("roomStatus", 0);
            result.put("message", "Phòng đã có lịch sử đặt phòng, chuyển trạng thái sang Inactive (0).");
        } else {
            // Chưa có đơn đặt nào -> xóa hẳn khỏi CSDL
            roomInformationRepository.delete(room);

            result.put("deleted", true);
            result.put("statusChanged", false);
            result.put("message", "Đã xóa vĩnh viễn phòng khỏi CSDL.");
        }

        return result;
    }
}
