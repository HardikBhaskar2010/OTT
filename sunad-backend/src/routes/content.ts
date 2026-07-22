import { Router, Request, Response, NextFunction } from 'express';
import { requireAdmin } from '../middleware/auth';
import { validateRequest } from '../middleware/validate';
import {
  GetContentQuerySchema,
  ContentParamsSchema,
  CreateContentSchema,
  UpdateContentSchema,
} from '../schemas/content';
import {
  getContentList,
  getContentById,
  createContentItem,
  updateContentItem,
  deleteContentItem,
} from '../services/store';
import { logAdminAction } from '../services/auditLog';

const router = Router();

/**
 * @openapi
 * /api/content:
 *   get:
 *     summary: List content items
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [movie, show, documentary, music]
 *         description: Filter content by type
 *     responses:
 *       200:
 *         description: List of content items
 *       400:
 *         description: Invalid query filter
 *       401:
 *         description: Unauthorized
 */
router.get(
  '/',
  validateRequest({ query: GetContentQuerySchema }),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const type = req.query.type as string | undefined;
      const items = await getContentList(type);
      res.status(200).json({
        data: items,
        count: items.length,
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @openapi
 * /api/content/{id}:
 *   get:
 *     summary: Get single content item by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Content item found
 *       404:
 *         description: Content item not found
 */
router.get(
  '/:id',
  validateRequest({ params: ContentParamsSchema }),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const item = await getContentById(id);
      if (!item) {
        res.status(404).json({
          error: 'Not Found',
          message: `Content item with ID '${id}' was not found.`,
        });
        return;
      }
      res.status(200).json({ data: item });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @openapi
 * /api/content:
 *   post:
 *     summary: Create new content item (Admin only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, type, description]
 *             properties:
 *               title: { type: string }
 *               type: { type: string, enum: [movie, show, documentary, music] }
 *               description: { type: string }
 *               videoUrl: { type: string }
 *               thumbnailUrl: { type: string }
 *               duration: { type: number }
 *               releaseYear: { type: integer }
 *               genres: { type: array, items: { type: string } }
 *     responses:
 *       201:
 *         description: Content item created
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden - Admin role required
 */
router.post(
  '/',
  requireAdmin,
  validateRequest({ body: CreateContentSchema }),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const adminUid = req.user?.uid || 'unknown-admin';
      const newItem = await createContentItem(req.body);

      await logAdminAction({
        adminUid,
        action: 'CONTENT_CREATE',
        targetId: newItem.id,
        payload: req.body,
      });

      res.status(201).json({
        message: 'Content item created successfully',
        data: newItem,
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @openapi
 * /api/content/{id}:
 *   put:
 *     summary: Update content item (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Content item updated
 *       404:
 *         description: Content item not found
 */
router.put(
  '/:id',
  requireAdmin,
  validateRequest({ params: ContentParamsSchema, body: UpdateContentSchema }),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const adminUid = req.user?.uid || 'unknown-admin';

      const updated = await updateContentItem(id, req.body);
      if (!updated) {
        res.status(404).json({
          error: 'Not Found',
          message: `Content item with ID '${id}' was not found.`,
        });
        return;
      }

      await logAdminAction({
        adminUid,
        action: 'CONTENT_UPDATE',
        targetId: id,
        payload: req.body,
      });

      res.status(200).json({
        message: 'Content item updated successfully',
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @openapi
 * /api/content/{id}:
 *   delete:
 *     summary: Delete content item (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Content item deleted
 *       404:
 *         description: Content item not found
 */
router.delete(
  '/:id',
  requireAdmin,
  validateRequest({ params: ContentParamsSchema }),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const adminUid = req.user?.uid || 'unknown-admin';

      const deleted = await deleteContentItem(id);
      if (!deleted) {
        res.status(404).json({
          error: 'Not Found',
          message: `Content item with ID '${id}' was not found.`,
        });
        return;
      }

      await logAdminAction({
        adminUid,
        action: 'CONTENT_DELETE',
        targetId: id,
      });

      res.status(200).json({
        message: `Content item '${id}' deleted successfully`,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
