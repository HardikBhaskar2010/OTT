import { Router, Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { config } from '../config/env';
import { validateRequest } from '../middleware/validate';
import { RazorpayWebhookBodySchema } from '../schemas/webhooks';
import { setSubscription } from '../services/store';

const router = Router();

/**
 * Helper to verify Razorpay HMAC SHA256 signature
 */
function verifyRazorpaySignature(body: unknown, signature: string, secret: string): boolean {
  if (!signature || !secret) return false;
  try {
    const bodyString = typeof body === 'string' ? body : JSON.stringify(body);
    const expectedSignature = crypto.createHmac('sha256', secret).update(bodyString).digest('hex');

    return crypto.timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(signature));
  } catch (err) {
    console.warn('[Webhook] Signature verification error:', err);
    return false;
  }
}

/**
 * @openapi
 * /api/webhooks/razorpay:
 *   post:
 *     summary: Handle Razorpay payment webhooks
 *     parameters:
 *       - in: header
 *         name: x-razorpay-signature
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [event, payload]
 *             properties:
 *               event: { type: string }
 *               payload: { type: object }
 *     responses:
 *       200:
 *         description: Webhook processed successfully
 *       400:
 *         description: Invalid signature or payload error
 */
router.post(
  '/razorpay',
  validateRequest({ body: RazorpayWebhookBodySchema }),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const signature = req.headers['x-razorpay-signature'] as string;

      if (!signature) {
        res.status(400).json({
          error: 'Invalid request',
          message: 'Missing X-Razorpay-Signature header',
        });
        return;
      }

      const isValid = verifyRazorpaySignature(req.body, signature, config.razorpayWebhookSecret);

      if (!isValid) {
        res.status(400).json({
          error: 'Invalid signature',
          message: 'Razorpay webhook signature verification failed',
        });
        return;
      }

      const { event, payload } = req.body;
      const entity =
        (payload?.payment as Record<string, unknown>)?.entity ||
        (payload?.subscription as Record<string, unknown>)?.entity ||
        {};

      const uid =
        (entity as Record<string, unknown>)?.notes &&
        typeof (entity as Record<string, unknown>).notes === 'object'
          ? (entity as Record<string, Record<string, unknown>>).notes.uid || 'user-123'
          : 'user-123';

      const uidString = String(uid);

      switch (event) {
        case 'payment.captured':
        case 'subscription.activated':
          await setSubscription(uidString, {
            plan: 'premium',
            status: 'active',
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          });
          break;

        case 'subscription.cancelled':
          await setSubscription(uidString, {
            plan: 'basic',
            status: 'cancelled',
          });
          break;

        default:
          console.log(`[Webhook] Unhandled event received: ${event}`);
          break;
      }

      res.status(200).json({
        status: 'ok',
        event,
        message: `Webhook event '${event}' processed successfully.`,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
