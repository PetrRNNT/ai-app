import { c as defineEventHandler, g as getHeader, e as createError } from '../../../_/nitro.mjs';
import { T as TemplateService } from '../../../_/template.service.mjs';
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

const _id__delete = defineEventHandler(async (event) => {
  try {
    const token = getHeader(event, "authorization")?.replace("Bearer ", "");
    if (!token) throw createError({ statusCode: 401, message: "Unauthorized" });
    const userId = getUserIdFromToken(token);
    if (!userId) throw createError({ statusCode: 401, message: "Invalid token" });
    const id = event.context.params?.id;
    if (!id) throw createError({ statusCode: 400, message: "Template ID required" });
    const service = new TemplateService();
    await service.deleteTemplate(userId, id);
    return { message: "Template deleted" };
  } catch (error) {
    throw createError({ statusCode: error.statusCode || 400, message: error.message });
  }
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
