<<<<<<< HEAD
# 🗂️ Team Task Manager — Full Stack MERN Application

A full-featured team collaboration platform built with the MERN stack. Manage projects, assign tasks, track progress, and control access with role-based permissions — all in one place.

---

## 🚀 Live Demo

> **Deployed on Railway** → [View Live App](#) *(replace with your URL)*  
> **Database:** MongoDB Atlas (Cloud)

---
## 🧰 Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | REST API framework |
| MongoDB | NoSQL database |
| Mongoose | ODM for MongoDB |
| JSON Web Tokens (JWT) | Authentication & authorization |
| bcryptjs | Password hashing |

### Frontend
| Technology | Purpose |
|---|---|
| React.js (Vite) | UI framework |
| React Router | Client-side routing |
| Axios | HTTP requests to REST APIs |
| Plain CSS | Styling |

---

## ✨ Features

### 🔐 Authentication
- Secure **Signup & Login** system
- **JWT-based** authentication with tokens stored in `localStorage`
- Role-based access control: **Admin** and **Member** roles

### 👑 Admin Capabilities
- Create and manage **Projects**
- Create **Tasks** with title, description, due date, and status
- **Assign tasks** to team members
- Add members to projects
- Full visibility across all projects and tasks

### 👤 Member Capabilities
- View **assigned projects** and tasks
- **Update task status** (Pending → In Progress → Completed)
- No access to project creation or user management

### 📊 Dashboard Analytics
- Total tasks count
- Completed tasks
- Pending tasks
- Overdue tasks
- Quick overview of team productivity

---


## 🗃️ Database Collections

| Collection | Description |
|---|---|
| `users` | Stores user credentials, roles (Admin/Member) |
| `projects` | Project details, members list, created by |
| `tasks` | Task details, status, assigned user, project ref |

---

## 🔌 API Endpoints

### Auth Routes — `/api/auth`
| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/register` | Register a new user | Public |
| POST | `/login` | Login and receive JWT token | Public |

### Project Routes — `/api/projects`
| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/` | Get all projects | Admin / Member |
| POST | `/` | Create a new project | Admin |
| GET | `/:id` | Get project by ID | Admin / Member |
| PUT | `/:id` | Update project | Admin |
| DELETE | `/:id` | Delete project | Admin |

### Task Routes — `/api/tasks`
| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/` | Get all tasks | Admin / Member |
| POST | `/` | Create a new task | Admin |
| GET | `/:id` | Get task by ID | Admin / Member |
| PUT | `/:id` | Update task / status | Admin / Member |
| DELETE | `/:id` | Delete task | Admin |

---


### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

---

## 🔒 Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Port for the Express server (default: 5000) |
| `MONGO_URI` | MongoDB connection string from MongoDB Atlas |
| `JWT_SECRET` | Secret key for signing JWT tokens |

---

## 🧪 Task Status Flow

```
Pending  ──►  In Progress  ──►  Completed
```

Tasks are created with `Pending` status and can be updated by assigned members or admins.

---

## 🌐 Deployment

This application is deployed using **Railway**.

- **Backend:** Node.js/Express API hosted on Railway
- **Frontend:** React app hosted on Railway (or Vercel/Netlify)
- **Database:** MongoDB Atlas (cloud-hosted)

### Deploy on Railway
1. Push your code to GitHub
2. Create a new project on [Railway](https://railway.app)
3. Connect your GitHub repository
4. Add environment variables in Railway dashboard
5. Deploy!

---

## 🙌 What This Project Demonstrates

- ✅ Full Stack MERN development
- ✅ RESTful API design and integration
- ✅ JWT Authentication & Authorization
- ✅ Role-Based Access Control (Admin / Member)
- ✅ MongoDB schema design with Mongoose
- ✅ React SPA with protected routes
- ✅ Cloud deployment with Railway + MongoDB Atlas

---

## 👨‍💻 Author

**Harshit Tiwari**  
Full Stack Developer | MERN Stack  

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
=======
# Team Task Manager — MERN Stack

A simple beginner-friendly task manager with role-based access, projects, and tasks.

---

## Folder Structure

```
task-manager/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── projectController.js
│   │   ├── taskController.js
│   │   └── dashboardController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── projectRoutes.js
│   │   ├── taskRoutes.js
│   │   └── dashboardRoutes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── axios.js
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── PrivateRoute.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Signup.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── Projects.jsx
    │   │   └── Tasks.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── .env.example
    ├── index.html
    ├── package.json
    └── vite.config.js
```

---

## API Routes

### Auth
| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| POST | /api/auth/signup | Public | Create account |
| POST | /api/auth/login | Public | Login |
| GET | /api/auth/me | Auth | Get current user |

### Projects
| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| POST | /api/projects | Admin | Create project |
| GET | /api/projects | Auth | Get all/assigned projects |
| GET | /api/projects/:id | Auth | Get project by ID |
| POST | /api/projects/:id/members | Admin | Add member to project |
| GET | /api/projects/users | Admin | Get all users |

### Tasks
| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| POST | /api/tasks | Admin | Create task |
| GET | /api/tasks | Auth | Get tasks (filtered by role) |
| PUT | /api/tasks/:id | Auth | Update task (status) |
| DELETE | /api/tasks/:id | Admin | Delete task |

### Dashboard
| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| GET | /api/dashboard | Auth | Get task stats |

---

## Local Setup

### 1. Clone & Install

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configure Environment Variables

**backend/.env**
```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/taskmanager
JWT_SECRET=your_super_secret_key_here
```

**frontend/.env**
```
VITE_API_URL=http://localhost:5000/api
```

### 3. Run Both Servers

```bash
# Terminal 1 — Backend
cd backend
npm run dev

# Terminal 2 — Frontend
cd frontend
npm run dev
```

Visit: http://localhost:5173

---

## Railway Deployment

### Backend Deployment

1. Go to [railway.app](https://railway.app) and create a new project
2. Click **"New Service"** → **"GitHub Repo"** → select your repo
3. Set the **Root Directory** to `backend`
4. Add Environment Variables in Railway dashboard:
   ```
   PORT=5000
   MONGO_URI=<your MongoDB Atlas URI>
   JWT_SECRET=<a strong random string>
   ```
5. Railway auto-detects `npm start` from package.json
6. Copy the generated Railway URL (e.g. `https://your-backend.railway.app`)

### Frontend Deployment

1. In the same Railway project, click **"New Service"** → **"GitHub Repo"**
2. Set **Root Directory** to `frontend`
3. Add Environment Variable:
   ```
   VITE_API_URL=https://your-backend.railway.app/api
   ```
4. Set **Build Command**: `npm run build`
5. Set **Start Command**: `npx serve dist`
6. Deploy!

### MongoDB Atlas (Free Tier)

1. Go to [mongodb.com/atlas](https://mongodb.com/atlas) → Create free cluster
2. Create a database user with username/password
3. Whitelist IP: `0.0.0.0/0` (allow all — fine for development)
4. Get connection string: `mongodb+srv://user:pass@cluster.mongodb.net/taskmanager`

---

## Features

- ✅ JWT Authentication (Login / Signup)
- ✅ Role-based access: Admin vs Member
- ✅ Admin: create projects, add members, create/delete tasks
- ✅ Member: view assigned projects & tasks, update task status
- ✅ Dashboard with task statistics
- ✅ Overdue task detection
- ✅ Responsive design with plain CSS

---

## Tech Stack

- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs
- **Frontend**: React 18, Vite, React Router v6, Axios
- **Styling**: Plain CSS (no frameworks)
>>>>>>> f4fd952 (Initial commit)
#   H A r s h i t R e p o  
 