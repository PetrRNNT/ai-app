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

const stop_post = defineEventHandler(async (event) => {
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
    const { entryId } = body;
    if (!entryId) {
      throw createError({
        statusCode: 400,
        message: "Entry ID is required"
      });
    }
    const service = new TimeTrackingService();
    const entry = await service.stopTimeEntry(userId, entryId);
    return {
      data: entry,
      message: "Time tracking stopped"
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || "Failed to stop time tracking"
    });
  }
});

export { stop_post as default };
//# sourceMappingURL=stop.post.mjs.map
