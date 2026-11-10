import createHttpError from 'http-errors';
import { Prisma } from '../../generated/prisma/client.js';
import { prisma } from '../../config/prisma.js';

import type {
  CreateUserInput,
  UpdateUserInput,
} from './user.schema.js';

export class UserService {
  async create(data: CreateUserInput) {
    try {
      return await prisma.user.create({ data });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw createHttpError(409, 'Email already exists');
      }

      throw error;
    }
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: limit,
        orderBy: { id: 'desc' },
      }),
      prisma.user.count(),
    ]);

    return {
      items,
      total,
      page,
      limit,
    };
  }

  async findOne(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw createHttpError(404, 'User not found');
    }

    return user;
  }

  async update(id: number, data: UpdateUserInput) {
    await this.findOne(id);

    try {
      return await prisma.user.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw createHttpError(409, 'Email already exists');
        }

        if (error.code === 'P2025') {
          throw createHttpError(404, 'User not found');
        }
      }

      throw error;
    }
  }

  async delete(id: number) {
    try {
      await prisma.user.delete({
        where: { id },
      });

      return { message: 'User deleted successfully' };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw createHttpError(404, 'User not found');
      }

      throw error;
    }
  }
}

export const userService = new UserService();