import { p as prisma } from './auth.mjs';

class TagService {
  async getTags(userId) {
    return prisma.tag.findMany({
      where: { userId },
      include: {
        _count: {
          select: { tasks: true }
        }
      },
      orderBy: { name: "asc" }
    });
  }
  async createTag(userId, name, color) {
    const tag = await prisma.tag.create({
      data: {
        name: name.toLowerCase(),
        color,
        userId
      }
    });
    return tag;
  }
  async updateTag(userId, id, data) {
    const existingTag = await prisma.tag.findFirst({
      where: { id, userId }
    });
    if (!existingTag) {
      throw new Error("Tag not found");
    }
    return prisma.tag.update({
      where: { id },
      data
    });
  }
  async deleteTag(userId, id) {
    const existingTag = await prisma.tag.findFirst({
      where: { id, userId }
    });
    if (!existingTag) {
      throw new Error("Tag not found");
    }
    await prisma.tag.delete({
      where: { id }
    });
  }
}

export { TagService as T };
//# sourceMappingURL=tag.service.mjs.map
