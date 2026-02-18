import prisma from '../utils/db'

export class TimeTrackingService {
  async startTimeEntry(userId: string, taskId: string, description?: string) {
    const entry = await prisma.timeEntry.create({
      data: {
        userId,
        taskId,
        startTime: new Date(),
        description,
      },
      include: {
        task: true,
      },
    })

    return entry
  }

  async stopTimeEntry(userId: string, entryId: string) {
    const entry = await prisma.timeEntry.findFirst({
      where: {
        id: entryId,
        userId,
        endTime: null,
      },
    })

    if (!entry) {
      throw new Error('Active time entry not found')
    }

    const endTime = new Date()
    const duration = Math.floor((endTime.getTime() - entry.startTime.getTime()) / 1000)

    const updated = await prisma.timeEntry.update({
      where: { id: entryId },
      data: {
        endTime,
        duration,
      },
      include: {
        task: true,
      },
    })

    // Update task actual time
    await prisma.task.update({
      where: { id: entry.taskId },
      data: {
        actualTime: {
          increment: Math.floor(duration / 60),
        },
      },
    })

    return updated
  }

  async getTimeEntries(userId: string, taskId?: string) {
    const where: any = { userId }
    if (taskId) {
      where.taskId = taskId
    }

    return prisma.timeEntry.findMany({
      where,
      include: {
        task: true,
      },
      orderBy: {
        startTime: 'desc',
      },
    })
  }

  async getActiveEntry(userId: string) {
    return prisma.timeEntry.findFirst({
      where: {
        userId,
        endTime: null,
      },
      include: {
        task: true,
      },
    })
  }

  async deleteTimeEntry(userId: string, entryId: string) {
    await prisma.timeEntry.delete({
      where: {
        id: entryId,
        userId,
      },
    })
  }

  async getTotalTimeByTask(userId: string, taskId: string) {
    const entries = await prisma.timeEntry.findMany({
      where: {
        userId,
        taskId,
      },
    })

    return entries.reduce((sum, entry) => sum + (entry.duration || 0), 0)
  }
}
