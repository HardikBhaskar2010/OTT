# Audit: Last 6 Commits — Issue Tracker

*Original Audit: 2026-07-22 | Fixed: 2026-07-22*

All issues from the original audit have been resolved. This document tracks the final status of each item.

---

## Fix Status

| Priority | Issue | Status | Fix |
|---|---|---|---|
| 🔴 P0 | Mock tokens bypass auth in production | ✅ Fixed | Wrapped in `if (NODE_ENV !== 'production')` |
| 🔴 P0 | Wildcard `token.includes('admin')` fallback | ✅ Fixed | Entire block deleted |
| 🟡 P1 | CORS is fully open (`cors()`) | ✅ Fixed | Restricted to `ALLOWED_ORIGINS` env var |
| 🟡 P1 | Backend missing from CI pipeline | ✅ Fixed | Added `backend` job to `ci.yml` |
| 🟡 P1 | `@types/*` in dependencies (not devDependencies) | ✅ Fixed | Moved back to `devDependencies` |
| 🟡 P1 | Hardcoded Firebase fallback credentials | ✅ Fixed | Throws at startup in production if missing |
| 🟢 P2 | Dead `db` import in `firestoreUserData.ts` | ✅ Fixed | Import removed |
| 🟢 P2 | `any` casts on API responses | ✅ Fixed | Replaced with `ApiMyListItem` / `ApiWatchProgressItem` types |
| 🟢 P2 | Render build installs devDeps | ✅ Fixed | Added `render-build` script |

---

## Detailed Changes

### `sunad-backend/src/middleware/auth.ts`

**P0 — Mock tokens gated behind NODE_ENV:**
```diff
- // Handle mock tokens for testing/development environments
- if (token === 'mock-admin-token') {
+ // Mock tokens: ONLY allowed in non-production environments for testing
+ if (process.env.NODE_ENV !== 'production') {
+   if (token === 'mock-admin-token') {
      ...
+   }
  }
```

**P0 — Dangerous admin-string fallback deleted:**
```diff
- // Fallback for development/testing when Firebase verification is bypassed
- if (token.startsWith('mock-admin-') || token.includes('admin')) {
-   req.user = { ... role: 'admin', ... }
-   next(); return;
- }
+ // Firebase verification failed — reject the request.
  res.status(401).json({ error: 'Unauthorized', ... })
```

---

### `sunad-backend/src/app.ts`

**P1 — CORS restricted to allowed origins:**
```diff
- app.use(cors());
+ const allowedOrigins = process.env.ALLOWED_ORIGINS
+   ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim())
+   : ['http://localhost:3000'];
+
+ app.use(cors({
+   origin: (origin, callback) => {
+     if (!origin || allowedOrigins.includes(origin)) callback(null, true);
+     else callback(new Error(`CORS: origin '${origin}' not allowed`));
+   },
+   credentials: true,
+ }));
```

---

### `.github/workflows/ci.yml`

**P1 — Backend now covered by CI:**
Added a second parallel job `backend` that runs:
- `npm ci` → `npm run typecheck` → `npm run lint` → `npm run build`

---

### `sunad-backend/package.json`

**P1 — Type packages returned to devDependencies:**
`@types/cors`, `@types/express`, `@types/node`, `@types/swagger-jsdoc`, `@types/swagger-ui-express`, `typescript` all moved back to `devDependencies`.

**Render build fix — Added `render-build` script:**
```json
"render-build": "npm install && npm run build"
```
Set this as the Build Command in your Render dashboard instead of the default `npm run build`, so devDependencies are always installed before `tsc` runs.

---

### `sunad-ott/lib/firebase/client.ts`

**P1 — Firebase credentials now fail loudly in production:**
```diff
- const firebaseConfig = {
-   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyDemoApiKeyForSunadOttApp12345',
-   ...
- };
+ function getFirebaseConfig() {
+   if (process.env.NODE_ENV === 'production') {
+     const missing = [!apiKey && 'NEXT_PUBLIC_FIREBASE_API_KEY', ...].filter(Boolean);
+     if (missing.length > 0) throw new Error(`[Firebase] Missing: ${missing.join(', ')}`);
+   }
+   return { apiKey: apiKey || 'dev-placeholder-api-key', ... };
+ }
```

---

### `sunad-ott/lib/firestoreUserData.ts`

**P2 — Dead import removed:**
```diff
- import { db } from './firebase';
  import { auth } from './firebase/client';
```

**P2 — `any` casts replaced with proper types:**
```diff
+ interface ApiMyListItem { contentId: string; addedAt?: string; }
+ interface ApiWatchProgressItem { contentId: string; progressSeconds?: number; durationSeconds?: number; }

- return json.data?.some((item: any) => item.contentId === contentId)
+ return (json.data as ApiMyListItem[])?.some((item) => item.contentId === contentId)

- const itemIds = json.data?.map((item: any) => item.contentId) || [];
+ const itemIds = (json.data as ApiMyListItem[])?.map((item) => item.contentId) || [];

- let docsList = json.data || [];
+ let docsList: ApiWatchProgressItem[] = json.data || [];
```

---

## Remaining Recommendations (Not Yet Implemented)

| Item | Effort | When |
|---|---|---|
| Add unit/integration tests for auth middleware and store service | ~2–4 hours | Before production launch |
| Batch Firestore subcollection deletion for GDPR compliance | ~30 min | Before scale |
| Set `ALLOWED_ORIGINS` in Render dashboard to your Vercel URL | 2 min | Before production launch |
| Set `NEXT_PUBLIC_FIREBASE_*` vars in Vercel project settings | 5 min | Before production launch |
