import { createUser, getUsers, getUser, updateUser, deleteUser, } from './user.controller.js';
export const userRoutes = {
    'get /users': getUsers,
    'post /users': createUser,
    'get /users/:id': getUser,
    'patch /users/:id': updateUser,
    'delete /users/:id': deleteUser,
};
//# sourceMappingURL=user.route.js.map