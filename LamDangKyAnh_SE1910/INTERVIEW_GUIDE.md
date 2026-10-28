# CẨM NANG TRẢ LỜI PHỎNG VẤN & BẢO VỆ ĐỒ ÁN (ORAL DEFENSE HANDBOOK)
## SBA301 • Assignment 01 • Working with ReactJS Application
**Sinh viên thực hiện:** Lâm Đăng Kỳ Anh | **MSSV:** CE190574 | **Lớp:** SE1910  
**Đồ án:** FUNewsManagementSystem - ReactJS Admin Portal  

---

## 📑 MỤC LỤC CHI TIẾT
1. [12.1 Lệnh và môi trường (Commands & Environment)](#121-lệnh-và-môi-trường)
2. [12.2 Kiến thức nền tảng React (React Fundamentals)](#122-react-fundamentals)
3. [12.3 Luồng thực thi ứng dụng (Application Execution Flow)](#123-luồng-thực-thi)
4. [12.4 Thiết kế & Kiến trúc phần mềm (Design & Architecture)](#124-design--architecture)
5. [12.5 Kỹ năng Debug & Xử lý sự cố (Debugging Interview)](#125-debugging-interview)
6. [12.6 Thực hành Kỹ nghệ AI (AI Usage Interview)](#126-ai-usage-interview)

---

## 12.1 Lệnh và môi trường

### Q1: Lệnh tạo project Vite React? Nêu lệnh/cách theo môi trường lớp và giải thích template React.
* **Câu trả lời chuẩn:**
  * Lệnh thực hiện trên terminal:
    ```bash
    npm create vite@latest LamDangKyAnh_SE1910 -- --template react
    ```
    *(Hoặc chạy tương tác `npm create vite@latest` -> Nhập tên thư mục dự án -> Chọn framework `React` -> Chọn biến thể `JavaScript`).*
  * **Giải thích template React:** Template này khởi tạo sẵn một khung ứng dụng React tối giản, bao gồm:
    * `index.html`: Điểm neo HTML duy nhất chứa thẻ `<div id="root"></div>`.
    * `src/main.jsx`: Điểm nhập (entry point) của JavaScript, sử dụng `ReactDOM.createRoot()` để render component gốc `<App />`.
    * `src/App.jsx`: Component cấp cao nhất chứa giao diện mẫu ban đầu.
    * `vite.config.js`: Cấu hình của Vite với plugin `@vitejs/plugin-react` (sử dụng Babel/esbuild để chuyển dịch JSX và kích hoạt tính năng Fast Refresh/Hot Module Replacement).
    * `package.json`: Khai báo sẵn các dependencies cốt lõi gồm `react` và `react-dom`.

---

### Q2: `npm install` làm gì?
* **Câu trả lời chuẩn:**
  * `npm install` (hoặc `npm i`) thực hiện đọc tệp [package.json](file:///d:/Ky7_FA2026/SBA301/LamDangKyAnh_SE1910/package.json) và [package-lock.json](file:///d:/Ky7_FA2026/SBA301/LamDangKyAnh_SE1910/package-lock.json).
  * Lệnh này phân tích cây phụ thuộc (dependency tree), giải quyết xung đột phiên bản, tải toàn bộ các gói thư viện cần thiết (bao gồm `react`, `react-dom`, `bootstrap`, `react-bootstrap`, `vite`,...) từ NPM Registry công khai về lưu trữ tại thư mục cục bộ `node_modules`.
  * Đồng thời, nó tạo hoặc cập nhật tệp `package-lock.json` để khóa chặt phiên bản và mã băm SHA integrity của từng package, đảm bảo việc cài đặt trên các máy khác nhau luôn đồng nhất.

---

### Q3: `npm run dev` làm gì?
* **Câu trả lời chuẩn:**
  * Lệnh này đọc và thực thi script có tên `"dev"` trong trường `"scripts"` của tệp `package.json` (ở đây là lệnh `vite`).
  * Khởi chạy Development Server cục bộ của Vite (mặc định tại cổng `http://localhost:5173/`).
  * Tận dụng kiến trúc Native ES Modules (ESM) của trình duyệt hiện đại kết hợp với cơ chế **Hot Module Replacement (HMR)**: Khi nhà phát triển thay đổi mã nguồn trong `src/`, Vite chỉ biên dịch lại đúng module bị sửa đổi và cập nhật tức thì lên giao diện trình duyệt mà không cần phải tải lại (reload) toàn bộ trang web hay làm mất state hiện tại.

---

### Q4: `package.json` chứa gì?
* **Câu trả lời chuẩn:**
  * Là tệp manifest quan trọng nhất định danh và quản lý dự án NodeJS/JavaScript. Nó bao gồm:
    1. **Metadata:** Tên dự án (`"name": "lamdangkyanh_se1910"`), phiên bản (`"version": "1.0.0"`), kiểu module (`"type": "module"` cho phép sử dụng cú pháp ES Modules `import/export`).
    2. **Scripts:** Các câu lệnh tắt dòng lệnh (`"dev": "vite"`, `"build": "vite build"`, `"preview": "vite preview"`).
    3. **Dependencies:** Danh sách các thư viện cần thiết để ứng dụng chạy được ở môi trường Production (như `react`, `react-dom`, `bootstrap`, `react-bootstrap`).
    4. **DevDependencies:** Các công cụ chỉ phục vụ quá trình phát triển, biên dịch, đóng gói mã nguồn hoặc kiểm tra kiểu (như `vite`, `@vitejs/plugin-react`, `@types/react`).

---

### Q5: `node_modules` là gì? Vì sao không commit/nộp?
* **Câu trả lời chuẩn:**
  * `node_modules` là thư mục chứa mã nguồn vật lý của toàn bộ các thư viện bên thứ ba và các thư viện con phụ thuộc vào chúng (transitive dependencies) sau khi chạy `npm install`.
  * **Lý do không commit/nộp:**
    1. Dung lượng rất lớn (thường hàng chục đến hàng trăm Megabytes với hàng chục nghìn file nhỏ), gây lãng phí băng thông và làm chậm quá trình push/clone mã nguồn.
    2. Có thể tái tạo hoàn chỉnh bất kỳ lúc nào chỉ bằng lệnh `npm install` dựa vào `package.json` và `package-lock.json`.
    3. Tránh xung đột nhị phân (binary compatibility) nếu các module có thành phần native build phụ thuộc vào hệ điều hành cụ thể (Windows / Linux / macOS). Vì vậy, `node_modules` luôn được khai báo trong `.gitignore`.

---

### Q6: Dừng dev server bằng cách nào?
* **Câu trả lời chuẩn:**
  * Chuyển vào cửa sổ Terminal đang chạy dev server và nhấn tổ hợp phím: `Ctrl + C`.
  * Nếu trên môi trường Windows PowerShell hoặc Command Prompt xuất hiện câu hỏi `Terminate batch job (Y/N)?`, nhấn phím `Y` và gõ `Enter`.

---

### Q7: Xử lý thế nào khi cổng (Port) bị bận?
* **Câu trả lời chuẩn:** Có 2 phương án xử lý chuyên nghiệp:
  1. **Giải phóng cổng đang bị chiếm dụng:**
     * Tìm mã tiến trình (PID) đang lắng nghe cổng 5173 trên Windows:
       ```powershell
       netstat -ano | findstr :5173
       ```
     * Buộc dừng tiến trình đó bằng lệnh:
       ```powershell
       taskkill /PID <MÃ_PID> /F
       ```
  2. **Chỉ định cổng khác cho Vite:**
     * Chạy trực tiếp qua cờ dòng lệnh: `npm run dev -- --port 3000`
     * Hoặc cấu hình cố định trong tệp [vite.config.js](file:///d:/Ky7_FA2026/SBA301/LamDangKyAnh_SE1910/vite.config.js):
       ```javascript
       export default defineConfig({
         server: {
           port: 3000,
           strictPort: false // Tự động nhảy sang cổng kế tiếp nếu 3000 bận
         }
       })
       ```

---

## 12.2 React fundamentals

### Q1: Component là gì?
* **Câu trả lời chuẩn:**
  * Component là đơn vị cơ bản, độc lập và có khả năng tái sử dụng (reusable) để cấu thành nên giao diện người dùng (UI) trong React.
  * Trong dự án này sử dụng **Functional Components** (như [LoginPage](file:///d:/Ky7_FA2026/SBA301/LamDangKyAnh_SE1910/src/components/auth/LoginPage.jsx), [CategoryManagement](file:///d:/Ky7_FA2026/SBA301/LamDangKyAnh_SE1910/src/components/category/CategoryManagement.jsx), [NewsModal](file:///d:/Ky7_FA2026/SBA301/LamDangKyAnh_SE1910/src/components/news/NewsModal.jsx)). Mỗi component là một hàm JavaScript nhận đầu vào là `props`, quản lý trạng thái nội bộ thông qua các `Hooks` (như `useState`, `useEffect`) và trả về cấu trúc JSX mô tả UI sẽ được render lên trình duyệt.

---

### Q2: JSX là gì?
* **Câu trả lời chuẩn:**
  * JSX (JavaScript XML) là một cú pháp mở rộng (syntax extension) cho JavaScript. Nó cho phép lập trình viên viết cấu trúc cây giao diện giống như mã HTML trực tiếp bên trong mã nguồn JavaScript.
  * JSX không chạy trực tiếp trên trình duyệt mà được công cụ biên dịch (esbuild/Babel qua `@vitejs/plugin-react`) chuyển dịch thành các lời gọi hàm thuần JavaScript `React.createElement()` (hoặc runtime JSX mới `jsx()`).
  * JSX hỗ trợ nhúng biểu thức JavaScript động một cách an toàn thông qua cặp ngoặc nhọn `{expression}` và tự động phòng chống tấn công XSS (Cross-Site Scripting).

---

### Q3: Props là gì? State là gì? Khác nhau thế nào?
* **Câu trả lời chuẩn:**
  * **Props (Properties):** Là cơ chế truyền dữ liệu từ Component cha xuống Component con theo luồng dữ liệu 1 chiều (Unidirectional Data Flow). Props đối với component con là **bất biến và chỉ đọc (Read-only / Immutable)**. Con không được phép sửa đổi giá trị props nhận được từ cha.
    * *Ví dụ trong code:* `<Sidebar activeTab={activeTab} onSelectTab={onSelectTab} />` truyền biến `activeTab` và hàm callback `onSelectTab` xuống cho `Sidebar`.
  * **State:** Là dữ liệu trạng thái nội bộ do chính component đó khởi tạo và quản lý bằng Hook `useState`. State có thể thay đổi theo thời gian thông qua hàm setter tương ứng để phản ánh sự tương tác của người dùng.
    * *Ví dụ trong code:* `const [searchTerm, setSearchTerm] = useState("")` trong `NewsManagement.jsx`.
  * **Bảng so sánh cốt lõi:**
    | Tiêu chí | Props | State |
    |:---|:---|:---|
    | Nguồn gốc | Truyền từ bên ngoài (Component cha) | Khởi tạo bên trong Component |
    | Khả năng sửa đổi | Chỉ đọc (Read-only) | Có thể thay đổi qua hàm setter |
    | Mục đích | Chia sẻ dữ liệu và hàm xử lý giữa các tầng | Lưu trữ trạng thái động của component |

---

### Q4: Khi nào component re-render?
* **Câu trả lời chuẩn:** Một component trong React sẽ kích hoạt chu kỳ re-render trong 4 trường hợp:
  1. **State nội bộ thay đổi:** Hàm setter của state được gọi với giá trị mới khác với giá trị hiện tại (React sử dụng thuật toán so sánh `Object.is`).
  2. **Props thay đổi:** Component cha truyền vào giá trị props mới.
  3. **Component cha re-render:** Khi component cha re-render, toàn bộ cây component con nằm trong nó mặc định sẽ re-render theo (trừ khi được tối ưu hóa bằng `React.memo`).
  4. **Context thay đổi:** Nếu component đang lắng nghe một giá trị từ React Context API và giá trị đó có sự cập nhật.

---

### Q5: Vì sao không mutate trực tiếp state?
* **Câu trả lời chuẩn:**
  * Trong React, State phải được đối xử như một đối tượng **Bất biến (Immutable)**.
  * **Lý do kỹ thuật cốt lõi:**
    1. **Thuật toán kiểm tra thay đổi (Shallow Equality Check):** React kiểm tra sự thay đổi của State bằng phép so sánh tham chiếu địa chỉ vùng nhớ (`Object.is(prevState, nextState)`). Nếu lập trình viên mutate trực tiếp (ví dụ: `categories.push(newCat)` hoặc `user.name = "Anh"`), địa chỉ tham chiếu của mảng/đối tượng trong bộ nhớ RAM không hề thay đổi. Do đó, React lầm tưởng rằng không có gì thay đổi và **KHÔNG kích hoạt re-render giao diện**.
    2. **Mất tính toàn vẹn và lỗi đồng bộ:** Mutate trực tiếp có thể phá vỡ tính đồng bộ giữa các component cùng dùng chung dữ liệu, làm hỏng các tính năng Time-travel debugging, Undo/Redo, và gây ra các tác dụng phụ (side-effects) cực kỳ khó gỡ lỗi.
  * **Giải pháp chuẩn:** Luôn tạo bản sao vùng nhớ mới bằng Spread Operator `...` hoặc các hàm bất biến:
    * Thêm mới: `[...prev, newItem]`
    * Cập nhật: `prev.map(item => item.id === id ? { ...item, ...data } : item)`
    * Xóa bỏ: `prev.filter(item => item.id !== id)`

---

### Q6: Controlled input là gì?
* **Câu trả lời chuẩn:**
  * Controlled input (phần tử nhập liệu được kiểm soát) là thẻ `<input>`, `<textarea>` hoặc `<select>` có thuộc tính hiển thị `value` được liên kết trực tiếp và kiểm soát 100% bởi một biến `state` của React, đồng thời mọi thao tác gõ phím của người dùng đều được bắt qua sự kiện `onChange` để cập nhật lại state đó.
  * *Ví dụ trong [LoginPage.jsx](file:///d:/Ky7_FA2026/SBA301/LamDangKyAnh_SE1910/src/components/auth/LoginPage.jsx#L67-L77):*
    ```jsx
    <Form.Control
      type="text"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
    ```
  * **Lợi ích:** Đảm bảo nguyên lý "Nguồn chân lý duy nhất" (Single Source of Truth), giúp kiểm tra tính hợp lệ dữ liệu (validation) theo thời gian thực, vô hiệu hóa nút submit khi form không hợp lệ, hoặc làm sạch dữ liệu trước khi gửi.

---

### Q7: Vì sao `.map()` cần `key`?
* **Câu trả lời chuẩn:**
  * Thuộc tính `key` là định danh duy nhất và ổn định cho mỗi phần tử trong danh sách khi render bằng `.map()`.
  * **Ý nghĩa:** `key` đóng vai trò quan trọng đối với thuật toán **Reconciliation (Virtual DOM Diffing)** của React. Nó giúp React phân biệt chính xác phần tử nào đã được thêm mới, phần tử nào bị xóa, phần tử nào bị thay đổi thứ tự. Nhờ đó, React chỉ cập nhật đúng node DOM thật tương ứng thay vì phải hủy bỏ và vẽ lại toàn bộ danh sách, tối ưu hóa tối đa hiệu năng render.
  * **Quy tắc:** Phải sử dụng ID duy nhất của dữ liệu (ví dụ: `key={item.id}`). Tuyệt đối tránh sử dụng `index` của mảng làm key nếu danh sách có tính năng thêm, xóa, lọc hoặc sắp xếp, vì chỉ mục index sẽ bị xáo trộn làm sai lệch trạng thái của form input.

---

### Q8: Conditional rendering là gì?
* **Câu trả lời chuẩn:**
  * Conditional rendering (render có điều kiện) là kỹ thuật hiển thị các thành phần UI hoặc component khác nhau dựa trên các biểu thức logic điều kiện (tương tự câu lệnh `if-else` trong JavaScript).
  * **Các mẫu triển khai trong dự án:**
    1. **Mệnh đề if sớm (Early Return):** Trong [App.jsx](file:///d:/Ky7_FA2026/SBA301/LamDangKyAnh_SE1910/src/App.jsx#L149-L151):
       ```jsx
       if (!currentUser) {
         return <LoginPage onLoginSuccess={handleLoginSuccess} />;
       }
       ```
    2. **Toán tử Logical AND (`&&`):** Hiển thị component theo tab đang chọn:
       ```jsx
       {activeTab === "news" && <NewsManagement news={news} ... />}
       ```
    3. **Toán tử 3 ngôi (Ternary Operator `? :`):** Hiển thị huy hiệu vai trò người dùng trong [Header.jsx](file:///d:/Ky7_FA2026/SBA301/LamDangKyAnh_SE1910/src/components/common/Header.jsx#L54-L58):
       ```jsx
       {currentUser?.role === 1 ? <span className="badge-admin">Admin</span> : <span className="badge-staff">Staff</span>}
       ```

---

### Q9: `preventDefault` trong form dùng để làm gì?
* **Câu trả lời chuẩn:**
  * Trong JavaScript và HTML truyền thống, hành vi mặc định của thẻ `<form>` khi submit là gửi một HTTP Request (GET/POST) lên action URL và **tải lại (reload) toàn bộ trang web**.
  * Trong ứng dụng Single Page Application (SPA) của React, lệnh `e.preventDefault()` có tác dụng ngăn chặn hành vi tải lại trang mặc định này.
  * Điều này cho phép mã JavaScript trong hàm `handleSubmit` nắm quyền kiểm soát: tiến hành kiểm tra tính hợp lệ dữ liệu (validation), cập nhật React State, lưu trữ vào `localStorage` hoặc gọi API ngầm mà trải nghiệm của người dùng vẫn diễn ra mượt mà, không bị chớp màn hình.

---

## 12.3 Luồng thực thi

### Q1: Khi mở ứng dụng, component nào quyết định Login hay Admin?
* **Câu trả lời chuẩn:**
  * Component **[App.jsx](file:///d:/Ky7_FA2026/SBA301/LamDangKyAnh_SE1910/src/App.jsx#L11-L155)** đóng vai trò là Root Component quyết định việc này.
  * **Cơ chế:**
    1. `App.jsx` khởi tạo state `currentUser` thông qua hàm khởi tạo trễ (lazy initialization):
       ```javascript
       const [currentUser, setCurrentUser] = useState(() => storageService.getAuthSession());
       ```
    2. Hàm `storageService.getAuthSession()` sẽ đọc từ khóa `funews_auth_session` trong `localStorage`.
    3. Nếu chưa từng đăng nhập hoặc đã đăng xuất, hàm trả về `null`. Khi đó điều kiện tại dòng 149 kích hoạt:
       ```javascript
       if (!currentUser) {
         return <LoginPage onLoginSuccess={handleLoginSuccess} />;
       }
       ```
       Trình duyệt hiển thị trang `LoginPage`.
    4. Nếu tìm thấy phiên hợp lệ (dữ liệu JSON của user), `currentUser` có giá trị, lệnh `if` bị bỏ qua và `App.jsx` render master layout `<AdminLayout>`.

---

### Q2: Khi submit `Admin`/`Admin`, các bước state/event/render xảy ra thế nào?
* **Câu trả lời chuẩn:** Quá trình diễn ra tuần tự qua 6 bước khép kín:
  1. **Bước 1 (Sự kiện Submit):** Người dùng bấm nút "Đăng Nhập" hoặc nhấn Enter. Sự kiện `onSubmit` của `<Form>` kích hoạt hàm `handleSubmit(e)` trong [LoginPage.jsx](file:///d:/Ky7_FA2026/SBA301/LamDangKyAnh_SE1910/src/components/auth/LoginPage.jsx#L9-L41).
  2. **Bước 2 (Chặn reload & Kiểm tra):** Hàm gọi `e.preventDefault()`. Kiểm tra chuỗi sau khi `trim()` xem có bị rỗng không.
  3. **Bước 3 (Xác thực thông tin):** Kiểm tra `trimmedUser.toLowerCase() === "admin" && trimmedPass === "Admin"`. Thỏa mãn điều kiện đăng nhập Admin.
  4. **Bước 4 (Phát tín hiệu Callback):** `LoginPage` gọi hàm prop `onLoginSuccess({ id: 1, username: "Admin", role: 1, ... })` truyền dữ liệu người dùng ngược lên cho Component cha `App.jsx`.
  5. **Bước 5 (Cập nhật State tại App):** Hàm `handleLoginSuccess(user)` trong [App.jsx](file:///d:/Ky7_FA2026/SBA301/LamDangKyAnh_SE1910/src/App.jsx#L38-L42) thực hiện 3 tác vụ:
     * `setCurrentUser(user)`: Cập nhật state `currentUser`.
     * `storageService.saveAuthSession(user)`: Lưu session vào `localStorage`.
     * `setActiveTab("dashboard")`: Đặt tab mặc định là Dashboard.
  6. **Bước 6 (Re-render giao diện):** Do state `currentUser` thay đổi từ `null` thành object user, `App.jsx` re-render. Điều kiện `if (!currentUser)` không còn thỏa mãn, ứng dụng chuyển sang render `<AdminLayout>` với nội dung trang `DashboardPage`.

---

### Q3: Khi bấm menu, component nào thay đổi?
* **Câu trả lời chuẩn:**
  * **Sự kiện:** Khi người dùng click vào một mục menu (ví dụ: "Categories") trên [Sidebar.jsx](file:///d:/Ky7_FA2026/SBA301/LamDangKyAnh_SE1910/src/components/common/Sidebar.jsx#L26-L31), sự kiện `onClick` gọi `onSelectTab("categories")`.
  * **State thay đổi:** Hàm `setActiveTab("categories")` tại [App.jsx](file:///d:/Ky7_FA2026/SBA301/LamDangKyAnh_SE1910/src/App.jsx#L16) làm thay đổi giá trị của state `activeTab`.
  * **Các component thay đổi giao diện:**
    1. **Sidebar:** Nhận prop `activeTab="categories"`, gán class `.active` cho nút Categories và hiển thị chấm xanh phát sáng, đồng thời bỏ active ở tab cũ.
    2. **Header:** Nhận prop `activeTab="categories"`, hàm `getTabTitle("categories")` cập nhật tiêu đề thành *"Quản Lý Danh Mục Tin Tức (Category Management)"*.
    3. **Content Body:** Màn hình cũ (ví dụ: `DashboardPage`) bị unmount và màn hình mới tương ứng `{activeTab === "categories" && <CategoryManagement ... />}` được mount vào DOM.

---

### Q4: Khi bấm Add, state nào đổi để modal mở?
* **Câu trả lời chuẩn:**
  * Trong các trang quản lý (ví dụ: [NewsManagement.jsx](file:///d:/Ky7_FA2026/SBA301/LamDangKyAnh_SE1910/src/components/news/NewsManagement.jsx#L26-L32)):
  * Nút "Viết Bài Mới" gắn sự kiện `onClick={handleOpenCreate}`.
  * Hàm này thực thi lệnh:
    ```javascript
    setModalState({ show: true, mode: "create", newsItem: null });
    ```
  * State `modalState` thay đổi với trường `show` chuyển từ `false` sang `true`.
  * Component re-render và truyền prop `show={modalState.show}` vào component con `<NewsModal show={true} ... />`, khiến modal của React-Bootstrap hiển thị lên màn hình.

---

### Q5: Create: Dữ liệu form đi từ input đến danh sách như thế nào?
* **Câu trả lời chuẩn:** Dữ liệu di chuyển qua một quy trình khép kín gồm 5 chặng:
  1. **Chặng 1 (Input Form):** Khi người dùng gõ vào các ô nhập liệu trong [NewsModal.jsx](file:///d:/Ky7_FA2026/SBA301/LamDangKyAnh_SE1910/src/components/news/NewsModal.jsx), sự kiện `onChange` cập nhật liên tục vào state cục bộ `formData` của modal.
  2. **Chặng 2 (Validation & Submit tại Modal):** Người dùng bấm "Xuất bản bài báo". Hàm `handleSubmit` kiểm tra tính hợp lệ (tiêu đề, nội dung không được rỗng, đã chọn danh mục chưa). Nếu hợp lệ, đóng gói object và gọi hàm callback `onSave(payload)`.
  3. **Chặng 3 (Xử lý tại Page):** Hàm `handleSaveModal` trong `NewsManagement.jsx` nhận dữ liệu, nhận thấy `mode === "create"` -> gọi prop `onAddNews(data)` truyền lên `App.jsx`, đồng thời đóng modal (`show: false`) và kích hoạt alert thông báo thành công.
  4. **Chặng 4 (Nâng cấp State & Lưu trữ tại App):** Hàm `handleAddNews` trong [App.jsx](file:///d:/Ky7_FA2026/SBA301/LamDangKyAnh_SE1910/src/App.jsx#L79-L91) tự động tính toán sinh ID mới tự tăng (`Math.max(...) + 1`), bổ sung ngày tạo `createdAt`, cập nhật state bất biến `setNews(prev => [newArticle, ...prev])` và ghi đè vào `localStorage` qua `storageService.saveNews(updated)`.
  5. **Chặng 5 (Re-render Danh sách):** State `news` ở `App.jsx` đổi khiến `NewsManagement` re-render. Mảng phái sinh `displayedNews` được tính toán lại và bài viết mới xuất hiện ngay tại dòng đầu tiên của bảng.

---

### Q6: Update: Selected item được prefill và thay thế theo id ra sao?
* **Câu trả lời chuẩn:**
  * **Cơ chế Prefill (Điền sẵn dữ liệu cũ):**
    1. Khi bấm nút "Sửa" trên một dòng của bảng, hàm `handleOpenEdit(item)` được gọi, thực thi:
       ```javascript
       setModalState({ show: true, mode: "update", newsItem: item });
       ```
    2. Đối tượng `newsItem` được truyền vào `<NewsModal>`.
    3. Bên trong `NewsModal.jsx`, Hook `useEffect` lắng nghe các phụ thuộc `[show, mode, newsItem]`. Khi modal mở ra với chế độ `update`, `useEffect` sao chép các thuộc tính của `newsItem` vào state `formData`:
       ```javascript
       setFormData({
         title: newsItem.title,
         content: newsItem.content,
         categoryId: String(newsItem.categoryId),
         status: Number(newsItem.status),
         tagsInput: newsItem.tags.join(", ")
       });
       ```
       Toàn bộ các ô input tự động hiển thị dữ liệu hiện tại của bản ghi.
  * **Cơ chế thay thế theo ID:**
    1. Người dùng chỉnh sửa thông tin và bấm "Lưu Thay Đổi". Modal gọi `onSave` -> `NewsManagement` gọi hàm `onUpdateNews(modalState.newsItem.id, data)` lên `App.jsx`.
    2. Trong [App.jsx](file:///d:/Ky7_FA2026/SBA301/LamDangKyAnh_SE1910/src/App.jsx#L93-L101), hàm cập nhật sử dụng phương thức bất biến `.map()`:
       ```javascript
       setNews(prev => prev.map(item =>
         Number(item.id) === Number(id) ? { ...item, ...newsData, id: Number(id) } : item
       ));
       ```
       Phần tử có `id` trùng khớp sẽ được thay thế bằng object mới kết hợp `{ ...item, ...newsData }`, trong khi tất cả các phần tử khác giữ nguyên tham chiếu. Dữ liệu mới được lưu vào `localStorage` và cập nhật lại giao diện bảng.

---

### Q7: Delete: Confirmation bảo vệ thao tác như thế nào?
* **Câu trả lời chuẩn:**
  * **Mục đích bảo vệ:** Ngăn ngừa việc xóa nhầm dữ liệu do bấm nhầm chuột (accidental click), đảm bảo tính an toàn dữ liệu.
  * **Cơ chế bảo vệ 2 bước:**
    1. **Bước 1 (Chặn xóa trực tiếp):** Khi bấm biểu tượng thùng rác "Xóa", hệ thống **chưa xóa dữ liệu ngay**, mà chỉ lưu đối tượng cần xóa vào state tạm thời `deleteConfirm` và mở modal xác nhận:
       ```javascript
       setDeleteConfirm({ show: true, newsItem: item });
       ```
    2. **Bước 2 (Hộp thoại xác nhận độc lập):** Component [DeleteConfirmModal.jsx](file:///d:/Ky7_FA2026/SBA301/LamDangKyAnh_SE1910/src/components/common/DeleteConfirmModal.jsx) hiển thị thông báo cảnh báo rõ ràng kèm tên/tiêu đề của mục sắp xóa.
       * Nếu người dùng bấm **"Hủy bỏ (Cancel)"**: Modal đóng lại, `setDeleteConfirm({ show: false, newsItem: null })`, dữ liệu được bảo toàn 100%.
       * Chỉ khi người dùng bấm **"Xác nhận Xóa"**: Hàm `handleConfirmDelete()` mới gọi `onDeleteNews(id)` lên `App.jsx` để thực thi loại bỏ bản ghi qua phương thức bất biến `prev.filter(item => item.id !== id)`.
  * **Bảo vệ an toàn tài khoản đặc biệt:** Trong [UserManagement.jsx](file:///d:/Ky7_FA2026/SBA301/LamDangKyAnh_SE1910/src/components/users/UserManagement.jsx#L44-L47), hệ thống có thêm lớp kiểm tra: Nếu tài khoản định xóa trùng với tài khoản đang đăng nhập (`currentUser.username === user.username`), hệ thống lập tức chặn lại và báo lỗi *"Bạn không thể xóa tài khoản của chính mình đang đăng nhập!"*.

---

### Q8: Search: Source list và Displayed list khác nhau ra sao?
* **Câu trả lời chuẩn:**
  * **Source list (Danh sách nguồn):** Là mảng dữ liệu gốc đầy đủ (`news`, `categories`, `users`) được lưu trong State của `App.jsx` và đồng bộ trong `localStorage`.
  * **Displayed list (Danh sách hiển thị):** Là biến dữ liệu phái sinh (**Derived State**), được tính toán tức thời trong mỗi lần render thông qua hàm lọc `.filter()`:
    ```javascript
    const normalizedKeyword = searchTerm.trim().toLowerCase();
    const displayedNews = news.filter(item => {
      const matchKeyword = !normalizedKeyword ||
        item.title?.toLowerCase().includes(normalizedKeyword) ||
        item.content?.toLowerCase().includes(normalizedKeyword);
      const matchCategory = categoryFilter === "all" || Number(item.categoryId) === Number(categoryFilter);
      return matchKeyword && matchCategory;
    });
    ```
  * **Sự khác biệt mang tính sống còn:**
    * Thao tác tìm kiếm và lọc chỉ tác động lên `displayed list`, tuyệt đối **không bao giờ ghi đè hay làm mất dữ liệu của source list**.
    * Khi người dùng xóa từ khóa tìm kiếm (bấm nút ✕ hoặc xóa trắng ô input), `displayed list` ngay lập tức trả về đầy đủ toàn bộ dữ liệu ban đầu mà không cần phải gọi lại API hay nạp lại dữ liệu từ ổ đĩa.

---

### Q9: Reload: State nào mất, dữ liệu nào có thể còn nếu dùng localStorage?
* **Câu trả lời chuẩn:**
  * Khi người dùng nhấn F5 (Tải lại trang):
    * **Các State trong bộ nhớ RAM bị mất hoàn toàn:**
      1. Trạng thái đóng/mở của các modal dialog (`modalState`, `deleteConfirm`).
      2. Từ khóa tìm kiếm và các bộ lọc đang chọn dở dang (`searchTerm`, `categoryFilter`).
      3. Các thông báo phản hồi nhanh toast alert (`alertInfo`).
    * **Các Dữ liệu được bảo toàn nhờ `localStorage`:**
      1. **Phiên đăng nhập (`currentUser`):** Được lưu tại key `funews_auth_session`. Khi F5, `App.jsx` nạp lại session, người dùng **không bị văng ra màn hình Login** mà giữ nguyên trạng thái làm việc Admin.
      2. **Toàn bộ dữ liệu thực thể:** Danh mục (`funews_categories`), Bài báo (`funews_news`), Tài khoản người dùng (`funews_users`). Mọi thay đổi Thêm/Sửa/Xóa trước đó đều còn nguyên vẹn.
      3. **Tùy chọn giao diện:** Chế độ Sáng/Tối (`funews_theme_preference`) được duy trì.

---

## 12.4 Design & architecture

### Q1: Vì sao tách Header/Sidebar/Content?
* **Câu trả lời chuẩn:** Áp dụng nguyên tắc cốt lõi **Separation of Concerns (Tách biệt các mối quan tâm)** và mô hình thiết kế **Component Composition**:
  1. **Khả năng tái sử dụng (Reusability):** [AdminLayout.jsx](file:///d:/Ky7_FA2026/SBA301/LamDangKyAnh_SE1910/src/layouts/AdminLayout.jsx) giữ vai trò là khung ứng dụng dùng chung (Master Shell). Khi người dùng chuyển qua lại giữa các tính năng (Dashboard, Categories, News...), khung Header và Sidebar không bị mount/unmount lại từ đầu, giúp ứng dụng vận hành cực kỳ nhanh và mượt.
  2. **Dễ bảo trì và phát triển (Maintainability):** Khi cần thay đổi logo hay thêm mục menu, ta chỉ sửa duy nhất [Sidebar.jsx](file:///d:/Ky7_FA2026/SBA301/LamDangKyAnh_SE1910/src/components/common/Sidebar.jsx); khi muốn sửa avatar hay logic đổi theme, ta chỉ sửa [Header.jsx](file:///d:/Ky7_FA2026/SBA301/LamDangKyAnh_SE1910/src/components/common/Header.jsx). Logic giao diện không bị trộn lẫn với logic nghiệp vụ CRUD của từng trang con trong `Content`.
  3. **Cấu trúc mã nguồn tinh gọn:** Giữ cho mỗi file có độ dài hợp lý (dưới 100-200 dòng), dễ đọc, dễ giải thích mã nguồn khi phỏng vấn và dễ viết kiểm thử độc lập.

---

### Q2: Vì sao đặt state danh sách ở component hiện tại (`App.jsx`)?
* **Câu trả lời chuẩn:** Áp dụng nguyên lý thiết kế **Lifting State Up (Nâng state lên component cha chung gần nhất)** trong React:
  * Trong ứng dụng `FUNewsManagementSystem`, dữ liệu không nằm độc lập ở một trang riêng lẻ mà có sự ràng buộc chặt chẽ đa chiều:
    1. `NewsManagement` cần dữ liệu của `categories` để hiển thị tên danh mục trong bài báo và làm danh sách dropdown cho người dùng chọn khi thêm/sửa tin.
    2. `CategoryManagement` cần dữ liệu của `news` để kiểm tra danh mục đó có bài báo nào đang tham chiếu tới không trước khi xóa.
    3. `DashboardPage` cần độ dài mảng của cả `categories`, `news` và `users` để tính toán các con số thống kê tổng quan (Statistics Cards).
    4. `SettingsPage` cần số lượng bản ghi để thống kê dữ liệu hệ thống.
  * Việc đặt các state gốc tại [App.jsx](file:///d:/Ky7_FA2026/SBA301/LamDangKyAnh_SE1910/src/App.jsx#L22-L24) tạo ra một **Nguồn chân lý duy nhất (Single Source of Truth)**, giúp dữ liệu luôn đồng bộ nhất quán trên toàn bộ hệ thống.

---

### Q3: Vì sao dùng dialog (Modal) cho Create/Update?
* **Câu trả lời chuẩn:**
  1. **Tối ưu trải nghiệm người dùng chuẩn SPA (Seamless User Experience):** Người dùng thực hiện thêm mới hoặc sửa đổi dữ liệu ngay trên cùng một màn hình mà không cần điều hướng chuyển trang (không đổi URL, không tải lại trang). Sau khi Lưu hoặc Hủy, người dùng tiếp tục thao tác ngay với bảng dữ liệu phía dưới mà không bị mất ngữ cảnh (context).
  2. **Tập trung sự chú ý (Focus & Ergonomics):** Lớp phủ nền mờ (backdrop) của Modal giúp người dùng tập trung hoàn toàn vào việc điền các trường dữ liệu, hạn chế sai sót.
  3. **Tái sử dụng linh hoạt mã nguồn:** Cả 2 nghiệp vụ Tạo mới (Create) và Chỉnh sửa (Update) cùng chia sẻ chung một Modal form duy nhất, phân biệt qua cờ `mode="create" | "update"`, giúp giảm 50% lượng mã nguồn trùng lặp.

---

### Q4: Vì sao dùng mock data và giới hạn của nó?
* **Câu trả lời chuẩn:**
  * **Lý do sử dụng mock data:**
    * Cho phép phát triển độc lập và hoàn thiện toàn bộ tầng giao diện Client-side (Frontend) kể cả khi hệ thống Backend/Database chưa hoàn thành.
    * Cung cấp sẵn tập dữ liệu ban đầu chuẩn mực (Seed Data) để giảng viên có thể kiểm thử tức thì các chức năng CRUD, phân quyền, tìm kiếm mà không yêu cầu cài đặt môi trường cơ sở dữ liệu phức tạp.
  * **Giới hạn kỹ thuật của mock data:**
    1. **Phạm vi cục bộ:** Dữ liệu chỉ tồn tại trên trình duyệt của máy hiện tại (`localStorage`), không thể chia sẻ đồng thời giữa nhiều máy người dùng khác nhau.
    2. **Thiếu ràng buộc toàn vẹn cơ sở dữ liệu:** Không có các cơ chế ACID transactions, khóa ngoại tự động (Foreign Key Cascading) hay trigger từ DBMS thực thụ.
    3. **Bảo mật thấp:** Không có xác thực mật khẩu bằng hàm băm mật mã (bcrypt/Argon2) hay mã hóa chữ ký số JWT token.
    4. **Giới hạn dung lượng:** Bộ nhớ `localStorage` bị trình duyệt giới hạn tối đa khoảng 5MB chuỗi ký tự.

---

### Q5: Nếu kết nối Spring Boot API, tầng nào cần đổi?
* **Câu trả lời chuẩn:** Nhờ kiến trúc phân tầng sạch (Clean Separation), **toàn bộ giao diện người dùng (UI Components) được giữ nguyên vẹn**, chỉ cần thay đổi 2 điểm:
  1. **Thay thế tầng dịch vụ lưu trữ (`storageService.js`):**
     * Xây dựng tệp `apiService.js` sử dụng thư viện `axios` hoặc API `fetch()` tiêu chuẩn để kết nối đến các Endpoint của Spring Boot Controller:
       * `GET /api/v1/news` -> Lấy danh sách bài báo
       * `POST /api/v1/news` -> Tạo bài báo mới
       * `PUT /api/v1/news/{id}` -> Cập nhật bài báo
       * `DELETE /api/v1/news/{id}` -> Xóa bài báo
  2. **Chuyển đổi Handlers tại `App.jsx` sang Bất đồng bộ (`async/await`):**
     * Thay vì gọi `storageService.saveNews(...)` đồng bộ, ta gọi `await apiService.createNews(data)`.
     * Sử dụng Hook `useEffect` để gọi API nạp dữ liệu lúc ban đầu (initial data fetch).
     * Bổ sung các biến state `loading` (hiển thị spinner khi chờ server xử lý) và `error` (bắt lỗi HTTP status 400, 401, 403, 500).

---

### Q6: Nếu thêm Staff role, cần sửa auth/menu/page nào?
* **Câu trả lời chuẩn:**
  *(Dự án FUNewsManagementSystem của em đã được thiết kế sẵn cấu trúc 2 vai trò: Admin - Role 1 và Staff - Role 2. Nếu nâng cấp phân quyền sâu hơn, ta sẽ chỉnh sửa các vị trí sau):*
  1. **Tầng Auth ([LoginPage.jsx](file:///d:/Ky7_FA2026/SBA301/LamDangKyAnh_SE1910/src/components/auth/LoginPage.jsx#L30-L37)):** Nhận diện tài khoản Staff và trả về đối tượng session có `role: 2`.
  2. **Tầng Menu ([Sidebar.jsx](file:///d:/Ky7_FA2026/SBA301/LamDangKyAnh_SE1910/src/components/common/Sidebar.jsx)):** Truyền prop `currentUser` vào Sidebar. Thực hiện lọc danh sách `menuItems`: Nếu `currentUser.role === 2` (Staff), ẩn 2 menu quản trị hệ thống là "User Management" (`users`) và "System Settings" (`settings`).
  3. **Tầng Trang ([CategoryManagement.jsx](file:///d:/Ky7_FA2026/SBA301/LamDangKyAnh_SE1910/src/components/category/CategoryManagement.jsx) & [NewsManagement.jsx](file:///d:/Ky7_FA2026/SBA301/LamDangKyAnh_SE1910/src/components/news/NewsManagement.jsx)):**
     * Ẩn các nút nguy hiểm như "Xóa danh mục", "Xóa bài báo" đối với Staff.
     * Tại form viết bài, tự động gán cố định `createdBy` là username của Staff hiện tại, không cho phép sửa đổi quyền tác giả của người khác.
  4. **Tầng Header ([Header.jsx](file:///d:/Ky7_FA2026/SBA301/LamDangKyAnh_SE1910/src/components/common/Header.jsx#L54-L58)):** Hiển thị nhãn huy hiệu `<span className="badge-staff">Staff</span>`.

---

### Q7: Nếu thêm pagination/search server-side, kiến trúc đổi gì?
* **Câu trả lời chuẩn:** Chuyển đổi từ mô hình *Client-side In-memory Filtering* sang mô hình *Server-side Query Parameters*:
  1. **Thay đổi State quản lý:** Bổ sung các state quản lý phân trang: `currentPage`, `pageSize`, `totalItems`, `totalPages`, `sortBy`, `sortDirection`.
  2. **Cơ chế tải dữ liệu:** Không còn tải toàn bộ danh sách về một lần nữa. Mỗi khi người dùng bấm đổi trang hoặc gõ từ khóa tìm kiếm, ứng dụng sẽ gửi request truy vấn cụ thể đến Spring Boot backend:
     ```http
     GET /api/v1/news?page=0&size=10&keyword=React&categoryId=1&sort=createdAt,desc
     ```
  3. **Giao diện bảng:** Bảng chỉ render đúng 10 bản ghi nhận được từ `content: []` của Spring `Page<NewsArticle>`. Bổ sung component phân trang `<Pagination>` ở cuối bảng để người dùng chuyển qua các trang `1, 2, 3... Trang tiếp`.
  4. **Kỹ thuật Debouncing:** Thêm kỹ thuật **Debounce** (trì hoãn khoảng 300ms - 500ms) trên ô input tìm kiếm để tránh việc gửi liên tục hàng chục request lên server sau mỗi ký tự gõ phím.

---

## 12.5 Debugging interview

### Q1: List không hiển thị: Bạn kiểm tra gì đầu tiên?
* **Câu trả lời chuẩn:** Thực hiện quy trình khoanh vùng 4 bước chuyên nghiệp:
  1. **Bước 1 (Kiểm tra Console F12):** Mở ngay Tab Console trong DevTools của trình duyệt xem có lỗi JavaScript runtime nào không (đặc biệt là lỗi phổ biến `TypeError: Cannot read properties of undefined (reading 'map')`).
  2. **Bước 2 (Kiểm tra dữ liệu đầu vào):** Đặt `console.log("Data list:", news)` ngay trước dòng lệnh render `.map()` để xác thực xem biến dữ liệu có tồn tại không và có phải là một mảng hay không (`Array.isArray(news)`).
  3. **Bước 3 (Kiểm tra điều kiện bộ lọc):** Kiểm tra biến `displayedNews`. Rất nhiều trường hợp dữ liệu nguồn vẫn có nhưng biến `searchTerm` hoặc dropdown `categoryFilter` vô tình lọc ra kết quả rỗng.
  4. **Bước 4 (Kiểm tra React DevTools):** Xem component có nhận được props từ Component cha hay không, hoặc CSS bảng có vô tình bị ẩn (`display: none`, `height: 0`, v.v.).

---

### Q2: Modal không mở: Kiểm tra state/event/props thế nào?
* **Câu trả lời chuẩn:**
  1. **Kiểm tra Event (Sự kiện kích hoạt):** Kiểm tra nút bấm xem đã gắn đúng thuộc tính `onClick={handleOpenCreate}` chưa, đặt `console.log("Button clicked")` vào trong hàm để xem sự kiện có kích hoạt hay không.
  2. **Kiểm tra State:** Kiểm tra xem hàm `setModalState` có thực thi và cập nhật trường `show: true` trong state hay không.
  3. **Kiểm tra Props truyền xuống:** Kiểm tra xem prop `show={modalState.show}` truyền vào component `<NewsModal show={...} />` có nhận được giá trị `true` không.
  4. **Kiểm tra bên trong Modal Component:** Xác nhận component con có nhận prop `show` và truyền nó vào thẻ `<Modal show={show} onHide={onClose}>` của thư viện `react-bootstrap` hay không, và có bị xung đột class CSS che khuất z-index không.

---

### Q3: Delete không re-render: Dấu hiệu mutate state là gì?
* **Câu trả lời chuẩn:**
  * **Dấu hiệu mutate state điển hình:** Đoạn mã vô tình chỉnh sửa trực tiếp trên mảng state cũ mà không tạo mảng mới, ví dụ:
    ```javascript
    // SAI LẦM: Mutate trực tiếp state
    const index = news.findIndex(n => n.id === id);
    news.splice(index, 1); // Thay đổi trực tiếp mảng news
    setNews(news);         // Truyền lại chính tham chiếu cũ
    ```
  * **Giải thích nguyên nhân không re-render:** Khi truyền lại chính biến mảng `news` cũ, địa chỉ vùng nhớ RAM của nó vẫn giữ nguyên. Hàm kiểm tra của React `Object.is(prevNews, nextNews)` trả về `true` (coi như không có gì thay đổi), dẫn đến việc React **bỏ qua bước re-render**.
  * **Cách sửa chuẩn xác:** Luôn sử dụng hàm trả về một mảng mới có địa chỉ vùng nhớ hoàn toàn độc lập:
    ```javascript
    setNews(prev => prev.filter(item => Number(item.id) !== Number(id)));
    ```

---

### Q4: Login đúng nhưng không vào Admin: Khoanh vùng ở đâu?
* **Câu trả lời chuẩn:** Tiến hành khoanh vùng lỗi theo sơ đồ 4 điểm:
  1. **Điểm 1 (So khớp chuỗi tại Login):** Kiểm tra điều kiện so sánh tại `LoginPage.jsx`: xem `username` và `password` có bị dính khoảng trắng vô hình ở đầu/cuối hay không (cần có `.trim()`), hoặc có phân biệt hoa/thường không mong muốn hay không.
  2. **Điểm 2 (Callback prop):** Kiểm tra xem hàm `onLoginSuccess(user)` có được truyền từ `App.jsx` xuống `LoginPage` hay bị `undefined`.
  3. **Điểm 3 (State tại App.jsx):** Kiểm tra xem hàm `handleLoginSuccess` trong `App.jsx` có gọi lệnh `setCurrentUser(user)` hay không, và in `console.log("Current user updated:", user)` để xác nhận.
  4. **Điểm 4 (Crash màn hình Admin):** Kiểm tra Console xem bên trong `<AdminLayout>` hoặc `<DashboardPage>` có component con nào gặp lỗi Uncaught Runtime Error hay không. Khi một component con bị crash, màn hình có thể bị trắng xóa khiến ta lầm tưởng là chưa đăng nhập được.

---

### Q5: Search sai: Kiểm tra keyword/source data/field nào?
* **Câu trả lời chuẩn:**
  1. **Kiểm tra Keyword (Từ khóa):**
     * Đã được làm sạch khoảng trắng thừa chưa: `searchTerm.trim()`?
     * Đã được chuyển về chữ thường để so sánh không phân biệt hoa thường chưa: `.toLowerCase()`?
  2. **Kiểm tra Field tìm kiếm (An toàn dữ liệu):**
     * Trường dữ liệu cần so sánh có nguy cơ bị `null` hoặc `undefined` không? Ví dụ nếu `item.title` bị rỗng mà gọi trực tiếp `item.title.toLowerCase()` sẽ làm sập ứng dụng. Cần viết an toàn: `item.title?.toLowerCase().includes(...)`.
  3. **Kiểm tra Source Data:**
     * Lập trình viên có vô tình lọc trên chính biến mảng đã bị lọc từ trước đó không? Đảm bảo bộ lọc luôn lấy đầu vào từ mảng nguồn gốc `news` chứ không lấy từ `displayedNews`.

---

### Q6: Reload mất dữ liệu: Đó là bug hay đúng design?
* **Câu trả lời chuẩn:**
  * **Về mặt kỹ thuật Web/React thông thường:** Một ứng dụng React thuần túy chỉ lưu state trên bộ nhớ RAM. Khi người dùng bấm F5 Reload, toàn bộ môi trường JavaScript bị hủy và khởi động lại từ đầu, nên việc mất dữ liệu là **hành vi tự nhiên của trình duyệt**.
  * **Đối với dự án này (FUNewsManagementSystem):** Việc giữ được dữ liệu khi Reload là một yêu cầu bắt buộc và đã được **chủ đích thiết kế sẵn (By Design)** thông qua tầng [storageService.js](file:///d:/Ky7_FA2026/SBA301/LamDangKyAnh_SE1910/src/services/storageService.js) và bộ nhớ `localStorage`.
  * **Kết luận phỏng vấn:** Nếu trong dự án này, sau khi người dùng thực hiện Thêm/Sửa/Xóa mà nhấn F5 bị mất dữ liệu, thì đó chắc chắn là **BUG** (do hàm xử lý state quên gọi lệnh đồng bộ xuống `localStorage`: `storageService.saveCategories(updated)`).

---

## 12.6 AI usage interview

### Q1: Bạn dùng AI vào phần nào?
* **Câu trả lời chuẩn:**
  * Em sử dụng AI (Google Gemini / Claude) như một công cụ hỗ trợ năng suất (Engineering Copilot) có chọn lọc và kiểm soát chặt chẽ:
    1. **Thiết kế Logo nhận diện thương hiệu:** Ứng dụng AI để lên ý tưởng và xuất file đồ họa vector SVG cho biểu tượng `FUNewsManagementSystem` (kết hợp hình tượng trang báo tin tức, khiên quản trị bảo mật và hiệu ứng AI phát sáng).
    2. **Xây dựng Ma trận kiểm thử (Test Matrix):** Sử dụng AI để rà soát rubric yêu cầu của đề bài SBA301 Assignment 01 và định dạng khung bảng 35 kịch bản kiểm thử theo đúng tiêu chuẩn kỹ thuật phần mềm.
    3. **Tham khảo thiết kế UI/UX:** Tham khảo các bảng mã màu HSL hài hòa cho chủ đề Sáng/Tối (Light/Dark Mode) và phong cách thẻ hiện đại Glassmorphism.

---

### Q2: Prompt cụ thể nào hữu ích nhất?
* **Câu trả lời chuẩn:**
  * **Prompt thiết kế Logo SVG:**
    > *"Hãy viết mã nguồn một tệp SVG thuần (không dùng font hay thư viện bên ngoài) kích thước viewBox 0 0 450 90 cho hệ thống 'FUNewsManagementSystem' của trường Đại học FPT. Thiết kế biểu tượng bên trái gồm hình trang báo mở kết hợp chiếc khiên bảo mật công nghệ cao, màu chủ đạo xanh Indigo (#4f46e5) và Cyan (#06b6d4). Chữ 'FUNews' viết in hoa đậm nét công nghệ hiện đại, kèm một ngôi sao lấp lánh tượng trưng cho tính năng AI."*
  * **Prompt xây dựng Test Matrix:**
    > *"Dựa trên đặc tả yêu cầu Assignment 01 môn SBA301 (ReactJS CRUD + Search cho 3 thực thể Category, News, User, Login phân quyền, Popup Modal, LocalStorage), hãy lập bảng Ma trận kiểm thử gồm 35 test cases chi tiết chia theo nhóm chức năng, có cột Thao tác thực hiện, Kết quả kỳ vọng và Kết quả thực tế."*

---

### Q3: Bạn đã kiểm chứng output bằng test nào?
* **Câu trả lời chuẩn:** Em không bao giờ tin tưởng mù quáng vào kết quả sinh ra từ AI mà luôn thực hiện kiểm chứng độc lập 100% qua 4 cấp độ:
  1. **Kiểm chứng chức năng thực tế:** Trực tiếp thao tác và kiểm tra toàn bộ **35/35 kịch bản** trong Ma trận kiểm thử trên trình duyệt (đăng nhập sai, form rỗng, thêm/sửa/xóa, lọc dữ liệu không trùng khớp, reload F5, đổi theme).
  2. **Kiểm chứng đóng gói mã nguồn (Build Test):** Chạy lệnh `npm run build` trên terminal để Vite phân tích cú pháp toàn bộ dự án, đảm bảo không có cảnh báo (warnings), không có biến thừa (unused variables) hay lỗi biên dịch.
  3. **Kiểm chứng kiến trúc React:** Mở DevTools Console và React Developer Tools để kiểm tra không bị lỗi trùng lặp `key` khi render danh sách, không có cảnh báo chuyển đổi giữa controlled/uncontrolled input, và không có vòng lặp vô tận (infinite render loop).
  4. **Kiểm tra tính an toàn dữ liệu:** Thử nghiệm xóa danh mục đang có bài viết liên kết, thử xóa tài khoản đang đăng nhập để xác nhận các chốt chặn an toàn hoạt động chính xác.

---

### Q4: Bạn đã thay đổi gì so với gợi ý AI?
* **Câu trả lời chuẩn:** Em đã can thiệp, phản biện và tối ưu lại rất nhiều chi tiết quan trọng:
  1. **Tái cấu trúc State Architecture:** Ban đầu AI gợi ý lưu state danh sách ngay bên trong từng component con (`CategoryManagement`, `NewsManagement`). Em đã chủ động tái cấu trúc theo mô hình **Lifting State Up**, đưa toàn bộ state về `App.jsx` để `NewsManagement` và `DashboardPage` có thể truy cập danh mục và tính toán số liệu thống kê dùng chung.
  2. **Tối ưu hóa cơ chế tìm kiếm (Derived State):** AI có xu hướng tạo thêm một state phụ `const [filteredNews, setFilteredNews] = useState([])`. Em đã loại bỏ hoàn toàn state phụ này để tránh nguy cơ lệch dữ liệu (Out-of-sync), thay vào đó tính toán trực tiếp biến phái sinh `displayedNews` từ mảng gốc `news` trong mỗi lượt render.
  3. **Bổ sung logic nghiệp vụ phòng vệ:** Em tự bổ sung thêm quy tắc nghiệp vụ quan trọng: Ngăn chặn tuyệt đối người dùng tự xóa tài khoản của chính mình khi đang đăng nhập, và hiển thị cảnh báo bài viết mồ côi khi xóa một danh mục đang có tin tức liên quan.

---

### Q5: Nếu AI đưa code sai hoặc dùng API không tồn tại, bạn phát hiện thế nào?
* **Câu trả lời chuẩn:**
  1. **Dựa vào Vite Fast Refresh & Compiler:** Trình biên dịch Vite kết hợp Rollup sẽ báo lỗi đỏ rực ngay lập tức trên cửa sổ Terminal và giao diện Overlay của trình duyệt nếu một thư viện, component hay hàm nào đó bị import sai hoặc không tồn tại.
  2. **Dựa vào Runtime Stack Trace trong DevTools:** Khi ứng dụng nảy sinh ngoại lệ (ví dụ: AI bịa ra một hook hoặc một prop không có thật của `react-bootstrap`), trình duyệt sẽ ném lỗi `TypeError` hoặc cảnh báo Warning màu vàng trong Console, chỉ rõ chính xác tên tệp và số dòng gây lỗi.
  3. **Đối chiếu với Tài liệu chính thức (Official Documentation):** Luôn tra cứu và đối chiếu với tài liệu gốc của [React 18 Docs](https://react.dev/) và [React-Bootstrap Components](https://react-bootstrap.netlify.app/) để xác nhận cú pháp và các thuộc tính hỗ trợ chuẩn xác.

---

### Q6: Phần nào của project hoàn toàn do bạn tự thiết kế?
* **Câu trả lời chuẩn:**
  * **Em hoàn toàn tự thiết kế, làm chủ và chịu trách nhiệm 100% đối với:**
    1. **Toàn bộ Kiến trúc luồng dữ liệu (State Architecture):** Sơ đồ quan hệ giữa `App.jsx`, các Layouts và các Components con; quyết định áp dụng nguyên lý Lifting State Up và Single Source of Truth.
    2. **Mô hình Dịch vụ Lưu trữ (`storageService.js`):** Xây dựng lớp bọc trừu tượng (Service Layer) để nạp dữ liệu mẫu ban đầu (Hydration) và đồng bộ an toàn với `localStorage`.
    3. **Liên kết thực thể nghiệp vụ:** Thiết lập quan hệ khóa logic giữa Danh mục (`categoryId`) và Bài báo, xử lý cảnh báo khi xóa danh mục có bài báo liên quan.
    4. **Cơ chế bảo vệ phiên làm việc:** Ngăn chặn việc tự xóa chính mình trong `UserManagement` và cơ chế ghi nhớ tài khoản đăng nhập khi F5.
    5. **Toàn bộ quá trình kiểm thử độc lập:** Lên kế hoạch, thực thi và kiểm chứng từng trường hợp trong 35 kịch bản kiểm thử trên thực tế.

---

## 💡 MẸO TRẢ LỜI ĐẠT ĐIỂM TỐI ĐA (PRO-TIPS CHO BUỔI PHỎNG VẤN)
1. **Bình tĩnh, tự tin và mở sẵn mã nguồn:** Khi giảng viên đặt câu hỏi, hãy mở đúng file mã nguồn liên quan (ví dụ hỏi Login thì mở `LoginPage.jsx` và `App.jsx`), dùng chuột chỉ trực tiếp vào các dòng code then chốt để chứng minh bạn là người trực tiếp viết và hiểu sâu mã nguồn.
2. **Luôn nhấn mạnh nguyên tắc Bất biến (Immutability):** Bất cứ khi nào nói về Thêm/Sửa/Xóa trong React, hãy nhấn mạnh các toán tử `...` (spread operator), `.map()`, `.filter()` và giải thích vì sao không dùng `.push()`, `.splice()`.
3. **Thể hiện tư duy kỹ sư phần mềm:** Nhấn mạnh rằng bạn xem AI là một trợ thủ đắc lực giúp tăng tốc lập trình, nhưng chính kiến thức nền tảng vững chắc của bạn mới là yếu tố quyết định chất lượng, tính an toàn và độ tin cậy của phần mềm.
