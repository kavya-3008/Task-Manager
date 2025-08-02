# Task Manager - Full Stack Kanban Board Application

A modern, full-stack task management application with a Kanban board interface. Built with React, Node.js, Express, MongoDB, and JWT authentication.

## 🌐 Live Demo

**Frontend**: [https://stunning-haupia-2f6f44.netlify.app](https://stunning-haupia-2f6f44.netlify.app)

> **Note**: The frontend is deployed on Netlify. You'll need to deploy the backend separately to use the full application features.

## Features

- 🔐 **User Authentication**: Sign up, login, and JWT-based session management
- 📋 **Project Management**: Create, view, and delete projects
- 🎯 **Kanban Board**: Drag-and-drop task management with three columns (To Do, In Progress, Done)
- 📝 **Task Management**: Create, edit, delete tasks with priorities and due dates
- 🎨 **Modern UI**: Beautiful, responsive design with TailwindCSS
- 📱 **Mobile Responsive**: Works perfectly on all devices
- 🔄 **Real-time Updates**: Instant updates with drag-and-drop functionality

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **React Router** - Client-side routing
- **TailwindCSS** - Styling
- **react-beautiful-dnd** - Drag and drop
- **Axios** - HTTP client
- **Lucide React** - Icons

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Task-Manager.git
   cd Task-Manager
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/task-manager
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system. If using MongoDB Atlas, update the `MONGODB_URI` in the `.env` file.

5. **Run the application**
   ```bash
   # Development mode (both frontend and backend)
   npm run dev
   
   # Or run separately:
   npm run server  # Backend only
   npm run client  # Frontend only
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## API Endpoints

### Authentication
- `POST /auth/signup` - Create new user account
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user info

### Projects
- `GET /projects` - Get all user projects
- `POST /projects` - Create new project
- `DELETE /projects/:id` - Delete project

### Tasks
- `GET /tasks/projects/:projectId/tasks` - Get all tasks for a project
- `POST /tasks` - Create new task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

## Deployment

### Current Deployment

- **Frontend**: Deployed on [Netlify](https://stunning-haupia-2f6f44.netlify.app)
- **Backend**: Needs to be deployed separately (see options below)

### GitHub Pages Deployment (Alternative)

1. **Push to main branch**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "GitHub Actions" as source
   - The workflow will automatically build and deploy your app

3. **Access your deployed app**
   - Your app will be available at: `https://yourusername.github.io/Task-Manager/`

### Backend Deployment Options

Since the frontend is already deployed on Netlify, you only need to deploy the backend:

#### Option 1: Render (Recommended - Free)
1. Go to [render.com](https://render.com) and sign up
2. Create a new **Web Service**
3. Connect your GitHub repository
4. Set configuration:
   - **Name**: task-manager-backend
   - **Environment**: Node
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Root Directory**: `backend`
5. Add environment variables:
   ```
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-secret-key
   NODE_ENV=production
   ```

#### Option 2: Railway
1. Go to [railway.app](https://railway.app) and sign up
2. Deploy your backend from GitHub
3. Set root directory to `backend`
4. Add the same environment variables

#### Option 3: Heroku
1. Go to [heroku.com](https://heroku.com) and sign up
2. Create a new app
3. Deploy using Heroku CLI or GitHub integration
4. Set the same environment variables

### Manual Deployment (Alternative)

## Project Structure

```
Task-Manager/
├── backend/                 # Backend server
│   ├── config/             # Database configuration
│   ├── middleware/         # Authentication middleware
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── server.js           # Main server file
│   └── package.json
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Page components
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   ├── public/             # Static assets
│   └── package.json
├── .github/workflows/      # GitHub Actions
├── package.json            # Root package.json
└── README.md
```

## Features in Detail

### Authentication
- Secure user registration and login
- JWT token-based authentication
- Protected routes and API endpoints
- Automatic token refresh

### Project Management
- Create multiple projects
- View all projects in a dashboard
- Delete projects (with confirmation)
- Each project has its own Kanban board

### Kanban Board
- Three columns: To Do, In Progress, Done
- Drag and drop tasks between columns
- Real-time status updates
- Visual feedback during drag operations

### Task Management
- Create tasks with title, description, priority, and due date
- Edit existing tasks
- Delete tasks with confirmation
- Color-coded priority levels
- Due date display

### UI/UX Features
- Modern, clean design
- Responsive layout for all screen sizes
- Loading states and error handling
- Smooth animations and transitions
- Intuitive drag and drop interface

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Happy Task Managing! 🎉** 