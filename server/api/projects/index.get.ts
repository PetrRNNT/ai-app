import { ProjectService } from '~/server/services/project.service'
import { getUserIdFromToken } from '~/server/utils/auth'

const JWT_SECRET = process.env.JWT_SECRET

export default defineEventHandler(async (event) => {
  try {
    const token = getHeader(event, 'authorization')?.replace('Bearer ', '')

    if (!token) {
      throw createError({
        statusCode: 401,
        message: 'Unauthorized - no token provided',
      })
    }

    const userId = getUserIdFromToken(token, JWT_SECRET)

    if (!userId) {
      throw createError({
        statusCode: 401,
        message: 'Unauthorized - invalid token',
      })
    }

    const projectService = new ProjectService()
    const projects = await projectService.getProjects(userId)

    return {
      data: projects,
    }
  } catch (error: any) {
    console.error('Projects API error:', error.message)
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || 'Failed to fetch projects',
    })
  }
})
