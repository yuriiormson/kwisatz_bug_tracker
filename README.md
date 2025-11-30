# Kwisatz Bug Tracker

A modern, efficient bug tracking application designed to streamline software development workflows. This application provides a comprehensive solution for managing bugs, tracking their status, and collaborating with team members.

**Live Demo:** [https://yuriiormson.github.io/kwisatz_bug_tracker/](https://yuriiormson.github.io/kwisatz_bug_tracker/)

## Features

- **Kanban Board**: Visualize bug status (Backlog, To Do, In Progress, Done) with an intuitive drag-and-drop interface.
- **Bug Management**: Create, read, update, and delete bugs with ease.
- **Dashboard**: Get a high-level overview of project statistics, including bug distribution by priority and status.
- **User Authentication**: Secure login and registration system using JWT and Bcrypt.
- **Landing Page**: Professional home page with feature overview.
- **Responsive Design**: Built with Tailwind CSS for a seamless experience across devices.

## Tech Stack

### Frontend
- **Framework**: [React](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Routing**: [React Router](https://reactrouter.com/)
- **Drag & Drop**: [Hello Pangea DnD](https://github.com/hello-pangea/dnd)
- **Icons**: [Lucide React](https://lucide.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express](https://expressjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (Hosted on [Neon](https://neon.tech/))
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: JSON Web Token (JWT) & Bcryptjs

### Deployment
- **Frontend**: GitHub Pages
- **Backend**: Render (Web Service)
- **Database**: Neon (Serverless Postgres)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js)
- PostgreSQL Database (Local or Remote)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yuriiormson/kwisatz_bug_tracker.git
    cd kwisatz_bug_tracker
    ```

2.  **Install Frontend Dependencies:**
    ```bash
    npm install
    ```

3.  **Install Backend Dependencies:**
    Navigate to the server directory and install dependencies.
    ```bash
    cd server
    npm install
    ```

4.  **Environment Setup:**

    **Backend (`server/.env`):**
    ```env
    DATABASE_URL="postgresql://user:password@host:port/dbname?sslmode=require"
    JWT_SECRET="your_jwt_secret"
    PORT=3000
    ```

    **Frontend (`.env` or `.env.production`):**
    ```env
    VITE_API_URL="http://localhost:3000/api" # Local
    # OR
    VITE_API_URL="https://your-backend-url.onrender.com/api" # Production
    ```

5.  **Database Setup:**
    Initialize the PostgreSQL database using Prisma.
    ```bash
    # Inside the server directory
    npx prisma migrate dev --name init
    ```

### Running the Application

1.  **Start the Backend Server:**
    ```bash
    # Inside the server directory
    npm run dev
    ```
    The server will start on `http://localhost:3000`.

2.  **Start the Frontend Development Server:**
    Open a new terminal window, navigate to the project root, and run:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions on how to deploy this application to Render and GitHub Pages.

## Project Structure

- **`src/`**: Contains the frontend React application.
    - **`components/`**: Reusable UI components.
    - **`pages/`**: Application pages (Dashboard, BugBoard, etc.).
    - **`context/`**: React Context for state management (Auth, etc.).
    - **`api/`**: API integration logic.
    - **`types/`**: TypeScript type definitions.
- **`server/`**: Contains the backend Express application.
    - **`src/`**: Backend source code.
    - **`prisma/`**: Database schema and configuration.

## License

This project is licensed under the ISC License.
