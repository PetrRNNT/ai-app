<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-4">
            <NuxtLink to="/" class="text-blue-600 hover:underline">← Назад</NuxtLink>
            <h1 class="text-xl font-bold text-gray-900">Календарь</h1>
          </div>

          <div class="flex items-center space-x-4">
            <span v-if="user" class="text-sm text-gray-600">{{ user.name }}</span>
            <button @click="handleLogout" class="text-sm text-gray-600 hover:text-gray-900">
              Выйти
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <CalendarView v-else v-model:events="events" />
    </main>
  </div>
</template>

<script setup lang="ts">
import type { CalendarEvent } from '~/types'

definePageMeta({
  middleware: ['auth'],
})

const { user, logout } = useAuth()

const events = ref<CalendarEvent[]>([])
const loading = ref(true)

onMounted(async () => {
  await fetchEvents()
})

const fetchEvents = async () => {
  loading.value = true
  try {
    const authStore = useAuthStore()
    const now = new Date()
    const start = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0)

    const data: any = await $fetch(
      `/api/calendar?start=${start.toISOString()}&end=${end.toISOString()}`,
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      }
    )

    events.value = data.data
  } catch (error) {
    console.error('Failed to fetch calendar events:', error)
  } finally {
    loading.value = false
  }
}

const handleLogout = async () => {
  await logout()
}
</script>
