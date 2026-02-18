import { useSettingsStore } from '~/stores/settings'

export function useSettings() {
  const settingsStore = useSettingsStore()

  const fetchSettings = async () => {
    return settingsStore.fetchSettings()
  }

  const updateSettings = async (data: any) => {
    return settingsStore.updateSettings(data)
  }

  return {
    settings: computed(() => settingsStore.settings),
    theme: computed(() => settingsStore.theme),
    language: computed(() => settingsStore.language),
    pomodoroSettings: computed(() => settingsStore.pomodoroSettings),
    loading: computed(() => settingsStore.loading),
    error: computed(() => settingsStore.error),
    fetchSettings,
    updateSettings,
  }
}
