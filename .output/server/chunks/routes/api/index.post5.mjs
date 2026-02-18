import { c as defineEventHandler, g as getHeader, e as createError, r as readBody } from '../../_/nitro.mjs';
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

const index_post = defineEventHandler(async (event) => {
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
    const { name, color } = body;
    if (!name || !color) {
      throw createError({
        statusCode: 400,
        message: "Name and color are required"
      });
    }
    const tagService = new TagService();
    const tag = await tagService.createTag(userId, name, color);
    return {
      data: tag,
      message: "Tag created successfully"
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || "Failed to create tag"
    });
  }
});

export { index_post as default };
//# sourceMappingURL=index.post5.mjs.map
