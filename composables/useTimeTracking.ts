import { useTimeTrackingStore } from '~/stores/timeTracking'

export function useTimeTracking() {
  const timeTrackingStore = useTimeTrackingStore()

  const startTracking = async (taskId: string, description?: string) => {
    return timeTrackingStore.startTracking(taskId, description)
  }

  const stopTracking = async () => {
    return timeTrackingStore.stopTracking()
  }

  const fetchEntries = async (taskId?: string) => {
    return timeTrackingStore.fetchEntries(taskId)
  }

  const fetchActiveEntry = async () => {
    return timeTrackingStore.fetchActiveEntry()
  }

  return {
    activeEntry: computed(() => timeTrackingStore.activeEntry),
    entries: computed(() => timeTrackingStore.entries),
    isTracking: computed(() => timeTrackingStore.isTracking),
    elapsedTime: computed(() => timeTrackingStore.elapsedTime),
    loading: computed(() => timeTrackingStore.loading),
    error: computed(() => timeTrackingStore.error),
    startTracking,
    stopTracking,
    fetchEntries,
    fetchActiveEntry,
  }
}
