# Calorie Guide App Backend Serivces

This is the backend service for **Calorie Guide App**, built using Node.js as runtime environment for executing JavaScript on the server, Express.js framework, MySQL, and Redis. It provides RESTful APIs for managing data and handling application logic.

---

## Table of Contents

1. [Features](#features)
2. [Dependencies](#dependencies) 
3. [Requirements](#requirements)
4. [Setup Project](#setup-project)
5. [Folder Structure](#folder-structure)
6. [Base URL](#base-url)
7. [Contributing](#contributing)
8. [License](#license)

---

## Features

- User authentication and authorization.
- OTP (One Time Password) implementation with email notifications.
- Predictive calorie analysis and food proportions.
- Database integration for data storage.
- Input validation and error handling.

---

## Dependencies

### Core Dependencies

- [@tensorflow/tfjs](https://www.npmjs.com/package/@tensorflow/tfjs): Machine learning in JavaScript.
- [bcrypt](https://www.npmjs.com/package/bcrypt): For secure password hashing.
- [dotenv](https://www.npmjs.com/package/dotenv): For managing environment variables.
- [express](https://www.npmjs.com/package/express): Web framework for building REST APIs.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): For user authentication with JWT.
- [morgan](https://www.npmjs.com/package/morgan): For HTTP request logging.
- [mysql](https://www.npmjs.com/package/mysql): MySQL database client.
- [nodemailer](https://www.npmjs.com/package/nodemailer): For sending email notifications.
- [redis](https://www.npmjs.com/package/redis): For caching and session storage.
- [uuid](https://www.npmjs.com/package/uuid): For generating unique identifiers.
- [zod](https://www.npmjs.com/package/zod): For schema validation.

### Development Dependencies

- [nodemon](https://www.npmjs.com/package/nodemon): For automatic server restarts during development.

---

## Requirements

- [Node.js](https://nodejs.org/) (>= v14.x)
- [MySQL](https://www.mysql.com/) (>= v5.7)
- [Redis](https://redis.io/) (>= v6.0)

---

## Setup Project

1. Clone the repository:
   ```bash
   git clone https://github.com/C242-PR607/calorie-guide-app-back-end.git
   cd calorie-guide-app-back-end
   ```
2. Create .env file
    ```plaintext
    PORT=port

    DB_HOST=mysql_host
    DB_USER=mysql_user
    DB_PASSWORD=mysql_password
    DB_NAME=mysql_database

    JWT_SECRET=jwt_secret

    REDIS_HOST=redis_host
    REDIS_PORT=redis_port

    MAIL_HOST=email_host
    MAIL_PORT=email_port
    MAIL_ID=email_user
    MP=email_password

    MODEL_URL=model_url
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Usage:
- Run in Development Mode
    ```bash
    npm run start:dev
    ```
- Run in Production Mode
    ```bash
    npm start
    ```

---

## Folder Structure

```bash
├── src
│   ├── config         # Configuration files (e.g., database, Redis, etc.)
│   ├── controllers    # Handles requests and responses
│   ├── exceptions     # Custom error classes for centralized error handling
│   ├── middlewares    # Middleware functions
│   ├── models         # Database models
│   ├── routes         # API endpoints
│   ├── schemas        # Schema validation (e.g., Zod schemas)
│   ├── services       # Business logic
│   ├── utils          # Helper functions
│   └── server.js      # Main application file
├── .env               # Environment variables
├── .gitignore         # Ignored files and folders
├── package.json       # Project dependencies and scripts
├── README.md          # Project documentation
```

---

## Base URL

- **Development:** 
    ```bash
    http://localhost:3000/api/v1
    ```
- **Production:**
    ```bash
    http://34.50.85.182/api/v1
    ```

---

## Contributing

1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature-branch-name
    ```
3. Make changes and commit:
    ```bash
    git commit -m "Description of changes"
    ```
4. Push to the branch:
    ```bash
    git push origin feature-branch-name
    ```
5. Open a pull request on GitHub

---

## License

This project is licensed under the ISC License.
