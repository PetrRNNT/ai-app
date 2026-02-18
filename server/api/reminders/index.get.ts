import { ReminderService } from '~/server/services/reminder.service'
import { getUserIdFromToken } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  try {
    const token = getHeader(event, 'authorization')?.replace('Bearer ', '')
    if (!token) throw createError({ statusCode: 401, message: 'Unauthorized' })

    const userId = getUserIdFromToken(token)
    if (!userId) throw createError({ statusCode: 401, message: 'Invalid token' })

    const service = new ReminderService()
    const reminders = await service.getReminders(userId)

    return { data: reminders }
  } catch (error: any) {
    throw createError({ statusCode: error.statusCode || 400, message: error.message })
  }
})
