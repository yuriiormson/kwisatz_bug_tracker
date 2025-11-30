# Deployment Guide

This guide explains how to deploy the **Kwisatz Bug Tracker** as a full-stack application.

## Overview

- **Frontend**: Deployed to **GitHub Pages**.
- **Backend**: Deployed to **Render** (Free Web Service).
- **Database**: Hosted on **Neon** (Free PostgreSQL).

---

## Part 1: Database Setup (Neon)

1.  Go to [Neon.tech](https://neon.tech/) and sign up.
2.  Create a new project.
3.  Copy the **Connection String** (it looks like `postgres://user:password@...`).
    *   *Note: Save this string, you will need it for both Render and your local `.env`.*

---

---

## Part 2: Push Code to GitHub

Before deploying, your code needs to be on GitHub.

1.  **Create a Repository**:
    *   Go to [GitHub.com/new](https://github.com/new).
    *   Name it `kwisatz_bug_tracker`.
    *   Make it **Public** or **Private** (Render works with both).
    *   **Do not** initialize with README, .gitignore, or License (you already have them).
    *   Click **Create repository**.

2.  **Push your local code**:
    Run these commands in your terminal (project root):
    ```bash
    # Initialize git (if you haven't already)
    git init

    # Add all files
    git add .

    # Commit changes
    git commit -m "Initial commit"

    # Rename branch to main
    git branch -M main

    # Link to your GitHub repo (replace YOUR_USERNAME)
    git remote add origin https://github.com/YOUR_USERNAME/kwisatz_bug_tracker.git

    # Push to GitHub
    git push -u origin main
    ```

---

## Part 3: Backend Deployment (Render)

1.  **Push your code to GitHub** (if you haven't already).
2.  Go to [Render.com](https://render.com/) and sign up.
3.  Click **New +** and select **Web Service**.
4.  Connect your GitHub repository (`kwisatz_bug_tracker`).
5.  **Configure the Service**:
    *   **Name**: `kwisatz-backend` (or similar).
    *   **Region**: Choose the one closest to you (e.g., Frankfurt, Oregon).
    *   **Branch**: `main`.
    *   **Root Directory**: `server` (Important! We are deploying the server folder).
    *   **Runtime**: `Node`.
    *   **Build Command**: `npm install && npx prisma generate`.
    *   **Start Command**: `npx ts-node src/index.ts` (or `node dist/index.js` if you compile).
        *   *Better for production*: Update `package.json` to build TS and run JS, but `ts-node` works for simple setups.
6.  **Environment Variables**:
    *   Scroll down to "Environment Variables".
    *   Add Key: `DATABASE_URL`
    *   Add Value: Paste your Neon connection string.
    *   Add Key: `JWT_SECRET`
    *   Add Value: A random secret string (e.g., `mysupersecretkey123`).
    *   Add Key: `PORT`
    *   Add Value: `3000` (Render usually sets this, but good to have).
7.  Click **Create Web Service**.

Render will now build and deploy your backend. Once finished, it will give you a URL (e.g., `https://kwisatz-backend.onrender.com`).

---

---

## Part 4: Frontend Deployment (GitHub Pages)

### 1. Update Frontend API URL

Before deploying the frontend, you need to tell it where the backend is.

1.  Open `src/api/axios.ts` (or wherever you define your base URL).
2.  Change the `baseURL` to your **Render Backend URL**.
    ```typescript
    // src/api/axios.ts
    import axios from 'axios';

    const api = axios.create({
        baseURL: import.meta.env.VITE_API_URL || 'https://<YOUR-RENDER-URL>.onrender.com/api', 
    });
    // ...
    ```
    *Tip: It's best to use an environment variable.*

### 2. Deploy to GitHub Pages

1.  Run the deploy script:
    ```bash
    npm run deploy
    ```
2.  Your frontend will be live at `https://<YOUR_USERNAME>.github.io/kwisatz_bug_tracker/`.

---

## Local Development (Post-Migration)

Since we switched to PostgreSQL, your local `npm run dev` might fail if it can't connect to a database.

1.  Open `server/.env`.
2.  Update `DATABASE_URL` with your **Neon Connection String**.
3.  Run migrations:
    ```bash
    cd server
    npx prisma migrate dev --name init_postgres
    ```
4.  Start the server:
    ```bash
    npm run dev
    ```
