import prisma from '../utils/db'
import type { CreateTaskInput, UpdateTaskInput, TaskFilters } from '~/types'

export class TaskService {
  async getTasks(userId: string, filters?: TaskFilters) {
    const where: any = {
      userId,
      deletedAt: null,
    }

    if (filters) {
      if (filters.status?.length) {
        where.status = { in: filters.status }
      }
      if (filters.priority?.length) {
        where.priority = { in: filters.priority }
      }
      if (filters.projectId) {
        where.projectId = filters.projectId
      }
      if (filters.sectionId) {
        where.sectionId = filters.sectionId
      }
      if (filters.assigneeId) {
        where.assigneeId = filters.assigneeId
      }
      if (filters.isImportant !== undefined) {
        where.isImportant = filters.isImportant
      }
      if (filters.isUrgent !== undefined) {
        where.isUrgent = filters.isUrgent
      }
      if (filters.search) {
        where.OR = [
          { title: { contains: filters.search } },
          { description: { contains: filters.search } },
        ]
      }
      if (filters.dueDateFrom || filters.dueDateTo) {
        where.dueDate = {}
        if (filters.dueDateFrom) {
          where.dueDate.gte = new Date(filters.dueDateFrom)
        }
        if (filters.dueDateTo) {
          where.dueDate.lte = new Date(filters.dueDateTo)
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
            tag: true,
          },
        },
        checklists: true,
        reminders: true,
      },
      orderBy: {
        [filters?.sortBy || 'order']: filters?.sortOrder || 'asc',
      },
    })
  }

  async getTaskById(id: string, userId: string) {
    return prisma.task.findFirst({
      where: {
        id,
        userId,
        deletedAt: null,
      },
      include: {
        project: true,
        section: true,
        parent: true,
        children: true,
        tags: {
          include: {
            tag: true,
          },
        },
        checklists: true,
        comments: {
          include: {
            user: true,
          },
        },
        attachments: true,
        reminders: true,
        timeEntries: {
          include: {
            user: true,
          },
        },
      },
    })
  }

  async createTask(userId: string, data: CreateTaskInput) {
    const { tagIds, ...taskData } = data

    const task = await prisma.task.create({
      data: {
        ...taskData,
        userId,
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
        startDate: data.startDate ? new Date(data.startDate) : null,
        tags: tagIds?.length
          ? {
              create: tagIds.map((tagId) => ({
                tagId,
              })),
            }
          : undefined,
      },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    })

    // Log activity
    await prisma.activity.create({
      data: {
        type: 'CREATE',
        action: 'created task',
        entityType: 'Task',
        entityId: task.id,
        userId,
        taskId: task.id,
      },
    })

    return task
  }

  async updateTask(userId: string, data: UpdateTaskInput) {
    const { id, tagIds, ...updateData } = data

    // Check if task exists and belongs to user
    const existingTask = await prisma.task.findFirst({
      where: { id, userId, deletedAt: null },
    })

    if (!existingTask) {
      throw new Error('Task not found')
    }

    const task = await prisma.task.update({
      where: { id },
      data: {
        ...updateData,
        dueDate: updateData.dueDate ? new Date(updateData.dueDate) : undefined,
        startDate: updateData.startDate ? new Date(updateData.startDate) : undefined,
        completedAt: updateData.completedAt ? new Date(updateData.completedAt) : undefined,
        tags: tagIds
          ? {
              deleteMany: {},
              create: tagIds.map((tagId) => ({
                tagId,
              })),
            }
          : undefined,
      },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    })

    // Log activity
    await prisma.activity.create({
      data: {
        type: 'UPDATE',
        action: 'updated task',
        entityType: 'Task',
        entityId: task.id,
        userId,
        taskId: task.id,
      },
    })

    return task
  }

  async deleteTask(userId: string, id: string) {
    // Soft delete
    await prisma.task.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    })

    // Log activity
    await prisma.activity.create({
      data: {
        type: 'DELETE',
        action: 'deleted task',
        entityType: 'Task',
        entityId: id,
        userId,
      },
    })
  }

  async completeTask(userId: string, id: string) {
    const task = await prisma.task.update({
      where: { id, userId, deletedAt: null },
      data: {
        status: 'COMPLETED',
        completedAt: new Date(),
      },
    })

    // Log activity
    await prisma.activity.create({
      data: {
        type: 'COMPLETE',
        action: 'completed task',
        entityType: 'Task',
        entityId: id,
        userId,
        taskId: id,
      },
    })

    return task
  }

  async bulkUpdateStatus(userId: string, taskIds: string[], status: string) {
    await prisma.task.updateMany({
      where: {
        id: { in: taskIds },
        userId,
      },
      data: {
        status: status as any,
        completedAt: status === 'COMPLETED' ? new Date() : null,
      },
    })
  }
}
