# TravelEase API Documentation

## Base URL

**Development**

```
http://localhost:5000/api
```

**Production**

```
https://your-domain.com/api
```

---

# Authentication

Most APIs require a JWT token.

Header:

```
Authorization: Bearer <JWT_TOKEN>
```

---

# Response Format

## Success

```json
{
  "success": true,
  "message": "Request successful",
  "data": {}
}
```

## Error

```json
{
  "success": false,
  "message": "Something went wrong"
}
```

---

# Authentication APIs

## Register User

**POST**

```
/auth/register
```

### Request

```json
{
  "firstName": "Om",
  "lastName": "Kute",
  "email": "om@example.com",
  "password": "Password@123",
  "phone": "9876543210"
}
```

### Success

```json
{
  "success": true,
  "message": "Registration successful"
}
```

---

## Login

**POST**

```
/auth/login
```

### Request

```json
{
  "email": "om@example.com",
  "password": "Password@123"
}
```

### Success

```json
{
  "success": true,
  "token": "<JWT_TOKEN>"
}
```

---

## User Profile

**GET**

```
/auth/profile
```

Authentication Required

---

# User APIs

## Get All Users

**GET**

```
/users
```

Admin Only

---

## Update Profile

**PUT**

```
/users/update
```

Authentication Required

---

# Hotel APIs

## Get All Hotels

**GET**

```
/hotels
```

---

## Hotel Details

**GET**

```
/hotels/:id
```

---

## Search Hotels

**GET**

```
/hotels/search
```

### Query Parameters

| Parameter | Description    |
| --------- | -------------- |
| city      | Hotel city     |
| minPrice  | Minimum price  |
| maxPrice  | Maximum price  |
| rating    | Minimum rating |

Example

```
/hotels/search?city=Mumbai&rating=4
```

---

# Booking APIs

## Create Booking

**POST**

```
/bookings
```

Authentication Required

### Request

```json
{
  "hotelId": "687000000000000000000001",
  "checkIn": "2026-08-01",
  "checkOut": "2026-08-03",
  "guests": 2,
  "rooms": 1
}
```

---

## Booking History

**GET**

```
/bookings/history
```

Authentication Required

---

## Cancel Booking

**PUT**

```
/bookings/cancel/:bookingId
```

Authentication Required

---

# Payment APIs

## Create Payment

**POST**

```
/payments
```

Authentication Required

### Request

```json
{
  "bookingId": "BK100001",
  "paymentMethod": "UPI"
}
```

---

## Verify Payment

**POST**

```
/payments/verify
```

Authentication Required

---

# Upload APIs

## Upload Image

**POST**

```
/upload
```

Authentication Required

Content-Type

```
multipart/form-data
```

Field Name

```
image
```

---

# Status Codes

| Code | Meaning               |
| ---- | --------------------- |
| 200  | Success               |
| 201  | Created               |
| 400  | Bad Request           |
| 401  | Unauthorized          |
| 403  | Forbidden             |
| 404  | Not Found             |
| 409  | Conflict              |
| 500  | Internal Server Error |

---

# Authentication Flow

1. Register a new account.
2. Login using email and password.
3. Receive JWT token.
4. Store token securely.
5. Include the token in the `Authorization` header for protected APIs.
6. Access protected resources.

---

# Modules

* Authentication
* User Management
* Hotel Management
* Hotel Search
* Booking Management
* Payment Processing
* Image Upload
* Booking History
* Profile Management

---

# API Version

```
v1.0.0
```
