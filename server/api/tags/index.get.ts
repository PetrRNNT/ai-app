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

    const tagService = new TagService()
    const tags = await tagService.getTags(userId)

    return {
      data: tags,
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || 'Failed to fetch tags',
    })
  }
})
