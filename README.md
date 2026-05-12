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
