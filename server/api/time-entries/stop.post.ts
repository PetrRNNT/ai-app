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
    const { entryId } = body

    if (!entryId) {
      throw createError({
        statusCode: 400,
        message: 'Entry ID is required',
      })
    }

    const service = new TimeTrackingService()
    const entry = await service.stopTimeEntry(userId, entryId)

    return {
      data: entry,
      message: 'Time tracking stopped',
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || 'Failed to stop time tracking',
    })
  }
})
