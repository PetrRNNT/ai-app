<template>
  <div class="register-page">
    <div class="register-container">
      <div class="register-card">
        <!-- Logo / Title -->
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-white">Enterprise TodoList</h1>
          <p class="text-gray-300 mt-2">Создайте новый аккаунт</p>
        </div>

        <!-- Register Form -->
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Name -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-200 mb-2">
              Имя
            </label>
            <input
              id="name"
              v-model="name"
              type="text"
              required
              class="input-dark"
              placeholder="Иван Иванов"
            />
          </div>

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
              minlength="6"
              class="input-dark"
              placeholder="••••••••"
            />
          </div>

          <!-- Error Message -->
          <div v-if="error" class="text-red-400 text-sm bg-red-900/30 p-3 rounded border border-red-800">
            {{ error }}
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full btn-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Регистрация...' : 'Зарегистрироваться' }}
          </button>
        </form>

        <!-- Login Link -->
        <div class="mt-6 text-center">
          <p class="text-sm text-gray-300">
            Уже есть аккаунт?
            <NuxtLink to="/login" class="text-blue-400 hover:text-blue-300 hover:underline">
              Войти
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
.register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  padding: 1rem;
}

.register-container {
  width: 100%;
  max-width: 28rem;
}

.register-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 1.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  padding: 2.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.input-dark {
  width: 100%;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
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
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

.btn-primary-dark {
  width: 100%;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: white;
  font-weight: 600;
  border-radius: 0.5rem;
  transition: all 0.3s;
  border: none;
  cursor: pointer;
}

.btn-primary-dark:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
}

.btn-primary-dark:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}
</style>
