import { defaultEndpointsFactory } from 'express-zod-api';
import { userService } from './user.service.js';
import { userSchema, createUserSchema, updateUserSchema, userIdSchema, paginationSchema, listUsersSchema, deleteUserSchema, } from './user.schema.js';
import createHttpError from 'http-errors';
const factory = defaultEndpointsFactory;
// POST /users
export const createUser = factory.build({
    method: 'post',
    input: createUserSchema,
    output: userSchema,
    handler: async ({ input }) => {
        return userService.create(input);
    },
});
// GET /users?page=1&limit=10
export const getUsers = factory.build({
    method: 'get',
    input: paginationSchema,
    output: listUsersSchema,
    handler: async ({ input }) => {
        return userService.findAll(input.page, input.limit);
    },
});
// GET /users/:id
export const getUser = factory.build({
    method: 'get',
    input: userIdSchema,
    output: userSchema,
    handler: async ({ input }) => {
        return userService.findOne(input.id);
    },
});
// PATCH /users/:id
export const updateUser = factory.build({
    method: 'patch',
    input: userIdSchema.extend(updateUserSchema.shape),
    output: userSchema,
    handler: async ({ input }) => {
        const { id, ...data } = input;
        if (Object.keys(data).length === 0) {
            throw createHttpError(400, 'At least one field is required');
        }
        return userService.update(id, data);
    },
});
// DELETE /users/:id
export const deleteUser = factory.build({
    method: 'delete',
    input: userIdSchema,
    output: deleteUserSchema,
    handler: async ({ input }) => {
        return userService.delete(input.id);
    },
});
//# sourceMappingURL=user.controller.js.map