import { defineStore } from 'pinia'

interface Automation {
  id: string
  name: string
  description?: string
  isActive: boolean
  trigger: any
  actions: any[]
  userId: string
  lastRun?: string | null
  createdAt: string
  updatedAt: string
}

interface AutomationState {
  automations: Automation[]
  loading: boolean
  error: string | null
}

export const useAutomationStore = defineStore('automation', {
  state: (): AutomationState => ({
    automations: [],
    loading: false,
    error: null,
  }),

  getters: {
    activeAutomations: (state) => state.automations.filter((a) => a.isActive),
  },

  actions: {
    async fetchAutomations() {
      this.loading = true
      this.error = null
      try {
        const authStore = useAuthStore()
        const data: any = await $fetch('/api/automations', {
          headers: { Authorization: `Bearer ${authStore.token}` },
        })
        this.automations = data.data
      } catch (error: any) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async createAutomation(data: any) {
      this.loading = true
      this.error = null
      try {
        const authStore = useAuthStore()
        const result: any = await $fetch('/api/automations', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authStore.token}`,
            'Content-Type': 'application/json',
          },
          body: data,
        })
        this.automations.push(result.data)
        return result.data
      } catch (error: any) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteAutomation(id: string) {
      try {
        const authStore = useAuthStore()
        await $fetch(`/api/automations/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${authStore.token}` },
        })
        this.automations = this.automations.filter((a) => a.id !== id)
      } catch (error: any) {
        this.error = error.message
        throw error
      }
    },

    async toggleAutomation(id: string, isActive: boolean) {
      const authStore = useAuthStore()
      const result: any = await $fetch(`/api/automations/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          'Content-Type': 'application/json',
        },
        body: { isActive },
      })
      const index = this.automations.findIndex((a) => a.id === id)
      if (index !== -1) {
        this.automations[index] = result.data
      }
      return result.data
    },
  },
})
