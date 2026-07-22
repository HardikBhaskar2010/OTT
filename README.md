# Sunad OTT

Welcome to the Sunad OTT repository. This project is a premium, bilingual (Hindi/English) streaming platform for Indian civilizational storytelling.

## 🏗 Architecture

The platform is built using a modern decoupled architecture:

### 1. Frontend (`/sunad-ott`)
A fast, SEO-optimized web application built with **Next.js 14** (App Router).
- **Tech Stack**: React, TypeScript, Vanilla CSS (Design Tokens), Firebase Client SDK (Auth).
- **Hosting**: Deployed globally on the **Vercel** Edge Network.
- **Features**: Server-Side Rendering (SSR), Bilingual Internationalization (i18n), Custom Video Player, and seamless caching.

### 2. Backend API (`/sunad-backend`)
A secure, scalable REST API built with **Node.js** and **Express**.
- **Tech Stack**: TypeScript, Express, Firebase Admin SDK, Zod Validation, Swagger (OpenAPI).
- **Hosting**: Deployed on **Render**.
- **Features**: Secures user data (My List, Watch Progress), rate-limiting, admin roles, and Razorpay webhook integrations.

### 3. Database
- **Firebase Firestore**: A NoSQL document database.
- **Firebase Authentication**: Handles secure user sign-in via Google and Magic Links.

---

## 🚀 Quick Start (Local Development)

To run the entire stack locally, you need three terminal windows:

### 1. Start the Firebase Emulator (Database)
```bash
cd sunad-ott
npm run emulators
```
This boots up a local instance of Firestore on `localhost:8080`.

### 2. Start the Backend API
```bash
cd sunad-backend
npm install
npm run dev
```
This starts the Express server on `http://localhost:5000`. It will automatically detect and connect to the local Firestore emulator.
*API Documentation available at: `http://localhost:5000/docs`*

### 3. Start the Frontend App
```bash
cd sunad-ott
npm install
npm run dev
```
This starts the Next.js app on `http://localhost:3000`.

---

## ☁️ Deployment

For detailed, step-by-step instructions on deploying the split architecture to production (Vercel & Render), please reference the artifact: **[Deployment Guide](docs/deployment_guide.md)** (or the Deployment Guide provided by Antigravity).

## 📚 Phase 1 Documentation

The original Phase 1 research, design tokens, and PRD documents are preserved in the repository for architectural reference. See `01_Report.md`, `02_PRD.md`, etc., for the foundational UX and product reasoning.
