<template>
  <div v-if="isLoading" class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
      <p class="text-gray-600">Загрузка...</p>
    </div>
  </div>
  <NuxtLayout v-else>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
// Initialize auth and settings on app load
const authStore = useAuthStore()
const settingsStore = useSettingsStore()
const timeTrackingStore = useTimeTrackingStore()

const isLoading = ref(true)

// Initialize auth and wait for user data
await authStore.initAuth()

// Only fetch settings and time tracking if authenticated
if (authStore.isAuthenticated && authStore.user) {
  await Promise.all([
    settingsStore.fetchSettings(),
    timeTrackingStore.fetchActiveEntry(),
  ])
}

isLoading.value = false
</script>
