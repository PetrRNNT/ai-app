import prisma from '../utils/db'

export class TemplateService {
  async getTemplates(userId: string, type?: string) {
    const where: any = { userId }
    if (type) where.type = type

    return prisma.template.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })
  }

  async createTemplate(
    userId: string,
    name: string,
    type: string,
    content: any,
    variables?: any,
    isPublic?: boolean
  ) {
    return prisma.template.create({
      data: {
        userId,
        name,
        type,
        content,
        variables,
        isPublic: isPublic || false,
      },
    })
  }

  async updateTemplate(userId: string, id: string, data: any) {
    const existing = await prisma.template.findFirst({
      where: { id, userId },
    })

    if (!existing) throw new Error('Template not found')

    return prisma.template.update({
      where: { id },
      data,
    })
  }

  async deleteTemplate(userId: string, id: string) {
    await prisma.template.delete({
      where: { id, userId },
    })
  }

  async applyTemplate(userId: string, templateId: string, targetId?: string, variables?: any) {
    const template = await prisma.template.findFirst({
      where: { id: templateId, userId },
    })

    if (!template) throw new Error('Template not found')

    // Apply variables to content
    let content = template.content
    if (variables) {
      Object.keys(variables).forEach((key) => {
        content = JSON.parse(JSON.stringify(content).replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), variables[key]))
      })
    }

    return { template, content }
  }

  async getPublicTemplates(type?: string) {
    const where: any = { isPublic: true }
    if (type) where.type = type

    return prisma.template.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })
  }
}
