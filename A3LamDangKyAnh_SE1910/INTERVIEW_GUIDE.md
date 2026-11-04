# CẨM NANG BẢO VỆ ĐỒ ÁN VÀ TRẢ LỜI PHỎNG VẤN (INTERVIEW DEFENSE GUIDE)
## SBA301 • Assignment 03 • Securing REST Services with Spring Boot & ReactJS
**Sinh viên thực hiện:** Lâm Đặng Kỳ Anh | **MSSV:** CE190574 | **Lớp:** SE1910  
**Tên Đồ Án:** FUMiniHotel Management System  
**Database:** `A3LamDangKyAnh_SE1910` (Microsoft SQL Server)  
**Backend:** Spring Boot 3 RESTful API 3-Layer Architecture (Spring Security 6 & JJWT)  
**Frontend:** ReactJS Single Page Application (Axios Interceptors, Bootstrap 5)  
**Repository:** `https://github.com/kyanhkg778/SBA301.git`

---

## 📑 MỤC LỤC TỔNG QUAN

1. [PHẦN 1: TỔNG QUAN VÀ RUBRIC CHẤM ĐIỂM (4 TIÊU CHÍ / 10 ĐIỂM)](#phần-1-tổng-quan-và-rubric-chấm-điểm)
2. [PHẦN 2: QUY TRÌNH 5 BƯỚC PHỎNG VẤN THỰC CHIẾN](#phần-2-quy-trình-5-bước-phỏng-vấn-thực-chiến)
   - [Pha 1: Run - Khởi động và kiểm tra nhanh](#pha-1-run---khởi-động-và-kiểm-tra-nhanh)
   - [Pha 2: Personal Git - Chứng minh tiến trình cá nhân](#pha-2-personal-git---chứng-minh-tiến-trình-cá-nhân)
   - [Pha 3: Explain - Trình bày bài toán và kiến trúc](#pha-3-explain---trình-bày-bài-toán-và-kiến-trúc)
   - [Pha 4: Code Interview - Truy vết mã nguồn theo khung chuẩn](#pha-4-code-interview---truy-vết-mã-nguồn-theo-khung-chuẩn)
   - [Pha 5: Adaptation - Phân tích thay đổi và Live Modification](#pha-5-adaptation---phân-tích-thay-đổi-và-live-modification)
3. [PHẦN 3: TRUY VẾT MÃ NGUỒN 5 LUỒNG CỐT LÕI (END-TO-END TRACE FLOW)](#phần-3-truy-vết-mã-nguồn-5-luồng-cốt-lõi)
   - [Luồng 1: Xem thông tin phòng công khai không cần đăng nhập](#luồng-1-xem-thông-tin-phòng-công-khai-không-cần-đăng-nhập)
   - [Luồng 2: Xác thực JWT kép (Staff từ properties, Customer từ database)](#luồng-2-xác-thực-jwt-kép)
   - [Luồng 3: Quy tắc đặc thù khi Xóa phòng (Room Deletion Rule)](#luồng-3-quy-tắc-đặc-thù-khi-xóa-phòng)
   - [Luồng 4: Đặt phòng trực tuyến 1 hoặc nhiều phòng (Booking Transaction)](#luồng-4-đặt-phòng-trực-tuyến-1-hoặc-nhiều-phòng)
   - [Luồng 5: Quản lý hồ sơ cá nhân và Lịch sử đặt phòng của khách hàng](#luồng-5-quản-lý-hồ-sơ-cá-nhân-và-lịch-sử-đặt-phòng)
4. [PHẦN 4: BỘ CÂU HỎI PHỎNG VẤN CHUYÊN SÂU & ĐÁP ÁN CHUẨN (Q&A)](#phần-4-bộ-câu-hỏi-phỏng-vấn-chuyên-sâu)
5. [PHẦN 5: KỊCH BẢN LIVE MODIFICATION NẾU ĐƯỢC YÊU CẦU](#phần-5-kịch-bản-live-modification)
6. [PHẦN 6: CHECKLIST 5 PHÚT TRƯỚC PHÒNG PHỎNG VẤN](#phần-6-checklist-5-phút-trước-phòng-phỏng-vấn)

---

## PHẦN 1: TỔNG QUAN VÀ RUBRIC CHẤM ĐIỂM

Giảng viên đánh giá buổi phỏng vấn Assignment 03 theo rubric 4 tiêu chí chuẩn của bộ môn SBA301 (Thang điểm 10):

| Mã tiêu chí | Tên tiêu chí | Trọng số | Yêu cầu chứng minh của sinh viên |
|---|---|:---:|---|
| **C1** | **Problem Understanding & Solution Approach** | **1.5 điểm** | Hiểu rõ bài toán `FUMiniHotel`: các thực thể (`Customer`, `RoomType`, `RoomInformation`, `BookingReservation`, `BookingDetail`), các ràng buộc nghiệp vụ (Public view, JWT auth, Staff properties, Room delete rule), và kiến trúc 3 tầng (Controller -> Service -> Repository). |
| **C2** | **Individual Engineering Process & Personal Git Evidence** | **2.0 điểm** | Chứng minh repository cá nhân trên GitHub (`kyanhkg778/SBA301`), commit history thể hiện quá trình phát triển liên tục: tạo entity -> security JWT -> service logic -> controller -> React UI -> docs. |
| **C3** | **Functional Implementation** | **1.5 điểm** | Khởi động Backend (Spring Boot port 8080) và Frontend (Vite port 5173), demo mượt mà các chức năng CRUD, đặt nhiều phòng cùng lúc, xóa phòng kiểm tra giao dịch, không có lỗi gãy luồng. |
| **C4** | **Code Understanding, Explanation & Adaptation** | **5.0 điểm** *(Trọng tâm)* | Mở đúng file/function khi được hỏi; giải thích dữ liệu, trạng thái, luồng đi từ UI -> Axios -> Controller -> Service -> Repository -> Database; phân tích change impact và sửa code trực tiếp nếu được yêu cầu. |

> **LƯU Ý:** Tiêu chí **C4 chiếm 5/10 điểm** (50%). Mục tiêu chính của buổi phỏng vấn là xác nhận sinh viên thực sự hiểu và làm chủ bài làm của mình. Nếu trả lời rõ ràng, giảng viên có thể không cần yêu cầu live code modification.

---

## PHẦN 2: QUY TRÌNH 5 BƯỚC PHỎNG VẤN THỰC CHIẾN

### Pha 1: Run - Khởi động và kiểm tra nhanh
1. Mở terminal tại `backend` và chạy:
   ```powershell
   mvn spring-boot:run
   ```
   *Điểm nhấn:* Hệ thống tự động kết nối MS SQL Server `A3LamDangKyAnh_SE1910`, tạo bảng theo JPA và nạp dữ liệu mẫu từ `DataInitializer.java`.
2. Mở terminal tại `frontend` và chạy:
   ```powershell
   npm run dev
   ```
   *Điểm nhấn:* Trình duyệt mở `http://localhost:5173`. Ngay tại trang chủ, người dùng xem được ngay danh sách phòng mà **không cần đăng nhập**.

### Pha 2: Personal Git - Chứng minh tiến trình cá nhân
1. Mở GitHub repo: `https://github.com/kyanhkg778/SBA301`
2. Mở lịch sử Commit: Cho giảng viên xem các commit tiêu biểu thể hiện từng giai đoạn xây dựng hệ thống:
   - `chore: initial project setup, root gitignore and backend pom.xml`
   - `feat(backend): configure MS SQL Server datasource and create JPA entities`
   - `feat(security): implement Spring Security 6 and JWT authentication`
   - `feat(service): implement 3-layer service logic with room renting check`
   - `feat(frontend): setup React Vite SPA, Axios JWT interceptors, and UI layout`

### Pha 3: Explain - Trình bày bài toán và kiến trúc
1. **Mục tiêu:** Quản lý khách sạn mini với 2 nhóm người dùng: **Staff** (quản lý phòng, khách hàng, đơn đặt) và **Customer** (đăng ký, đặt phòng trực tuyến 1 hoặc nhiều phòng, xem lịch sử, cập nhật hồ sơ).
2. **Kiến trúc:**
   - **Backend:** Spring Boot 3 chia 3 tầng (`Controller` -> `Service` -> `Repository`), bảo mật bằng `Spring Security` + `JWT Filter` dạng Stateless.
   - **Frontend:** ReactJS chia thành `api/` (Axios interceptor), `context/` (`AuthContext`), `components/` (`Navbar`, `Modal`), và `pages/`.

### Pha 4: Code Interview - Truy vết mã nguồn theo khung chuẩn
Áp dụng **Khung Trả Lời Ngắn 8 Bước**:
$$\text{Purpose} \rightarrow \text{Input} \rightarrow \text{Trigger} \rightarrow \text{Processing} \rightarrow \text{Output} \rightarrow \text{Failure} \rightarrow \text{Why} \rightarrow \text{Change Impact}$$

### Pha 5: Adaptation - Phân tích thay đổi và Live Modification
Khi giảng viên đặt tình huống: *"Nếu muốn thêm chức năng X thì sửa ở đâu?"*
1. Nhắc lại yêu cầu để xác nhận đã hiểu đúng.
2. Nêu ngay các file bị ảnh hưởng (Entity -> DTO -> Service -> Controller -> React Component).
3. Nếu thầy cô yêu cầu sửa code trực tiếp: Mở đúng file, thực hiện thay đổi nhỏ nhất, chạy lại và giải thích kết quả.

---

## PHẦN 3: TRUY VẾT MÃ NGUỒN 5 LUỒNG CỐT LÕI

### Luồng 1: Xem thông tin phòng công khai không cần đăng nhập
- **Mục đích (Purpose):** Khách vãng lai có thể xem và tìm kiếm danh sách phòng mà không cần tài khoản hay JWT Token (theo đúng yêu cầu đề bài Page 5).
- **Điểm bắt đầu (Trigger):** Truy cập trang chủ hoặc gọi `GET /api/rooms`.
- **Cấu hình bảo mật:** Trong `SecurityConfig.java`:
  ```java
  .requestMatchers(HttpMethod.GET, "/api/rooms/**").permitAll()
  .requestMatchers(HttpMethod.GET, "/api/room-types/**").permitAll()
  ```
- **Xử lý (Processing):**
  - `RoomController.getActiveRooms()` -> gọi `RoomService.getActiveRooms()` (hoặc `searchRooms()` nếu có param).
  - `RoomInformationRepository.findByRoomStatus(1)` -> chỉ lấy các phòng đang Active.
- **Kết quả (Output):** Danh sách JSON chứa số phòng, loại phòng, sức chứa, giá thuê/ngày.
- **Xử lý lỗi (Failure):** Nếu không tìm thấy hoặc CSDL gián đoạn, trả về mảng rỗng hoặc lỗi thông báo thân thiện.

---

### Luồng 2: Xác thực JWT kép (Staff từ properties, Customer từ database)
- **Mục đích (Purpose):** Xác thực định danh người dùng qua Email và Mật khẩu, phân quyền `ROLE_STAFF` hoặc `ROLE_CUSTOMER`.
- **Điểm bắt đầu (Trigger):** Gửi `POST /api/auth/login` với `{ email, password }`.
- **Xử lý chính (Processing):**
  - Trong `CustomUserDetailsService.java`:
    ```java
    // 1. Kiểm tra tài khoản Staff cấu hình trong application.properties
    if (staffEmail.equalsIgnoreCase(email)) {
        return UserPrincipal.createStaff(staffEmail, passwordEncoder.encode(staffPassword), staffName);
    }
    // 2. Nếu không phải Staff, truy vấn bảng Customer trong SQL Server
    Customer customer = customerRepository.findByEmailAddress(email)
            .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy tài khoản: " + email));
    return UserPrincipal.createCustomer(customer);
    ```
  - Trong `JwtTokenProvider.java`: Ký và sinh chuỗi JWT token HMAC-SHA256 chứa `sub` (email), `roles`, `isStaff`, và thời hạn `expiration-ms`.
  - Trên Frontend: `axiosInstance.js` lưu token vào `localStorage`, gắn vào header:
    ```javascript
    config.headers.Authorization = `Bearer ${token}`;
    ```
- **Nếu thất bại (Failure):** Sai mật khẩu trả về 401 Unauthorized; tài khoản Customer bị khóa (`CustomerStatus = 0`) bị chặn đăng nhập.

---

### Luồng 3: Quy tắc đặc thù khi Xóa phòng (Room Deletion Rule)
- **Mục đích (Purpose):** Thực hiện đúng yêu cầu đề bài: *"The delete action will delete room information in the case this information is not belong to any renting transaction. If the room information is already stored in a booking detail, just change the status."*
- **Điểm bắt đầu (Trigger):** Staff nhấn nút "Xóa" trên giao diện quản lý phòng -> gọi `DELETE /api/rooms/{id}`.
- **Xử lý cốt lõi (Processing) trong `RoomService.deleteRoom()`:**
  ```java
  // 1. Kiểm tra xem phòng có tồn tại trong bảng BookingDetail hay không
  boolean hasRentingTransaction = bookingDetailRepository.existsByRoomInformation_RoomId(id);

  if (hasRentingTransaction) {
      // Đã từng phát sinh giao dịch thuê -> CHỈ ĐỔI STATUS = 0 (Soft delete)
      room.setRoomStatus(0);
      roomInformationRepository.save(room);
      result.put("deleted", false);
      result.put("statusChanged", true);
  } else {
      // Chưa từng có giao dịch nào -> XÓA HOÀN TOÀN KHỎI CSDL (Physical delete)
      roomInformationRepository.delete(room);
      result.put("deleted", true);
  }
  ```
- **Vì sao thiết kế như vậy?** Để đảm bảo tính toàn vẹn dữ liệu (Referential Integrity) và lưu vết kế toán; tránh lỗi khóa ngoại Foreign Key Constraint Violated khi xóa bản ghi cha mà bản ghi con trong `BookingDetail` vẫn đang tham chiếu.

---

### Luồng 4: Đặt phòng trực tuyến 1 hoặc nhiều phòng (Booking Transaction)
- **Mục đích (Purpose):** Cho phép khách hàng chọn cùng lúc 1 hoặc nhiều phòng, chọn khoảng ngày lưu trú, hệ thống tự động tính thành tiền và lưu đơn đặt.
- **Điểm bắt đầu (Trigger):** Khách hàng chọn các phòng trên giao diện -> nhấn "Xác Nhận Đặt Phòng" -> gọi `POST /api/bookings`.
- **Dữ liệu vào (Input):**
  ```json
  {
    "customerId": 1,
    "bookingDate": "2026-11-04",
    "items": [
      { "roomId": 1, "startDate": "2026-11-10", "endDate": "2026-11-12" },
      { "roomId": 3, "startDate": "2026-11-10", "endDate": "2026-11-12" }
    ]
  }
  ```
- **Xử lý (Processing) trong `BookingService.createBooking()`:**
  - Tạo `BookingReservation` lưu thông tin chung.
  - Duyệt qua từng phòng trong `items`:
    - Tính số ngày: `days = ChronoUnit.DAYS.between(startDate, endDate)`.
    - Tính giá phòng: `actualPrice = roomPricePerDay * days`.
    - Tạo `BookingDetail` với Composite Key `(BookingReservationID, RoomID)`.
    - Cộng dồn vào `totalPrice`.
  - Lưu đồng bộ cả Reservation và các Details với `@Transactional`.

---

### Luồng 5: Quản lý hồ sơ cá nhân và Lịch sử đặt phòng
- **Mục đích (Purpose):** Khách hàng tự theo dõi lịch sử đặt phòng của mình và cập nhật thông tin cá nhân.
- **Lịch sử đặt phòng (`GET /api/bookings/my-history`):**
  - Trích xuất `UserPrincipal.getId()` từ JWT Token.
  - Truy vấn `bookingReservationRepository.findByCustomer_CustomerIdOrderByBookingDateDesc(id)`.
  - Trả về danh sách đơn kèm các phòng và trạng thái (1: Confirmed, 2: Completed, 0: Cancelled).
- **Cập nhật Profile (`PUT /api/customer/profile`):**
  - Cập nhật Họ tên, Điện thoại, Ngày sinh.
  - Nếu nhập `newPassword`: kiểm tra độ dài $\ge 6$ ký tự, mã hóa lại bằng `passwordEncoder.encode(newPassword)`.

---

## PHẦN 4: BỘ CÂU HỎI PHỎNG VẤN CHUYÊN SÂU & ĐÁP ÁN CHUẨN

#### Q1: Vì sao hệ thống dùng JWT thay vì Session Cookie truyền thống?
> **Trả lời:** JWT hoạt động theo cơ chế **Stateless (phi trạng thái)**. Server không cần lưu Session ID trong RAM, giúp hệ thống mở rộng linh hoạt (Scalability). Client ReactJS chỉ cần lưu JWT và gửi kèm header `Authorization: Bearer <token>`, hoàn toàn tách biệt giữa Frontend và Backend RESTful API.

#### Q2: Tài khoản Staff được lấy từ đâu theo yêu cầu đề bài?
> **Trả lời:** Theo yêu cầu tại trang 5 của đề bài: *"The Staff account will get from application.properties file"*. Em đã cấu hình các thuộc tính `hotel.staff.email` và `hotel.staff.password` trong file `application.properties`. Khi người dùng đăng nhập, `CustomUserDetailsService` kiểm tra email đầu tiên, nếu trùng thì cấp quyền `ROLE_STAFF`.

#### Q3: Khóa chính của bảng BookingDetail được cấu hình như thế nào trong JPA?
> **Trả lời:** Bảng `BookingDetail` sử dụng **Composite Primary Key (Khóa chính kết hợp)** gồm 2 cột: `BookingReservationID` và `RoomID`. Em triển khai bằng lớp `@Embeddable BookingDetailId implements Serializable` kết hợp với chú thích `@EmbeddedId` và `@MapsId` trên hai quan hệ `@ManyToOne`.

#### Q4: Khi xóa phòng, tại sao phòng 101 chỉ đổi trạng thái mà phòng 102 lại xóa hẳn khỏi CSDL?
> **Trả lời:** Vì phòng 101 đã nằm trong đơn đặt phòng mẫu (có bản ghi trong `BookingDetail`), hệ thống tuân thủ nghiệp vụ của đề bài: chỉ chuyển `RoomStatus = 0 (Inactive)` để không làm hỏng lịch sử thuê. Còn phòng 102 chưa từng có ai thuê nên hệ thống thực hiện lệnh `delete()` xóa vĩnh viễn khỏi CSDL.

#### Q5: Trong React, làm thế nào để các request tự động gửi kèm JWT Token?
> **Trả lời:** Em sử dụng **Axios Request Interceptor** trong file `axiosInstance.js`. Trước khi mọi HTTP request được gửi đi, Interceptor sẽ đọc token từ `localStorage.getItem('token')` và tự động gắn vào Header `Authorization: Bearer <token>`. Nếu server trả về lỗi `401 Unauthorized`, Response Interceptor sẽ tự động xóa token và chuyển người dùng về trang đăng nhập.

---

## PHẦN 5: KỊCH BẢN LIVE MODIFICATION NẾU ĐƯỢC YÊU CẦU

### Tình huống 1: "Thêm điều kiện khách hàng phải từ 18 tuổi trở lên khi đăng ký"
- **File cần chỉnh:** `backend/.../dto/RegisterRequest.java` hoặc `AuthService.java`.
- **Cách làm:** Thêm kiểm tra logic:
  ```java
  if (Period.between(request.getCustomerBirthday(), LocalDate.now()).getYears() < 18) {
      throw new BadRequestException("Khách hàng phải từ 18 tuổi trở lên để đăng ký tài khoản.");
  }
  ```

### Tình huống 2: "Khách hàng có thể hủy đơn đặt phòng của chính mình"
- **File cần chỉnh:** `BookingController.java` và `BookingService.java`.
- **Cách làm:** Thêm endpoint `PUT /api/bookings/{id}/cancel`:
  ```java
  @PutMapping("/api/bookings/{id}/cancel")
  public ResponseEntity<?> cancelBooking(@PathVariable Long id, @AuthenticationPrincipal UserPrincipal user) {
      bookingService.cancelBooking(id, user.getId());
      return ResponseEntity.ok(Map.of("message", "Đã hủy đơn đặt phòng thành công."));
  }
  ```
  Trong service: kiểm tra đơn thuộc về `userId`, cập nhật `BookingStatus = 0`.

### Tình huống 3: "Thay đổi thời hạn sống của JWT Token từ 24h thành 1h"
- **File cần chỉnh:** `backend/src/main/resources/application.properties`.
- **Cách làm:** Đổi giá trị:
  ```properties
  hotel.jwt.expiration-ms=3600000
  ```

---

## PHẦN 6: CHECKLIST 5 PHÚT TRƯỚC PHÒNG PHỎNG VẤN

- [x] **Database:** MS SQL Server đang chạy, cơ sở dữ liệu `A3LamDangKyAnh_SE1910` có đủ 5 bảng: `Customer`, `RoomType`, `RoomInformation`, `BookingReservation`, `BookingDetail`.
- [x] **Backend:** Chạy lệnh `mvn spring-boot:run` tại thư mục `backend`, kiểm tra port 8080 khởi động thành công.
- [x] **Frontend:** Chạy lệnh `npm run dev` tại thư mục `frontend`, mở `http://localhost:5173`.
- [x] **Tài khoản Demo:**
  - Staff: `staff@fuminihotel.com` / `staff123`
  - Customer: `customer@fuminihotel.com` / `123456`
- [x] **GitHub Repo:** Mở sẵn trang repo `https://github.com/kyanhkg778/SBA301` và tab Commits để sẵn sàng chứng minh tiến trình phát triển cá nhân theo tiêu chí C2.
- [x] **Tự tin & Rõ ràng:** Trả lời theo khung chuẩn, nêu bật được việc giải quyết bài toán và bảo mật RESTful API với Spring Boot 3 và JWT.
