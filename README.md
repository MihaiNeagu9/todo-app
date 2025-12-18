# Todo App

A simple todo list application built with **Node.js**, **Express**, **EJS**, and **PostgreSQL**.

## Features

- View all todo items stored in a PostgreSQL database
- Add new items
- Edit existing items inline
- Delete items using a checkbox
- Clean, responsive UI styled with custom CSS

## Tech Stack

- Node.js, Express
- EJS (server-side templates)
- PostgreSQL with `pg`
- `dotenv` for environment variables
- Custom CSS in `public/styles/main.css`

## Setup

1. Install dependencies:
   ```bash
   npm install

2. Create a .env file in the project root:

DB_USER=your_db_user
DB_HOST=your_db_host
DB_NAME=your_db_name
DB_PASSWORD=your_db_password
DB_PORT=5432

3. Create the items table in PostgreSQL:

CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL
);

4. Running the App:

nodemon index.js
```