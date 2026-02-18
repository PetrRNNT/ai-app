import { c as defineEventHandler, g as getHeader, e as createError, f as getQuery } from '../../_/nitro.mjs';
import { T as TimeTrackingService } from '../../_/time-tracking.service.mjs';
import { g as getUserIdFromToken } from '../../_/auth.mjs';
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

const index_get = defineEventHandler(async (event) => {
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
    const query = getQuery(event);
    const taskId = query.taskId;
    const service = new TimeTrackingService();
    const entries = await service.getTimeEntries(userId, taskId);
    return {
      data: entries
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || "Failed to fetch time entries"
    });
  }
});

export { index_get as default };
//# sourceMappingURL=index.get10.mjs.map
