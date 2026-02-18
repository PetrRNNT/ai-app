import { TemplateService } from '~/server/services/template.service'
import { getUserIdFromToken } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  try {
    const token = getHeader(event, 'authorization')?.replace('Bearer ', '')
    if (!token) throw createError({ statusCode: 401, message: 'Unauthorized' })

    const userId = getUserIdFromToken(token)
    if (!userId) throw createError({ statusCode: 401, message: 'Invalid token' })

    const id = event.context.params?.id
    if (!id) throw createError({ statusCode: 400, message: 'Template ID required' })

    const service = new TemplateService()
    await service.deleteTemplate(userId, id)

    return { message: 'Template deleted' }
  } catch (error: any) {
    throw createError({ statusCode: error.statusCode || 400, message: error.message })
  }
})
