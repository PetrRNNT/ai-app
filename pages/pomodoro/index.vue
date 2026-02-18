<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-4">
            <NuxtLink to="/" class="text-blue-600 hover:underline">← Назад</NuxtLink>
            <h1 class="text-xl font-bold text-gray-900">Pomodoro</h1>
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
      <PomodoroTimer />
    </main>
  </div>
</template>

<script setup lang="ts">
import PomodoroTimer from '~/components/common/PomodoroTimer.vue'

definePageMeta({
  middleware: ['auth'],
})

const { user, logout } = useAuth()

const handleLogout = async () => {
  await logout()
}
</script>
