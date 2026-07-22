import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';
import { globalRateLimiter, authRateLimiter } from './middleware/rateLimiter';
import { authenticateUser } from './middleware/auth';

import healthRouter from './routes/health';
import contentRouter from './routes/content';
import usersRouter from './routes/users';
import userDataRouter from './routes/userData';
import subscriptionsRouter from './routes/subscriptions';
import webhooksRouter from './routes/webhooks';

const app: Application = express();

// Restrict CORS: in production use ALLOWED_ORIGINS env var (comma-separated list of Vercel domains)
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim())
  : ['http://localhost:3000'];

app.use(cors({
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allow server-to-server requests (no origin) and whitelisted origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: origin '${origin}' not allowed`));
    }
  },
  credentials: true,
}));
app.use(express.json());

// Global Rate Limiter (100 req/min)
app.use(globalRateLimiter);

// Auth-adjacent routes rate limiter (10 req/min per IP)
app.use('/api/auth', authRateLimiter);

// Swagger Documentation served at GET /docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Public Routes
app.use('/health', healthRouter);

// Webhooks - Note: Webhook signatures verify incoming external requests from Razorpay
app.use('/api/webhooks', webhooksRouter);

// Authenticated Routes & Public Content
app.use('/api/content', contentRouter);
app.use('/api/users', authenticateUser, usersRouter);
app.use('/api/users', authenticateUser, userDataRouter);
app.use('/api/subscriptions', authenticateUser, subscriptionsRouter);

// 404 Route Handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested route or resource does not exist.',
  });
});

// Centralized Global Error Handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[Unhandled Error]', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message || 'An unexpected error occurred.',
  });
});

export default app;
