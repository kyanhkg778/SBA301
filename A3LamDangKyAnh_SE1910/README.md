# Assignment 03 SBA301 - Securing REST Services with Spring Boot
## FUMiniHotel Management System

- **Sinh viên thực hiện:** Lâm Đặng Kỳ Anh
- **Mã số sinh viên / Lớp:** SE1910
- **Tên cơ sở dữ liệu (Database):** `A3LamDangKyAnh_SE1910`
- **Dự án Backend (Spring Boot 3):** `A3LamDangKyAnh_SE1910` (Thư mục `backend/`)
- **Dự án Frontend (ReactJS Client):** `a3lamdangkyanh_se1910` (Thư mục `frontend/`)

---

## 1. Tổng Quan Dự Án & Yêu Cầu Đề Bài

Hệ thống quản lý khách sạn mini **FUMiniHotel Management System** được xây dựng theo kiến trúc 3 tầng (3-Layer with Repository Architecture) chuẩn doanh nghiệp, bảo mật toàn diện bằng **JSON Web Token (JWT)** và **Spring Security 6**, kết nối cơ sở dữ liệu **Microsoft SQL Server**.

### Các Yêu Cầu Nghiệp Vụ Cốt Lõi:
1. **Truy cập công khai không cần đăng nhập (Public Room View):**
   - Đề bài: *"Do not need authentication to view the room information in this system."*
   - Bất kỳ ai cũng có thể tra cứu danh sách phòng, lọc theo loại phòng, mức giá, và xem chi tiết phòng.
2. **Xác thực và Phân quyền linh hoạt bằng JWT (Authentication & Authorization):**
   - Đề bài: *"Customer authentication by Email and Password using JSON Web Token. The Staff account will get from application.properties file."*
   - Tài khoản **Staff**: Được cấu hình trực tiếp từ `application.properties` (`staff@fuminihotel.com` / `staff123`).
   - Tài khoản **Customer**: Lưu trữ trong bảng `Customer` của CSDL SQL Server, mật khẩu được mã hóa an toàn bằng thuật toán `BCrypt`.
3. **Quy tắc đặc thù khi Xóa phòng của Staff (Room Deletion Rule):**
   - Đề bài: *"The delete action will delete room information in the case this information is not belong to any renting transaction. If the room information is already stored in a booking detail, just change the status."*
   - Nếu phòng **chưa từng có đơn đặt** (không tồn tại trong bảng `BookingDetail`): Hệ thống thực hiện xóa vật lý (Physical delete) vĩnh viễn khỏi CSDL.
   - Nếu phòng **đã từng có đơn đặt** (đã tồn tại trong `BookingDetail`): Hệ thống ngăn chặn xóa vật lý, tự động chuyển `RoomStatus = 0 (Inactive)` nhằm bảo toàn tính toàn vẹn dữ liệu kế toán và lịch sử giao dịch.
4. **Quyền hạn của vai trò Customer:**
   - Đăng ký tài khoản mới (`Register an account`).
   - Đặt phòng trực tuyến hỗ trợ chọn cùng lúc **1 hoặc NHIỀU phòng** (`Create an online booking reservation with one or many rooms' information`).
   - Quản lý hồ sơ cá nhân và đổi mật khẩu (`Manage his/her the profile`).
   - Tra cứu toàn bộ lịch sử đơn đặt phòng của bản thân (`View booking reservation history`).
5. **Quyền hạn của vai trò Staff:**
   - Quản lý khách hàng: Thêm, sửa, xóa, tìm kiếm (`Manage customer information`).
   - Quản lý phòng: Thêm, sửa, xóa an toàn (`Manage room information`).
   - Quản lý đơn đặt phòng: Xem chi tiết đơn gồm danh sách phòng, cập nhật trạng thái đơn (Confirmed / Completed / Cancelled), tạo đơn đặt phòng offline (`Manage booking reservation includes booking details`).

---

## 2. Tài Khoản Thử Nghiệm (Demo Credentials)

| Vai trò | Email đăng nhập | Mật khẩu | Nguồn tài khoản | Quyền hạn chính |
|---|---|---|---|---|
| **Staff** | `staff@fuminihotel.com` | `staff123` | File `application.properties` | Quản lý Khách hàng, Phòng (Xóa an toàn), Quản lý Đơn đặt phòng |
| **Customer** | `customer@fuminihotel.com` | `123456` | CSDL MS SQL Server (Bảng `Customer`) | Đặt phòng online (1 hoặc nhiều phòng), Xem lịch sử, Đổi hồ sơ |
| **Customer 2** | `mai.tran@gmail.com` | `123456` | CSDL MS SQL Server (Bảng `Customer`) | Khách hàng thành viên |

*(Giao diện trang Đăng nhập có tích hợp sẵn 2 nút bấm hỗ trợ giảng viên điền nhanh thông tin tài khoản Demo).*

---

## 3. Kiến Trúc Cơ Sở Dữ Liệu (Database Schema)

