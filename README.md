# Node.js REST API with Express and SQLite

A simple RESTful API built with **Node.js**, **Express**, and **SQLite**.  
This project demonstrates a three-layer architecture with **Controllers**, **Services**, and **Routes**, and uses **middleware** for logging and future authentication (JWT-ready).

A simple RESTful API to manage users with full CRUD functionality.
Built with a clean three-layer architecture: routes for endpoints, controllers for HTTP logic, and services for business logic and database operations.
---

## Table of Contents

- [Features](#features)  
- [Project Structure](#project-structure)  
- [Installation](#installation)  
- [Database Setup](#database-setup)  
- [Running the App](#running-the-app)  
- [API Endpoints](#api-endpoints)  
- [License](#license)  

---

## Features

- RESTful API endpoints for **CRUD operations** on users  
- Persistent storage with **SQLite**  
- Middleware support for logging and future authentication  
- Modular folder structure for scalability  
- Easy to switch to other databases in the service layer  

---

## Project Structure
├── controllers/
│ └── userController.js ← Handles HTTP requests/responses
├── middleware/
│ └── middleware.js ← Logging middleware
├── routes/
│ └── userRoutes.js ← User route definitions
├── services/
│ └── userService.js ← Business logic and database access
├── config/
│ └── database.js ← SQLite database connection
└── index.js ← Main server file
