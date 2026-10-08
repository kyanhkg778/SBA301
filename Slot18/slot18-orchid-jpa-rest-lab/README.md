# Orchid JPA REST API - SBA301 Slot 18 (Lab 04)

## 1. Tổng Quan (Overview)
Dự án thực hành **Slot 18 (Lab 04)** xây dựng hệ thống **RESTful API** quản lý hoa lan (**Orchid Management**) sử dụng **Spring Boot 3**, **Spring Data JPA**, kiến trúc 3 tầng (**Controller - Service - Repository**) và kết nối cơ sở dữ liệu **Microsoft SQL Server**.

## 2. Môi Trường & Công Nghệ (Technology Stack)
- **Java:** 21 LTS
- **Spring Boot:** 3.2.4
- **Spring Web:** Xây dựng REST Controllers
- **Spring Data JPA:** Hibernate ORM
- **Database Driver:** `com.microsoft.sqlserver:mssql-jdbc`
- **Maven:** Quản lý phụ thuộc và đóng gói dự án

## 3. Kiến Trúc 3 Tầng (3-Layer Architecture)
```text
HTTP Request (Client / Postman / Frontend)
       │
       ▼
OrchidController (Xử lý request, route /api/orchids, HTTP status code)
       │
       ▼
IOrchidService / OrchidService (Validate nghiệp vụ, kiểm tra danh mục)
       │
       ▼
IOrchidRepository / IOrchidCategoryRepository (Spring Data JPA)
       │
       ▼
Database: Microsoft SQL Server (OrchidDB)
```

## 4. Thực Thể Miền & Quan Hệ (Entities & Mapping)
### 4.1 Thực thể `Orchid` (`orchids`)
- `@Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long orchidID`: Khóa chính tự tăng.
- `@Column(nullable = false, length = 150) String orchidName`: Tên hoa lan bắt buộc.
- `Boolean isNatural`: Lan tự nhiên hay lai tạo.
- `@Column(length = 1000) String orchidDescription`: Mô tả chi tiết.
- `Boolean isAttractive`: Đánh giá độ cuốn hút.
- `String orchidURL`: Đường dẫn ảnh hoa lan.
- `@ManyToOne(optional = false) @JoinColumn(name = "category_id", nullable = false) OrchidCategory orchidCategory`: Khóa ngoại liên kết danh mục hoa lan.

### 4.2 Thực thể `OrchidCategory` (`orchid_categories`)
- `@Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long categoryId`: Khóa chính danh mục.
- `@Column(nullable = false, unique = true, length = 100) String categoryName`: Tên danh mục duy nhất.
- `@OneToMany(mappedBy = "orchidCategory") @JsonIgnore List<Orchid> orchids`: Quan hệ 1-Nhiều, dùng `@JsonIgnore` ngăn ngừa vòng lặp vô hạn khi serialize JSON.

## 5. Danh Sách Endpoint RESTful (`/api/orchids`)
| HTTP Method | Endpoint | Mô Tả | Status Code Thành Công | Error Cases |
|:---|:---|:---|:---|:---|
| `GET` | `/api/orchids` | Lấy danh sách toàn bộ hoa lan | `200 OK` | `500 Internal Error` |
| `GET` | `/api/orchids?name={kw}` | Tìm kiếm hoa lan theo tên chứa từ khóa | `200 OK` | `500 Internal Error` |
| `GET` | `/api/orchids/{id}` | Lấy chi tiết hoa lan theo ID | `200 OK` | `404 Not Found` |
| `POST` | `/api/orchids` | Tạo mới hoa lan (yêu cầu tên & category tồn tại) | `201 Created` | `400 Bad Request` |
| `PUT` | `/api/orchids/{id}` | Cập nhật thông tin hoa lan theo ID | `200 OK` | `400 Bad Request`, `404 Not Found` |
| `DELETE` | `/api/orchids/{id}` | Xóa hoa lan theo ID | `204 No Content` | `404 Not Found` |

## 6. Cấu Hình Cơ Sở Dữ Liệu (`application.properties`)
```properties
spring.application.name=slot18-orchid-lab
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=OrchidDB;encrypt=true;trustServerCertificate=true
spring.datasource.username=sa
spring.datasource.password=123456
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
server.port=8080
```

## 7. Hướng Dẫn Khởi Chạy
```bash
mvn spring-boot:run
```
