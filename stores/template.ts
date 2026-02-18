import { defineStore } from 'pinia'

interface Template {
  id: string
  name: string
  type: string
  content: any
  variables?: any
  isPublic: boolean
  userId: string
  createdAt: string
  updatedAt: string
}

interface TemplateState {
  templates: Template[]
  loading: boolean
  error: string | null
}

export const useTemplateStore = defineStore('template', {
  state: (): TemplateState => ({
    templates: [],
    loading: false,
    error: null,
  }),

  getters: {
    taskTemplates: (state) => state.templates.filter((t) => t.type === 'TASK'),
    projectTemplates: (state) => state.templates.filter((t) => t.type === 'PROJECT'),
  },

  actions: {
    async fetchTemplates(type?: string) {
      this.loading = true
      this.error = null
      try {
        const authStore = useAuthStore()
        const url = type ? `/api/templates?type=${type}` : '/api/templates'
        const data: any = await $fetch(url, {
          headers: { Authorization: `Bearer ${authStore.token}` },
        })
        this.templates = data.data
      } catch (error: any) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async createTemplate(data: any) {
      this.loading = true
      this.error = null
      try {
        const authStore = useAuthStore()
        const result: any = await $fetch('/api/templates', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authStore.token}`,
            'Content-Type': 'application/json',
          },
          body: data,
        })
        this.templates.push(result.data)
        return result.data
      } catch (error: any) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteTemplate(id: string) {
      try {
        const authStore = useAuthStore()
        await $fetch(`/api/templates/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${authStore.token}` },
        })
        this.templates = this.templates.filter((t) => t.id !== id)
      } catch (error: any) {
        this.error = error.message
        throw error
      }
    },
  },
})
