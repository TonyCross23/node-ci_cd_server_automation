import { z } from 'zod';

export const userSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  email: z.email(),
});

export const createUserSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email(),
});

export const updateUserSchema = createUserSchema.partial();

export const userIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export const listUsersSchema = z.object({
  items: z.array(userSchema),
  total: z.number().int(),
  page: z.number().int(),
  limit: z.number().int(),
});

export const deleteUserSchema = z.object({
  message: z.string(),
});


export type CreateUserInput =
  z.infer<typeof createUserSchema>;

export type UpdateUserInput =
  z.infer<typeof updateUserSchema>;