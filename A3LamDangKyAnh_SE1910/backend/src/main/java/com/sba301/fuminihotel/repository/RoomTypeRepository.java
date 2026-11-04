package com.sba301.fuminihotel.repository;

import com.sba301.fuminihotel.entity.RoomType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository thao tác với bảng RoomType (Loại phòng).
 */
@Repository
public interface RoomTypeRepository extends JpaRepository<RoomType, Integer> {

    // Tìm kiếm loại phòng theo tên
    Optional<RoomType> findByRoomTypeNameIgnoreCase(String roomTypeName);

    // Kiểm tra tên loại phòng đã tồn tại chưa
    boolean existsByRoomTypeNameIgnoreCase(String roomTypeName);
}

