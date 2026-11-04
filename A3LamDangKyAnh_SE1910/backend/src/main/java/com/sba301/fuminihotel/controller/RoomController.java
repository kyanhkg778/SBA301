package com.sba301.fuminihotel.controller;

import com.sba301.fuminihotel.dto.RoomRequest;
import com.sba301.fuminihotel.dto.RoomResponse;
import com.sba301.fuminihotel.service.RoomService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    // Public: Xem danh sách phòng (không cần đăng nhập)
    @GetMapping
    public ResponseEntity<List<RoomResponse>> getActiveRooms(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) Integer roomTypeId,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice) {

        if (query != null || roomTypeId != null || minPrice != null || maxPrice != null) {
            return ResponseEntity.ok(roomService.searchRooms(query, roomTypeId, 1, minPrice, maxPrice));
        }
        return ResponseEntity.ok(roomService.getActiveRooms());
    }

    // Public: Xem chi tiết 1 phòng
    @GetMapping("/{id}")
    public ResponseEntity<RoomResponse> getRoomById(@PathVariable Integer id) {
        return ResponseEntity.ok(roomService.getRoomById(id));
    }

    // Staff: Xem tất cả phòng
    @GetMapping("/manage/all")
    @PreAuthorize("hasRole('STAFF')")
    public ResponseEntity<List<RoomResponse>> getAllRoomsForStaff(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) Integer roomTypeId,
            @RequestParam(required = false) Integer status,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice) {

        if (query != null || roomTypeId != null || status != null || minPrice != null || maxPrice != null) {
            return ResponseEntity.ok(roomService.searchRooms(query, roomTypeId, status, minPrice, maxPrice));
        }
        return ResponseEntity.ok(roomService.getAllRooms());
    }

    // Staff: Thêm phòng mới
    @PostMapping
    @PreAuthorize("hasRole('STAFF')")
    public ResponseEntity<RoomResponse> createRoom(@Valid @RequestBody RoomRequest request) {
        return new ResponseEntity<>(roomService.createRoom(request), HttpStatus.CREATED);
    }

    // Staff: Cập nhật thông tin phòng
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('STAFF')")
    public ResponseEntity<RoomResponse> updateRoom(@PathVariable Integer id, @Valid @RequestBody RoomRequest request) {
        return ResponseEntity.ok(roomService.updateRoom(id, request));
    }

    // Staff: Xóa phòng (kiểm tra BookingDetail theo đề bài)
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('STAFF')")
    public ResponseEntity<Map<String, Object>> deleteRoom(@PathVariable Integer id) {
        return ResponseEntity.ok(roomService.deleteRoom(id));
    }
}
