import { defineStore } from 'pinia'

interface UserSettings {
  id: string
  userId: string
  theme: string
  language: string
  timezone: string
  dateFormat: string
  timeFormat: string
  weekStart: number
  pomodoroWork: number
  pomodoroBreak: number
  pomodoroLong: number
  notifications?: any
  shortcuts?: any
  defaultView: string
}

interface SettingsState {
  settings: UserSettings | null
  loading: boolean
  error: string | null
}

export const useSettingsStore = defineStore('settings', {
  state: (): SettingsState => ({
    settings: null,
    loading: false,
    error: null,
  }),

  getters: {
    theme: (state) => state.settings?.theme || 'system',
    language: (state) => state.settings?.language || 'ru',
    pomodoroSettings: (state) => ({
      work: state.settings?.pomodoroWork || 25,
      break: state.settings?.pomodoroBreak || 5,
      long: state.settings?.pomodoroLong || 15,
    }),
  },

  actions: {
    async fetchSettings() {
      this.loading = true
      this.error = null

      try {
        const authStore = useAuthStore()
        const data: any = await $fetch('/api/settings', {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        })

        this.settings = data.data
      } catch (error: any) {
        this.error = error.message || 'Failed to fetch settings'
      } finally {
        this.loading = false
      }
    },

    async updateSettings(data: Partial<UserSettings>) {
      this.loading = true
      this.error = null

      try {
        const authStore = useAuthStore()
        const result: any = await $fetch('/api/settings', {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${authStore.token}`,
            'Content-Type': 'application/json',
          },
          body: data,
        })

        this.settings = result.data
      } catch (error: any) {
        this.error = error.message || 'Failed to update settings'
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
