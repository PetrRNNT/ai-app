import { c as defineEventHandler, r as readBody, e as createError } from '../../_/nitro.mjs';
import { A as AuthService } from '../../_/auth.service.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../../_/auth.mjs';
import '@prisma/client';
import 'jsonwebtoken';
import 'bcryptjs';

const index_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { email, password, name } = body;
    if (!email || !password) {
      throw createError({
        statusCode: 400,
        message: "Email and password are required"
      });
    }
    const authService = new AuthService();
    if (name) {
      const result = await authService.register(email, name, password);
      return {
        data: result.user,
        token: result.token,
        message: "Registration successful"
      };
    } else {
      const result = await authService.login(email, password);
      return {
        data: result.user,
        token: result.token,
        message: "Login successful"
      };
    }
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || "Authentication failed"
    });
  }
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map
