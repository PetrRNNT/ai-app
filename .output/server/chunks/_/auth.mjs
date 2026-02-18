import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { PrismaClient } from '@prisma/client';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { g as getHeader, e as createError } from './nitro.mjs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const __dirname$1 = path.dirname(fileURLToPath(globalThis._importMeta_.url));
const dbPath = path.join(__dirname$1, "../../prisma/dev.db");
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `file:${dbPath}`
    }
  }
});

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
function hashPassword(password) {
  return bcrypt.hash(password, 10);
}
function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}
function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });
}
function verifyToken(token, secret = JWT_SECRET) {
  try {
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
}
function getUserIdFromToken(token, secret = JWT_SECRET) {
  const payload = verifyToken(token, secret);
  return payload?.userId || null;
}
function getUserIdFromEvent(event) {
  const token = getHeader(event, "authorization")?.replace("Bearer ", "");
  if (!token) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized"
    });
  }
  const userId = getUserIdFromToken(token, JWT_SECRET);
  if (!userId) {
    throw createError({
      statusCode: 401,
      message: "Invalid token"
    });
  }
  return userId;
}

export { verifyToken as a, getUserIdFromEvent as b, getUserIdFromToken as g, hashPassword as h, prisma as p, signToken as s, verifyPassword as v };
//# sourceMappingURL=auth.mjs.map
