import { p as prisma } from './auth.mjs';

class TimeTrackingService {
  async startTimeEntry(userId, taskId, description) {
    const entry = await prisma.timeEntry.create({
      data: {
        userId,
        taskId,
        startTime: /* @__PURE__ */ new Date(),
        description
      },
      include: {
        task: true
      }
    });
    return entry;
  }
  async stopTimeEntry(userId, entryId) {
    const entry = await prisma.timeEntry.findFirst({
      where: {
        id: entryId,
        userId,
        endTime: null
      }
    });
    if (!entry) {
      throw new Error("Active time entry not found");
    }
    const endTime = /* @__PURE__ */ new Date();
    const duration = Math.floor((endTime.getTime() - entry.startTime.getTime()) / 1e3);
    const updated = await prisma.timeEntry.update({
      where: { id: entryId },
      data: {
        endTime,
        duration
      },
      include: {
        task: true
      }
    });
    await prisma.task.update({
      where: { id: entry.taskId },
      data: {
        actualTime: {
          increment: Math.floor(duration / 60)
        }
      }
    });
    return updated;
  }
  async getTimeEntries(userId, taskId) {
    const where = { userId };
    if (taskId) {
      where.taskId = taskId;
    }
    return prisma.timeEntry.findMany({
      where,
      include: {
        task: true
      },
      orderBy: {
        startTime: "desc"
      }
    });
  }
  async getActiveEntry(userId) {
    return prisma.timeEntry.findFirst({
      where: {
        userId,
        endTime: null
      },
      include: {
        task: true
      }
    });
  }
  async deleteTimeEntry(userId, entryId) {
    await prisma.timeEntry.delete({
      where: {
        id: entryId,
        userId
      }
    });
  }
  async getTotalTimeByTask(userId, taskId) {
    const entries = await prisma.timeEntry.findMany({
      where: {
        userId,
        taskId
      }
    });
    return entries.reduce((sum, entry) => sum + (entry.duration || 0), 0);
  }
}

export { TimeTrackingService as T };
//# sourceMappingURL=time-tracking.service.mjs.map
