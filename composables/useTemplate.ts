import { useTemplateStore } from '~/stores/template'

export function useTemplate() {
  const templateStore = useTemplateStore()

  const fetchTemplates = async (type?: string) => templateStore.fetchTemplates(type)
  const createTemplate = async (data: any) => templateStore.createTemplate(data)
  const deleteTemplate = async (id: string) => templateStore.deleteTemplate(id)

  return {
    templates: computed(() => templateStore.templates),
    taskTemplates: computed(() => templateStore.taskTemplates),
    projectTemplates: computed(() => templateStore.projectTemplates),
    loading: computed(() => templateStore.loading),
    error: computed(() => templateStore.error),
    fetchTemplates,
    createTemplate,
    deleteTemplate,
  }
}
