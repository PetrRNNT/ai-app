import { c as defineEventHandler, g as getHeader, e as createError, r as readBody } from '../../../_/nitro.mjs';
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
const _id__put = defineEventHandler(async (event) => {
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
    const body = await readBody(event);
    const projectService = new ProjectService();
    const project = await projectService.updateProject(userId, { id, ...body });
    return {
      data: project,
      message: "Project updated successfully"
    };
  } catch (error) {
    console.error("Project update error:", error.message);
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || "Failed to update project"
    });
  }
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
