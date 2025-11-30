# NoteFlow – Full Stack MERN Notes Application

A modern **full-stack note-taking application** built with **MERN** (MongoDB, Express, React, Node.js) that allows users to create, manage, and search notes efficiently. This project includes **authentication**, **CRUD operations**, and a **responsive UI**.

---

## **Table of Contents**

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Folder Structure](#folder-structure)  
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

## **Folder Structure**

webapp/
├─ backend/ # Node.js & Express API
│ ├─ server.js # Main backend entry
│ ├─ routes/ # API routes
│ ├─ controllers/
│ ├─ models/
│ └─ package.json
│
├─ frontend/ # React frontend
│ ├─ src/
│ ├─ public/
│ └─ package.json
│
└─ README.md # Project documentation


---

## **Setup & Installation**

### **1. Clone the repository**

```bash
git clone https://github.com/Eva544/NoteFlow.git
cd webapp

---

### **2. Setup Backend**

cd backend
npm install

- Create a .env file in backend/:
PORT=8000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>

- Start backend server:
npm run dev

3. Setup Frontend

cd frontend
npm install
npm start

---

Usage

Register a new user account.

Login using your credentials.

Create, edit, delete notes.

Use search/filter by title.

Edit your profile in the modal dialog.






