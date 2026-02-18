import { c as defineEventHandler, g as getHeader, e as createError, r as readBody } from '../../_/nitro.mjs';
import { P as ProjectService } from '../../_/project.service.mjs';
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

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production";
const index_post = defineEventHandler(async (event) => {
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
    const body = await readBody(event);
    const { name } = body;
    if (!name) {
      throw createError({
        statusCode: 400,
        message: "Project name is required"
      });
    }
    const projectService = new ProjectService();
    const project = await projectService.createProject(userId, body);
    return {
      data: project,
      message: "Project created successfully"
    };
  } catch (error) {
    console.error("Project create error:", error.message);
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || "Failed to create project"
    });
  }
});

export { index_post as default };
//# sourceMappingURL=index.post3.mjs.map
