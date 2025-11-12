# Node.js REST API with Express and SQLite

A simple RESTful API built with **Node.js**, **Express**, and **SQLite**.  
This project demonstrates a three-layer architecture with **Controllers**, **Services**, and **Routes**, and uses **middleware** for logging and future authentication (JWT-ready).

A simple REST API built with Express and SQLite that supports CRUD operations for Users and Songs.
The project follows a clean modular structure using controllers, services, and routes.
---

## Features
-Organized MVC-like structure
-CRUD operations for Users and Songs
-SQLite database integration
-Express 5 routing
-.env support with dotenv
-Nodemon for development

---

## Project Structure
├── config/
│   └── database.js
├── controllers/
│   ├── userController.js
│   └── songController.js
├── middleware/
│   └── middleware.js
├── routes/
│   ├── userRoutes.js
│   └── songRoutes.js
├── services/
│   ├── userService.js
│   └── songService.js
└── index.js

