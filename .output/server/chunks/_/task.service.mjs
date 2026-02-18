import { p as prisma } from './auth.mjs';

class TaskService {
  async getTasks(userId, filters) {
    const where = {
      userId,
      deletedAt: null
    };
    if (filters) {
      if (filters.status?.length) {
        where.status = { in: filters.status };
      }
      if (filters.priority?.length) {
        where.priority = { in: filters.priority };
      }
      if (filters.projectId) {
        where.projectId = filters.projectId;
      }
      if (filters.sectionId) {
        where.sectionId = filters.sectionId;
      }
      if (filters.assigneeId) {
        where.assigneeId = filters.assigneeId;
      }
      if (filters.isImportant !== void 0) {
        where.isImportant = filters.isImportant;
      }
      if (filters.isUrgent !== void 0) {
        where.isUrgent = filters.isUrgent;
      }
      if (filters.search) {
        where.OR = [
          { title: { contains: filters.search } },
          { description: { contains: filters.search } }
        ];
      }
      if (filters.dueDateFrom || filters.dueDateTo) {
        where.dueDate = {};
        if (filters.dueDateFrom) {
          where.dueDate.gte = new Date(filters.dueDateFrom);
        }
        if (filters.dueDateTo) {
          where.dueDate.lte = new Date(filters.dueDateTo);
        }
      }
    }
    return prisma.task.findMany({
      where,
      include: {
        project: true,
        section: true,
        parent: true,
        children: true,
        tags: {
          include: {
            tag: true
          }
        },
        checklists: true,
        reminders: true
      },
      orderBy: {
        [filters?.sortBy || "order"]: filters?.sortOrder || "asc"
      }
    });
  }
  async getTaskById(id, userId) {
    return prisma.task.findFirst({
      where: {
        id,
        userId,
        deletedAt: null
      },
      include: {
        project: true,
        section: true,
        parent: true,
        children: true,
        tags: {
          include: {
            tag: true
          }
        },
        checklists: true,
        comments: {
          include: {
            user: true
          }
        },
        attachments: true,
        reminders: true,
        timeEntries: {
          include: {
            user: true
          }
        }
      }
    });
  }
  async createTask(userId, data) {
    const { tagIds, ...taskData } = data;
    const task = await prisma.task.create({
      data: {
        ...taskData,
        userId,
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
        startDate: data.startDate ? new Date(data.startDate) : null,
        tags: tagIds?.length ? {
          create: tagIds.map((tagId) => ({
            tagId
          }))
        } : void 0
      },
      include: {
        tags: {
          include: {
            tag: true
          }
        }
      }
    });
    await prisma.activity.create({
      data: {
        type: "CREATE",
        action: "created task",
        entityType: "Task",
        entityId: task.id,
        userId,
        taskId: task.id
      }
    });
    return task;
  }
  async updateTask(userId, data) {
    const { id, tagIds, ...updateData } = data;
    const existingTask = await prisma.task.findFirst({
      where: { id, userId, deletedAt: null }
    });
    if (!existingTask) {
      throw new Error("Task not found");
    }
    const task = await prisma.task.update({
      where: { id },
      data: {
        ...updateData,
        dueDate: updateData.dueDate ? new Date(updateData.dueDate) : void 0,
        startDate: updateData.startDate ? new Date(updateData.startDate) : void 0,
        completedAt: updateData.completedAt ? new Date(updateData.completedAt) : void 0,
        tags: tagIds ? {
          deleteMany: {},
          create: tagIds.map((tagId) => ({
            tagId
          }))
        } : void 0
      },
      include: {
        tags: {
          include: {
            tag: true
          }
        }
      }
    });
    await prisma.activity.create({
      data: {
        type: "UPDATE",
        action: "updated task",
        entityType: "Task",
        entityId: task.id,
        userId,
        taskId: task.id
      }
    });
    return task;
  }
  async deleteTask(userId, id) {
    await prisma.task.update({
      where: { id },
      data: {
        deletedAt: /* @__PURE__ */ new Date()
      }
    });
    await prisma.activity.create({
      data: {
        type: "DELETE",
        action: "deleted task",
        entityType: "Task",
        entityId: id,
        userId
      }
    });
  }
  async completeTask(userId, id) {
    const task = await prisma.task.update({
      where: { id, userId, deletedAt: null },
      data: {
        status: "COMPLETED",
        completedAt: /* @__PURE__ */ new Date()
      }
    });
    await prisma.activity.create({
      data: {
        type: "COMPLETE",
        action: "completed task",
        entityType: "Task",
        entityId: id,
        userId,
        taskId: id
      }
    });
    return task;
  }
  async bulkUpdateStatus(userId, taskIds, status) {
    await prisma.task.updateMany({
      where: {
        id: { in: taskIds },
        userId
      },
      data: {
        status,
        completedAt: status === "COMPLETED" ? /* @__PURE__ */ new Date() : null
      }
    });
  }
}

export { TaskService as T };
//# sourceMappingURL=task.service.mjs.map
