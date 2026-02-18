import { c as defineEventHandler, g as getHeader, e as createError, r as readBody } from '../../_/nitro.mjs';
import { S as SettingsService } from '../../_/settings.service.mjs';
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

const index_put = defineEventHandler(async (event) => {
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
    const service = new SettingsService();
    const settings = await service.updateSettings(userId, body);
    return {
      data: settings,
      message: "Settings updated successfully"
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || "Failed to update settings"
    });
  }
});

export { index_put as default };
//# sourceMappingURL=index.put.mjs.map
