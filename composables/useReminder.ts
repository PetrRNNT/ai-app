import { useReminderStore } from '~/stores/reminder'

export function useReminder() {
  const reminderStore = useReminderStore()

  const fetchReminders = async () => reminderStore.fetchReminders()
  const createReminder = async (data: any) => reminderStore.createReminder(data)
  const deleteReminder = async (id: string) => reminderStore.deleteReminder(id)

  return {
    reminders: computed(() => reminderStore.reminders),
    pendingReminders: computed(() => reminderStore.pendingReminders),
    loading: computed(() => reminderStore.loading),
    error: computed(() => reminderStore.error),
    fetchReminders,
    createReminder,
    deleteReminder,
  }
}
