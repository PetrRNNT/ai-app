import { c as defineEventHandler, g as getHeader, e as createError, f as getQuery } from '../../_/nitro.mjs';
import { A as AnalyticsService } from '../../_/analytics.service.mjs';
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
    const startDate = query.start;
    const endDate = query.end;
    if (!startDate || !endDate) {
      throw createError({
        statusCode: 400,
        message: "Start and end dates are required"
      });
    }
    const analyticsService = new AnalyticsService();
    const events = await analyticsService.getCalendarEvents(userId, startDate, endDate);
    return {
      data: events
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || "Failed to fetch calendar events"
    });
  }
});

export { index_get as default };
//# sourceMappingURL=index.get3.mjs.map
