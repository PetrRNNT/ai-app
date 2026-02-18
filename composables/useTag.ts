import { useTagStore } from '~/stores/tag'

export function useTag() {
  const tagStore = useTagStore()

  const fetchTags = async () => {
    return tagStore.fetchTags()
  }

  const createTag = async (name: string, color: string) => {
    return tagStore.createTag(name, color)
  }

  const deleteTag = async (id: string) => {
    return tagStore.deleteTag(id)
  }

  return {
    tags: computed(() => tagStore.tags),
    loading: computed(() => tagStore.loading),
    error: computed(() => tagStore.error),
    fetchTags,
    createTag,
    deleteTag,
  }
}
