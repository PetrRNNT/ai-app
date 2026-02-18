import prisma from '../utils/db'

export class ReminderService {
  async getReminders(userId: string) {
    return prisma.reminder.findMany({
      where: { userId },
      include: {
        task: true,
      },
      orderBy: {
        triggerAt: 'asc',
      },
    })
  }

  async createReminder(
    userId: string,
    taskId: string,
    type: string,
    triggerAt?: Date,
    context?: string,
    condition?: any
  ) {
    return prisma.reminder.create({
      data: {
        userId,
        taskId,
        type,
        triggerAt,
        context,
        condition,
      },
      include: {
        task: true,
      },
    })
  }

  async updateReminder(userId: string, id: string, data: any) {
    const existing = await prisma.reminder.findFirst({
      where: { id, userId },
    })

    if (!existing) {
      throw new Error('Reminder not found')
    }

    return prisma.reminder.update({
      where: { id },
      data,
      include: {
        task: true,
      },
    })
  }

  async deleteReminder(userId: string, id: string) {
    await prisma.reminder.delete({
      where: {
        id,
        userId,
      },
    })
  }

  async getPendingReminders(userId: string) {
    return prisma.reminder.findMany({
      where: {
        userId,
        isTriggered: false,
        triggerAt: { lte: new Date() },
      },
      include: {
        task: true,
      },
    })
  }

  async markAsTriggered(id: string) {
    return prisma.reminder.update({
      where: { id },
      data: {
        isTriggered: true,
      },
    })
  }
}
