import { p as prisma } from './auth.mjs';

class ProjectService {
  async getProjects(userId) {
    return prisma.project.findMany({
      where: {
        userId
      },
      include: {
        area: true,
        parent: true,
        children: true,
        sections: {
          orderBy: { order: "asc" }
        },
        _count: {
          select: { tasks: true }
        }
      },
      orderBy: { order: "asc" }
    });
  }
  async getProjectById(id, userId) {
    return prisma.project.findFirst({
      where: {
        id,
        userId
      },
      include: {
        area: true,
        parent: true,
        children: true,
        sections: {
          orderBy: { order: "asc" }
        },
        tasks: {
          where: {},
          include: {
            tags: {
              include: { tag: true }
            }
          }
        },
        _count: {
          select: { tasks: true }
        }
      }
    });
  }
  async createProject(userId, data) {
    const project = await prisma.project.create({
      data: {
        ...data,
        userId,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null
      },
      include: {
        sections: true
      }
    });
    await prisma.activity.create({
      data: {
        type: "CREATE",
        action: "created project",
        entityType: "Project",
        entityId: project.id,
        userId
      }
    });
    return project;
  }
  async updateProject(userId, data) {
    const { id, ...updateData } = data;
    const existingProject = await prisma.project.findFirst({
      where: { id, userId, deletedAt: null }
    });
    if (!existingProject) {
      throw new Error("Project not found");
    }
    const project = await prisma.project.update({
      where: { id },
      data: {
        ...updateData,
        startDate: updateData.startDate ? new Date(updateData.startDate) : void 0,
        endDate: updateData.endDate ? new Date(updateData.endDate) : void 0
      }
    });
    await prisma.activity.create({
      data: {
        type: "UPDATE",
        action: "updated project",
        entityType: "Project",
        entityId: project.id,
        userId
      }
    });
    return project;
  }
  async deleteProject(userId, id) {
    await prisma.project.delete({
      where: {
        id,
        userId
      }
    });
    await prisma.activity.create({
      data: {
        type: "DELETE",
        action: "deleted project",
        entityType: "Project",
        entityId: id,
        userId
      }
    });
  }
  async getProjectWithTasks(id, userId) {
    return prisma.project.findFirst({
      where: {
        id,
        userId
      },
      include: {
        area: true,
        sections: {
          orderBy: { order: "asc" },
          include: {
            tasks: {
              where: {},
              include: {
                tags: {
                  include: { tag: true }
                }
              },
              orderBy: { order: "asc" }
            }
          }
        },
        tasks: {
          where: {},
          include: {
            tags: {
              include: { tag: true }
            }
          },
          orderBy: { order: "asc" }
        }
      }
    });
  }
}

export { ProjectService as P };
//# sourceMappingURL=project.service.mjs.map
