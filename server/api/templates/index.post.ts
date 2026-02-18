import { TemplateService } from '~/server/services/template.service'
import { getUserIdFromToken } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  try {
    const token = getHeader(event, 'authorization')?.replace('Bearer ', '')
    if (!token) throw createError({ statusCode: 401, message: 'Unauthorized' })

    const userId = getUserIdFromToken(token)
    if (!userId) throw createError({ statusCode: 401, message: 'Invalid token' })

    const body = await readBody(event)
    const { name, type, content, variables, isPublic } = body

    if (!name || !type || !content) {
      throw createError({ statusCode: 400, message: 'Name, type, and content are required' })
    }

    const service = new TemplateService()
    const template = await service.createTemplate(userId, name, type, content, variables, isPublic)

    return { data: template, message: 'Template created' }
  } catch (error: any) {
    throw createError({ statusCode: error.statusCode || 400, message: error.message })
  }
})
