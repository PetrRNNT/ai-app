import { TaskService } from '~/server/services/task.service'
import { getUserIdFromEvent } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  try {
    const userId = getUserIdFromEvent(event)

    const query = getQuery(event)
    const filters = {
      status: query.status ? (Array.isArray(query.status) ? query.status : [query.status]) : undefined,
      priority: query.priority ? (Array.isArray(query.priority) ? query.priority : [query.priority]) : undefined,
      projectId: query.projectId as string | undefined,
      sectionId: query.sectionId as string | undefined,
      search: query.search as string | undefined,
      sortBy: query.sortBy as string | undefined,
      sortOrder: query.sortOrder as 'asc' | 'desc' | undefined,
    }

    const taskService = new TaskService()
    const tasks = await taskService.getTasks(userId, filters as any)

    return {
      data: tasks,
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || 'Failed to fetch tasks',
    })
  }
})
