import { p as prisma } from './auth.mjs';

class TemplateService {
  async getTemplates(userId, type) {
    const where = { userId };
    if (type) where.type = type;
    return prisma.template.findMany({
      where,
      orderBy: { createdAt: "desc" }
    });
  }
  async createTemplate(userId, name, type, content, variables, isPublic) {
    return prisma.template.create({
      data: {
        userId,
        name,
        type,
        content,
        variables,
        isPublic: isPublic || false
      }
    });
  }
  async updateTemplate(userId, id, data) {
    const existing = await prisma.template.findFirst({
      where: { id, userId }
    });
    if (!existing) throw new Error("Template not found");
    return prisma.template.update({
      where: { id },
      data
    });
  }
  async deleteTemplate(userId, id) {
    await prisma.template.delete({
      where: { id, userId }
    });
  }
  async applyTemplate(userId, templateId, targetId, variables) {
    const template = await prisma.template.findFirst({
      where: { id: templateId, userId }
    });
    if (!template) throw new Error("Template not found");
    let content = template.content;
    if (variables) {
      Object.keys(variables).forEach((key) => {
        content = JSON.parse(JSON.stringify(content).replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), variables[key]));
      });
    }
    return { template, content };
  }
  async getPublicTemplates(type) {
    const where = { isPublic: true };
    if (type) where.type = type;
    return prisma.template.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });
  }
}

export { TemplateService as T };
//# sourceMappingURL=template.service.mjs.map
