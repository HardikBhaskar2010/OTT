# Sunad TV Backend (`sunad-backend`)

Express.js + TypeScript backend API service for Sunad TV (Phase 1 & 2).

## Features
- **Node.js, Express.js & Strict TypeScript**
- **Firebase Admin SDK** for Authentication & Firestore database
- **Swagger Documentation** UI served at `/docs`
- **Zod Validation** for structured request body and query validation
- **Rate Limiting** via `express-rate-limit` (100 req/min global, 10 req/min on `/api/auth/*`)
- **Content CRUD API** (`/api/content`) with type filtering and audit logging
- **User Management API** (`/api/users`) with ban, verification, and GDPR erasure
- **Subscriptions API** (`/api/subscriptions`) for plan query and management
- **Razorpay Webhooks** (`/api/webhooks/razorpay`) with signature verification
- **Health Check** (`GET /health`)

## Environment Setup
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Set the following variables in `.env`:
- `PORT`: Port to listen on (default `4000`)
- `NODE_ENV`: Runtime environment (`development` | `production` | `test`)
- `FIREBASE_SERVICE_ACCOUNT_JSON`: Stringified Firebase service account JSON object
- `RAZORPAY_WEBHOOK_SECRET`: Secret key used to verify Razorpay webhook signatures

## Installation & Commands
```bash
# Install dependencies
npm install

# Run dev mode with tsx hot reloading
npm run dev

# Typecheck
npm run typecheck

# Lint check
npm run lint

# Build production bundle
npm run build

# Start production server
npm run start
```

## API Documentation
Access the Swagger UI at `http://localhost:4000/docs` when the server is running.
