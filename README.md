# 📘 Blogify - Full-Stack Blog Application

A responsive full-stack blog platform that allows users to sign up, log in, create, edit, and view blogs. Built using **React.js** on the frontend and **Node.js with Express** on the backend, with **MySQL** for data storage. Blogs are publicly viewable, while creation/editing is restricted to authenticated users.

## 🚀 Live Demo

🌐 [Deployed App URL](http://campusshala.com:8689/)

---

## 🛠 Tech Stack

**Frontend:**
- React.js
- Axios
- React Router DOM
- CSS / Responsive Design

**Backend:**
- Node.js
- Express.js
- MySQL
- bcrypt (for password hashing)
- jsonwebtoken (for auth)

**Hosting:**
- Frontend: Digitalocean
- Backend & Database: Digitalocean

---

## 🔐 Features

- ✅ User Sign-up and Login using email and password
- ✅ Secure authentication with JWT
- ✅ Only logged-in users can create, edit, or delete blogs
- ✅ Blogs have title and content fields
- ✅ All published blogs are public and viewable without login
- ✅ Paginated public blog listing
- ✅ Fully responsive UI (mobile + desktop)
- ✅ RESTful API design
- ✅ Cloud-deployed frontend and backend

---
## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Radha123-web/blog-app.git
cd blog-app
# frontend
cd blog-app
npm install
npm start

#backend
cd blog_backend
npm install
npm start
