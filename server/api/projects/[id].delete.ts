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

    const id = event.context.params?.id

    if (!id) {
      throw createError({
        statusCode: 400,
        message: 'Project ID is required',
      })
    }

    const projectService = new ProjectService()
    await projectService.deleteProject(userId, id)

    return {
      message: 'Project deleted successfully',
    }
  } catch (error: any) {
    console.error('Project delete error:', error.message)
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || 'Failed to delete project',
    })
  }
})
