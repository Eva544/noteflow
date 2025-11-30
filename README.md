# NoteFlow – Full Stack MERN Notes Application

A modern **full-stack note-taking application** built with **MERN** (MongoDB, Express, React, Node.js) that allows users to create, manage, and search notes efficiently. This project includes **authentication**, **CRUD operations**, and a **responsive UI**.

---

## **Table of Contents**

- [Features](#features)  
- [Tech Stack](#tech-stack)   
- [Setup & Installation](#setup--installation)
- [Usage](#usage) 

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






