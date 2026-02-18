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

    const body = await readBody(event)
    const { name } = body

    if (!name) {
      throw createError({
        statusCode: 400,
        message: 'Project name is required',
      })
    }

    const projectService = new ProjectService()
    const project = await projectService.createProject(userId, body)

    return {
      data: project,
      message: 'Project created successfully',
    }
  } catch (error: any) {
    console.error('Project create error:', error.message)
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || 'Failed to create project',
    })
  }
})
