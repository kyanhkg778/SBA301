# FUNewsManagementSystem - ReactJS Admin Portal
**SBA301 • Assignment 01 • Working with ReactJS Application**

- **Họ và tên sinh viên:** Lâm Đăng Kỳ Anh
- **Mã số sinh viên (MSSV):** CE190574
- **Lớp:** SE1910
- **Môn học:** SBA301 – Integrate Single Page Application with Spring Boot
- **Thư mục bài làm:** `LamDangKyAnh_SE1910`
- **Kho lưu trữ:** [kyanhkg778/SBA301](https://github.com/kyanhkg778/SBA301)

---

## 📖 1. Giới Thiệu Dự Án (Project Overview)

`FUNewsManagementSystem` là hệ thống Single Page Application (SPA) quản trị nội dung tin tức, danh mục và tài khoản người dùng cho FPT University. Dự án được xây dựng trên nền tảng **React 18** và công cụ đóng gói hiện đại **Vite**, áp dụng kiến trúc Component Composition, Immutable State Updates, Modal Popup Dialogs và lưu trữ bền vững với `localStorage`.

### 🔑 Tài Khoản Đăng Nhập Kiểm Thử (Test Credentials)
| Vai trò (Role) | Tên đăng nhập (Username) | Mật khẩu (Password) | Quyền hạn (Scope) |
|:---|:---|:---|:---|
| **Administrator (Role 1)** | `Admin` | `Admin` | Toàn quyền quản trị hệ thống, Dashboard, Category, News, Users, Settings |
| **Editorial Staff (Role 2)** | `Staff` | `Staff` | Quản trị tin tức, danh mục, cập nhật thông tin cá nhân |

*(Hệ thống hỗ trợ 2 nút **"Điền nhanh Admin"** và **"Điền nhanh Staff"** ngay tại màn hình đăng nhập để tạo thuận tiện tối đa khi chấm bài và demo).*

---

## 🛠️ 2. Hướng Dẫn Cài Đặt & Khởi Chạy (Installation & Run)

### Yêu cầu môi trường
- **Node.js:** Phiên bản 18+ (khuyên dùng Node 20 LTS trở lên)
- **Trình duyệt:** Google Chrome, Microsoft Edge, Firefox

### Các bước khởi chạy:
```bash
# 1. Di chuyển vào thư mục bài làm
cd LamDangKyAnh_SE1910

# 2. Cài đặt các gói phụ thuộc (Dependencies)
npm install

# 3. Khởi chạy Development Server
npm run dev

# 4. Kiểm tra biên dịch Production Build
npm run build
```
Ứng dụng sẽ hoạt động tại địa chỉ: `http://localhost:5173/`

---

## 🗺️ 3. Ma Trận Truy Vết Yêu Cầu (Requirement Traceability Matrix)

| ID | Yêu Cầu Đề Bài | Vị Trí Triển Khai Trong Mã Nguồn | Bằng Chứng / Trạng Thái |
|:---|:---|:---|:---|
| **R01** | Project ReactJS + Vite, đặt tên đúng quy ước `StudentName_ClassCode` | `package.json`, thư mục `LamDangKyAnh_SE1910` | ✅ `npm run dev` & `npm run build` thành công |
| **R02** | Màn hình Login với controlled inputs, validate rỗng và báo lỗi khi sai | `src/components/auth/LoginPage.jsx` | ✅ Báo lỗi khi rỗng/sai credential |
| **R03** | Đăng nhập đúng `Admin` / `Admin` chuyển vào trang Admin view | `src/App.jsx`, `LoginPage.jsx` | ✅ Cập nhật auth session, vào layout Admin |
| **R04** | Logo tạo bằng công cụ AI hiển thị trên Header và Login | `public/logo.svg`, `src/assets/logo.svg` | ✅ Logo vector AI cách điệu kèm AI Sparkle |
| **R05** | Header + Master Admin Layout dùng chung các trang | `src/layouts/AdminLayout.jsx`, `Header.jsx` | ✅ Layout chuẩn SaaS responsive |
| **R06** | Menu gồm: Dashboard, Category, News, Users, Settings | `src/components/common/Sidebar.jsx` | ✅ 5 tab menu chuyển view SPA không reload |
| **R07** | Category CRUD + Search (Modal Dialog + Delete Confirm) | `src/components/category/CategoryManagement.jsx` | ✅ Đầy đủ Thêm / Sửa / Xóa / Tìm kiếm |
| **R08** | News CRUD + Search (Gắn CategoryId, Status, Author) | `src/components/news/NewsManagement.jsx` | ✅ Đầy đủ Thêm / Sửa / Xóa / Lọc danh mục |
| **R09** | User/Account CRUD + Search (Role Admin=1, Staff=2) | `src/components/users/UserManagement.jsx` | ✅ Đầy đủ Thêm / Sửa / Xóa / Phân quyền |
| **R10** | Thêm mới và Cập nhật bằng Popup Dialog (Modal) | `CategoryModal.jsx`, `NewsModal.jsx`, `UserModal.jsx` | ✅ Form riêng, prefill khi sửa, validate |
| **R11** | Xóa có hộp thoại xác nhận (Delete Confirmation) | `src/components/common/DeleteConfirmModal.jsx` | ✅ Hủy bỏ giữ nguyên, Xác nhận mới xóa |
| **R12** | Mô hình dữ liệu chuẩn, quan hệ Category - News, LocalStorage | `src/data/seedData.js`, `storageService.js` | ✅ Lưu trữ bền vững, không mất khi F5 |

---

## 🏗️ 4. Thiết Kế Giải Pháp & Kiến Trúc (Solution Design & Architecture)

### 4.1 Sơ Đồ Cây Component (Component Tree)
```text
App (Quản lý Auth, Theme, Master States: categories, news, users)
├── LoginPage (Nếu chưa đăng nhập: Controlled form, Demo Fill)
└── AdminLayout (Nếu đã đăng nhập: Master Layout)
    ├── Sidebar (AI Logo, Menu 5 tabs, Thông tin sinh viên)
    ├── Header (Tiêu đề tab, Nút đổi Theme Dark/Light, User avatar & role, Nút Logout)
    └── ContentArea (Nội dung động theo activeTab)
        ├── DashboardPage (Thống kê 4 khối thẻ, tin mới nhất, thao tác nhanh)
        ├── CategoryManagement (Tìm kiếm, Bảng danh mục, CategoryModal, DeleteConfirmModal)
        ├── NewsManagement (Tìm kiếm, Lọc danh mục/trạng thái, Bảng tin tức, NewsModal, DeleteConfirmModal)
        ├── UserManagement (Tìm kiếm, Lọc vai trò, Bảng tài khoản, UserModal, DeleteConfirmModal)
        └── SettingsPage (Hồ sơ người dùng, Đổi Theme, Nút Khôi phục dữ liệu mẫu Seed Data)
```

### 4.2 Bản Đồ Phân Quyền State (State Ownership Map)
| Loại State | Tên State & Vị Trí | Mục Đích & Lý Do Thiết Kế |
|:---|:---|:---|
| **Auth State** | `currentUser` (tại `App.jsx`) | Điều hướng điều kiện (Conditional Rendering) giữa Login và AdminLayout; chia sẻ cho Header và các trang quản trị. |
| **Shared Data State** | `categories`, `news`, `users` (tại `App.jsx`) | Danh sách nguồn dữ liệu chung cho toàn ứng dụng; giúp News truy xuất danh mục và Dashboard tính toán thống kê. |
| **Persistent State** | `localStorage` qua `storageService.js` | Đồng bộ dữ liệu mỗi khi Create/Update/Delete; tự động nạp lại (hydrate) khi tải lại trang (F5). |
| **Local Navigation State** | `activeTab` (tại `App.jsx`) | Quyết định màn hình hiển thị trong AdminLayout ("dashboard", "categories", "news", "users", "settings"). |
| **Local UI Modal State** | `modalState`, `deleteConfirm` (tại từng trang Management) | Đóng/mở Modal form, xác định chế độ "create" hay "update", lưu đối tượng đang chọn để xóa/sửa. |
| **Search/Filter State** | `searchTerm`, `categoryFilter`, `roleFilter` | Quản lý từ khóa tìm kiếm cục bộ; lọc trên mảng hiển thị `displayedItems` mà không làm thay đổi mảng gốc. |

### 4.3 Kỷ Lục Quyết Định Thiết Kế (Design Decision Record - 6 Quyết Định)
1. **Navigation:** Sử dụng State Navigation (`activeTab`) kết hợp Component Rendering có điều kiện. Lựa chọn này giúp hệ thống chạy mượt mà không phụ thuộc cấu hình server khi mở trực tiếp file tĩnh, đồng thời kiểm soát chặt chẽ quyền truy cập (Auth Guard).
2. **State Ownership:** Đặt mảng dữ liệu gốc tại `App.jsx` và truyền xuống các component qua Props, kết hợp callback handlers. Điều này đảm bảo tính nhất quán dữ liệu giữa Dashboard, News và Category.
3. **Mock Data Persistence:** Sử dụng `localStorage` có lớp bọc `storageService.js`. Khi ứng dụng mở lần đầu, hệ thống tự động hydrate dữ liệu mẫu `seedData.js`. Khi thực hiện CRUD, dữ liệu lưu ngay vào `localStorage`. Cung cấp thêm nút "Khôi phục dữ liệu gốc" trong Settings.
4. **CRUD Dialog Reuse:** Tái sử dụng một Modal duy nhất cho mỗi thực thể (`CategoryModal`, `NewsModal`, `UserModal`) với biến cờ `mode="create" | "update"`. Khi Create thì form rỗng, khi Update thì `useEffect` tự động điền sẵn dữ liệu của `selectedItem`.
5. **Search Strategy:** Áp dụng mô hình **Derived Data**. Giữ nguyên danh sách gốc `items`, tạo biến phái sinh `displayedItems = items.filter(...)` bằng cách chuẩn hóa từ khóa `trim().toLowerCase()`. Thao tác tìm kiếm không bao giờ ghi đè lên dữ liệu nguồn.
6. **Data Immutability:** Toàn bộ các thao tác Create, Update, Delete đều tuân thủ nguyên tắc bất biến (Immutable):
   - **Create:** `[newItem, ...prev]` hoặc `[...prev, newItem]`
   - **Update:** `prev.map(item => item.id === id ? { ...item, ...data } : item)`
   - **Delete:** `prev.filter(item => item.id !== id)`

---

## 🧪 5. Ma Trận Kiểm Thử Chi Tiết (Test Matrix - 35 Kịch Bản Bắt Buộc)

Dưới đây là bảng kiểm thử đầy đủ theo quy chuẩn Mục 5.1 của tài liệu hướng dẫn Assignment 01:

| # | Nhóm Kiểm Thử | Kịch Bản (Test Case) | Thao Tác Thực Hiện | Kết Quả Kỳ Vọng | Kết Quả Thực Tế |
|:---:|:---|:---|:---|:---|:---:|
| 1 | **Login** | Empty Fields | Nhấn "Đăng Nhập" khi bỏ trống username/password | Không đăng nhập; hiển thị thông báo validation | ✅ PASS |
| 2 | **Login** | Wrong Credential | Nhập sai tài khoản (VD: `test` / `123`) | Hiển thị cảnh báo lỗi sai thông tin; không vào Admin | ✅ PASS |
| 3 | **Login** | Valid Admin Login | Nhập đúng `Admin` / `Admin` | Đăng nhập thành công, chuyển ngay vào Admin view | ✅ PASS |
| 4 | **Auth** | Logout | Bấm nút "Đăng xuất" tại Header | Phiên làm việc bị xóa; giao diện quay về trang Login | ✅ PASS |
| 5 | **Layout** | Menu Completeness | Quan sát thanh Sidebar bên trái | Đầy đủ 5 mục: Dashboard, Categories, News, Users, Settings | ✅ PASS |
| 6 | **Navigation** | All Menus Switching | Bấm lần lượt qua từng menu trên Sidebar | Đổi nội dung chính xác, tô đậm tab active, không reload | ✅ PASS |
| 7 | **Category** | Read List | Mở mục Categories | Danh sách 5 danh mục mẫu hiển thị kèm mô tả và số bài | ✅ PASS |
| 8 | **Category** | Create Valid | Bấm "Thêm Danh Mục", nhập tên hợp lệ, Lưu | Modal đóng lại, danh mục mới xuất hiện trong bảng | ✅ PASS |
| 9 | **Category** | Create Invalid | Bỏ trống Tên Danh Mục và nhấn Submit | Hiển thị cảnh báo màu đỏ; không thêm bản ghi rỗng | ✅ PASS |
| 10 | **Category** | Update | Bấm Sửa, đổi tên danh mục, Lưu | Đúng danh mục được cập nhật; bảng hiển thị tên mới | ✅ PASS |
| 11 | **Category** | Delete Cancel | Bấm Xóa -> Chọn "Hủy bỏ (Cancel)" | Hộp thoại đóng lại; danh mục vẫn còn nguyên | ✅ PASS |
| 12 | **Category** | Delete Confirm | Bấm Xóa -> Chọn "Xác nhận Xóa" | Danh mục bị xóa khỏi bảng và cập nhật localStorage | ✅ PASS |
| 13 | **Category** | Search Hit | Gõ "Technology" vào ô tìm kiếm | Bảng chỉ hiển thị danh mục Technology | ✅ PASS |
| 14 | **Category** | Search Miss | Gõ từ khóa không tồn tại "xyz123" | Hiển thị Empty State kèm nút xóa bộ lọc | ✅ PASS |
| 15 | **News** | Read List | Mở mục News Articles | Hiển thị danh sách bài báo với tag, tác giả, ngày đăng | ✅ PASS |
| 16 | **News** | Create Valid | Bấm "Viết Bài Mới", điền form đầy đủ, Xuất bản | Bài báo mới xuất hiện ở đầu danh sách | ✅ PASS |
| 17 | **News** | Create Invalid | Bỏ trống Tiêu đề hoặc Nội dung rồi Submit | Hiển thị lỗi bắt buộc điền tiêu đề/nội dung | ✅ PASS |
| 18 | **News** | Update | Bấm Sửa bài báo, thay đổi tiêu đề, Lưu | Tiêu đề bài báo được cập nhật chính xác | ✅ PASS |
| 19 | **News** | Delete Cancel | Bấm Xóa bài báo -> Chọn "Hủy bỏ" | Bài báo không bị xóa | ✅ PASS |
| 20 | **News** | Delete Confirm | Bấm Xóa bài báo -> Chọn "Xác nhận Xóa" | Bài báo bị xóa khỏi danh sách | ✅ PASS |
| 21 | **News** | Search Hit | Nhập "AI" hoặc "Hackathon" vào ô tìm kiếm | Lọc đúng bài báo có chứa từ khóa trong tiêu đề/nội dung/tag | ✅ PASS |
| 22 | **News** | Search Miss | Nhập từ khóa không có trong hệ thống | Hiển thị Empty State thông báo không tìm thấy bài báo | ✅ PASS |
| 23 | **Users** | Read List | Mở mục User Management | Hiển thị danh sách tài khoản kèm vai trò Admin/Staff | ✅ PASS |
| 24 | **Users** | Create Valid | Bấm "Thêm Tài Khoản", nhập thông tin, Tạo | Tài khoản mới xuất hiện trong danh sách | ✅ PASS |
| 25 | **Users** | Create Invalid | Bỏ trống email hoặc nhập email không có `@` | Báo lỗi định dạng email không hợp lệ | ✅ PASS |
| 26 | **Users** | Update | Bấm Sửa tài khoản, đổi họ tên, Lưu | Thông tin người dùng được cập nhật đúng | ✅ PASS |
| 27 | **Users** | Delete Cancel | Bấm Xóa tài khoản -> Chọn "Hủy bỏ" | Tài khoản được giữ nguyên | ✅ PASS |
| 28 | **Users** | Delete Confirm | Bấm Xóa tài khoản Staff -> Xác nhận Xóa | Tài khoản bị xóa khỏi danh sách | ✅ PASS |
| 29 | **Users** | Search Hit | Nhập "Admin" hoặc họ tên sinh viên | Lọc chính xác tài khoản tương ứng | ✅ PASS |
| 30 | **Users** | Search Miss | Nhập tên người dùng không tồn tại | Hiển thị Empty State | ✅ PASS |
| 31 | **News** | Category Relation | Thêm/sửa bài báo chọn danh mục từ dropdown | `categoryId` liên kết chính xác với danh mục trong hệ thống | ✅ PASS |
| 32 | **Users** | Role Display | Quan sát cột Vai Trò trong bảng Users | Hiển thị huy hiệu rõ ràng: Admin (1) hoặc Staff (2) | ✅ PASS |
| 33 | **Status** | Status Badges | Quan sát cột Trạng Thái ở các bảng | Hiển thị huy hiệu trực quan: Active (1) và Inactive (0) | ✅ PASS |
| 34 | **Data** | Empty State Handling | Tìm kiếm không có kết quả hoặc danh sách rỗng | Giao diện không bị crash; hiển thị icon và thông báo thân thiện | ✅ PASS |
| 35 | **Persistence** | Reload (F5) | Thực hiện Thêm/Sửa/Xóa rồi nhấn F5 trình duyệt | Dữ liệu và trạng thái đăng nhập được giữ nguyên qua localStorage | ✅ PASS |

---

## 🔍 6. Nhật Ký Debug Thực Tế (Debugging Log)

### Lỗi 1: Dữ liệu Form bị lưu vết từ lần mở trước khi bấm "Thêm Mới"
- **Triệu chứng:** Sau khi bấm Sửa một danh mục rồi bấm Thêm danh mục mới, các ô input trong Modal vẫn chứa thông tin của danh mục cũ vừa sửa.
- **Giả thuyết:** Component `CategoryModal` không đặt lại state `formData` khi props `mode` chuyển từ `"update"` sang `"create"`.
- **Cách kiểm tra:** Đặt `console.log(mode, category)` trong Hook `useEffect` của `CategoryModal`.
- **Nguyên nhân gốc (Root Cause):** `useEffect` chỉ lắng nghe biến `category` mà không kiểm tra giá trị của cờ `mode` khi `show === true`.
- **Cách khắc phục:** Cập nhật `useEffect` với điều kiện: nếu `mode === "create"` thì reset `formData` về các giá trị rỗng mặc định.
- **Kiểm tra lại (Retest):** Mở Sửa -> Đóng -> Mở Thêm mới -> Form hoàn toàn sạch sẽ (PASS).

### Lỗi 2: Xóa danh mục dẫn đến lỗi hiển thị tên danh mục trong bài báo liên kết
- **Triệu chứng:** Khi xóa một danh mục đang được bài báo tham chiếu qua `categoryId`, bài báo bị hiển thị tên danh mục là `undefined` hoặc làm giao diện lỗi.
- **Giả thuyết:** Hàm tìm kiếm danh mục `getCategoryName(catId)` gọi trực tiếp `.name` trên đối tượng `undefined`.
- **Cách kiểm tra:** Kiểm tra mã nguồn hàm `getCategoryName` trong `NewsManagement.jsx`.
- **Nguyên nhân gốc (Root Cause):** `categories.find(c => c.id === catId)` trả về `undefined` nếu danh mục đã bị xóa.
- **Cách khắc phục:** Thêm fallback an toàn: `cat ? cat.name : "Danh mục #" + catId`, đồng thời hiển thị cảnh báo số bài báo bị ảnh hưởng khi xóa danh mục.
- **Kiểm tra lại (Retest):** Xóa danh mục có bài báo liên kết -> Danh sách bài báo vẫn hiển thị ổn định không crash (PASS).

### Lỗi 3: Người dùng vô tình xóa tài khoản của chính mình đang đăng nhập
- **Triệu chứng:** Người dùng đăng nhập `Admin` và nhấn nút Xóa tài khoản `Admin` trong danh sách Users.
- **Giả thuyết:** Thiếu điều kiện kiểm tra an toàn tài khoản hiện hành trước khi mở dialog xóa.
- **Nguyên nhân gốc (Root Cause):** Nút xóa không so sánh `currentUser.username` với `user.username`.
- **Cách khắc phục:** Vô hiệu hóa nút xóa (disable) và chặn sự kiện xóa nếu `user.username === currentUser.username`, hiển thị thông báo "Bạn không thể xóa tài khoản của chính mình".
- **Kiểm tra lại (Retest):** Nút xóa của tài khoản đang đăng nhập bị khóa mờ, tài khoản an toàn tuyệt đối (PASS).

---

## 🤖 7. Báo Cáo Sử Dụng AI (AI Usage & Engineering Practice)

Theo quy định mục 9 của tài liệu hướng dẫn, sinh viên ghi nhận việc áp dụng AI minh bạch như sau:
1. **Thiết kế Logo:** Sử dụng AI để tạo ý tưởng đồ họa vector SVG cho biểu tượng `FUNewsManagementSystem` (kết hợp biểu tượng tờ báo tin tức, huy hiệu khiên bảo vệ và tia sáng công nghệ AI).
2. **Xây dựng Test Matrix:** AI hỗ trợ đối chiếu và định dạng lại 35 kịch bản kiểm thử theo đúng cấu trúc chuẩn của Rubric SBA301.
3. **Kiểm chứng độc lập:** Sinh viên tự tay kiểm tra từng chức năng, cấu hình lại các thuộc tính CSS, kiểm tra các thao tác bất biến trong React và đảm bảo mã nguồn sẵn sàng giải thích trực tiếp trong buổi đánh giá.

---

## 👨‍💻 8. Hướng Dẫn Trả Lời Phỏng Vấn Code (Code Explanation Framework)

Khi được giảng viên yêu cầu mở file và giải thích luồng thực thi:
1. **Login Flow (`LoginPage.jsx` & `App.jsx`):**
   - *Input:* State `username`, `password` được kiểm soát qua controlled form.
   - *Trigger:* Sự kiện `onSubmit` gọi `handleSubmit()`, chặn reload bằng `e.preventDefault()`.
   - *Transform:* Kiểm tra rỗng -> So sánh với `Admin` / `Admin` -> Tạo session object.
   - *Output:* Gọi callback `onLoginSuccess(user)`, cập nhật `currentUser` tại `App.jsx`, ghi vào `localStorage`, chuyển `activeTab="dashboard"`.
2. **CRUD Flow (`CategoryManagement.jsx` & `CategoryModal.jsx`):**
   - *Create:* Bấm Add -> `mode="create"` -> Modal mở với form rỗng -> Submit -> Sinh ID mới (`Math.max + 1`) -> Nối mảng bất biến `[...prev, newItem]` -> Lưu `localStorage`.
   - *Update:* Bấm Edit -> `mode="update"`, `selectedCategory=cat` -> Form điền sẵn -> Submit -> Duyệt mảng `prev.map(c => c.id === id ? updated : c)` -> Lưu `localStorage`.
   - *Delete:* Bấm Delete -> Lưu `categoryToDelete` -> Mở `DeleteConfirmModal` -> Bấm Confirm -> Lọc bỏ `prev.filter(c => c.id !== id)` -> Lưu `localStorage`.
3. **Search Flow:**
   - Sử dụng biến `displayedItems = items.filter(...)`. Mảng gốc `items` không bị biến đổi, cho phép tìm kiếm và xóa bộ lọc tức thời.
