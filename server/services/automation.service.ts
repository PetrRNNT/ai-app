import prisma from '../utils/db'

export class AutomationService {
  async getAutomations(userId: string) {
    return prisma.automation.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    })
  }

  async createAutomation(
    userId: string,
    name: string,
    trigger: any,
    actions: any[],
    description?: string
  ) {
    return prisma.automation.create({
      data: {
        userId,
        name,
        description,
        trigger,
        actions,
      },
    })
  }

  async updateAutomation(userId: string, id: string, data: any) {
    const existing = await prisma.automation.findFirst({
      where: { id, userId },
    })

    if (!existing) throw new Error('Automation not found')

    return prisma.automation.update({
      where: { id },
      data,
    })
  }

  async deleteAutomation(userId: string, id: string) {
    await prisma.automation.delete({
      where: { id, userId },
    })
  }

  async toggleAutomation(userId: string, id: string, isActive: boolean) {
    return prisma.automation.update({
      where: { id, userId },
      data: { isActive },
    })
  }

  async getActiveAutomations(userId: string, triggerType?: string) {
    const where: any = { userId, isActive: true }
    if (triggerType) {
      where.trigger = {
        path: ['type'],
        equals: triggerType,
      }
    }
    return prisma.automation.findMany({ where })
  }

  async executeAutomation(userId: string, automationId: string, context: any) {
    const automation = await prisma.automation.findFirst({
      where: { id: automationId, userId },
    })

    if (!automation) throw new Error('Automation not found')

    // Update last run
    await prisma.automation.update({
      where: { id: automationId },
      data: { lastRun: new Date() },
    })

    // Return actions to execute
    return automation.actions
  }
}
