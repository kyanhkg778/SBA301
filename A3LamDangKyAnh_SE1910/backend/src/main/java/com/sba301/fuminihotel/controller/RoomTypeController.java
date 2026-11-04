package com.sba301.fuminihotel.controller;

import com.sba301.fuminihotel.dto.RoomTypeRequest;
import com.sba301.fuminihotel.entity.RoomType;
import com.sba301.fuminihotel.service.RoomTypeService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/room-types")
public class RoomTypeController {

    private final RoomTypeService roomTypeService;

    public RoomTypeController(RoomTypeService roomTypeService) {
        this.roomTypeService = roomTypeService;
    }

    @GetMapping
    public ResponseEntity<List<RoomType>> getAllRoomTypes() {
        return ResponseEntity.ok(roomTypeService.getAllRoomTypes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoomType> getRoomTypeById(@PathVariable Integer id) {
        return ResponseEntity.ok(roomTypeService.getRoomTypeById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('STAFF')")
    public ResponseEntity<RoomType> createRoomType(@Valid @RequestBody RoomTypeRequest request) {
        return new ResponseEntity<>(roomTypeService.createRoomType(request), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('STAFF')")
    public ResponseEntity<RoomType> updateRoomType(@PathVariable Integer id, @Valid @RequestBody RoomTypeRequest request) {
        return ResponseEntity.ok(roomTypeService.updateRoomType(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('STAFF')")
    public ResponseEntity<Map<String, String>> deleteRoomType(@PathVariable Integer id) {
        roomTypeService.deleteRoomType(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Đã xóa loại phòng.");
        return ResponseEntity.ok(response);
    }
}
