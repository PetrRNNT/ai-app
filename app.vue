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

// Initialize auth immediately
await authStore.initAuth()

// Only fetch settings and time tracking if authenticated
if (authStore.isAuthenticated && authStore.token) {
  await Promise.all([
    settingsStore.fetchSettings(),
    timeTrackingStore.fetchActiveEntry(),
  ])
}
</script>
