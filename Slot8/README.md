# SBA301 Slot 8 - Product REST API Design and Inspection Kit

## Scope
Hands-on laboratory project for Client-Server communication, HTTP protocol methods, JSON data parsing, REST endpoint design, `json-server` mock server execution, and inspection via Postman and Browser DevTools.

## Requirements
- Node.js 21+ or equivalent runtime
- npm
- Postman or any HTTP REST Client
- Browser DevTools (F12 Network tab)

## Installation & Setup
```bash
npm install
```

## Running the Mock REST API
```bash
npm run api
```
Base URL: `http://localhost:3001`  
Endpoints: `http://localhost:3001/products`

## JSON Parsing Demo
To test JSON text parsing vs JavaScript objects:
```bash
npm run json-demo
```

## Reset Database State
To reset `db.json` back to clean seed data after running destructive tests (`POST`, `PUT`, `DELETE`):
```bash
npm run reset-db
```

## Required Test Matrix
1. `GET /products` -> Verify 200 OK & Array response
2. `GET /products/1` -> Verify 200 OK & Object response
3. `GET /products/999` -> Verify 404 Not Found handling
4. `POST /products` -> Verify 201 Created & Generated ID persistence
5. `PUT /products/1` -> Verify full entity replacement
6. `PATCH /products/1` -> Verify partial property update
7. `DELETE /products/5` -> Verify 200 OK and subsequent 404 on GET /products/5
