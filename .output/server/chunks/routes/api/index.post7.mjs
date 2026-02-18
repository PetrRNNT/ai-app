import { c as defineEventHandler, g as getHeader, e as createError, r as readBody } from '../../_/nitro.mjs';
import { T as TemplateService } from '../../_/template.service.mjs';
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
    if (!token) throw createError({ statusCode: 401, message: "Unauthorized" });
    const userId = getUserIdFromToken(token);
    if (!userId) throw createError({ statusCode: 401, message: "Invalid token" });
    const body = await readBody(event);
    const { name, type, content, variables, isPublic } = body;
    if (!name || !type || !content) {
      throw createError({ statusCode: 400, message: "Name, type, and content are required" });
    }
    const service = new TemplateService();
    const template = await service.createTemplate(userId, name, type, content, variables, isPublic);
    return { data: template, message: "Template created" };
  } catch (error) {
    throw createError({ statusCode: error.statusCode || 400, message: error.message });
  }
});

export { index_post as default };
//# sourceMappingURL=index.post7.mjs.map
