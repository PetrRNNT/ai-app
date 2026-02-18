<template>
  <!-- Показываем лоадер пока auth загружается -->
  <div v-if="loading" class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
      <p class="text-gray-600">Загрузка...</p>
    </div>
  </div>

  <!-- Показываем форму логина если не авторизован -->
  <Login v-else-if="!isAuthenticated" />

  <!-- Показываем главную если авторизован -->
  <Dashboard v-else />
</template>

<script setup lang="ts">
import Login from '~/components/auth/LoginForm.vue'
import Dashboard from '~/components/dashboard/Dashboard.vue'

const { isAuthenticated, loading } = useAuth()
</script>
