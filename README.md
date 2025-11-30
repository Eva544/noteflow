# NoteFlow – Full Stack MERN Notes Application

A modern **full-stack note-taking application** built with **MERN** (MongoDB, Express, React, Node.js) that allows users to create, manage, and search notes efficiently. This project includes **authentication**, **CRUD operations**, and a **responsive UI**.

---

## **Table of Contents**

- [Features](#features)  
- [Tech Stack](#tech-stack)   
- [Setup & Installation](#setup--installation)
- [Running the Project](#running-the-project)
- [Usage](#usage)
- [Scaling Frontend–Backend Integration](#scaling-frontend–-backend-integration)
- [API Documentation](api-documentation)

---

## **Features**

- User authentication (Register / Login / Logout) with JWT.  
- Create, read, update, and delete notes.  
- Search and filter notes by **title**.
- Profile editing in a modal dialog.  
- Responsive UI built with **React** and **Material UI**.  
- Toast notifications for success/error messages.  

---

## **Tech Stack**

- **Frontend:** React, Material UI, Framer Motion, React Router DOM, Axios  
- **Backend:** Node.js, Express.js, MongoDB (or any other DB you choose)  
- **Authentication:** JWT + Cookies  
- **State Management:** React Hooks (`useState`, `useEffect`)  
- **Notifications:** React-Toastify  

---

## **Folder Structure**

```
NoteFlow/
├── backend/
│   ├── src/
│   │   ├── controllers/        # Functions handling API logic
│   │   ├── middlewares/        # Auth, validation, etc.
│   │   ├── models/             # Mongoose schemas
│   │   ├── routes/             # API route definitions
│   │   └── util/               # Helper functions
│   │
│   ├── index.js                # Backend entry point
│   ├── package.json            # Backend dependencies & scripts
│   ├── package-lock.json
│   ├── .env                    # Environment variables (ignored)
│   └── .gitignore              # Backend-specific ignores
│
├── frontend/
│   ├── public/                 # Static assets (index.html etc.)
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Screens & page components
│   │   ├── App.js              # Main React component
│   │   ├── Dashboard.js        # Dashboard page
│   │   ├── UserContext.js      # Global context/state
│   │   ├── index.js            # React entry point
│   │   └── index.css           # Global styles
│   │
│   ├── package.json            # Frontend dependencies & scripts
│   ├── package-lock.json
│   └── .gitignore              # Frontend-specific ignores
│
└── README.md                   # Project documentation
```

---

## **Setup & Installation**

### **1. Clone the repository**

```bash

git clone https://github.com/Eva544/NoteFlow.git
cd NoteFlow

```

---

### **2. Setup Backend**

```bash
cd backend
npm install
```

- Create a .env file in backend
```bash
PORT=8000
MONGO_URL=<your-mongodb-connection-string>
TOKEN_kEY=<your-secret-key>
```

- Start Backend Server
```bash
npm run dev
```

---

### **3. Setup Frontend**

```bash
cd ../frontend
npm install
npm start
```
---

## **Running the Project**

## **Terminal 1: Start Backend**

```bash
cd backend
npm run dev
```

## **Terminal 2: Start Frontend**

```bash
cd frontend
npm start
```
---

### **Usage**

- Register a new user account.
- Login using your credentials.
- Create, edit, delete notes.
- Search and filter notes.
- Edit your profile.
- Logout Securely

  ---

  ## **Scaling Frontend – Backend Integration**

- Use environment variables to separate dev and prod configurations

- Deploy backend on a scalable cloud platform with load balancing and autoscaling.

- Use MongoDB Atlas or another managed database for higher reliability and performance.

- Enable HTTPS, secure cookies (httpOnly, secure), and proper CORS settings.

- Deploy frontend via a CDN (Vercel, Netlify, Cloudflare) for faster global access.

- Use reverse proxy (like Nginx) to route API requests

- CI/CD: GitHub Actions for automated deployment.

  ---

  ## **API Documentation**

  ### **Base URL**

```bash
  http://localhost:8000
```

---

## **AUTH APIs (/auth)**

---

### **1. POST /auth/signup**

Create a new user.

## **Request Body**

```bash
  {
  "username": "john123",
  "email": "john@example.com",
  "password": "password123"
}
```

## **Successful Response (201)**

```bash
  {
  "success": true,
  "message": "User signed in successfully",
  "user": {
    "_id": "user_id",
    "email": "john@example.com",
    "username": "john123",
    "password": "<hashed>"
  }
}
```

## **Request Body**

```bash
 {
  "success": false,
  "message": "User already exists"
}
```

## **Cookies set:**

```bash
token = <jwt_token>
```

---
### **2. POST /auth/login**

Create a new user.

## **Request Body**

```bash
  {
  "email": "john@example.com",
  "password": "password123"
}
```

## **Successful Response**

```bash
 {
  "success": true,
  "message": "User logged in successfully"
}
```

## **Errors**

## **Missing fields**

```bash
{ "success": false, "message": "All fields are required" }
```

## **Wrong email/password**

```bash
{ "success": false, "message": "Incorrect password or email" }
```


## **Request Body**

```bash
token = <jwt_token>
```

## **Cookies set:**

```bash
token = <jwt_token>
```

---

### **3. GET /auth/profile**

Get logged-in user profile.
Requires token cookie.

## **Successful Response**

```bash
 {
  "status": true,
  "user": {
    "username": "john123",
    "email": "john@example.com"
  }
}
```

---

### **4. PUT /auth/profile**

## **Request Body**

```bash
{
  "username": "newname",
  "email": "newemail@example.com"
}
```

## **Successful Response**

```bash
 {
  "success": true,
  "message": "Profile updated",
  "user": {
    "username": "newname",
    "email": "newemail@example.com"
  }
}
```

## **Validation Error**

```bash
 {
  "success": false,
  "message": "All fields are required"
}
```

---

### **5. GET /auth/logout**

Clears the authentication cookie.

## **Response**

```bash
{ "status": true }
```

---

### **NOTES APIs (/notes)**

All Note APIs require the token cookie.

---

## **1. GET /notes/**

Get all notes for logged-in user.

## **Response Example**

```bash
[
  {
    "_id": "123",
    "title": "My Note",
    "body": "Content here",
    "userId": "user_id",
    "createdAt": "2024-01-01T12:00:00Z",
    "updatedAt": "2024-01-01T12:00:00Z"
  }
]
```

---

## **2. POST /notes/create**

Create a new note.

## **Request Body**

```bash
{
  "title": "Shopping List",
  "body": "Milk, Eggs, Bread"
}
```

## **Response**

```bash
{
  "_id": "455",
  "title": "Shopping List",
  "body": "Milk, Eggs, Bread",
  "userId": "user_id",
  "createdAt": "",
  "updatedAt": ""
}

```

---

## **3. PUT /notes/update/:id**

Update a note.

## **Request Body**

```bash
{
  "title": "Updated Title",
  "body": "Updated Body"
}
```

## **Successful Response**

```bash
{
  "_id": "note_id",
  "title": "Updated Title",
  "body": "Updated Body",
  "userId": "user_id",
  "createdAt": "",
  "updatedAt": ""
}
```

## **Note Not Found**

```bash
{
  "message": "Note not found"
}
```
---

## **4. DELETE /notes/delete/:id**

Delete a note.

## **Successful Response**

```bash
{ "message": "Note deleted" }
```

## **Note Not Found**

```bash
{
  "message": "Note not found"
}
```

---

















