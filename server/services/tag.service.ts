import prisma from '../utils/db'

export class TagService {
  async getTags(userId: string) {
    return prisma.tag.findMany({
      where: { userId },
      include: {
        _count: {
          select: { tasks: true },
        },
      },
      orderBy: { name: 'asc' },
    })
  }

  async createTag(userId: string, name: string, color: string) {
    const tag = await prisma.tag.create({
      data: {
        name: name.toLowerCase(),
        color,
        userId,
      },
    })

    return tag
  }

  async updateTag(userId: string, id: string, data: { name?: string; color?: string }) {
    const existingTag = await prisma.tag.findFirst({
      where: { id, userId },
    })

    if (!existingTag) {
      throw new Error('Tag not found')
    }

    return prisma.tag.update({
      where: { id },
      data,
    })
  }

  async deleteTag(userId: string, id: string) {
    const existingTag = await prisma.tag.findFirst({
      where: { id, userId },
    })

    if (!existingTag) {
      throw new Error('Tag not found')
    }

    await prisma.tag.delete({
      where: { id },
    })
  }
}
