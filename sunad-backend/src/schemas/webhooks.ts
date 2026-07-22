import { z } from 'zod';

export const RazorpayWebhookBodySchema = z.object({
  event: z.string().min(1, 'Event type is required'),
  payload: z.record(z.unknown()),
  created_at: z.number().optional(),
});

export const RazorpayWebhookHeaderSchema = z.object({
  'x-razorpay-signature': z.string().min(1, 'X-Razorpay-Signature header is required'),
});
