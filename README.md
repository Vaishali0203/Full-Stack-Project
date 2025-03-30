# 🚀 MERN Stack App with Docker

This project is a full-stack application built using:

- **MongoDB** (database)
- **Express.js** (backend)
- **React** (frontend)
- **Docker + Docker Compose** (for containerization)

---

## 🗂 Project Structure

```
my-app/
├── backend/             # Express.js API
│   ├── Dockerfile
│   ├── package.json
│   └── index.js
├── frontend/            # React App
│   ├── Dockerfile
│   ├── package.json
│   └── public/
├── docker-compose.yml   # Orchestrates all containers
```

---

## 🐳 Dockerized Setup

### 📦 Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop/)
- [Docker Compose](https://docs.docker.com/compose/)

---

### ▶️ Getting Started

1. Clone this repo:

   ```bash
   git clone https://github.com/ravali0423/project.git
   cd project
   ```

2. Run Docker Compose:

   ```bash
   docker-compose up --build
   ```

3. Visit:

   - **Frontend**: `http://localhost:3000`
   - **Backend**: `http://localhost:5000`
   - **MongoDB**: Running on `mongodb://localhost:27017`

---

## ⚙️ Environment Variables

Update or set the following in `docker-compose.yml` under `backend`:

```env
MONGO_URL=mongodb://mongo:27017/mydb
```

---

## 📁 Useful Scripts

In the **backend** and **frontend** folders:

```bash
npm install   # install dependencies
npm start     # run the server/app
```

---

## 💡 Tech Stack

- React 18+
- Express 4+
- MongoDB
- Node.js (v23.10.0 or use `node:current` in Dockerfile)
- Docker & Docker Compose

---

## 🧁 Author

Made with ❤️ by **Ravali** a.k.a. your bestie ✨

> "Code with chai & chill."

---

## 📜 License

MIT License. Feel free to use and customize!
