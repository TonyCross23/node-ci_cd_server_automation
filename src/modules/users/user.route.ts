import type { Routing } from 'express-zod-api';

import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from './user.controller.js';

export const userRoutes: Routing = {
  'get /users': getUsers,
  'post /users': createUser,

  'get /users/:id': getUser,
  'patch /users/:id': updateUser,
  'delete /users/:id': deleteUser,
};