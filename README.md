# SBA301 - Integrate Single Page Application with Spring Boot

**Sinh viên:** Lâm Đăng Kỳ Anh  
**Mã số sinh viên (MSSV):** CE190574  
**Lớp:** SE1910  
**Mã môn học:** SBA301  
**Kho lưu trữ (Repository):** [kyanhkg778/SBA301](https://github.com/kyanhkg778/SBA301)  

---

## 📋 Mục Lục Tổng Quan

| Slot / Lab | Dự Án / Bài Thực Hành | Thư Mục | Công Nghệ Chính | Trạng Thái |
| :--- | :--- | :--- | :--- | :--- |
| **Assignment 01** | FUNewsManagementSystem Admin Portal | `LamDangKyAnh_SE1910/` | React 18, Vite, CRUD + Search, Modal, Auth | ✅ Build Success (Full Scope) |
| **Slot 02** | ReactJS Fundamentals Dashboard | `Slot2/` | React 18, Vite, JSX, Components | ✅ Build Success |
| **Slot 03** | Orchid Explorer Dashboard | `Slot3/` | React 18, React-Bootstrap, Bootstrap 5 | ✅ Build Success |
| **Slot 04** | Interactive Orchid Explorer | `Slot4/` | React 18, Props, State, Context API | ✅ Build Success |
| **Slot 05** | Campus Event Explorer & Lab 01 | `Slot5/event-hub/`<br>`Slot5/lab1/` | React-Bootstrap, Collection Rendering, Modal | ✅ Build Success |
| **Slot 06** | React Hook Product Manager | `Slot6/` | Hooks, Custom Hooks, LocalStorage | ✅ Build Success |
| **Slot 07** | Campus Event Navigator | `Slot7/` | React Router DOM v6, Dynamic Routes | ✅ Build Success |
| **Slot 08** | Product REST API Design & Mock | `Slot8/` | Node.js, json-server, REST, Postman | ✅ Verified |
| **Slot 09** | Fetching & Caching with Axios | `Slot9/` | Axios, TTL Cache Layer, Async Trace | ✅ Build Success |
| **Slot 10** | Orchid Router SPA | `Slot10/` | React Router DOM v6, Nested Layouts | ✅ Build Success |
| **Lab 02** | Orchid Gallery Single Page App | `Lab2/orchid-gallery-spa/` | React 18, React-Bootstrap, Modal, Shared Data | ✅ Build Success |
| **Slot 12** | REST Fundamentals & API Contract | `Slot12/slot12-rest-design/` | Spring Boot 3, Java 21, REST Contract | ✅ Build Success |
| **Slot 13** | News REST API 3-Layer CRUD | `Slot13/slot13-rest-api/` | Spring Boot 3, 3-Layer Architecture, Advice | ✅ Build Success |
| **Slot 14** | OpenAPI / Swagger Documentation | `Slot14/slot14-openapi-demo/` | Spring Boot 3, Springdoc OpenAPI 3, UI | ✅ Build Success |
| **Slot 15** | Versioning, Paging & Sorting | `Slot15/slot15-news-paging-api/` | Spring Data JPA, H2, Page/Slice, Versioning | ✅ Build Success |
| **Slot 16** | REST API Testing with MockMvc | `Slot16/slot16-testing-mockmvc/` | MockMvc, JUnit 5, Mockito, @DataJpaTest | ✅ 12/12 Tests PASS |
| **Slot 17** | FUNews JPA Domain Entities & Repository | `Slot17/slot17-funews-demo/` | Spring Boot 3, Java 21, JPA, H2, 1-N Mapping | ✅ Build Success |

---

## 🚀 Chi Tiết Các Bài Thực Hành Theo Slot & Lab

### 0. Assignment 01 - FUNewsManagementSystem Admin Portal
- **Thư mục:** `LamDangKyAnh_SE1910/`
- **Công nghệ:** React 18, Vite, React-Bootstrap, Bootstrap 5, LocalStorage Persistence.
- **Tài khoản kiểm thử:** `Admin` / `Admin` (Toàn quyền quản trị), `Staff` / `Staff` (Biên tập viên).
- **Thành phần & Tính năng:**
  - `LoginPage.jsx`: Đăng nhập phân quyền với form kiểm soát (controlled inputs), xác thực lỗi và nút bấm điền nhanh tiện lợi cho chấm bài.
  - `AdminLayout.jsx`: Master layout chuẩn SaaS kết hợp Header, Sidebar và vùng hiển thị nội dung động.
  - `Sidebar.jsx`: Logo AI vector, menu điều hướng 5 phân vùng (`Dashboard`, `Category`, `News`, `Users`, `Settings`), trạng thái active mượt mà.
  - `Header.jsx`: Chuyển đổi theme Sáng/Tối, hiển thị avatar + role badge, nút đăng xuất an toàn.
  - `DashboardPage.jsx`: 4 thẻ thống kê tổng quan (bài báo, danh mục, người dùng, hệ thống), danh sách tin mới và thao tác nhanh.
  - `CategoryManagement.jsx` & `CategoryModal.jsx`: Toàn diện CRUD + Tìm kiếm danh mục, modal thêm/sửa, dialog xác nhận xóa.
  - `NewsManagement.jsx` & `NewsModal.jsx`: Toàn diện CRUD + Tìm kiếm bài báo, dropdown danh mục, trạng thái xuất bản, nhãn tags.
  - `UserManagement.jsx` & `UserModal.jsx`: Toàn diện CRUD + Tìm kiếm người dùng, phân quyền Admin/Staff, cơ chế bảo vệ không xóa chính mình.
  - `SettingsPage.jsx`: Hồ sơ cá nhân, tùy chỉnh Dark/Light mode, nút khôi phục dữ liệu mẫu ban đầu (Reset Seed Data).
  - `DeleteConfirmModal.jsx`: Hộp thoại xác nhận xóa độc lập, đảm bảo an toàn dữ liệu.
  - `storageService.js`: Lớp dịch vụ quản lý đọc/ghi `localStorage`, không mất dữ liệu khi tải lại trang (F5).
- **Kiểm thử & Báo cáo:** Tài liệu `LamDangKyAnh_SE1910/README.md` đầy đủ 35 test cases đạt 100% PASS, 3 debug logs, nhật ký dùng AI và hướng dẫn trả lời phỏng vấn theo rubric 10.0.
- **Cách chạy:** `cd LamDangKyAnh_SE1910 && npm install && npm run dev` (Kiểm tra build: `npm run build`).

---

### 1. Slot 02 - ReactJS Fundamentals & Component Composition
- **Thư mục:** `Slot2/`
- **Công nghệ:** React 18, Vite, Functional Components, Component Composition.
- **Thành phần & Tính năng:**
  - `CourseHeader.jsx`: Banner thông tin môn học SBA301 và chủ đề bài học.
  - `StudentProfile.jsx`: Thẻ thông tin cá nhân sinh viên, nhóm và vai trò phát triển.
  - `EnvironmentStatus.jsx`: Badge hiển thị trạng thái sẵn sàng của môi trường phát triển (Node.js, npm, IntelliJ, Vite, Git).
  - `LearningChecklist.jsx`: Danh sách checklist các kiến thức nền tảng React đã hoàn thành.
  - `ProjectSummary.jsx`: Tóm tắt dự án nhóm thực hành.
  - `ArchitectureFlow.jsx`: Sơ đồ kiến trúc luồng tương tác giữa SPA và Spring Boot.
  - `src/data/dashboardData.js`: Module hóa toàn bộ dữ liệu cấu hình và trạng thái.
- **Cách chạy:** `cd Slot2 && npm install && npm run dev` (Kiểm tra build: `npm run build`).

---

### 2. Slot 03 - React Component Architecture & React-Bootstrap
- **Thư mục:** `Slot3/`
- **Dự án:** **Orchid Explorer Dashboard**
- **Công nghệ:** React 18, React-Bootstrap, Bootstrap 5.
- **Thành phần & Tính năng:**
  - `AppNavbar.jsx`: Thanh điều hướng Responsive (Navbar, Container, Nav).
  - `HeroSection.jsx`: Banner chào mừng với visual hiện đại và nút Call-to-Action.
  - `QuickStats.jsx`: 3 thẻ thống kê tổng quan (Total Species, Featured Orchids, Regions Covered).
  - `OrchidGallery.jsx`: Grid 6 giống hoa lan (Purple Star, Pink Dawn, White Cloud, Golden Sun, Amber Wing, Blue Mist) kết hợp vector SVG độc lập tại `public/images/`.
  - `CareTips.jsx`: 3 khối hướng dẫn chăm sóc cơ bản (Light, Water, Airflow).
  - `LearningAlert.jsx`: Thông điệp cảnh báo kiến trúc làm cầu nối sang Slot 04.
- **Cách chạy:** `cd Slot3 && npm install && npm run dev`.

---

### 3. Slot 04 - Props, State, Hooks & Context
- **Thư mục:** `Slot4/`
- **Dự án:** **Interactive Orchid Explorer**
- **Công nghệ:** React 18, Props, State (`useState`), React Context (`useContext`).
- **Thành phần & Tính năng:**
  - Tái sử dụng component `OrchidCard.jsx` nhận dữ liệu qua `orchid` prop.
  - Bật/tắt Modal xem chi tiết hoa lan bằng state cục bộ `showDetail` (`OrchidModal.jsx`).
  - Đánh dấu hoa lan yêu thích độc lập cho từng thẻ (`isFavorite`).
  - Bộ lọc tìm kiếm theo tên, danh mục và switch lọc danh sách đặc biệt (`specialOnly`).
  - Dữ liệu hiển thị `visibleOrchids` được tính toán dưới dạng **derived data** tránh dư thừa state.
  - Quản lý và chia sẻ thông tin người dùng qua `UserContext.Provider`.
- **Cách chạy:** `cd Slot4 && npm install && npm run dev`.

---

### 4. Slot 05 - Integrated React Lab 01 & Campus Event Hub
- **Thư mục:** `Slot5/`
- **Bao gồm 2 dự án con:**
  1. **EventHub - Campus Event Explorer** (`Slot5/event-hub/`):
     - Dữ liệu 8 sự kiện sinh viên đại học trong `src/data/events.js`.
     - Lọc sự kiện theo danh mục dropdown, lọc sự kiện nổi bật (`featuredOnly`), tìm kiếm theo từ khóa.
     - Modal chi tiết hiển thị ngày, địa điểm và số lượng ghế trống còn lại.
     - Giao diện Empty State kèm nút **Reset Filters** tiện dụng.
  2. **Lab 01 - Orchid Explorer SPA** (`Slot5/lab1/`):
     - Hoàn thiện bài thực hành Lab 01 theo chuẩn giáo trình.
     - Tích hợp `UserContext`, component `OrchidExplorer`, `OrchidCard`, responsive grid.
- **Cách chạy:**
  - EventHub: `cd Slot5/event-hub && npm install && npm run dev`
  - Lab 01: `cd Slot5/lab1 && npm install && npm run dev`

---

### 5. Slot 06 - React Hooks Comprehensive
- **Thư mục:** `Slot6/`
- **Dự án:** **React Hook Product Manager**
- **Công nghệ:** `useState`, `useEffect`, `useContext`, `useRef`, Custom Hook `useLocalStorage`, Custom Hook `useProductFilter`.
- **Thành phần & Tính năng:**
  - **Full Frontend CRUD**: Thêm, sửa, xóa sản phẩm cập nhật bất biến (immutable updates).
  - **Controlled Form & Validation**: Kiểm tra tính hợp lệ dữ liệu tên, danh mục, giá (> 0), số lượng (>= 0).
  - **Custom Hook `useLocalStorage`**: Tự động đồng bộ hóa kho sản phẩm và theme vào `localStorage`.
  - **ThemeContext**: Đổi giao diện Dark / Light toàn ứng dụng.
  - **useRef DOM Focus**: Tự động trỏ con trỏ vào ô tìm kiếm khi tải trang hoặc nhấn nút "Focus".
  - **Thống kê kho hàng**: Tính tổng số loại sản phẩm, tổng tồn kho và tổng giá trị tồn kho bằng `reduce`.
  - **Side Effects**: Cập nhật tiêu đề trang `document.title` theo số lượng sản phẩm; thông báo tự động ẩn sau 2.5 giây với cleanup timer.
- **Cách chạy:** `cd Slot6 && npm install && npm run dev`.

---

### 6. Slot 07 - React Router & Navigation
- **Thư mục:** `Slot7/`
- **Dự án:** **Campus Event Navigator**
- **Công nghệ:** `react-router-dom` v6, SPA Navigation.
- **Thành phần & Tính năng:**
  - Cấu hình điều hướng với `BrowserRouter`, `Routes`, `Route`.
  - Điều hướng bằng `Link`, `NavLink` và điều hướng theo logic bằng `useNavigate` (bao gồm nút quay lại `navigate(-1)`).
  - Dynamic Route `/events/:id` trích xuất tham số URL bằng `useParams()`.
  - Xử lý lỗi 2 tầng: Tuyến đường không tồn tại 404 (Wildcard `*` -> `NotFound.jsx`) và Tài nguyên không tìm thấy (ID hợp lệ cú pháp nhưng không có dữ liệu sự kiện).
- **Cách chạy:** `cd Slot7 && npm install && npm run dev`.

---

### 7. Slot 08 - Client-Server, HTTP, JSON & Mock REST API
- **Thư mục:** `Slot8/`
- **Dự án:** **Product REST API Design and Inspection Kit**
- **Công nghệ:** Node.js, `json-server`, REST Contract, Postman, Browser DevTools.
- **Thành phần & Tính năng:**
  - `db.seed.json` & `db.json`: Cơ sở dữ liệu mẫu cho tài nguyên sản phẩm.
  - `scripts/reset-db.js`: Script khôi phục dữ liệu gốc tự động sau các bài kiểm thử ghi dữ liệu (`POST`, `PUT`, `DELETE`).
  - `scripts/parse-json-demo.js`: Thực hành chuyển đổi chuỗi JSON và JavaScript Object (`JSON.parse`, `JSON.stringify`).
  - `docs/api-contract.md`: Tài liệu hợp đồng API chi tiết mô tả URL, HTTP method, header, request body, response schema và status code.
  - `SBA301_Slot8_Product_API.postman_collection.json`: Bộ sưu tập Postman kiểm thử đầy đủ các kịch bản CRUD.
- **Cách chạy:**
  - Khởi động Mock API: `cd Slot8 && npm install && npm run api` (Base URL: `http://localhost:3001/products`)
  - Chạy demo JSON: `npm run json-demo`
  - Reset database: `npm run reset-db`

---

### 8. Slot 09 - Fetching & Caching Data with Axios & Async Execution
- **Thư mục:** `Slot9/`
- **Dự án:** **User Management & Async Trace Demo**
- **Công nghệ:** React 18, Axios, In-Memory TTL Cache Layer, React-Bootstrap.
- **Thành phần & Tính năng:**
  - `AsyncTraceDemo.jsx`: Demo trực quan hóa luồng thực thi bất đồng bộ trong JavaScript, thứ tự phân giải Promise và cơ chế Event Loop.
  - `UserList.jsx`: Bảng điều khiển người dùng gọi dữ liệu từ REST API ngoài, xử lý trạng thái Loading / Error, tìm kiếm và phân trang.
  - `apiClient.js`: Cấu hình Axios instance tập trung với baseURL, headers và request/response interceptors.
  - `cacheService.js`: Lớp caching bộ nhớ với cơ chế TTL (Time To Live), theo dõi cache hit/miss và nút xóa cache chủ động.
  - `userService.js`: Phân tách tầng service, so sánh hiệu năng giữa gọi trực tiếp qua mạng và truy xuất qua bộ nhớ đệm.
- **Cách chạy:** `cd Slot9 && npm install && npm run dev`.

---

### 9. Slot 10 - Orchid Router SPA & Lab 02 Bridge
- **Thư mục:** `Slot10/`
- **Dự án:** **Orchid Router SPA**
- **Công nghệ:** React 18, React-Bootstrap, React Router DOM v6, Nested Layouts, URL State.
- **Thành phần & Tính năng:**
  - Cấu trúc layout lồng nhau: `MainLayout` bọc ứng dụng với `<Outlet />` và `DashboardLayout` cho khu vực quản trị.
  - Bản đồ route hoàn chỉnh: `/`, `/orchids`, `/orchids/:id`, `/about`, `/contact`, `/dashboard` (nested: index, favorites, profile), và trang 404 wildcard.
  - Đồng bộ bộ lọc danh mục trực tiếp lên Query String bằng `useSearchParams`.
  - Form liên hệ xử lý submit và điều hướng tự động về trang chủ.
- **Cách chạy:** `cd Slot10 && npm install && npm run dev`.

---

### 10. Lab 02 - Orchid Gallery Single Page Application
- **Thư mục:** `Lab2/orchid-gallery-spa/`
- **Dự án:** **Orchid Gallery SPA**
- **Công nghệ:** React 18, React-Bootstrap, Bootstrap 5, Axios, Vite.
- **Thành phần & Tính năng:**
  - `NavBar.jsx`: Thanh điều hướng cố định với thương hiệu và neo liên kết các phần (`#home`, `#orchids`, `#about`).
  - `Orchids.jsx`: Grid hiển thị đa cột responsive (`xs={12} sm={6} lg={3}`) duyệt danh sách hoa lan.
  - `OrchidCard.jsx`: Thẻ hiển thị hoa lan gồm ảnh đại diện, tên, danh mục, huy hiệu nổi bật (`Special Badge`) và nút xem chi tiết.
  - `OrchidDetailModal.jsx`: Modal hiển thị đầy đủ thông số: hình ảnh kích thước lớn, danh mục, xuất xứ, màu sắc, đánh giá sao, trạng thái đặc biệt và mô tả chi tiết.
  - `ListOfOrchids.js`: Bộ dữ liệu chuẩn gồm 16 loài hoa lan đặc sắc với thông tin đầy đủ.
  - Tùy biến giao diện hiện đại với CSS chuyên biệt tại `src/styles/app.css`.
- **Cách chạy:** `cd Lab2/orchid-gallery-spa && npm install && npm run dev` (Kiểm tra build: `npm run build`).

---

### 11. Slot 12 - REST Fundamentals with Spring Boot (Part A)
- **Thư mục:** `Slot12/slot12-rest-design/`
- **Dự án:** **FUNewsManagementSystem REST API Design & Spring Boot Skeleton**
- **Công nghệ:** Java 21, Spring Boot 3.3.x, Spring Web, Maven.
- **Thành phần & Tính năng:**
  - `docs/api-contract-funews.md`: Hợp đồng thiết kế API hoàn chỉnh cho hệ thống FUNews (News, Category, User, Tag, Comment sub-resource).
  - Phân tích chi tiết 5 ràng buộc kiến trúc REST: Client-Server, Stateless, Cacheable, Uniform Interface, Layered System.
  - Chuẩn hóa URI sử dụng danh từ số nhiều và ánh xạ ngữ nghĩa HTTP methods (`GET`, `POST`, `PUT`, `DELETE`).
  - Khởi tạo khung dự án Spring Boot 3 sẵn sàng cho việc cài đặt tầng Controller/Service.
- **Cách chạy:** `cd Slot12/slot12-rest-design && ./mvnw spring-boot:run` (trên Windows: `mvnw.cmd spring-boot:run`).

---

### 12. Slot 13 - Spring Boot REST Annotations & 3-Layer CRUD (Part B)
- **Thư mục:** `Slot13/slot13-rest-api/`
- **Dự án:** **News REST API with 3-Layer Architecture**
- **Công nghệ:** Java 21, Spring Boot 3.3.4, Spring MVC, Lombok, Maven.
- **Thành phần & Tính năng:**
  - Kiến trúc 3 tầng chuẩn mực: `NewsController` -> `NewsService` -> `NewsRepository` (sử dụng `ConcurrentHashMap` an toàn luồng).
  - Triển khai đầy đủ HTTP methods:
    - `@GetMapping`: Lấy danh sách tin tức hoặc chi tiết theo ID.
    - `@PostMapping`: Tạo tin tức mới, trả về mã `201 Created` kèm header `Location`.
    - `@PutMapping`: Cập nhật toàn bộ thông tin tin tức (`200 OK`).
    - `@DeleteMapping`: Xóa tin tức (`204 No Content`).
  - Ràng buộc tham số với `@PathVariable`, `@RequestParam` (tìm kiếm theo từ khóa) và `@RequestBody`.
  - Xử lý ngoại lệ tập trung qua `@ControllerAdvice` + `@ExceptionHandler` trả về đối tượng `ApiError` chuẩn khi không tìm thấy tin tức (`404 Not Found`).
  - Postman collection `SBA301_Slot13_News_API.postman_collection.json`.
- **Cách chạy:** `cd Slot13/slot13-rest-api && ./mvnw spring-boot:run` (Kiểm tra build: `mvn clean test-compile`).

---

### 13. Slot 14 - Documenting REST Services with OpenAPI / Swagger
- **Thư mục:** `Slot14/slot14-openapi-demo/`
- **Dự án:** **OpenAPI / Swagger Documented REST API**
- **Công nghệ:** Java 21, Spring Boot 3.3.4, `springdoc-openapi-starter-webmvc-ui` 2.x, Maven.
- **Thành phần & Tính năng:**
  - Giao diện trực quan Swagger UI tại `http://localhost:8080/swagger-ui.html`.
  - Tài liệu đặc tả chuẩn OpenAPI JSON tại `http://localhost:8080/v3/api-docs`.
  - Gắn nhãn và chú thích toàn diện với các annotations:
    - `@Tag`: Gom nhóm tài nguyên theo phân vùng nghiệp vụ (`News`, `Employee`).
    - `@Operation`: Tóm tắt và mô tả chi tiết chức năng của từng endpoint.
    - `@ApiResponse` & `@ApiResponses`: Định nghĩa mã trạng thái HTTP trả về (`200`, `201`, `204`, `404`).
    - `@Parameter`: Mô tả các tham số đường dẫn và tham số truy vấn.
    - `@Schema`: Chú thích ràng buộc trường dữ liệu trên Data Model / DTO.
  - Cấu hình thông tin metadata API chung qua Bean `OpenAPI` trong `OpenApiConfig.java`.
- **Cách chạy:** `cd Slot14/slot14-openapi-demo && ./mvnw spring-boot:run`.

---

### 14. Slot 15 - API Versioning, Paging & Sorting
- **Thư mục:** `Slot15/slot15-news-paging-api/`
- **Dự án:** **News API with Versioning, Paging, Sorting, Page vs Slice**
- **Công nghệ:** Java 21, Spring Boot 3.3.4, Spring Data JPA, H2 In-Memory Database, Maven.
- **Thành phần & Tính năng:**
  - **4 Chiến lược đánh phiên bản API (Versioning)**:
    1. URI Path Versioning: `GET /api/v1/news`, `GET /api/v2/news`.
    2. Query Parameter: `GET /api/news/version?version=1`.
    3. Custom Header: `GET /api/news/version` kèm header `X-API-Version: 1`.
    4. Media Type (Accept Header): `GET /api/news/version` kèm header `Accept: application/vnd.funews.v1+json`.
  - **Phân trang và sắp xếp với Spring Data JPA**:
    - `Page<News>`: Trả về dữ liệu kèm tổng số trang (`totalPages`) và tổng số phần tử (`totalElements`).
    - `Slice<News>`: Tối ưu cho cơ chế Infinite Scroll / cuộn trang di động (không tốn chi phí thực thi câu lệnh count query).
  - **Cơ chế an toàn (Guardrails)**: Giới hạn kích thước trang tối đa (`max size 100`) và whitelist các trường được phép sắp xếp (`id`, `title`, `publishDate`, `active`) tại endpoint `/api/news/safe`.
  - Nạp sẵn 35 bản ghi tin tức mẫu khi khởi động qua `CommandLineRunner`.
  - Postman collection `SBA301_Slot15_Paging_API.postman_collection.json`.
- **Cách chạy:** `cd Slot15/slot15-news-paging-api && ./mvnw spring-boot:run`.

---

### 15. Slot 16 - REST API Testing with MockMvc & Unit Tests
- **Thư mục:** `Slot16/slot16-testing-mockmvc/`
- **Dự án:** **Employee Management API with Full Automated Test Suite**
- **Công nghệ:** Java 21, Spring Boot 3.3.4, JUnit 5, Mockito, AssertJ, Spring Test (`MockMvc`, `@WebMvcTest`, `@DataJpaTest`, `@SpringBootTest`).
- **Tháp kiểm thử (Testing Taxonomy) hoàn chỉnh:**
  1. **Web Slice Test (`@WebMvcTest`)**:
     - `EmployeeControllerTest.java`: Kiểm thử tầng Controller cô lập với `MockMvc`, giả lập service bằng `@MockBean`, xác minh HTTP status (`200`, `201`, `404`), header `Location`, phân trang và biểu thức `jsonPath`.
  2. **Service Unit Test (JUnit 5 + Mockito)**:
     - `EmployeeServiceUnitTest.java`: Kiểm thử độc lập tầng nghiệp vụ bằng `@ExtendWith(MockitoExtension.class)`, `@Mock`, `@InjectMocks`, `when(...).thenReturn(...)` và `verify(...)`.
  3. **Repository Unit Test (JUnit 5 thuần)**:
     - `EmployeeRepositoryTest.java`: Kiểm thử các thao tác lưu trữ, tra cứu và phân trang trên in-memory collection.
  4. **JPA Slice Test (`@DataJpaTest`)**:
     - `JpaEmployeeRepositoryTest.java`: Kiểm thử tương tác cơ sở dữ liệu H2 thực tế, mapping entity và custom derived queries.
  5. **Integration Smoke Test (`@SpringBootTest`)**:
     - `EmployeeServiceIntegrationTest.java`: Kiểm thử khởi động toàn bộ Spring Context và tiêm phụ thuộc (Dependency Injection).
- **Kết quả kiểm thử:** Toàn bộ **12/12 test cases đều PASS** (`0 failures, 0 errors, BUILD SUCCESS`).
- **Cách chạy kiểm thử:**
  ```bash
  cd Slot16/slot16-testing-mockmvc
  ./mvnw clean test
  # hoặc trên Windows:
  mvnw.cmd clean test
  ```

---

### 16. Slot 17 - FUNews JPA Entity Mapping & Relationship Demo
- **Thư mục:** `Slot17/slot17-funews-demo/`
- **Dự án:** **FUNews JPA Domain Entities & Repository Demo**
- **Công nghệ:** Java 21, Spring Boot 3.2.4, Spring Data JPA, H2 Database, Maven.
- **Thành phần & Tính năng:**
  - **Entity `Category` (`categories`)**:
    - Khóa chính tự tăng `@Id @GeneratedValue(strategy = GenerationType.IDENTITY)`.
    - Ràng buộc thuộc tính: `name` không rỗng và duy nhất (`nullable = false, unique = true`), `description`, `active`.
    - Quan hệ 1-Nhiều hai chiều: `@OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)`.
    - Phương thức helper đồng bộ quan hệ: `addNews(News news)` và `removeNews(News news)`.
  - **Entity `News` (`news`)**:
    - Thuộc tính tiêu đề: `title` giới hạn 200 ký tự, không rỗng.
    - Quan hệ Nhiều-1: `@ManyToOne(fetch = FetchType.LAZY, optional = false)` kết hợp `@JoinColumn(name = "category_id", nullable = false)`.
  - **`CategoryRepository`**:
    - Kế thừa `JpaRepository<Category, Long>`.
    - Derived query methods: `findByNameIgnoreCase`, `existsByNameIgnoreCase`, `findByActiveTrueOrderByNameAsc`.
  - **`CategoryService`**:
    - Quản lý giao dịch với `@Transactional`.
    - Nghiệp vụ `createCategory`: Chuẩn hóa dữ liệu đầu vào (`trim()`), validate tên bắt buộc và kiểm tra không trùng lặp tên danh mục.
    - Nghiệp vụ `getActiveCategories`: `@Transactional(readOnly = true)` tối ưu hóa hiệu năng truy vấn.
  - **Cơ sở dữ liệu H2**:
    - Cấu hình `application.properties`: In-memory database `jdbc:h2:mem:funewsdb`, `create-drop`, hiển thị và format câu lệnh Hibernate SQL, H2 Web Console tại `/h2-console`.
- **Cách chạy:** `cd Slot17/slot17-funews-demo && mvn spring-boot:run`.

---

## 🛠️ Yêu Cầu Môi Trường & Hướng Dẫn Cài Đặt

### 1. Yêu cầu môi trường
- **Node.js:** Phiên bản 18+ (khuyên dùng Node 20 LTS hoặc mới hơn)
- **Java Development Kit (JDK):** Java 21 LTS hoặc Java 25
- **Apache Maven:** 3.8+ (hoặc sử dụng wrapper `mvnw` đi kèm sẵn trong từng thư mục Slot)
- **Git:** Quản lý mã nguồn
- **Postman:** Kiểm thử các API RESTful

### 2. Hướng dẫn chạy nhanh ứng dụng Frontend (React)
```bash
# Ví dụ chạy Lab 2: Orchid Gallery SPA
cd Lab2/orchid-gallery-spa
npm install
npm run dev

# Ví dụ chạy Slot 10: Orchid Router SPA
cd ../../Slot10
npm install
npm run dev
```

### 3. Hướng dẫn chạy nhanh ứng dụng Backend (Spring Boot)
```bash
# Ví dụ chạy Slot 13: News REST API
cd Slot13/slot13-rest-api
./mvnw spring-boot:run
# hoặc trên Windows:
mvnw.cmd spring-boot:run

# Ví dụ chạy toàn bộ bộ kiểm thử Slot 16
cd ../Slot16/slot16-testing-mockmvc
./mvnw clean test
```

---
*Bản quyền học tập thuộc về môn học SBA301 - FPT University.*
