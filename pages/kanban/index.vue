<template>
  <div class="kanban-page">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b flex-shrink-0">
      <div class="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-4">
            <NuxtLink to="/" class="text-blue-600 hover:underline">← Назад</NuxtLink>
            <h1 class="text-xl font-bold text-gray-900">Kanban доска</h1>
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
    <main class="flex-1 overflow-x-auto p-6">
      <div class="h-full flex items-start justify-center">
        <KanbanBoard />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

const { user, logout } = useAuth()

const handleLogout = async () => {
  await logout()
}
</script>

<style scoped>
.kanban-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f3f4f6;
}
</style>
