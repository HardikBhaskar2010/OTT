import { z } from 'zod';

export const SubscriptionParamsSchema = z.object({
  uid: z.string().min(1, 'User UID is required'),
});

export const SubscriptionPlanEnum = z.enum(['free', 'basic', 'premium']);
export const SubscriptionStatusEnum = z.enum(['active', 'cancelled', 'expired']);

export const CreateSubscriptionSchema = z.object({
  plan: SubscriptionPlanEnum,
  status: SubscriptionStatusEnum.default('active'),
  expiresAt: z.string().optional(),
});
