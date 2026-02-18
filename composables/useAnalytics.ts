import { useAnalyticsStore } from '~/stores/analytics'

export function useAnalytics() {
  const analyticsStore = useAnalyticsStore()

  const fetchStats = async () => {
    return analyticsStore.fetchStats()
  }

  return {
    stats: computed(() => analyticsStore.stats),
    loading: computed(() => analyticsStore.loading),
    error: computed(() => analyticsStore.error),
    fetchStats,
  }
}
