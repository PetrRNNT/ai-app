import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import type { JwtPayload } from '~/types'

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  })
}

export function verifyToken(token: string, secret: string = JWT_SECRET): JwtPayload | null {
  try {
    return jwt.verify(token, secret) as JwtPayload
  } catch {
    return null
  }
}

export function getUserIdFromToken(token: string, secret: string = JWT_SECRET): string | null {
  const payload = verifyToken(token, secret)
  return payload?.userId || null
}

export function getUserIdFromEvent(event: any): string {
  const token = getHeader(event, 'authorization')?.replace('Bearer ', '')

  if (!token) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized',
    })
  }

  const userId = getUserIdFromToken(token, JWT_SECRET)

  if (!userId) {
    throw createError({
      statusCode: 401,
      message: 'Invalid token',
    })
  }

  return userId
}
