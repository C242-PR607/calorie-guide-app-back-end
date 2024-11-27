# User API Specification

## Base URL

- **Development:** `http://localhost:3000/api/v1`
- **Staging:** 
- **Production:** 

---

### 1. **Register**

- **Endpoint:** `/auth/register`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword",
    "confirmPassword": "securepassword"
  }
  ```
- **Response (Success):**
  - **Status Code:** `200 OK`
  - **Response Body:**
    ```json
    {
      "status": "success",
      "message": "OTP sent successfully",
      "data": {
        "email": "user@example.com",
        "token": "token"
      }
    }
    ```

### 2. **Verify OTP**

- **Endpoint:** `/auth/verify-otp`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer {token}`
- **Request Body:**
  ```json
  {
    "otp": "123456"
  }
  ```
- **Response (Success):**
  - **Status Code:** `201 Created`
  - **Response Body:**
    ```json
    {
      "status": "success",
      "message": "OTP verified successfully and user created",
      "data": {
          "id": "id",
          "email": "user@example.com",
          "token": "token",
          "createdAt": "xxxx-xx-xx...",
          "updatedAt": "xxxx-xx-xx..."
      }
    }
    ```

### 3. **Add User Information**

- **Endpoint:** `/users/me`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer {token}`
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "age": 21,
    "height": 170,
    "weight": 55,
    "gender": "Male"
  }
  ```
- **Response (Success):**
  - **Status Code:** `201 Created`
  - **Response Body:**
    ```json
    {
      "status": "success",
      "message": "User information added successfully",
      "data": {
          "id": "xxxxx-xxx-xxx-...",
          "email": "user@example.com",
          "token": "token",
          "createdAt": "xxxx-xx-xx...",
          "updatedAt": "xxxx-xx-xx..."
      }
    }
    ```

### 4. **Login**

- **Endpoint:** `/auth/login`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```
- **Response (Success):**
  - **Status Code:** `200 OK`
  - **Response Body:**
    ```json
    {
      "status": "success",
      "message": "Login successful",
      "data": {
          "id": "xxxxx-xxx-xxx-...",
          "email": "user@example.com",
          "token": "token",
          "createdAt": "xxxx-xx-xx...",
          "updatedAt": "xxxx-xx-xx..."
      }
    }
    ```

### 5. **Logout**

- **Endpoint:** `/auth/logout`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer {token}`
- **Response (Success):**
  - **Status Code:** `200 OK`
  - **Response Body:**
    ```json
    {
      "status": "success",
      "message": "Logout successful",
      "data": {
          "id": "xxxxx-xxx-xxx-...",
          "email": "user@example.com",
          "token": null,
          "createdAt": "xxxx-xx-xx...",
          "updatedAt": "xxxx-xx-xx..."
      }
    }
    ```

### 6. **Forgot Password**

- **Endpoint:** `/auth/forgot-password`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "email": "user@example.com"
  }
  ```
- **Response (Success):**
  - **Status Code:** `200 OK`
  - **Response Body:**
    ```json
    {
      "status": "success",
      "message": "OTP sent successfully",
      "data": {
          "email": "user@example.com",
          "token": "token"
      }
    }
    ```
#### **Verify OTP**

- **Endpoint:** `/auth/verify-otp`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer {token}`
- **Request Body:**
  ```json
  {
    "otp": "123456"
  }
  ```
- **Response (Success):**
  - **Status Code:** `200 OK`
  - **Response Body:**
    ```json
    {
      "status": "success",
      "message": "OTP verified successfully. Your reset password token has been set within 10 minutes. Please reset your password immediately",
      "data": {
          "email": "user@example.com",
          "resetToken": "token"
      }
    }
    ```

### 7. **Reset Password**

- **Endpoint:** `/auth/reset-password`
- **Method:** `PUT`
- **Headers:** `Authorization: Bearer {token}`
- **Request Body:**
  ```json
  {
    "password": "newsecurepassword",
    "confirmPassword": "newsecurepassword"
  }
  ```
- **Response (Success):**
  - **Status Code:** `200 OK`
  - **Response Body:**
    ```json
    {
      "status": "success",
      "message": "Password reset successful. Please login with new password",
      "data": {
          "id": "xxxxx-xxx-xxx-...",
          "email": "user@example.com",
          "createdAt": "xxxx-xx-xx...",
          "updatedAt": "xxxx-xx-xx..."
      }
    }
    ```

### 8. **Show Profile**

- **Endpoint:** `/users/me`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer {token}`
- **Response (Success):**
  - **Status Code:** `200 OK`
  - **Response Body:**
    ```json
    {
      "status": "success",
      "message": "Profile fetched successfully",
      "data": {
          "id": "xxxxx-xxx-xxx-...",
          "email": "user@example.com",
          "name": "John Doe",
          "age": 21,
          "height": 170,
          "weight": 55,
          "gender": "Male",
          "createdAt": "xxxx-xx-xx...",
          "updatedAt": "xxxx-xx-xx..."
      }
    }
    ```

### 9. **Update Profile**

- **Endpoint:** `/users/me`
- **Method:** `PATCH`
- **Headers:** `Authorization: Bearer {token}`
- **Request Body:**
  ```json
  {
    ...
  }
  ```
- **Response (Success):**
  - **Status Code:** `200 OK`
  - **Response Body:**
    ```json
    {
      "status": "success",
      "message": "Profile updated successfully",
      "data": {
          "id": "xxxxx-xxx-xxx-...",
          "email": "user@example.com",
          "name": "John Doe",
          "age": 21,
          "height": 170,
          "weight": 60,
          "gender": "Male",
          "createdAt": "xxxx-xx-xx...",
          "updatedAt": "xxxx-xx-xx..."
      }
    }
    ```

### 10. **Change Password**

- **Endpoint:** `/users/me/password`
- **Method:** `PUT`
- **Headers:** `Authorization: Bearer {token}`
- **Request Body:**
  ```json
  {
    "oldPassword": "oldpassword",
    "newPassword": "newsecurepassword",
    "confirmPassword": "newsecurepassword"
  }
  ```
- **Response (Success):**
  - **Status Code:** `200 OK`
  - **Response Body:**
    ```json
    {
      "status": "success",
      "message": "Password changed successfully. Please login again with new password",
      "data": {
          "id": "xxxxx-xxx-xxx-...",
          "email": "user@example.com",
          "token": null,
          "createdAt": "xxxx-xx-xx...",
          "updatedAt": "xxxx-xx-xx..."
      }
    }
    ```

### 11. **Delete Account**

- **Endpoint:** `/users/me`
- **Method:** `DELETE`
- **Headers:** `Authorization: Bearer {token}`
- **Request Body:**
  ```json
  {
    "password": "securepassword"
  }
  ```
- **Response (Success):**
  - **Status Code:** `200 OK`
  - **Response Body:**
    ```json
    {
      "status": "success",
      "message": "Account deleted successfully",
      "data": null
    }
    ```