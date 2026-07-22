import { Router, Request, Response, NextFunction } from 'express';
import { requireAdmin } from '../middleware/auth';
import { validateRequest } from '../middleware/validate';
import { UserParamsSchema, BanUserSchema, VerifyUserSchema } from '../schemas/users';
import { auth } from '../config/firebase';
import { getUserProfile, updateUserProfile, deleteUserSubcollectionsAndDoc } from '../services/store';
import { logAdminAction } from '../services/auditLog';

const router = Router();

/**
 * @openapi
 * /api/users/{uid}:
 *   get:
 *     summary: Get user profile (Admin only)
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
 *         description: User profile retrieved
 *       404:
 *         description: User profile not found
 */
router.get(
  '/:uid',
  requireAdmin,
  validateRequest({ params: UserParamsSchema }),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { uid } = req.params;
      let authUser = null;

      if (auth) {
        try {
          authUser = await auth.getUser(uid);
        } catch (e) {
          console.warn(`[Users] Firebase Auth user '${uid}' fetch error:`, e);
        }
      }

      const storeUser = await getUserProfile(uid);

      if (!authUser && !storeUser) {
        res.status(404).json({
          error: 'Not Found',
          message: `User with UID '${uid}' not found`,
        });
        return;
      }

      res.status(200).json({
        data: {
          uid,
          email: authUser?.email || storeUser?.email,
          displayName: authUser?.displayName || storeUser?.displayName,
          disabled: authUser?.disabled ?? storeUser?.disabled ?? false,
          verified: (authUser?.customClaims?.verified as boolean) ?? storeUser?.verified ?? false,
          customClaims: authUser?.customClaims || {},
          metadata: authUser?.metadata || undefined,
          profile: storeUser || undefined,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @openapi
 * /api/users/{uid}/ban:
 *   post:
 *     summary: Ban / disable user (Admin only)
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
 *         description: User disabled successfully
 */
router.post(
  '/:uid/ban',
  requireAdmin,
  validateRequest({ params: UserParamsSchema, body: BanUserSchema }),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { uid } = req.params;
      const adminUid = req.user?.uid || 'unknown-admin';

      if (auth) {
        try {
          await auth.updateUser(uid, { disabled: true });
        } catch (e) {
          console.warn(`[Users] Firebase Auth updateUser disabled error for '${uid}':`, e);
        }
      }

      await updateUserProfile(uid, { disabled: true });

      await logAdminAction({
        adminUid,
        action: 'USER_BAN',
        targetId: uid,
        payload: req.body || {},
      });

      res.status(200).json({
        message: `User '${uid}' has been banned and disabled successfully.`,
        uid,
        disabled: true,
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @openapi
 * /api/users/{uid}/verify:
 *   post:
 *     summary: Set verified custom claim on user (Admin only)
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
 *         description: User verification updated
 */
router.post(
  '/:uid/verify',
  requireAdmin,
  validateRequest({ params: UserParamsSchema, body: VerifyUserSchema }),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { uid } = req.params;
      const adminUid = req.user?.uid || 'unknown-admin';
      const isVerified = req.body?.verified !== undefined ? Boolean(req.body.verified) : true;

      if (auth) {
        try {
          const user = await auth.getUser(uid);
          const currentClaims = user.customClaims || {};
          await auth.setCustomUserClaims(uid, {
            ...currentClaims,
            verified: isVerified,
          });
        } catch (e) {
          console.warn(`[Users] Firebase Auth setCustomUserClaims error for '${uid}':`, e);
        }
      }

      await updateUserProfile(uid, { verified: isVerified });

      await logAdminAction({
        adminUid,
        action: 'USER_VERIFY',
        targetId: uid,
        payload: { verified: isVerified },
      });

      res.status(200).json({
        message: `User '${uid}' verification claim set to ${isVerified}.`,
        uid,
        verified: isVerified,
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @openapi
 * /api/users/{uid}:
 *   delete:
 *     summary: GDPR erasure (Delete subcollections and disable user) (Admin only)
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
 *         description: User data erased
 */
router.delete(
  '/:uid',
  requireAdmin,
  validateRequest({ params: UserParamsSchema }),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { uid } = req.params;
      const adminUid = req.user?.uid || 'unknown-admin';

      // Delete user subcollections and document from store/Firestore
      await deleteUserSubcollectionsAndDoc(uid);

      // Disable or delete user account in Firebase Auth
      if (auth) {
        try {
          await auth.updateUser(uid, { disabled: true });
        } catch (e) {
          console.warn(`[Users] Firebase Auth disable error during GDPR erasure for '${uid}':`, e);
        }
      }

      await logAdminAction({
        adminUid,
        action: 'USER_GDPR_DELETE',
        targetId: uid,
      });

      res.status(200).json({
        message: `GDPR erasure completed for user '${uid}'. Subcollections removed and account disabled.`,
        uid,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
