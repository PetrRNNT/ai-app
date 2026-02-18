<template>
  <div class="login-page">
    <div class="login-container">
      <div class="max-w-md w-full space-y-8">
        <!-- Logo / Title -->
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-900">Enterprise TodoList</h1>
          <p class="text-gray-600 mt-2">Создайте новый аккаунт</p>
        </div>

        <!-- Register Form -->
        <div class="bg-white rounded-lg shadow-xl p-8">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Name -->
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                Имя
              </label>
              <input
                id="name"
                v-model="name"
                type="text"
                required
                class="input-base"
                placeholder="Иван Иванов"
              />
            </div>

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
                minlength="6"
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
              {{ loading ? 'Регистрация...' : 'Зарегистрироваться' }}
            </button>
          </form>

          <!-- Login Link -->
          <div class="mt-6 text-center">
            <p class="text-sm text-gray-600">
              Уже есть аккаунт?
              <NuxtLink to="/login" class="text-blue-600 hover:underline">
                Войти
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  auth: false,
})

const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const { register } = useAuth()
const router = useRouter()

const handleSubmit = async () => {
  error.value = ''
  loading.value = true

  const result = await register(email.value, name.value, password.value)

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
  background-color: #f3f4f6;
  padding: 2rem 1rem;
}

.login-container {
  width: 100%;
  max-width: 28rem;
}
</style>
