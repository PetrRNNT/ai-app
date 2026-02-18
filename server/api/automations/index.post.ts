import { AutomationService } from '~/server/services/automation.service'
import { getUserIdFromToken } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  try {
    const token = getHeader(event, 'authorization')?.replace('Bearer ', '')
    if (!token) throw createError({ statusCode: 401, message: 'Unauthorized' })

    const userId = getUserIdFromToken(token)
    if (!userId) throw createError({ statusCode: 401, message: 'Invalid token' })

    const body = await readBody(event)
    const { name, description, trigger, actions } = body

    if (!name || !trigger || !actions) {
      throw createError({ statusCode: 400, message: 'Name, trigger, and actions are required' })
    }

    const service = new AutomationService()
    const automation = await service.createAutomation(userId, name, trigger, actions, description)

    return { data: automation, message: 'Automation created' }
  } catch (error: any) {
    throw createError({ statusCode: error.statusCode || 400, message: error.message })
  }
})
