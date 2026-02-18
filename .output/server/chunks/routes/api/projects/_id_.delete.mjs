import { c as defineEventHandler, g as getHeader, e as createError } from '../../../_/nitro.mjs';
import { P as ProjectService } from '../../../_/project.service.mjs';
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

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production";
const _id__delete = defineEventHandler(async (event) => {
  try {
    const token = getHeader(event, "authorization")?.replace("Bearer ", "");
    if (!token) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized - no token provided"
      });
    }
    const userId = getUserIdFromToken(token, JWT_SECRET);
    if (!userId) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized - invalid token"
      });
    }
    const id = event.context.params?.id;
    if (!id) {
      throw createError({
        statusCode: 400,
        message: "Project ID is required"
      });
    }
    const projectService = new ProjectService();
    await projectService.deleteProject(userId, id);
    return {
      message: "Project deleted successfully"
    };
  } catch (error) {
    console.error("Project delete error:", error.message);
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || "Failed to delete project"
    });
  }
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
