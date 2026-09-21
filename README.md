# 🐾 Pet Adoption Platform

A full-stack pet adoption platform built with **React, Node.js, Express, MongoDB, and Redis**, providing a structured workflow for pet listings, adoption requests, and administrative management.

The application is containerized using **Docker and Docker Compose**, with Redis integrated as a caching layer to reduce repeated database queries for frequently accessed pet listings.

---

## 🚀 Key Features

* 🐶 Browse available pets and adoption listings
* 📝 Submit pet adoption requests with details and images
* 🔄 Manage pet request lifecycle through **Pending → Approved → Adopted**
* 🛠️ Admin panel for managing pet requests and listings
* 📸 Image upload and serving through the backend
* ⚡ Redis-based caching for frequently accessed pet data
* 🔄 Automatic cache invalidation when pet data changes
* 🗄️ MongoDB for persistent application data
* 🐳 Fully containerized backend and frontend
* 📦 Docker Compose orchestration for the complete application stack
* 📱 Responsive React-based user interface

---

## 🏗️ System Architecture

```text
                    ┌──────────────────────┐
                    │     React Client     │
                    │      Frontend        │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Node.js + Express  │
                    │       Backend        │
                    └──────────┬───────────┘
                               │
                    ┌──────────┴───────────┐
                    │                      │
                    ▼                      ▼
            ┌───────────────┐      ┌───────────────┐
            │     Redis     │      │    MongoDB    │
            │     Cache     │      │    Database   │
            └───────────────┘      └───────────────┘
```

---

## ⚡ Redis Caching

Redis is integrated as an application-level caching layer for frequently requested pet listings.

### Cached Endpoints

| Endpoint        | Cached Data   |
| --------------- | ------------- |
| `/requests`     | Pending pets  |
| `/approvedPets` | Approved pets |
| `/adoptedPets`  | Adopted pets  |

### Cache Strategy

```text
Client Request
      │
      ▼
 Check Redis Cache
      │
 ┌────┴────┐
 │         │
HIT       MISS
 │         │
 ▼         ▼
Return   Query MongoDB
Data        │
            ▼
       Store in Redis
            │
            ▼
        Return Data
```

Cached results use a **5-minute TTL** to prevent stale data from remaining indefinitely.

Cache entries are invalidated whenever relevant pet data changes, including:

* Creating a new pet request
* Approving or changing a pet's status
* Deleting a pet listing

This keeps frequently accessed data fast while maintaining consistency with MongoDB.

---

## 🐳 Dockerized Architecture

The complete application can be run using Docker Compose.

```text
Docker Compose
│
├── Frontend
│   └── React + Nginx
│
├── Backend
│   └── Node.js + Express
│
├── Redis
│   └── Caching Layer
│
└── MongoDB
    └── Persistent Data Storage
```

### Services

| Service  | Technology        |    Port |
| -------- | ----------------- | ------: |
| Frontend | React + Nginx     |  `3000` |
| Backend  | Node.js + Express |  `4000` |
| MongoDB  | MongoDB 7         | `27017` |
| Redis    | Redis 7           |  `6380` |

---

## 🛠️ Tech Stack

### Frontend

* React
* JavaScript
* CSS
* HTML

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Multer
* REST APIs

### Performance & Infrastructure

* Redis
* Docker
* Docker Compose
* Nginx

### Development Tools

* Git
* GitHub
* npm

---

## 📂 Project Structure

```text
pet-adoption-platform/
│
├── Client/
│   ├── public/
│   ├── src/
│   │   ├── Components/
│   │   │   ├── AdminPanel/
│   │   │   ├── AdoptForm/
│   │   │   ├── Contact/
│   │   │   ├── Footer/
│   │   │   ├── Home/
│   │   │   ├── NavBar/
│   │   │   ├── Pets/
│   │   │   └── Services/
│   │   ├── App.js
│   │   └── index.js
│   ├── Dockerfile
│   └── package.json
│
├── server/
│   ├── Controller/
│   ├── Model/
│   ├── Routes/
│   ├── images/
│   ├── Dockerfile
│   ├── redisClient.js
│   ├── server.js
│   └── package.json
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## 🔄 Application Workflow

```text
User
 │
 ├── Browse Pets
 │
 ├── Submit Adoption Request
 │          │
 │          ▼
 │       Pending
 │          │
 │          ▼
 │     Admin Review
 │          │
 │          ▼
 │       Approved
 │          │
 │          ▼
 │       Adopted
 │
 └── Contact / Services
```

---

## 🔌 API Endpoints

### Pet Management

| Method   | Endpoint         | Purpose                       |
| -------- | ---------------- | ----------------------------- |
| `GET`    | `/requests`      | Retrieve pending pet requests |
| `GET`    | `/approvedPets`  | Retrieve approved pets        |
| `GET`    | `/adoptedPets`   | Retrieve adopted pets         |
| `POST`   | `/services`      | Submit a new pet request      |
| `PUT`    | `/approving/:id` | Update pet approval/status    |
| `DELETE` | `/delete/:id`    | Delete a pet listing          |

### Other Routes

```text
/form/*
/admin/*
```

These routes handle adoption forms and administrative functionality.

---

## ⚙️ Running the Project with Docker

### Prerequisites

Make sure you have installed:

* Docker
* Docker Compose
* Git

### Clone the Repository

```bash
git clone https://github.com/sanvi-kanala/pet-adoption-platform.git
cd pet-adoption-platform
```

### Start the Application

```bash
docker compose up -d --build
```

### Check Running Containers

```bash
docker compose ps
```

You should see:

```text
pawfinds-frontend
pawfinds-backend
pawfinds-mongodb
pawfinds-redis
```

### Access the Application

Frontend:

```text
http://localhost:3000
```

Backend:

```text
http://localhost:4000
```

### Stop the Application

```bash
docker compose down
```

To stop the containers while preserving the MongoDB volume:

```bash
docker compose down
```

---

## 🔍 Monitoring the Backend

View backend logs:

```bash
docker logs pawfinds-backend
```

Redis cache activity can be observed through the backend logs:

```text
Redis cache MISS: pets:Pending
Redis cache HIT: pets:Pending
```

A `MISS` causes the backend to retrieve the data from MongoDB and populate Redis, while subsequent requests can be served directly from the cache.

---

## 🧠 Engineering Highlights

* Designed a REST-based backend for pet and adoption management
* Implemented MongoDB persistence using Mongoose
* Added Redis caching for frequently accessed pet listings
* Implemented cache invalidation to keep cached data synchronized with database updates
* Containerized the frontend and backend using Docker
* Orchestrated MongoDB, Redis, backend, and frontend through Docker Compose
* Configured environment-specific database and Redis connections
* Added persistent storage for MongoDB and uploaded images
* Structured the backend using controllers, models, and routes

---

## 🔮 Future Enhancements

* JWT-based authentication and role-based authorization
* Advanced pet search and filtering
* Email notifications for adoption status updates
* Pet recommendation system
* Adoption application tracking
* Redis-backed rate limiting
* Automated testing and CI/CD
* Cloud deployment with managed MongoDB and Redis

---

## 📌 Project Focus

The project combines **full-stack development, REST API design, database management, caching, and containerization** into a single application.

The Dockerized architecture and Redis caching layer provide a foundation for improving deployment consistency and application performance as the platform scales.

---

## 📄 License

This project is available for educational and portfolio purposes.
