# 🐾 PawFinds – Pet Adoption Platform

A full-stack **MERN-based pet adoption platform** designed to make pet discovery and adoption easier through a simple, user-friendly web application.

PawFinds provides dedicated functionality for browsing available pets, submitting adoption requests, managing pet listings, and handling platform operations through an admin panel.

---

## 🚀 Features

### 👤 User Features

* Browse available pets
* View pet details
* Explore pet categories and services
* Submit pet adoption requests
* Contact the platform
* Responsive and intuitive user interface

### 🐶 Pet Management

* Display available pets
* Store pet information using MongoDB
* Retrieve pet data through REST APIs
* Manage pet listings through the backend

### 📝 Adoption Management

* Adoption request form
* Capture adopter information
* Store adoption requests in MongoDB
* Backend API for adoption request management

### 🛡️ Admin Panel

* Dedicated admin interface
* Manage pet listings
* View and manage adoption requests
* Administrative operations through backend APIs

---

## 🏗️ System Architecture

```text
                    ┌──────────────────────┐
                    │      React.js        │
                    │      Frontend        │
                    └──────────┬───────────┘
                               │
                               │ REST API
                               ▼
                    ┌──────────────────────┐
                    │   Node.js + Express  │
                    │      Backend         │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │       MongoDB        │
                    │       Database       │
                    └──────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3

### Backend

* Node.js
* Express.js
* REST APIs

### Database

* MongoDB

### Development Tools

* npm
* Git
* GitHub

---

## 📁 Project Structure

```text
pet-adoption-platform/
│
├── Client/
│   ├── public/
│   └── src/
│       ├── Components/
│       │   ├── AdminPanel/
│       │   ├── AdoptForm/
│       │   ├── Contact/
│       │   ├── Footer/
│       │   ├── Home/
│       │   ├── NavBar/
│       │   ├── Pets/
│       │   └── Services/
│       │
│       ├── App.js
│       ├── App.css
│       └── index.js
│
├── server/
│   ├── Controller/
│   │   ├── AdminController.js
│   │   ├── AdoptFormController.js
│   │   └── PetController.js
│   │
│   ├── Model/
│   │   ├── AdoptFormModel.js
│   │   └── PetModel.js
│   │
│   ├── Routes/
│   │   ├── AdminRoute.js
│   │   ├── AdoptFormRoute.js
│   │   └── PetRoute.js
│   │
│   └── server.js
│
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure the following are installed:

* Node.js
* npm
* MongoDB

### 1. Clone the repository

```bash
git clone https://github.com/sanvi-kanala/pet-adoption-platform.git
cd pet-adoption-platform
```

### 2. Install frontend dependencies

```bash
cd Client
npm install
```

### 3. Start the frontend

```bash
npm start
```

### 4. I
