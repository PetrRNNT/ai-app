import { TimeTrackingService } from '~/server/services/time-tracking.service'
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
    const { taskId, description } = body

    if (!taskId) {
      throw createError({
        statusCode: 400,
        message: 'Task ID is required',
      })
    }

    // Stop any active entry first
    const service = new TimeTrackingService()
    const activeEntry = await service.getActiveEntry(userId)
    if (activeEntry) {
      await service.stopTimeEntry(userId, activeEntry.id)
    }

    const entry = await service.startTimeEntry(userId, taskId, description)

    return {
      data: entry,
      message: 'Time tracking started',
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || 'Failed to start time tracking',
    })
  }
})
