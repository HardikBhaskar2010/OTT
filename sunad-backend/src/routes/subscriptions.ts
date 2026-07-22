import { Router, Request, Response, NextFunction } from 'express';
import { validateRequest } from '../middleware/validate';
import { SubscriptionParamsSchema, CreateSubscriptionSchema } from '../schemas/subscriptions';
import { getSubscription, setSubscription } from '../services/store';
import { logAdminAction } from '../services/auditLog';

const router = Router();

/**
 * @openapi
 * /api/subscriptions/{uid}:
 *   get:
 *     summary: Get user subscription plan
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Subscription details retrieved
 *       403:
 *         description: Forbidden - Users can only view their own subscription unless admin
 *       404:
 *         description: Subscription not found
 */
router.get(
  '/:uid',
  validateRequest({ params: SubscriptionParamsSchema }),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { uid } = req.params;
      const currentUser = req.user;

      // Access control: User can access own subscription, or admin can access any
      if (currentUser?.uid !== uid && currentUser?.role !== 'admin') {
        res.status(403).json({
          error: 'Forbidden',
          message: 'You are only authorized to view your own subscription plan',
        });
        return;
      }

      const subscription = await getSubscription(uid);

      if (!subscription) {
        // Default free plan if no subscription document exists yet
        res.status(200).json({
          data: {
            uid,
            plan: 'free',
            status: 'active',
            updatedAt: new Date().toISOString(),
          },
        });
        return;
      }

      res.status(200).json({ data: subscription });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @openapi
 * /api/subscriptions/{uid}:
 *   post:
 *     summary: Assign or upgrade subscription plan
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [plan]
 *             properties:
 *               plan: { type: string, enum: [free, basic, premium] }
 *               status: { type: string, enum: [active, cancelled, expired] }
 *               expiresAt: { type: string }
 *     responses:
 *       200:
 *         description: Subscription assigned/upgraded successfully
 */
router.post(
  '/:uid',
  validateRequest({ params: SubscriptionParamsSchema, body: CreateSubscriptionSchema }),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { uid } = req.params;
      const currentUser = req.user;

      // Access control: Admin or user upgrading own plan
      if (currentUser?.uid !== uid && currentUser?.role !== 'admin') {
        res.status(403).json({
          error: 'Forbidden',
          message: 'Only administrators or account holders can modify subscription plans',
        });
        return;
      }

      const updatedSub = await setSubscription(uid, req.body);

      // Audit log if performed by admin
      if (currentUser?.role === 'admin') {
        await logAdminAction({
          adminUid: currentUser.uid,
          action: 'SUBSCRIPTION_ASSIGN',
          targetId: uid,
          payload: req.body,
        });
      }

      res.status(200).json({
        message: 'Subscription updated successfully',
        data: updatedSub,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
