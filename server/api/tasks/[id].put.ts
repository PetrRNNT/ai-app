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

    const id = event.context.params?.id

    if (!id) {
      throw createError({
        statusCode: 400,
        message: 'Task ID is required',
      })
    }

    const body = await readBody(event)
    const taskService = new TaskService()
    const task = await taskService.updateTask(userId, { id, ...body })

    return {
      data: task,
      message: 'Task updated successfully',
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || 'Failed to update task',
    })
  }
})
