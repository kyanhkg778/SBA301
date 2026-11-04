package com.sba301.fuminihotel.repository;

import com.sba301.fuminihotel.entity.RoomInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

/**
 * Repository thao tác với bảng RoomInformation trong CSDL SQL Server.
 */
@Repository
public interface RoomInformationRepository extends JpaRepository<RoomInformation, Integer> {

    // Tìm kiếm phòng theo số phòng (ví dụ "101")
    Optional<RoomInformation> findByRoomNumber(String roomNumber);

    // Kiểm tra số phòng đã tồn tại chưa (tránh trùng số phòng khi tạo mới)
    boolean existsByRoomNumber(String roomNumber);

    // Lấy danh sách các phòng đang hoạt động (RoomStatus = 1) - dành cho khách vãng lai và đặt phòng
    List<RoomInformation> findByRoomStatus(Integer roomStatus);

    // Tìm kiếm phòng theo nhiều tiêu chí linh hoạt: số phòng, loại phòng, khoảng giá
    @Query("SELECT r FROM RoomInformation r WHERE " +
           "(:query IS NULL OR LOWER(r.roomNumber) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "OR LOWER(r.roomDetailDescription) LIKE LOWER(CONCAT('%', :query, '%'))) AND " +
           "(:roomTypeId IS NULL OR r.roomType.roomTypeId = :roomTypeId) AND " +
           "(:status IS NULL OR r.roomStatus = :status) AND " +
           "(:minPrice IS NULL OR r.roomPricePerDay >= :minPrice) AND " +
           "(:maxPrice IS NULL OR r.roomPricePerDay <= :maxPrice)")
    List<RoomInformation> searchRooms(@Param("query") String query,
                                      @Param("roomTypeId") Integer roomTypeId,
                                      @Param("status") Integer status,
                                      @Param("minPrice") BigDecimal minPrice,
                                      @Param("maxPrice") BigDecimal maxPrice);
}

