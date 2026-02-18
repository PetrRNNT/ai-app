import { defineStore } from 'pinia'

interface Reminder {
  id: string
  type: string
  triggerAt?: string | null
  context?: string | null
  condition?: any
  isTriggered: boolean
  taskId: string
  userId?: string | null
  task?: any
}

interface ReminderState {
  reminders: Reminder[]
  loading: boolean
  error: string | null
}

export const useReminderStore = defineStore('reminder', {
  state: (): ReminderState => ({
    reminders: [],
    loading: false,
    error: null,
  }),

  getters: {
    pendingReminders: (state) => state.reminders.filter((r) => !r.isTriggered),
    triggeredReminders: (state) => state.reminders.filter((r) => r.isTriggered),
  },

  actions: {
    async fetchReminders() {
      this.loading = true
      this.error = null
      try {
        const authStore = useAuthStore()
        const data: any = await $fetch('/api/reminders', {
          headers: { Authorization: `Bearer ${authStore.token}` },
        })
        this.reminders = data.data
      } catch (error: any) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async createReminder(data: any) {
      this.loading = true
      this.error = null
      try {
        const authStore = useAuthStore()
        const result: any = await $fetch('/api/reminders', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authStore.token}`,
            'Content-Type': 'application/json',
          },
          body: data,
        })
        this.reminders.push(result.data)
        return result.data
      } catch (error: any) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteReminder(id: string) {
      try {
        const authStore = useAuthStore()
        await $fetch(`/api/reminders/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${authStore.token}` },
        })
        this.reminders = this.reminders.filter((r) => r.id !== id)
      } catch (error: any) {
        this.error = error.message
        throw error
      }
    },
  },
})
