import { p as prisma } from './auth.mjs';

class AutomationService {
  async getAutomations(userId) {
    return prisma.automation.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }
    });
  }
  async createAutomation(userId, name, trigger, actions, description) {
    return prisma.automation.create({
      data: {
        userId,
        name,
        description,
        trigger,
        actions
      }
    });
  }
  async updateAutomation(userId, id, data) {
    const existing = await prisma.automation.findFirst({
      where: { id, userId }
    });
    if (!existing) throw new Error("Automation not found");
    return prisma.automation.update({
      where: { id },
      data
    });
  }
  async deleteAutomation(userId, id) {
    await prisma.automation.delete({
      where: { id, userId }
    });
  }
  async toggleAutomation(userId, id, isActive) {
    return prisma.automation.update({
      where: { id, userId },
      data: { isActive }
    });
  }
  async getActiveAutomations(userId, triggerType) {
    const where = { userId, isActive: true };
    if (triggerType) {
      where.trigger = {
        path: ["type"],
        equals: triggerType
      };
    }
    return prisma.automation.findMany({ where });
  }
  async executeAutomation(userId, automationId, context) {
    const automation = await prisma.automation.findFirst({
      where: { id: automationId, userId }
    });
    if (!automation) throw new Error("Automation not found");
    await prisma.automation.update({
      where: { id: automationId },
      data: { lastRun: /* @__PURE__ */ new Date() }
    });
    return automation.actions;
  }
}

export { AutomationService as A };
//# sourceMappingURL=automation.service.mjs.map
