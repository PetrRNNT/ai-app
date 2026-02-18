import { c as defineEventHandler, g as getHeader, e as createError } from '../../../_/nitro.mjs';
import { T as TaskService } from '../../../_/task.service.mjs';
import { g as getUserIdFromToken } from '../../../_/auth.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@prisma/client';
import 'jsonwebtoken';
import 'bcryptjs';

const _id__get = defineEventHandler(async (event) => {
  try {
    const token = getHeader(event, "authorization")?.replace("Bearer ", "");
    if (!token) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized"
      });
    }
    const userId = getUserIdFromToken(token);
    if (!userId) {
      throw createError({
        statusCode: 401,
        message: "Invalid token"
      });
    }
    const id = event.context.params?.id;
    if (!id) {
      throw createError({
        statusCode: 400,
        message: "Task ID is required"
      });
    }
    const taskService = new TaskService();
    const task = await taskService.getTaskById(id, userId);
    if (!task) {
      throw createError({
        statusCode: 404,
        message: "Task not found"
      });
    }
    return {
      data: task
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || "Failed to fetch task"
    });
  }
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
