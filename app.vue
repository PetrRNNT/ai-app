<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
// Initialize auth and settings on app load
const authStore = useAuthStore()
const settingsStore = useSettingsStore()
const timeTrackingStore = useTimeTrackingStore()

// Initialize auth and wait for user data
await authStore.initAuth()

// Only fetch settings and time tracking if authenticated
if (authStore.isAuthenticated && authStore.user) {
  await Promise.all([
    settingsStore.fetchSettings(),
    timeTrackingStore.fetchActiveEntry(),
  ])
}
</script>
