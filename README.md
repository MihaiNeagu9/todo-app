# 📃 Todo App - Full-Stack Web Application

A simple and clean Todo List application built with Node.js, Express, EJS, and PostgreSQL, focused on practicing CRUD operations, server-side rendering, and database integration.

---

## 🎯 Purpose

- Practice CRUD operations with PostgreSQL
- Understand server-side rendering with EJS
- Learn proper Express app structure
- Apply basic security and validation practices

---

## 🖼️ Screenshots

<img width="1906" height="994" alt="Screenshot 2026-02-06 082701" src="https://github.com/user-attachments/assets/0b5f7dcc-fc6c-480f-b335-b558921a0bfd" />
<img width="1907" height="993" alt="Screenshot 2026-02-06 082849" src="https://github.com/user-attachments/assets/9eb00751-271f-45fe-be9b-d05bb1f7b16c" />

---

## ✨ Features

- View all todo items stored in a PostgreSQL database
- Add new items
- Edit existing items inline
- Delete items using a checkbox
- Clean, responsive UI styled with custom CSS
- Input validation and safe database queries

---

## 🛠 Tech Stack

| Layer       | Technology                     |
|-------------|--------------------------------|
| Backend     | Node.js, Express.js            |
| Database    | PostgreSQL                     |
| Templating  | EJS                            |
| Styling     | CSS (custom, no frameworks)    |

---

## 📂 Project Structure

```
todo-app/
├── public/
│   └── styles/
│   │   └── main.css
│   └── assets/icons
│ 
├── views/
│   ├── index.ejs
│   └── partials/
│
├── .env
├── .gitignore
├── index.js
├── package-lock.json
├── package.json
└── README.md
```

---

## 🗄 Database Schema

```sql
CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT title_length CHECK (char_length(title) BETWEEN 1 AND 200)
);
```

---

## ⚙️ Local Setup

### 1️⃣ Install dependencies
```bash
npm install
```

### 2️⃣ Environment variables (`.env`)
```env
DB_USER=your_db_user
DB_HOST=your_db_host
DB_NAME=your_db_name
DB_PASSWORD=your_db_password
DB_PORT=5432
```

### 3️⃣ Run the app
```bash
npm run start
```

Visit:
```
http://localhost:3000
```

---

## 🚀 Possible Enhancements

- Mark items as completed (without deleting)
- User authentication
- Pagination or filtering
- REST API version + frontend framework
- Docker support

---

## 👤 Author

Developed by **Neagu Mihai Daniel**  
Junior Developer | Node.js | PostgreSQL
