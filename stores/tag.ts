import { defineStore } from 'pinia'

interface Tag {
  id: string
  name: string
  color: string
  _count?: { tasks: number }
}

interface TagState {
  tags: Tag[]
  loading: boolean
  error: string | null
}

export const useTagStore = defineStore('tag', {
  state: (): TagState => ({
    tags: [],
    loading: false,
    error: null,
  }),

  getters: {
    allTags: (state) => state.tags,
  },

  actions: {
    async fetchTags() {
      this.loading = true
      this.error = null

      try {
        const authStore = useAuthStore()
        const data: any = await $fetch('/api/tags', {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        })

        this.tags = data.data
      } catch (error: any) {
        this.error = error.message || 'Failed to fetch tags'
      } finally {
        this.loading = false
      }
    },

    async createTag(name: string, color: string) {
      this.loading = true
      this.error = null

      try {
        const authStore = useAuthStore()
        const result: any = await $fetch('/api/tags', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authStore.token}`,
            'Content-Type': 'application/json',
          },
          body: { name, color },
        })

        this.tags.push(result.data)
        return result.data
      } catch (error: any) {
        this.error = error.message || 'Failed to create tag'
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteTag(id: string) {
      this.loading = true
      this.error = null

      try {
        const authStore = useAuthStore()
        await $fetch(`/api/tags/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        })

        this.tags = this.tags.filter((t) => t.id !== id)
      } catch (error: any) {
        this.error = error.message || 'Failed to delete tag'
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
