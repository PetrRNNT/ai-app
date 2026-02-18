import { c as defineEventHandler, g as getHeader, e as createError } from '../../../_/nitro.mjs';
import { A as AuthService } from '../../../_/auth.service.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../../../_/auth.mjs';
import '@prisma/client';
import 'jsonwebtoken';
import 'bcryptjs';

const me_get = defineEventHandler(async (event) => {
  try {
    const token = getHeader(event, "authorization")?.replace("Bearer ", "");
    if (!token) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized"
      });
    }
    const authService = new AuthService();
    const user = await authService.getUserByToken(token);
    if (!user) {
      throw createError({
        statusCode: 401,
        message: "Invalid token"
      });
    }
    return {
      data: user
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || "Failed to get user"
    });
  }
});

export { me_get as default };
//# sourceMappingURL=me.get.mjs.map
