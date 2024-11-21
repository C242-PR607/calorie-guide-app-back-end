# User API Spec

## Register

Endpoint : POST /api/v1/auth/register

Request Body :

```json
{
  "email": "johndoe@gmail.com",
  "password": "john123",
  "confirmPassword": "john123"
}
```

## Verify OTP

Endpoint : POST /api/v1/auth/verify_otp

Request Body :

```json
{
  "otp": "666666"
}
```

## Add User Information

Endpoint : POST /api/v1/auth/user_info

Request Body :

```json
{
  "name": "John Doe",
  "age": 21,
  "height": 170,
  "weight": 55,
  "gender": "Male"
}
```

## Login

Endpoint : POST /api/v1/auth/login

Request Body :

```json
{
  "email": "johndoe@gmail.com",
  "password": "john123"
}
```

## Logout

Endpoint : POST /api/v1/auth/logout

Request Headers : Authorization (Bearer Token)

## Forgot Password

Endpoint : POST /api/v1/auth/forgot_password

Request Body :

```json
{
  "email": "johndoe@gmail.com"
}
```

## Verify OTP

Endpoint : POST /api/v1/auth/verify_otp

Request Body :

```json
{
  "otp": "666666"
}
```

## Reset Password

Endpoint : POST /api/v1/auth/reset_password

Request Body :

```json
{
  "password": "john123",
  "confirmPassword": "john123"
}
```

## Show Profile

Endpoint : GET /api/v1/auth/profile

Request Headers : Authorization (Bearer Token)

## Update Profile

Endpoint : PATCH /api/v1/auth/update_profile

Request Headers : Authorization (Bearer Token)

Request Body :

```json
{
  "name": "John Doe",
  "age": 21,
  ...
}
```

## Change Password

Endpoint : PATCH /api/v1/auth/change_password

Request Headers : Authorization (Bearer Token)

Request Body :

```json
{
  "oldPassword": "john123",
  "newPassword": "john12345",
  "confirmPassword": "john12345"
}
```

## Delete Account

Endpoint : DELETE /api/v1/auth/delete_account

Request Headers : Authorization (Bearer Token)

Request Body :

```json
{
  "password": "john12345"
}
```
