import prisma from '../utils/db'
import { hashPassword, verifyPassword, signToken, verifyToken } from '../utils/auth'
import type { JwtPayload } from '~/types'

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'

export class AuthService {
  async register(email: string, name: string, password: string) {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      throw new Error('User with this email already exists')
    }

    const hashedPassword = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: 'USER',
        settings: {
          create: {
            theme: 'system',
            language: 'ru',
            timezone: 'Europe/Kaliningrad',
          },
        },
      },
      include: {
        settings: true,
      },
    })

    const token = this.generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        role: user.role,
      },
      token,
    }
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        settings: true,
      },
    })

    if (!user) {
      throw new Error('Invalid email or password')
    }

    const isValid = await verifyPassword(password, user.password)

    if (!isValid) {
      throw new Error('Invalid email or password')
    }

    const token = this.generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        role: user.role,
      },
      token,
    }
  }

  async getUserByToken(token: string) {
    const payload = verifyToken(token, JWT_SECRET)
    if (!payload) return null

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: {
        settings: true,
      },
    })

    if (!user) {
      return null
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      role: user.role,
      settings: user.settings,
    }
  }

  private generateToken(payload: JwtPayload): string {
    return signToken(payload, JWT_SECRET, JWT_EXPIRES_IN)
  }
}
