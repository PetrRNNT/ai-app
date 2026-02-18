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

    const query = getQuery(event)
    const taskId = query.taskId as string | undefined

    const service = new TimeTrackingService()
    const entries = await service.getTimeEntries(userId, taskId)

    return {
      data: entries,
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || 'Failed to fetch time entries',
    })
  }
})