Cơ sở dữ liệu: `A3LamDangKyAnh_SE1910` trên Microsoft SQL Server gồm 5 bảng chuẩn hóa:
1. **`Customer`**: `CustomerID` (PK, Identity), `CustomerFullName`, `Telephone`, `EmailAddress` (Unique), `CustomerBirthday`, `CustomerStatus`, `Password`.
2. **`RoomType`**: `RoomTypeID` (PK, Identity), `RoomTypeName`, `TypeDescription`, `TypeNote`.
3. **`RoomInformation`**: `RoomID` (PK, Identity), `RoomNumber`, `RoomDetailDescription`, `RoomMaxCapacity`, `RoomTypeID` (FK), `RoomStatus`, `RoomPricePerDay`.
4. **`BookingReservation`**: `BookingReservationID` (PK, Identity), `BookingDate`, `TotalPrice`, `CustomerID` (FK), `BookingStatus`.
5. **`BookingDetail`**: Khóa chính hỗn hợp Composite Key (`BookingReservationID`, `RoomID`), `StartDate`, `EndDate`, `ActualPrice`.

---

## 4. Hướng Dẫn Cài Đặt & Khởi Chạy Hệ Thống

### Yêu Cầu Môi Trường:
- **Java Development Kit (JDK):** Phiên bản 21 trở lên.
- **Apache Maven:** Phiên bản 3.9 trở lên.
- **Node.js:** Phiên bản 18 trở lên & npm.
- **Microsoft SQL Server:** Đang chạy tại `localhost:1433` với tài khoản `sa` / `123456`.

---

### Bước 1: Khởi Động Backend RESTful API (Spring Boot 3)
```powershell
cd backend
mvn spring-boot:run
```
- API Server sẽ khởi động tại: `http://localhost:8080`.
- Spring Data JPA và Hibernate sẽ tự động khởi tạo các bảng và nạp sẵn dữ liệu mẫu (`DataInitializer`).

---

### Bước 2: Khởi Động Frontend Client (ReactJS + Vite)
Mở một cửa sổ Terminal mới:
```powershell
cd frontend
npm install
npm run dev
```
- Ứng dụng web ReactJS sẽ chạy tại: `http://localhost:5173`.
- Mở trình duyệt web và truy cập `http://localhost:5173`.

---

## 5. Danh Mục RESTful API Endpoints

| Nhóm chức năng | Phương thức | Endpoint | Thẩm quyền | Mô tả chi tiết |
|---|---|---|---|---|
| **Xác thực (Auth)** | `POST` | `/api/auth/login` | Public | Đăng nhập cấp phát JWT Token (cả Staff & Customer) |
| | `POST` | `/api/auth/register` | Public | Khách hàng đăng ký tài khoản thành viên mới |
| | `GET` | `/api/auth/me` | Authenticated | Lấy thông tin phiên đăng nhập hiện tại |
| **Phòng (Rooms)** | `GET` | `/api/rooms` | Public | Xem danh sách phòng hoạt động & tìm kiếm (không cần login) |
| | `GET` | `/api/rooms/{id}` | Public | Xem chi tiết 1 phòng |
| | `GET` | `/api/rooms/manage/all`| Staff | Xem toàn bộ danh sách phòng (kèm phòng inactive) |
| | `POST` | `/api/rooms` | Staff | Thêm phòng mới |
| | `PUT` | `/api/rooms/{id}` | Staff | Sửa thông tin phòng |
| | `DELETE`| `/api/rooms/{id}` | Staff | Xóa phòng (Tự động kiểm tra BookingDetail: Soft delete nếu đã có giao dịch, Hard delete nếu chưa) |
| **Loại phòng** | `GET` | `/api/room-types` | Public | Xem danh mục loại phòng (Standard, Deluxe, Suite, ...) |
| **Khách hàng (Staff)**| `GET` | `/api/staff/customers` | Staff | Danh sách và tìm kiếm khách hàng |
| | `POST` | `/api/staff/customers` | Staff | Tạo mới khách hàng |
| | `PUT` | `/api/staff/customers/{id}`| Staff | Cập nhật khách hàng |
| | `DELETE`| `/api/staff/customers/{id}`| Staff | Xóa khách hàng (kiểm tra đơn đặt phòng) |
| **Khách hàng (Profile)**| `GET` | `/api/customer/profile`| Customer | Xem thông tin hồ sơ của bản thân |
| | `PUT` | `/api/customer/profile`| Customer | Cập nhật thông tin và đổi mật khẩu cá nhân |
| **Đặt phòng (Booking)**| `POST` | `/api/bookings` | Customer/Staff | Đặt phòng (chọn 1 hoặc NHIỀU phòng, tính giá tự động) |
| | `GET` | `/api/bookings/my-history`| Customer | Xem lịch sử các đơn đặt phòng của bản thân |
| | `GET` | `/api/staff/bookings` | Staff | Quản lý toàn bộ đơn đặt phòng của hệ thống |
| | `GET` | `/api/bookings/{id}` | Cust/Staff | Xem chi tiết 1 đơn đặt phòng kèm danh sách phòng |
| | `PUT` | `/api/staff/bookings/{id}/status`| Staff | Cập nhật trạng thái đơn (Confirmed, Completed, Cancelled)|

---

## 6. Kiểm Thử Với Postman
Tệp cấu hình Postman Collection đã được tạo sẵn tại:
`docs/FUMiniHotel_Postman_Collection.json`

Giảng viên hoặc người đánh giá có thể mở ứng dụng Postman -> chọn **Import** -> chọn tệp JSON trên để kiểm thử toàn diện các endpoint với dữ liệu mẫu có sẵn.

