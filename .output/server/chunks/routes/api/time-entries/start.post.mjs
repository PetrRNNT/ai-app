import { c as defineEventHandler, g as getHeader, e as createError, r as readBody } from '../../../_/nitro.mjs';
import { T as TimeTrackingService } from '../../../_/time-tracking.service.mjs';
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

const start_post = defineEventHandler(async (event) => {
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
    const { taskId, description } = body;
    if (!taskId) {
      throw createError({
        statusCode: 400,
        message: "Task ID is required"
      });
    }
    const service = new TimeTrackingService();
    const activeEntry = await service.getActiveEntry(userId);
    if (activeEntry) {
      await service.stopTimeEntry(userId, activeEntry.id);
    }
    const entry = await service.startTimeEntry(userId, taskId, description);
    return {
      data: entry,
      message: "Time tracking started"
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || "Failed to start time tracking"
    });
  }
});

export { start_post as default };
//# sourceMappingURL=start.post.mjs.map
