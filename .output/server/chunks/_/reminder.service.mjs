import { p as prisma } from './auth.mjs';

class ReminderService {
  async getReminders(userId) {
    return prisma.reminder.findMany({
      where: { userId },
      include: {
        task: true
      },
      orderBy: {
        triggerAt: "asc"
      }
    });
  }
  async createReminder(userId, taskId, type, triggerAt, context, condition) {
    return prisma.reminder.create({
      data: {
        userId,
        taskId,
        type,
        triggerAt,
        context,
        condition
      },
      include: {
        task: true
      }
    });
  }
  async updateReminder(userId, id, data) {
    const existing = await prisma.reminder.findFirst({
      where: { id, userId }
    });
    if (!existing) {
      throw new Error("Reminder not found");
    }
    return prisma.reminder.update({
      where: { id },
      data,
      include: {
        task: true
      }
    });
  }
  async deleteReminder(userId, id) {
    await prisma.reminder.delete({
      where: {
        id,
        userId
      }
    });
  }
  async getPendingReminders(userId) {
    return prisma.reminder.findMany({
      where: {
        userId,
        isTriggered: false,
        triggerAt: { lte: /* @__PURE__ */ new Date() }
      },
      include: {
        task: true
      }
    });
  }
  async markAsTriggered(id) {
    return prisma.reminder.update({
      where: { id },
      data: {
        isTriggered: true
      }
    });
  }
}

export { ReminderService as R };
//# sourceMappingURL=reminder.service.mjs.map
