import { defineStore } from 'pinia'
import type { ProjectWithRelations, CreateProjectInput, UpdateProjectInput } from '~/types'

interface ProjectState {
  projects: ProjectWithRelations[]
  currentProject: ProjectWithRelations | null
  loading: boolean
  error: string | null
}

export const useProjectStore = defineStore('project', {
  state: (): ProjectState => ({
    projects: [],
    currentProject: null,
    loading: false,
    error: null,
  }),

  getters: {
    allProjects: (state) => state.projects,
    activeProjects: (state) => state.projects.filter((p) => p.status === 'ACTIVE'),
    archivedProjects: (state) => state.projects.filter((p) => p.status === 'ARCHIVED'),
  },

  actions: {
    async fetchProjects() {
      this.loading = true
      this.error = null

      try {
        const authStore = useAuthStore()
        const token = authStore.validToken
        if (!token) throw new Error('Not authenticated')
        
        const data: any = await $fetch('/api/projects', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        this.projects = data.data
      } catch (error: any) {
        this.error = error.message || 'Failed to fetch projects'
      } finally {
        this.loading = false
      }
    },

    async fetchProjectById(id: string) {
      this.loading = true
      this.error = null

      try {
        const authStore = useAuthStore()
        const token = authStore.validToken
        if (!token) throw new Error('Not authenticated')
        
        const data: any = await $fetch(`/api/projects/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        this.currentProject = data.data
        return data.data
      } catch (error: any) {
        this.error = error.message || 'Failed to fetch project'
        throw error
      } finally {
        this.loading = false
      }
    },

    async createProject(data: CreateProjectInput) {
      this.loading = true
      this.error = null

      try {
        const authStore = useAuthStore()
        const token = authStore.validToken
        if (!token) throw new Error('Not authenticated')
        
        const result: any = await $fetch('/api/projects', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: data,
        })

        this.projects.push(result.data)
        return result.data
      } catch (error: any) {
        this.error = error.message || 'Failed to create project'
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateProject(data: UpdateProjectInput) {
      this.loading = true
      this.error = null

      try {
        const authStore = useAuthStore()
        const token = authStore.validToken
        if (!token) throw new Error('Not authenticated')
        
        const { id, ...updateData } = data
        const result: any = await $fetch(`/api/projects/${id}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: updateData,
        })

        const index = this.projects.findIndex((p) => p.id === id)
        if (index !== -1) {
          this.projects[index] = result.data
        }

        if (this.currentProject?.id === id) {
          this.currentProject = result.data
        }

        return result.data
      } catch (error: any) {
        this.error = error.message || 'Failed to update project'
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteProject(id: string) {
      this.loading = true
      this.error = null

      try {
        const authStore = useAuthStore()
        const token = authStore.validToken
        if (!token) throw new Error('Not authenticated')
        
        await $fetch(`/api/projects/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        this.projects = this.projects.filter((p) => p.id !== id)
      } catch (error: any) {
        this.error = error.message || 'Failed to delete project'
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
