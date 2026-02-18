<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] p-4">
    <div class="w-full max-w-md">
      <div class="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/10">
        <!-- Logo / Title -->
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-white mb-2">Enterprise TodoList</h1>
          <p class="text-gray-300">Войдите в свой аккаунт</p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-200 mb-2">
              Email
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="input-dark"
              placeholder="you@example.com"
            />
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-200 mb-2">
              Пароль
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              class="input-dark"
              placeholder="••••••••"
            />
          </div>

          <!-- Error Message -->
          <div v-if="error" class="text-red-400 text-sm bg-red-900/30 p-3 rounded-lg border border-red-800">
            {{ error }}
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full btn-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Вход...' : 'Войти' }}
          </button>
        </form>

        <!-- Register Link -->
        <div class="mt-6 text-center">
          <p class="text-sm text-gray-300">
            Нет аккаунта?
            <NuxtLink to="/register" class="text-blue-400 hover:text-blue-300 hover:underline font-medium">
              Зарегистрироваться
            </NuxtLink>
          </p>
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
.input-dark {
  width: 100%;
  padding: 0.875rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  color: white;
  font-size: 1rem;
  transition: all 0.2s;
}

.input-dark::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.input-dark:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
}

.btn-primary-dark {
  width: 100%;
  padding: 0.875rem 1.5rem;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: white;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 0.75rem;
  transition: all 0.3s;
  border: none;
  cursor: pointer;
}

.btn-primary-dark:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(59, 130, 246, 0.4);
}

.btn-primary-dark:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}
</style>
