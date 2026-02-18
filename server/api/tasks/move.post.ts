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
    const { taskId, status } = body

    if (!taskId || !status) {
      throw createError({
        statusCode: 400,
        message: 'Task ID and status are required',
      })
    }

    const taskService = new TaskService()
    const task = await taskService.updateTask(userId, { id: taskId, status })

    return {
      data: task,
      message: 'Task moved successfully',
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || 'Failed to move task',
    })
  }
})
