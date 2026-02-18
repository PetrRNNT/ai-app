import { TagService } from '~/server/services/tag.service'
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
    const { name, color } = body

    if (!name || !color) {
      throw createError({
        statusCode: 400,
        message: 'Name and color are required',
      })
    }

    const tagService = new TagService()
    const tag = await tagService.createTag(userId, name, color)

    return {
      data: tag,
      message: 'Tag created successfully',
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || 'Failed to create tag',
    })
  }
})
