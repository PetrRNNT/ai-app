import { TaskService } from '~/server/services/task.service'
import { getUserIdFromToken } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  try {
    const token = getHeader(event, 'authorization')?.replace('Bearer ', '')

    if (!token) {
      throw createError({
        statusCode: 401,
        message: 'Unauthorized',
      })
    }

    const userId = getUserIdFromToken(token)

    if (!userId) {
      throw createError({
        statusCode: 401,
        message: 'Invalid token',
      })
    }

    const body = await readBody(event)
    const { title } = body

    if (!title) {
      throw createError({
        statusCode: 400,
        message: 'Title is required',
      })
    }

    const taskService = new TaskService()
    const task = await taskService.createTask(userId, body)

    return {
      data: task,
      message: 'Task created successfully',
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || 'Failed to create task',
    })
  }
})
