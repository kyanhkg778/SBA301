# FUNews JPA Entity Mapping & Relationship Demo - SBA301 Slot 17

## 1. Tổng Quan (Overview)
Dự án minh họa việc thiết kế và triển khai tầng dữ liệu (Domain Entities & Repository) bằng **Spring Data JPA** và cơ sở dữ liệu in-memory **H2** cho hệ thống `FUNewsManagementSystem`.

## 2. Môi Trường Công Nghệ (Technology Stack)
- **Java:** 21 LTS
- **Spring Boot:** 3.2.4
- **Spring Data JPA:** Hibernate ORM
- **H2 Database:** In-memory Database (`jdbc:h2:mem:funewsdb`)
- **Maven:** Quản lý thư viện và vòng đời dự án

## 3. Cấu Trúc Thực Thể & Quan Hệ (Domain Entities & Relationships)
### 3.1 Thực thể `Category` (`categories`)
- `@Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id`: Khóa chính tự tăng.
- `@Column(nullable = false, unique = true, length = 100) String name`: Tên danh mục bắt buộc và duy nhất.
- `@Column(length = 500) String description`: Mô tả chi tiết danh mục.
- `@Column(nullable = false) boolean active = true`: Trạng thái kích hoạt.
- `@OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)`: Quan hệ 1-Nhiều với bài báo `News`.
- Helper methods: `addNews(News news)` và `removeNews(News news)` để đồng bộ hai chiều (bi-directional mapping).

### 3.2 Thực thể `News` (`news`)
- `@Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id`: Khóa chính bài báo.
- `@Column(nullable = false, length = 200) String title`: Tiêu đề bài báo.
- `@ManyToOne(fetch = FetchType.LAZY, optional = false)`: Quan hệ Nhiều-1 liên kết bắt buộc tới `Category`.
- `@JoinColumn(name = "category_id", nullable = false)`: Khóa ngoại liên kết bảng.

## 4. Tầng Dữ Liệu & Nghiệp Vụ (Repository & Service)
- **`CategoryRepository`**:
  - `findByNameIgnoreCase(String name)`: Tìm danh mục theo tên không phân biệt hoa thường.
  - `existsByNameIgnoreCase(String name)`: Kiểm tra tồn tại tên danh mục trước khi tạo mới.
  - `findByActiveTrueOrderByNameAsc()`: Lấy danh sách các danh mục đang hoạt động sắp xếp A-Z.
- **`CategoryService`**:
  - `@Transactional createCategory(name, description)`: Chuẩn hóa dữ liệu đầu vào (`trim()`), validate bắt buộc nhập tên và kiểm tra không trùng lặp tên danh mục.
  - `@Transactional(readOnly = true) getActiveCategories()`: Truy vấn danh sách danh mục khả dụng.

## 5. Cấu Hình Cơ Sở Dữ Liệu (`application.properties`)
- Database URL: `jdbc:h2:mem:funewsdb`
- DDL Mode: `create-drop`
- H2 Console: `http://localhost:8080/h2-console`
- SQL Logging: Bật log câu lệnh Hibernate SQL và định dạng chuẩn.

## 6. Hướng Dẫn Khởi Chạy
```bash
mvn spring-boot:run
```
