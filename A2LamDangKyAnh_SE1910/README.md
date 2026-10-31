# Assignment 02 SBA301 - FUNewsManagementSystem

**Student:** Lam Dang Ky Anh  
**Class Code:** SE1910  
**Database Name:** `A2LamDangKyAnh_SE1910`  
**Backend Project:** Spring Boot 3 RESTful API (`A2LamDangKyAnh_SE1910`)  
**Frontend Project:** ReactJS Client (`a2lamdangkyanh_se1910`)

---

## 1. Project Overview

FUNewsManagementSystem is a modern web application built to help educational institutions and universities publish, organize, and manage news and content efficiently.

The system is developed following modern enterprise standards:
- **Backend:** Spring Boot 3 with 3-Layer Architecture (`Controller` -> `Service` -> `Repository` -> `Entity`) using Spring Data JPA with Microsoft SQL Server.
- **Frontend:** ReactJS Single Page Application (SPA) using Axios, Bootstrap 5, and popup dialogs (Modals) for all Create/Update/Delete confirmation actions.

---

## 2. System Architecture & Features

### A. Database Design
- **`Category`**: `CategoryID` (PK), `CategoryName`, `CategoryDesciption`, `ParentCategoryID`, `IsActive` (Active = 1, Inactive = 0).
- **`SystemAccount`**: `AccountID` (PK), `AccountName`, `AccountEmail`, `AccountRole` (Admin = 1, Staff = 2), `AccountPassword`.
- **`Tag`**: `TagID` (PK), `TagName`, `Note`.
- **`NewsArticle`**: `NewsArticleID` (PK), `NewsTitle`, `Headline`, `CreatedDate`, `NewsContent`, `NewsSource`, `CategoryID` (FK), `NewsStatus` (Active = 1, Inactive = 0), `CreatedByID` (FK), `UpdatedByID` (FK), `ModifiedDate`.
- **`NewsTag`**: Join table between `NewsArticle` (`NewsArticleID`) and `Tag` (`TagID`).

### B. Business Rules & Main Functions
1. **Public View (No Authentication Needed):**
   - Readers can browse all active news articles (`newsStatus = true`).
   - Search articles by keyword in title, headline, or content.
   - Filter by news category.
   - Click any news card to open a full reading popup modal with author, publication date, category, and tags.
2. **Member & Staff Authentication:**
   - Login by Email and Password (`POST /api/auth/login`).
   - Identifies roles: **Admin** (`AccountRole = 1`) and **Staff** (`AccountRole = 2`).
3. **Admin Role (AccountRole = 1):**
   - **Account Management:** Full CRUD (Create, Read, Update, Delete) and search.
   - **Creation & Update:** Performed via popup dialogs (Modals) with full validation (email format, role selection, non-empty fields).
   - **Delete Action with Confirmation & Constraint Check:**
     > *Rule:* If an account has already created any news article, the system strictly forbids deletion and returns a clear 400 Bad Request error.
4. **Staff Role (AccountRole = 2):**
   - **Category Management:**
     - Full CRUD (Create, Read, Update, Delete) and search.
     - Performed via popup dialogs.
     - **Constraint Check:** If a category is currently assigned to any news articles, it cannot be deleted.
   - **News Article Management:**
     - Full CRUD operations with popup dialogs.
     - Supports assigning multiple tags, category selection, and toggling active/inactive (draft) status.
     - Confirmation modal before deleting articles.
   - **My News History:**
     - View all articles authored by the logged-in staff member.
     - Visual summary KPIs: Total authored, Published (active), and Drafts.
   - **My Profile Management:**
     - View identity details and update display name and password.

---

## 3. Demo Credentials

| Role | Email | Password | Access Rights |
|---|---|---|---|
| **Admin** | `admin@funews.com` | `admin123` | Account Management CRUD & Search |
| **Staff** | `staff@funews.com` | `staff123` | News CRUD, Category CRUD, News History, Profile |
| **Staff (Reporter)** | `reporter@funews.com` | `reporter123` | Draft authoring, News CRUD, Category CRUD |

---

## 4. How to Run the Application

### Prerequisites
- Java JDK 21+
- Apache Maven 3.9+
- Node.js v18+ & npm
- Microsoft SQL Server running on `localhost:1433` (Credentials: `sa` / `123456`)

### Step 1: Start Backend (Spring Boot 3)
```powershell
cd backend
mvn spring-boot:run
```
The RESTful API will automatically start on `http://localhost:8080`.
Spring Data JPA will initialize the schema and populate seed data in the `A2LamDangKyAnh_SE1910` database.

### Step 2: Start Frontend (ReactJS Client)
```powershell
cd frontend
npm install
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

---

## 5. REST API Endpoints Reference

| Method | Endpoint | Description | Public / Role |
|---|---|---|---|
| `GET` | `/api/news/public` | Get all active news articles | Public |
| `POST` | `/api/auth/login` | Authenticate user credentials | Public |
| `GET` | `/api/accounts` | List / search accounts (`?query=`) | Admin |
| `POST` | `/api/accounts` | Create new system account | Admin |
| `PUT` | `/api/accounts/{id}` | Update account | Admin |
| `DELETE` | `/api/accounts/{id}` | Delete account (validates no news created) | Admin |
| `PUT` | `/api/accounts/{id}/profile` | Update staff profile | Staff |
| `GET` | `/api/categories` | List / search categories (`?search=`) | Staff |
| `GET` | `/api/categories/active` | List active categories | Public / Staff |
| `POST` | `/api/categories` | Create new category | Staff |
| `PUT` | `/api/categories/{id}` | Update category | Staff |
| `DELETE` | `/api/categories/{id}` | Delete category (validates no news using it) | Staff |
| `GET` | `/api/news` | Search / filter news articles | Staff |
| `GET` | `/api/news/{id}` | Get article detail | Public / Staff |
| `POST` | `/api/news` | Create news article with tags | Staff |
| `PUT` | `/api/news/{id}` | Update news article | Staff |
| `DELETE` | `/api/news/{id}` | Delete news article | Staff |
| `GET` | `/api/news/history/{staffId}` | Get news history created by staff | Staff |
| `GET` | `/api/tags` | List all tags | Staff |
| `POST` | `/api/tags` | Create new tag | Staff |
