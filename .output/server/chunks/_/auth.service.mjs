import { p as prisma, h as hashPassword, v as verifyPassword, a as verifyToken, s as signToken } from './auth.mjs';

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production";
process.env.JWT_EXPIRES_IN || "7d";
class AuthService {
  async register(email, name, password) {
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    if (existingUser) {
      throw new Error("User with this email already exists");
    }
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: "USER",
        settings: {
          create: {
            theme: "system",
            language: "ru",
            timezone: "Europe/Kaliningrad"
          }
        }
      },
      include: {
        settings: true
      }
    });
    const token = this.generateToken({
      userId: user.id,
      email: user.email,
      role: user.role
    });
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        role: user.role
      },
      token
    };
  }
  async login(email, password) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        settings: true
      }
    });
    if (!user) {
      throw new Error("Invalid email or password");
    }
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      throw new Error("Invalid email or password");
    }
    const token = this.generateToken({
      userId: user.id,
      email: user.email,
      role: user.role
    });
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        role: user.role
      },
      token
    };
  }
  async getUserByToken(token) {
    const payload = verifyToken(token, JWT_SECRET);
    if (!payload) return null;
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: {
        settings: true
      }
    });
    if (!user) {
      return null;
    }
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      role: user.role,
      settings: user.settings
    };
  }
  generateToken(payload) {
    return signToken(payload);
  }
}

export { AuthService as A };
//# sourceMappingURL=auth.service.mjs.map
