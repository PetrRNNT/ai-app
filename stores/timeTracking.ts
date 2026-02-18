import { defineStore } from 'pinia'

interface TimeEntry {
  id: string
  startTime: string
  endTime?: string | null
  duration?: number | null
  description?: string | null
  taskId: string
  userId: string
  task?: any
}

interface TimeTrackingState {
  activeEntry: TimeEntry | null
  entries: TimeEntry[]
  loading: boolean
  error: string | null
}

export const useTimeTrackingStore = defineStore('timeTracking', {
  state: (): TimeTrackingState => ({
    activeEntry: null,
    entries: [],
    loading: false,
    error: null,
  }),

  getters: {
    isTracking: (state) => !!state.activeEntry,
    elapsedTime: (state) => {
      if (!state.activeEntry) return 0
      return Math.floor((Date.now() - new Date(state.activeEntry.startTime).getTime()) / 1000)
    },
  },

  actions: {
    async fetchActiveEntry() {
      try {
        const authStore = useAuthStore()
        const data: any = await $fetch('/api/time-entries/active', {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        })
        this.activeEntry = data.data
      } catch (error: any) {
        this.error = error.message
      }
    },

    async startTracking(taskId: string, description?: string) {
      this.loading = true
      this.error = null

      try {
        const authStore = useAuthStore()
        const data: any = await $fetch('/api/time-entries/start', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authStore.token}`,
            'Content-Type': 'application/json',
          },
          body: { taskId, description },
        })

        this.activeEntry = data.data
        return data.data
      } catch (error: any) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async stopTracking() {
      if (!this.activeEntry) return

      this.loading = true
      this.error = null

      try {
        const authStore = useAuthStore()
        const data: any = await $fetch('/api/time-entries/stop', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authStore.token}`,
            'Content-Type': 'application/json',
          },
          body: { entryId: this.activeEntry.id },
        })

        this.entries.unshift(data.data)
        this.activeEntry = null
        return data.data
      } catch (error: any) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchEntries(taskId?: string) {
      this.loading = true
      this.error = null

      try {
        const authStore = useAuthStore()
        const url = taskId ? `/api/time-entries?taskId=${taskId}` : '/api/time-entries'
        const data: any = await $fetch(url, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        })

        this.entries = data.data
      } catch (error: any) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
  },
})
