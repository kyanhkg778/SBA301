# SBA301 Slot 20 - Integrate React SPA with Spring Boot REST API

## 1. Tổng Quan (Overview)
Bài thực hành **Slot 20** hiện thực hóa mục tiêu cốt lõi của môn học **SBA301**: **Tích hợp ứng dụng Single Page Application (React) với dịch vụ Backend RESTful API (Spring Boot)**, bao gồm cấu hình chia sẻ tài nguyên nguồn gốc chéo (**CORS**) và phân tách kiến trúc Client - Server.

## 2. Cấu Trúc Dự Án (Project Structure)
```text
Slot20/demo_slot20/
├── backend/                  # Spring Boot 3 + Spring Data JPA + SQL Server
│   ├── src/main/java/com/example/orchid/
│   │   ├── config/WebConfig.java           # Cấu hình CORS cho Frontend
│   │   ├── controllers/OrchidController.java # REST Controller (/api/orchids)
│   │   ├── pojos/                          # Orchid & OrchidCategory entities
│   │   ├── repositories/                   # JPA Repositories
│   │   └── services/                       # OrchidService & IOrchidService
│   ├── src/main/resources/application.properties
│   └── pom.xml
│
└── frontend/                 # React SPA + Vite + Axios
    ├── src/
    │   ├── api/httpClient.js               # Cấu hình Axios instance & baseURL
    │   ├── api/orchidApi.js                # Service gọi API Backend
    │   ├── components/ListOfOrchids.jsx    # Component fetch & hiển thị danh sách
    │   ├── App.jsx
    │   └── main.jsx
    ├── .env                                # Biến môi trường VITE_API_BASE_URL
    └── package.json
```

## 3. Kiến Trúc Tích Hợp (Integration Architecture)
1. **Frontend (React SPA):**
   - Chạy trên cổng `http://localhost:5173`.
   - Sử dụng `axios` đóng gói trong [httpClient.js](file:///d:/Ky7_FA2026/SBA301/Slot20/demo_slot20/frontend/src/api/httpClient.js) với `baseURL: "http://localhost:8080/api"`.
   - Gọi bất đồng bộ qua [orchidApi.js](file:///d:/Ky7_FA2026/SBA301/Slot20/demo_slot20/frontend/src/api/orchidApi.js) trong Hook `useEffect` của [ListOfOrchids.jsx](file:///d:/Ky7_FA2026/SBA301/Slot20/demo_slot20/frontend/src/components/ListOfOrchids.jsx) với cờ `active` chống race condition, quản lý trạng thái `loading`, `error`, và `orchids`.

2. **Backend (Spring Boot REST API):**
   - Chạy trên cổng `http://localhost:8080`.
   - Cấu hình CORS tại [WebConfig.java](file:///d:/Ky7_FA2026/SBA301/Slot20/demo_slot20/backend/src/main/java/com/example/orchid/config/WebConfig.java) cho phép origin `http://localhost:5173` gọi các method `GET`, `POST`, `PUT`, `DELETE`, `OPTIONS`.
   - Kết nối cơ sở dữ liệu Microsoft SQL Server (`OrchidDB`).

## 4. Hướng Dẫn Khởi Chạy Hệ Thống

### Bước 1: Khởi động Backend (Spring Boot)
```bash
cd Slot20/demo_slot20/backend
mvn spring-boot:run
```
Backend sẽ lắng nghe tại: `http://localhost:8080/api/orchids`

### Bước 2: Khởi động Frontend (React SPA)
```bash
cd Slot20/demo_slot20/frontend
npm install
npm run dev
```
Truy cập giao diện React tại: `http://localhost:5173/` để xem danh sách hoa lan được load trực tiếp từ Spring Boot backend!
