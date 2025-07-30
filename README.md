# E-Commerce Website

A fully functional e-commerce platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and Redux Toolkit for state management. The site features product listings, user authentication, secure checkout, and a responsive design.

## Features

- Product catalog with filtering and search
- User authentication and profile management
- Shopping cart and checkout flow
- Order history and admin dashboard
- Responsive UI with Tailwind CSS
- RESTful API backend

## Tech Stack

- **Frontend:** React, Vite, Redux Toolkit, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Other:** Axios, ESLint

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/e-commerce-website.git
   cd e-commerce-website
   ```

2. **Setup backend:**

   ```sh
   cd backend
   npm install
   # Configure .env with your MongoDB URI and other secrets
   npm run dev
   ```

3. **Setup frontend:**
   ```sh
   cd ../frontend
   npm install
   npm run dev
   ```

### Seeding the Database

To seed initial data, run:

```sh
node backend/seeder.js
```

## Folder Structure

```
backend/
  models/
  routes/
  data/
  config/
  middleware/
  server.js
  seeder.js
frontend/
  src/
    componenets/
    pages/
    redux/
  public/
  index.html
  tailwind.config.js
```

## Environment Variables

- `backend/.env`: MongoDB URI, JWT secret, etc.
- `frontend/.env
