# 🐝 HiveVerse

HiveVerse is a full-stack collaborative web application inspired by Stargate Atlantis. It enables users to create groups called **Hives** and organize/share web links called **Crystals**. The platform includes user authentication, email invitations, link previews, and a responsive UI.

This project is a full-stack application built using:

- **MongoDB** (database)
- **Express.js** (backend)
- **React** (frontend)

---

## 🌐 Live Preview

Coming soon...

---

## 🗂 Project Structure

```
hiveverse/
├── backend/          # Express.js API
│   ├── middleware/   # Authentication Middleware (auth)
│   ├── models/       # Mongoose schemas (Hive, Member)
|   ├── routes/       # Auth, Hive, Member, etc.
|   ├── utils/        # Email utility, helper functions
|   └── index.js      # Express entry point (serves both frontend + API)
├── frontend/            # React App
│   ├── src
|     |──  assets
|     |──  components
|     |──  routes
|     |──  App
│   ├── package.json
│   └── public/
```

---

## 🔥 Key Features

- ✅ JWT-based authentication
- ✅ Create Hives (groups) with visibility controls
- ✅ Invite users via email using Gmail SMTP (App Passwords)
- ✅ Paste detection to auto-create link Crystals
- ✅ `/join/:code` flow for invite acceptance
- ✅ Role-based member access
- ✅ Mobile responsive UI with TailwindCSS
- ✅ Express serves both API and built React frontend
- ✅ OpenGraph-based link preview

---

## 🛠️ Tech Stack

### Frontend

- React + TypeScript
- TailwindCSS
- React Router v6

### Backend

- Node.js + Express
- MongoDB + Mongoose
- JWT for authentication
- Nodemailer for email invites
- OpenGraph scraping for link previews

---

## 🚀 Running the Project Locally

### Prerequisites

- Node.js
- MongoDB (local or Atlas)
- Gmail with App Password

### 1. Clone the repository

```bash
git clone https://github.com/ravali0423/Project.git
cd Project
```

### 2. Set Environment Variables

Create a `.env` file inside `/Project` if it is not available in clone:

```env
PORT=5008
MONGO_URL=mongodb+srv://parimalaravali2016:MV37AwWnvm1t4krh@hive.r9yspo7.mongodb.net/?retryWrites=true&w=majority&appName=hive
JWT_SECRET=RavaliSecretKey@0423
EMAIL_USER=hivequeen2025@gmail.com
EMAIL_PASS=vgcm xzaq fkds vjqp
REACT_APP_API_URL=http://54.188.182.65:5008
```

> 🔐 Note: Use Gmail App Passwords (requires 2FA)

### 3. Install Dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
npm run build
```

### 4. Start the Server

```bash
cd ../backend
node index.js
```

Visit: [http://localhost:5008](http://localhost:5008)

## 🧁 Author

Made with ❤️ by **Ravali**

> "Code with chai & chill."

---

## 📜 License

MIT License. Feel free to use and customize!
