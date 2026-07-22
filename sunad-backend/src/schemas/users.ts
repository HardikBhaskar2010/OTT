import { z } from 'zod';

export const UserParamsSchema = z.object({
  uid: z.string().min(1, 'User UID is required'),
});

export const BanUserSchema = z.object({
  reason: z.string().optional(),
}).optional();

export const VerifyUserSchema = z.object({
  verified: z.boolean().optional().default(true),
}).optional();
