<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-card">
        <!-- Logo / Title -->
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-gray-900">Enterprise TodoList</h1>
          <p class="text-gray-600 mt-2">Войдите в свой аккаунт</p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="input-base"
              placeholder="you@example.com"
            />
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Пароль
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              class="input-base"
              placeholder="••••••••"
            />
          </div>

          <!-- Error Message -->
          <div v-if="error" class="text-red-600 text-sm bg-red-50 p-3 rounded">
            {{ error }}
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Вход...' : 'Войти' }}
          </button>
        </form>

        <!-- Register Link -->
        <div v-if="false" class="mt-6 text-center">
          <p class="text-sm text-gray-600">
            Нет аккаунта?
            <NuxtLink to="/register" class="text-blue-600 hover:underline">
              Зарегистрироваться
            </NuxtLink>
          </p>
        </div>

        <!-- Demo Credentials -->
        <div v-if="false" class="mt-6 p-4 bg-blue-50 rounded-lg">
          <p class="text-sm font-medium text-blue-900 mb-2">Демо доступ:</p>
          <p class="text-sm text-blue-700">Email: admin@example.com</p>
          <p class="text-sm text-blue-700">Пароль: admin123</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  auth: false,
})

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const { login } = useAuth()
const router = useRouter()

const handleSubmit = async () => {
  error.value = ''
  loading.value = true

  const result = await login(email.value, password.value)

  loading.value = false

  if (result.success) {
    router.push('/')
  } else {
    error.value = result.error
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem;
}

.login-container {
  width: 100%;
  max-width: 28rem;
}

.login-card {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 2.5rem;
}
</style>
