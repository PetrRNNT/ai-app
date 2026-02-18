import { c as defineEventHandler, g as getHeader, e as createError } from '../../_/nitro.mjs';
import { T as TagService } from '../../_/tag.service.mjs';
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
    const tagService = new TagService();
    const tags = await tagService.getTags(userId);
    return {
      data: tags
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || "Failed to fetch tags"
    });
  }
});

export { index_get as default };
//# sourceMappingURL=index.get7.mjs.map
