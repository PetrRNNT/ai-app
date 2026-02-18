import { AnalyticsService } from '~/server/services/analytics.service'
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
    const startDate = query.start as string
    const endDate = query.end as string

    if (!startDate || !endDate) {
      throw createError({
        statusCode: 400,
        message: 'Start and end dates are required',
      })
    }

    const analyticsService = new AnalyticsService()
    const events = await analyticsService.getCalendarEvents(userId, startDate, endDate)

    return {
      data: events,
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || 'Failed to fetch calendar events',
    })
  }
})
