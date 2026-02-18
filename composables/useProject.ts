import { useProjectStore } from '~/stores/project'
import type { CreateProjectInput, UpdateProjectInput } from '~/types'

export function useProject() {
  const projectStore = useProjectStore()

  const fetchProjects = async () => {
    return projectStore.fetchProjects()
  }

  const createProject = async (data: CreateProjectInput) => {
    return projectStore.createProject(data)
  }

  const updateProject = async (data: UpdateProjectInput) => {
    return projectStore.updateProject(data)
  }

  const deleteProject = async (id: string) => {
    return projectStore.deleteProject(id)
  }

  return {
    projects: computed(() => projectStore.projects),
    activeProjects: computed(() => projectStore.activeProjects),
    archivedProjects: computed(() => projectStore.archivedProjects),
    currentProject: computed(() => projectStore.currentProject),
    loading: computed(() => projectStore.loading),
    error: computed(() => projectStore.error),
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
  }
}
