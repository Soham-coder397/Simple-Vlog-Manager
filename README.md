# 📝 Simple Blog Manager

A modern **Full Stack Blog Management System** built with **Node.js, Express.js, HTML, CSS, and JavaScript** during a **14-Day Full Stack Web Development Internship**.

The application enables users to create, view, edit, and delete blog posts through a clean and responsive interface. Blog data is stored in a local JSON database, while uploaded images are managed using Multer.

---

# 📖 Project Description

Simple Blog Manager is a lightweight full-stack blogging platform developed to demonstrate the fundamentals of modern web development. The project follows the CRUD (Create, Read, Update & Delete) architecture and provides a complete blogging workflow from creating a blog post to editing and deleting it.

The application includes responsive user interfaces, client-side validation, server-side routing, image upload functionality, JSON-based data storage, and RESTful API endpoints using Express.js.

This project was developed as part of the **14-Day Full Stack Web Development Internship** at **Codomax Digital Solutions**.

---

# ✨ Features

## 🏠 Home Page

- Beautiful responsive landing page
- Hero banner
- Latest 3 blog posts
- Responsive navigation bar
- Mobile menu
- Footer section
- Direct navigation to all blogs
- Edit and Delete options for latest blogs

---

## ✍️ Add Blog

- Create new blog posts
- Upload featured image
- Category selection
- Author details
- Short description
- Full blog content
- Client-side validation
- Image validation
- Terms & Conditions confirmation
- Success popup after publishing
- Form reset functionality

---

## 📚 View Blogs

- Display all published blogs
- Responsive blog cards
- Edit existing blogs
- Delete blogs
- Image preview while editing
- Update blog information
- Responsive layout

---

## ⚙️ Blog Management

- Create Blog
- Read Blogs
- Update Blog
- Delete Blog
- Upload Images
- Replace old images while updating
- Store blog data inside JSON
- REST API support

---

# ✅ Form Validation

The application includes complete client-side validation.

### Text Validation

- Blog Title Required
- Author Name Required
- Category Required
- Short Description Required
- Blog Content Required

### Image Validation

- JPG
- JPEG
- PNG

Maximum Upload Size:

- 2 MB

### Terms Validation

- Publish only after accepting Terms & Conditions

---

# 🚀 Technologies Used

## Frontend

- HTML5
- CSS3
- JavaScript (ES6)

## Backend

- Node.js
- Express.js

## Packages

- Multer
- CORS
- File System (fs)
- Path

---

# 📂 Project Structure

```
Simple-Blog-Manager
│
├── public
│   ├── css
|   |    ├── home.css
|   |    ├── add_blog.css
|   |    ├── view_blogs.css
│   ├── js
|   |   ├── home.js
|   |   ├── add_blog.js
|   |   ├── view_blogs.js
│   ├── img
│   ├── uploads
│   ├── home.html
│   ├── add_blog.html
│   └── view_blogs.html
│
├── blogs.json
├── server.js
├── package.json
└── README.md
```

---

# 🗄 Database

Database Type

```
JSON File
```

Database File

```
blogs.json
```

Uploaded Images

```
public/uploads/
```

---

# 🔌 REST API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | / | Home Page |
| GET | /add_blog | Add Blog Page |
| GET | /view_blogs | View Blogs Page |
| GET | /status | Server Status |
| GET | /blogs | Get All Blogs |
| GET | /blogs/:id | Get Blog By ID |
| POST | /add_blog | Create Blog |
| PUT | /blogs/:id | Update Blog |
| DELETE | /blogs/:id | Delete Blog |

---

# 📱 Responsive Design

The project is fully responsive and optimized for

- Desktop
- Laptop
- Tablet
- Mobile

---

# ⚡ How to Run

### Clone Repository

```bash
git clone https://github.com/yourusername/Simple-Blog-Manager.git
```

### Install Dependencies

```bash
npm install
```

### Start Server

```bash
node server.js
```

Server will run at

```
http://localhost:3000
```

---

# 📸 Screenshots

## 🏠 Home Page

<img width="1894" height="696" alt="image" src="https://github.com/user-attachments/assets/d923002b-4275-483a-ab14-aaf0679fa671" />
<img width="1863" height="926" alt="image" src="https://github.com/user-attachments/assets/73b102ba-9409-437e-853f-ddfd6d2fbbdb" />
<img width="1885" height="511" alt="image" src="https://github.com/user-attachments/assets/35579400-fe76-444c-ad98-ae077da027f8" />

---

## ✍️ Add Blog

<img width="1880" height="1001" alt="image" src="https://github.com/user-attachments/assets/cdde4376-a55b-48dd-8e13-ec6b197deb06" />
<img width="1897" height="848" alt="image" src="https://github.com/user-attachments/assets/4a46ed4f-4e0c-4413-8d20-67b6f18969a8" />

---

## 📚 View Blogs

<img width="1891" height="1023" alt="image" src="https://github.com/user-attachments/assets/de0d7c95-8011-473e-b1eb-87f46dd53897" />
<img width="1893" height="940" alt="image" src="https://github.com/user-attachments/assets/23b553e1-8608-42f4-9c28-f014c6947873" />

---

## ✏️ Edit Blog

<img width="1893" height="1022" alt="image" src="https://github.com/user-attachments/assets/c10508c5-62d5-462a-aa53-8d4bde554362" />

---

# 🔮 Future Improvements

- User Authentication
- Login & Registration
- Search Blogs
- Category Filter
- Rich Text Editor
- Like & Comment System
- User Profile
- Pagination
- Dark Mode
- MongoDB Integration
- Cloud Image Storage
- JWT Authentication
- Admin Dashboard

---

# 👨‍💻 Author

**Soham Ghosh**

B.Sc. Computer Science Student

Full Stack Web Development Intern

### Skills

- HTML5
- CSS3
- JavaScript
- Node.js
- Express.js
- C++
- Java
- Python
- Flutter
- MySQL
- REST API
- Git & GitHub

---

⭐ If you like this project, don't forget to star the repository.