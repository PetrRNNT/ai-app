import { c as defineEventHandler, f as getQuery, e as createError } from '../../_/nitro.mjs';
import { T as TaskService } from '../../_/task.service.mjs';
import { b as getUserIdFromEvent } from '../../_/auth.mjs';
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
    const userId = getUserIdFromEvent(event);
    const query = getQuery(event);
    const filters = {
      status: query.status ? Array.isArray(query.status) ? query.status : [query.status] : void 0,
      priority: query.priority ? Array.isArray(query.priority) ? query.priority : [query.priority] : void 0,
      projectId: query.projectId,
      sectionId: query.sectionId,
      search: query.search,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder
    };
    const taskService = new TaskService();
    const tasks = await taskService.getTasks(userId, filters);
    return {
      data: tasks
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || "Failed to fetch tasks"
    });
  }
});

export { index_get as default };
//# sourceMappingURL=index.get8.mjs.map
