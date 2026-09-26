# Deployment Guide: Vercel & Render

This project is built with React + Vite + Tailwind CSS and is fully preconfigured for zero-error deployments on both **Vercel** and **Render**.

---

## 🚀 Deploying to Vercel (Recommended for SPA)

### Method 1: Automatic GitHub Import
1. Push this repository to your GitHub account.
2. Go to [vercel.com/new](https://vercel.com/new) and select your repository.
3. Vercel will automatically detect **Vite**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**.

> `vercel.json` is pre-configured with SPA route rewrites so deep URLs and page refreshes work seamlessly without 404 errors.

---

## 🌐 Deploying to Render

You can deploy on Render using either **Static Site** (fastest CDN, zero cost) or **Web Service** (Node.js Express server).

### Method 1: Render Static Site (Fastest & Free)
1. Go to your [Render Dashboard](https://dashboard.render.com/) -> **New** -> **Static Site**.
2. Connect your GitHub repository.
3. Fill in the following settings:
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Under **Redirects/Rewrites**, add a rewrite rule (predefined in `render.yaml`):
   - **Type**: `Rewrite`
   - **Source**: `/*`
   - **Destination**: `/index.html`
5. Click **Create Static Site**.

---

### Method 2: Render Web Service (Node.js)
1. In Render Dashboard -> **New** -> **Web Service**.
2. Connect your GitHub repository.
3. Set the following settings:
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
4. Click **Create Web Service**.

---

## 🔒 Firebase Authentication & Database Access
- The project includes `firebase-applet-config.json` with all database and authentication credentials pre-linked.
- **Admin Access**: Admin dashboard access is secured exclusively for `gridandgift@gmail.com`.
- If you wish to override Firebase parameters in production environment variables, simply set `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_PROJECT_ID`, etc., in your Vercel or Render project settings.
