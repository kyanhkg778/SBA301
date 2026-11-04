package com.sba301.fuminihotel.service;

import com.sba301.fuminihotel.dto.RoomTypeRequest;
import com.sba301.fuminihotel.entity.RoomType;
import com.sba301.fuminihotel.exception.BadRequestException;
import com.sba301.fuminihotel.exception.ResourceNotFoundException;
import com.sba301.fuminihotel.repository.RoomTypeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RoomTypeService {

    private final RoomTypeRepository roomTypeRepository;

    public RoomTypeService(RoomTypeRepository roomTypeRepository) {
        this.roomTypeRepository = roomTypeRepository;
    }

    public List<RoomType> getAllRoomTypes() {
        return roomTypeRepository.findAll();
    }

    public RoomType getRoomTypeById(Integer id) {
        return roomTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy loại phòng với mã ID: " + id));
    }

    @Transactional
    public RoomType createRoomType(RoomTypeRequest request) {
        if (roomTypeRepository.existsByRoomTypeNameIgnoreCase(request.getRoomTypeName())) {
            throw new BadRequestException("Tên loại phòng '" + request.getRoomTypeName() + "' đã tồn tại.");
        }

        RoomType roomType = new RoomType();
        roomType.setRoomTypeName(request.getRoomTypeName());
        roomType.setTypeDescription(request.getTypeDescription());
        roomType.setTypeNote(request.getTypeNote());

        return roomTypeRepository.save(roomType);
    }

    @Transactional
    public RoomType updateRoomType(Integer id, RoomTypeRequest request) {
        RoomType roomType = roomTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy loại phòng với mã ID: " + id));

        if (!roomType.getRoomTypeName().equalsIgnoreCase(request.getRoomTypeName())) {
            if (roomTypeRepository.existsByRoomTypeNameIgnoreCase(request.getRoomTypeName())) {
                throw new BadRequestException("Tên loại phòng '" + request.getRoomTypeName() + "' đã tồn tại.");
            }
            roomType.setRoomTypeName(request.getRoomTypeName());
        }

        roomType.setTypeDescription(request.getTypeDescription());
        roomType.setTypeNote(request.getTypeNote());

        return roomTypeRepository.save(roomType);
    }

    @Transactional
    public void deleteRoomType(Integer id) {
        RoomType roomType = roomTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy loại phòng với mã ID: " + id));

        if (!roomType.getRoomInformations().isEmpty()) {
            throw new BadRequestException("Không thể xóa loại phòng đang được gán cho các phòng trong khách sạn.");
        }

        roomTypeRepository.delete(roomType);
    }
}
