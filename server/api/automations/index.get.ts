import { AutomationService } from '~/server/services/automation.service'
import { getUserIdFromToken } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  try {
    const token = getHeader(event, 'authorization')?.replace('Bearer ', '')
    if (!token) throw createError({ statusCode: 401, message: 'Unauthorized' })

    const userId = getUserIdFromToken(token)
    if (!userId) throw createError({ statusCode: 401, message: 'Invalid token' })

    const service = new AutomationService()
    const automations = await service.getAutomations(userId)

    return { data: automations }
  } catch (error: any) {
    throw createError({ statusCode: error.statusCode || 400, message: error.message })
  }
})
