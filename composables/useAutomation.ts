import { useAutomationStore } from '~/stores/automation'

export function useAutomation() {
  const automationStore = useAutomationStore()

  const fetchAutomations = async () => automationStore.fetchAutomations()
  const createAutomation = async (data: any) => automationStore.createAutomation(data)
  const deleteAutomation = async (id: string) => automationStore.deleteAutomation(id)
  const toggleAutomation = async (id: string, isActive: boolean) =>
    automationStore.toggleAutomation(id, isActive)

  return {
    automations: computed(() => automationStore.automations),
    activeAutomations: computed(() => automationStore.activeAutomations),
    loading: computed(() => automationStore.loading),
    error: computed(() => automationStore.error),
    fetchAutomations,
    createAutomation,
    deleteAutomation,
    toggleAutomation,
  }
}
