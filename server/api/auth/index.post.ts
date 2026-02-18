import { AuthService } from '~/server/services/auth.service'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { email, password, name } = body

    if (!email || !password) {
      throw createError({
        statusCode: 400,
        message: 'Email and password are required',
      })
    }

    const authService = new AuthService()

    if (name) {
      // Register
      const result = await authService.register(email, name, password)
      return {
        data: result.user,
        token: result.token,
        message: 'Registration successful',
      }
    } else {
      // Login
      const result = await authService.login(email, password)
      return {
        data: result.user,
        token: result.token,
        message: 'Login successful',
      }
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || 'Authentication failed',
    })
  }
})
