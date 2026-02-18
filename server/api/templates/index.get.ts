import { TemplateService } from '~/server/services/template.service'
import { getUserIdFromToken } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  try {
    const token = getHeader(event, 'authorization')?.replace('Bearer ', '')
    if (!token) throw createError({ statusCode: 401, message: 'Unauthorized' })

    const userId = getUserIdFromToken(token)
    if (!userId) throw createError({ statusCode: 401, message: 'Invalid token' })

    const query = getQuery(event)
    const service = new TemplateService()
    const templates = await service.getTemplates(userId, query.type as string)

    return { data: templates }
  } catch (error: any) {
    throw createError({ statusCode: error.statusCode || 400, message: error.message })
  }
})
