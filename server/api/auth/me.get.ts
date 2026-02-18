import { AuthService } from '~/server/services/auth.service'

export default defineEventHandler(async (event) => {
  try {
    const token = getHeader(event, 'authorization')?.replace('Bearer ', '')

    if (!token) {
      throw createError({
        statusCode: 401,
        message: 'Unauthorized',
      })
    }

    const authService = new AuthService()
    const user = await authService.getUserByToken(token)

    if (!user) {
      throw createError({
        statusCode: 401,
        message: 'Invalid token',
      })
    }

    return {
      data: user,
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || 'Failed to get user',
    })
  }
})
