# Product REST API Contract & Inspection Guide

**Course:** SBA301 • Slot 08  
**Base URL:** `http://localhost:3001`  
**Data Format:** JSON (`Content-Type: application/json`)  

---

## 1. Resource Endpoints Matrix

| HTTP Method | Endpoint | Action / Purpose | Request Body | Success Response | Expected Status |
|---|---|---|---|---|---|
| `GET` | `/products` | List all products | None | `Product[]` | `200 OK` |
| `GET` | `/products/{id}` | Get product by ID | None | `Product` | `200 OK` / `404 Not Found` |
| `POST` | `/products` | Create a new product | `ProductCreate` | `Product` (with generated ID) | `201 Created` |
| `PUT` | `/products/{id}` | Replace product completely | `Product` | `Product` | `200 OK` |
| `PATCH` | `/products/{id}` | Update product partially | `Partial<Product>` | `Product` | `200 OK` |
| `DELETE` | `/products/{id}` | Delete product | None | `{}` | `200 OK` |

---

## 2. Product Schema Definition

```json
{
  "id": 1,
  "name": "iPhone 15 Pro",
  "category": "Phone",
  "price": 29000000,
  "quantity": 10,
  "active": true
}
```

- **`id`** *(Number / Auto-incremented by server)*
- **`name`** *(String, Required)*
- **`category`** *(String, Required)*
- **`price`** *(Number, > 0)*
- **`quantity`** *(Integer, >= 0)*
- **`active`** *(Boolean)*

---

## 3. Sample Requests for Postman & DevTools

### 3.1 POST Create Product
**Request:** `POST http://localhost:3001/products`  
**Headers:** `Content-Type: application/json`  
**Body:**
```json
{
  "name": "MacBook Air M3",
  "category": "Laptop",
  "price": 30000000,
  "quantity": 8,
  "active": true
}
```

### 3.2 PUT Full Update
**Request:** `PUT http://localhost:3001/products/1`  
**Headers:** `Content-Type: application/json`  
**Body:**
```json
{
  "id": 1,
  "name": "iPhone 15 Pro Max",
  "category": "Phone",
  "price": 32000000,
  "quantity": 12,
  "active": true
}
```

### 3.3 PATCH Partial Update
**Request:** `PATCH http://localhost:3001/products/1`  
**Headers:** `Content-Type: application/json`  
**Body:**
```json
{
  "price": 31000000,
  "quantity": 15
}
```

### 3.4 DELETE Product
**Request:** `DELETE http://localhost:3001/products/5`  
