import { defineStore } from 'pinia'
import type { TaskFilters, CreateTaskInput, UpdateTaskInput, TaskWithRelations } from '~/types'

interface TaskState {
  tasks: TaskWithRelations[]
  currentTask: TaskWithRelations | null
  loading: boolean
  error: string | null
  filters: TaskFilters
}

export const useTaskStore = defineStore('task', {
  state: (): TaskState => ({
    tasks: [],
    currentTask: null,
    loading: false,
    error: null,
    filters: {},
  }),

  getters: {
    allTasks: (state) => state.tasks,
    filteredTasks: (state: TaskState) => {
      let filtered = state.tasks

      if (state.filters.status?.length) {
        filtered = filtered.filter((t: TaskWithRelations) => t.status && state.filters.status?.includes(t.status))
      }
      if (state.filters.priority?.length) {
        filtered = filtered.filter((t: TaskWithRelations) => t.priority && state.filters.priority?.includes(t.priority))
      }
      if (state.filters.projectId) {
        filtered = filtered.filter((t: TaskWithRelations) => t.projectId === state.filters.projectId)
      }
      if (state.filters.search) {
        const search = state.filters.search.toLowerCase()
        filtered = filtered.filter(
          (t: TaskWithRelations) =>
            t.title.toLowerCase().includes(search) ||
            t.description?.toLowerCase().includes(search)
        )
      }
      if (state.filters.isImportant !== undefined) {
        filtered = filtered.filter((t: TaskWithRelations) => t.isImportant === state.filters.isImportant)
      }

      return filtered
    },
    completedTasks: (state: TaskState) => state.tasks.filter((t: TaskWithRelations) => t.status === 'COMPLETED'),
    pendingTasks: (state: TaskState) => state.tasks.filter((t: TaskWithRelations) => t.status !== 'COMPLETED'),
    importantTasks: (state: TaskState) => state.tasks.filter((t: TaskWithRelations) => t.isImportant),
  },

  actions: {
    setFilters(filters: TaskFilters) {
      this.filters = filters
    },

    clearFilters() {
      this.filters = {}
    },

    async fetchTasks(filters?: TaskFilters) {
      this.loading = true
      this.error = null

      try {
        const query = filters ? new URLSearchParams(filters as any).toString() : ''
        const url = query ? `/api/tasks?${query}` : '/api/tasks'

        const authStore = useAuthStore()
        const token = authStore.validToken
        if (!token) throw new Error('Not authenticated')
        
        const data: any = await $fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        this.tasks = data.data
      } catch (error: any) {
        this.error = error.message || 'Failed to fetch tasks'
      } finally {
        this.loading = false
      }
    },

    async fetchTaskById(id: string) {
      this.loading = true
      this.error = null

      try {
        const authStore = useAuthStore()
        const token = authStore.validToken
        if (!token) throw new Error('Not authenticated')
        
        const data: any = await $fetch(`/api/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        this.currentTask = data.data
        return data.data
      } catch (error: any) {
        this.error = error.message || 'Failed to fetch task'
        throw error
      } finally {
        this.loading = false
      }
    },

    async createTask(data: CreateTaskInput) {
      this.loading = true
      this.error = null

      try {
        const authStore = useAuthStore()
        
        const token = authStore.validToken
        if (!token) {
          throw new Error('Not authenticated. Please log in again.')
        }
        
        const result: any = await $fetch('/api/tasks', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: data,
        })

        this.tasks.push(result.data)
        return result.data
      } catch (error: any) {
        this.error = error.message || 'Failed to create task'
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateTask(data: UpdateTaskInput) {
      this.loading = true
      this.error = null

      try {
        const authStore = useAuthStore()
        const token = authStore.validToken
        if (!token) throw new Error('Not authenticated')
        
        const { id, ...updateData } = data
        const result: any = await $fetch(`/api/tasks/${id}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: updateData,
        })

        const index = this.tasks.findIndex((t: TaskWithRelations) => t.id === id)
        if (index !== -1) {
          this.tasks[index] = result.data
        }

        if (this.currentTask?.id === id) {
          this.currentTask = result.data
        }

        return result.data
      } catch (error: any) {
        this.error = error.message || 'Failed to update task'
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteTask(id: string) {
      this.loading = true
      this.error = null

      try {
        const authStore = useAuthStore()
        const token = authStore.validToken
        if (!token) throw new Error('Not authenticated')
        
        await $fetch(`/api/tasks/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        this.tasks = this.tasks.filter((t: TaskWithRelations) => t.id !== id)
      } catch (error: any) {
        this.error = error.message || 'Failed to delete task'
        throw error
      } finally {
        this.loading = false
      }
    },

    async completeTask(id: string) {
      this.loading = true
      this.error = null

      try {
        const authStore = useAuthStore()
        const token = authStore.validToken
        if (!token) throw new Error('Not authenticated')
        
        const result: any = await $fetch(`/api/tasks/${id}/complete`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const index = this.tasks.findIndex((t: TaskWithRelations) => t.id === id)
        if (index !== -1) {
          this.tasks[index] = result.data
        }

        return result.data
      } catch (error: any) {
        this.error = error.message || 'Failed to complete task'
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
