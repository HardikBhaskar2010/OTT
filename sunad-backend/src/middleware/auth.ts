import { Request, Response, NextFunction } from 'express';
import { auth } from '../config/firebase';
import { DecodedIdToken } from 'firebase-admin/auth';

export async function authenticateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      error: 'Unauthorized',
      message: 'Missing or malformed Authorization header. Expected format: Bearer <token>',
    });
    return;
  }

  const token = authHeader.split('Bearer ')[1]?.trim();

  if (!token) {
    res.status(401).json({
      error: 'Unauthorized',
      message: 'Empty authentication token provided',
    });
    return;
  }

  // Mock tokens: ONLY allowed in non-production environments for testing
  if (process.env.NODE_ENV !== 'production') {
    if (token === 'mock-admin-token') {
      req.user = {
        iss: 'https://securetoken.google.com/sunad-tv-dev',
        aud: 'sunad-tv-dev',
        auth_time: Math.floor(Date.now() / 1000),
        user_id: 'admin-123',
        sub: 'admin-123',
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600,
        email: 'admin@sunad.tv',
        email_verified: true,
        firebase: { identities: {}, sign_in_provider: 'custom' },
        uid: 'admin-123',
        role: 'admin',
        verified: true,
      } as DecodedIdToken & { role?: string; verified?: boolean };
      next();
      return;
    }

    if (token === 'mock-user-token') {
      req.user = {
        iss: 'https://securetoken.google.com/sunad-tv-dev',
        aud: 'sunad-tv-dev',
        auth_time: Math.floor(Date.now() / 1000),
        user_id: 'user-123',
        sub: 'user-123',
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600,
        email: 'user@sunad.tv',
        email_verified: false,
        firebase: { identities: {}, sign_in_provider: 'custom' },
        uid: 'user-123',
        role: 'user',
        verified: false,
      } as DecodedIdToken & { role?: string; verified?: boolean };
      next();
      return;
    }
  }

  // Firebase Admin SDK verification
  if (auth) {
    try {
      const decodedToken = await auth.verifyIdToken(token);
      req.user = decodedToken as DecodedIdToken & { role?: string; verified?: boolean };
      next();
      return;
    } catch (error) {
      console.warn('[AuthMiddleware] Firebase ID token verification failed:', error);
    }
  }

  // Firebase verification failed and no valid mock token matched — reject the request.
  res.status(401).json({
    error: 'Unauthorized',
    message: 'Invalid or expired authentication token',
  });
}

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  if (!req.user || req.user.role !== 'admin') {
    res.status(403).json({
      error: 'Forbidden',
      message: 'Admin access required for this resource',
    });
    return;
  }

  next();
}
