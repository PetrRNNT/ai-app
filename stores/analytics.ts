import { defineStore } from 'pinia'

interface AnalyticsState {
  stats: any | null
  loading: boolean
  error: string | null
}

export const useAnalyticsStore = defineStore('analytics', {
  state: (): AnalyticsState => ({
    stats: null,
    loading: false,
    error: null,
  }),

  getters: {
    productivityStats: (state) => state.stats,
  },

  actions: {
    async fetchStats() {
      this.loading = true
      this.error = null

      try {
        const authStore = useAuthStore()
        const data: any = await $fetch('/api/analytics', {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        })

        this.stats = data.data
      } catch (error: any) {
        this.error = error.message || 'Failed to fetch analytics'
      } finally {
        this.loading = false
      }
    },
  },
})
