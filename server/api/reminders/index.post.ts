import { ReminderService } from '~/server/services/reminder.service'
import { getUserIdFromToken } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  try {
    const token = getHeader(event, 'authorization')?.replace('Bearer ', '')
    if (!token) throw createError({ statusCode: 401, message: 'Unauthorized' })

    const userId = getUserIdFromToken(token)
    if (!userId) throw createError({ statusCode: 401, message: 'Invalid token' })

    const body = await readBody(event)
    const { taskId, type, triggerAt, context, condition } = body

    if (!taskId || !type) {
      throw createError({ statusCode: 400, message: 'Task ID and type are required' })
    }

    const service = new ReminderService()
    const reminder = await service.createReminder(
      userId,
      taskId,
      type,
      triggerAt ? new Date(triggerAt) : undefined,
      context,
      condition
    )

    return { data: reminder, message: 'Reminder created' }
  } catch (error: any) {
    throw createError({ statusCode: error.statusCode || 400, message: error.message })
  }
})
