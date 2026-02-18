import { c as defineEventHandler, g as getHeader, e as createError, r as readBody } from '../../../_/nitro.mjs';
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

const move_post = defineEventHandler(async (event) => {
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
    const body = await readBody(event);
    const { taskId, status } = body;
    if (!taskId || !status) {
      throw createError({
        statusCode: 400,
        message: "Task ID and status are required"
      });
    }
    const taskService = new TaskService();
    const task = await taskService.updateTask(userId, { id: taskId, status });
    return {
      data: task,
      message: "Task moved successfully"
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || "Failed to move task"
    });
  }
});

export { move_post as default };
//# sourceMappingURL=move.post.mjs.map
