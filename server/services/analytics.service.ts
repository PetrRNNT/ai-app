import prisma from '../utils/db'

export class AnalyticsService {
  async getProductivityStats(userId: string) {
    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    // Get all tasks
    const allTasks = await prisma.task.findMany({
      where: {
        userId,
        deletedAt: null,
      },
    })

    // Completed tasks
    const completedTasks = allTasks.filter((t) => t.status === 'COMPLETED')

    // Tasks by status
    const tasksByStatus = {
      NEW: allTasks.filter((t) => t.status === 'NEW').length,
      IN_PROGRESS: allTasks.filter((t) => t.status === 'IN_PROGRESS').length,
      PAUSED: allTasks.filter((t) => t.status === 'PAUSED').length,
      WAITING: allTasks.filter((t) => t.status === 'WAITING').length,
      COMPLETED: completedTasks.length,
      CANCELLED: allTasks.filter((t) => t.status === 'CANCELLED').length,
      ARCHIVED: allTasks.filter((t) => t.status === 'ARCHIVED').length,
    }

    // Tasks by priority
    const tasksByPriority = {
      CRITICAL: allTasks.filter((t) => t.priority === 'CRITICAL').length,
      HIGH: allTasks.filter((t) => t.priority === 'HIGH').length,
      MEDIUM: allTasks.filter((t) => t.priority === 'MEDIUM').length,
      LOW: allTasks.filter((t) => t.priority === 'LOW').length,
      NONE: allTasks.filter((t) => t.priority === 'NONE').length,
    }

    // Tasks completed by day (last 7 days)
    const tasksCompletedByDay = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]

      const count = completedTasks.filter((t) => {
        if (!t.completedAt) return false
        return t.completedAt.toISOString().split('T')[0] === dateStr
      }).length

      tasksCompletedByDay.push({
        date: date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }),
        count,
      })
    }

    // Time tracked
    const timeEntries = await prisma.timeEntry.findMany({
      where: {
        userId,
        startTime: { gte: thirtyDaysAgo },
      },
    })

    const totalTimeTracked = timeEntries.reduce((sum, entry) => {
      return sum + (entry.duration || 0)
    }, 0)

    // Estimated vs actual
    const estimatedTime = allTasks.reduce((sum, t) => sum + (t.estimatedTime || 0), 0)
    const actualTime = allTasks.reduce((sum, t) => sum + (t.actualTime || 0), 0)

    return {
      totalTasks: allTasks.length,
      completedTasks: completedTasks.length,
      completionRate: allTasks.length > 0 ? Math.round((completedTasks.length / allTasks.length) * 100) : 0,
      avgCompletionTime: completedTasks.length > 0
        ? Math.round(
            completedTasks.reduce((sum, t) => {
              if (!t.completedAt || !t.createdAt) return sum
              return sum + (t.completedAt.getTime() - t.createdAt.getTime())
            }, 0) / completedTasks.length / (1000 * 60 * 60) // hours
          )
        : 0,
      tasksByStatus,
      tasksByPriority,
      tasksCompletedByDay,
      timeTracked: totalTimeTracked,
      estimatedVsActual: {
        estimated: estimatedTime,
        actual: actualTime,
      },
    }
  }

  async getCalendarEvents(userId: string, startDate: string, endDate: string) {
    const tasks = await prisma.task.findMany({
      where: {
        userId,
        deletedAt: null,
        OR: [
          { dueDate: { gte: new Date(startDate), lte: new Date(endDate) } },
          { startDate: { gte: new Date(startDate), lte: new Date(endDate) } },
        ],
      },
      include: {
        project: true,
      },
    })

    return tasks.map((task) => ({
      id: task.id,
      title: task.title,
      start: task.dueDate || task.startDate,
      end: task.dueDate,
      allDay: !task.startDate,
      type: 'task' as const,
      taskId: task.id,
      projectId: task.projectId,
      color: task.project?.color || '#3B82F6',
      description: task.description,
      status: task.status,
      priority: task.priority,
    }))
  }
}
