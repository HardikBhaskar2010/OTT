import { Router, Request, Response, NextFunction } from 'express';
import { db } from '../config/firebase';

const router = Router();

// Middleware to ensure a user can only access their own data
const verifyOwnership = (req: Request, res: Response, next: NextFunction) => {
  const uid = req.params.uid;
  if (!req.user || (req.user.uid !== uid && req.user.role !== 'admin')) {
    return res.status(403).json({ error: 'Forbidden', message: 'You can only access your own data.' });
  }
  next();
};

/**
 * GET /api/users/:uid/myList
 * Fetch all items in user's watch list
 */
router.get(
  '/:uid/myList',
  verifyOwnership,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { uid } = req.params;
      if (!db) {
        res.status(503).json({ error: 'Service Unavailable', message: 'Database not initialized' });
        return;
      }
      
      const snapshot = await db.collection('users').doc(uid).collection('myList').orderBy('addedAt', 'desc').get();
      const items = snapshot.docs.map(doc => doc.data());
      
      res.status(200).json({ data: items });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * POST /api/users/:uid/myList
 * Add item to user's watch list
 */
router.post(
  '/:uid/myList',
  verifyOwnership,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { uid } = req.params;
      const { contentId } = req.body;
      
      if (!contentId) {
        res.status(400).json({ error: 'Bad Request', message: 'contentId is required' });
        return;
      }
      
      if (!db) {
        res.status(503).json({ error: 'Service Unavailable' });
        return;
      }
      
      await db.collection('users').doc(uid).collection('myList').doc(contentId).set({
        contentId,
        addedAt: new Date()
      }, { merge: true });
      
      res.status(200).json({ message: 'Added to list successfully' });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * DELETE /api/users/:uid/myList/:contentId
 * Remove item from watch list
 */
router.delete(
  '/:uid/myList/:contentId',
  verifyOwnership,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { uid, contentId } = req.params;
      
      if (!db) {
        res.status(503).json({ error: 'Service Unavailable' });
        return;
      }
      
      await db.collection('users').doc(uid).collection('myList').doc(contentId).delete();
      
      res.status(200).json({ message: 'Removed from list successfully' });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * GET /api/users/:uid/watchProgress
 */
router.get(
  '/:uid/watchProgress',
  verifyOwnership,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { uid } = req.params;
      if (!db) {
        res.status(503).json({ error: 'Service Unavailable' });
        return;
      }
      
      const snapshot = await db.collection('users').doc(uid).collection('watchProgress').orderBy('updatedAt', 'desc').limit(20).get();
      const items = snapshot.docs.map(doc => doc.data());
      
      res.status(200).json({ data: items });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * POST /api/users/:uid/watchProgress
 */
router.post(
  '/:uid/watchProgress',
  verifyOwnership,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { uid } = req.params;
      const { contentId, progressSeconds, durationSeconds } = req.body;
      
      if (!contentId || progressSeconds === undefined) {
        res.status(400).json({ error: 'Bad Request', message: 'contentId and progressSeconds are required' });
        return;
      }
      
      if (!db) {
        res.status(503).json({ error: 'Service Unavailable' });
        return;
      }
      
      await db.collection('users').doc(uid).collection('watchProgress').doc(contentId).set({
        contentId,
        progressSeconds,
        durationSeconds: durationSeconds || 0,
        updatedAt: new Date()
      }, { merge: true });
      
      res.status(200).json({ message: 'Progress updated successfully' });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
