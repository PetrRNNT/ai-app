<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-4">
            <NuxtLink to="/" class="text-blue-600 hover:underline">← Назад</NuxtLink>
            <h1 class="text-xl font-bold text-gray-900">Настройки</h1>
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
    <main class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <div v-else class="space-y-6">
        <!-- Profile Section -->
        <div class="card">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Профиль</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Имя</label>
              <input
                v-model="form.name"
                type="text"
                class="input-base"
                @change="saveSettings"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                :value="user?.email"
                type="email"
                class="input-base bg-gray-100"
                disabled
              />
            </div>
          </div>
        </div>

        <!-- Appearance -->
        <div class="card">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Внешний вид</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Тема</label>
              <select v-model="form.theme" class="input-base" @change="saveSettings">
                <option value="system">Системная</option>
                <option value="light">Светлая</option>
                <option value="dark">Тёмная</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Regional -->
        <div class="card">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Региональные настройки</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Язык</label>
              <select v-model="form.language" class="input-base" @change="saveSettings">
                <option value="ru">Русский</option>
                <option value="en">English</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Часовой пояс</label>
              <select v-model="form.timezone" class="input-base" @change="saveSettings">
                <option value="Europe/Kaliningrad">Калининград (UTC+2)</option>
                <option value="Europe/Moscow">Москва (UTC+3)</option>
                <option value="Europe/Samara">Самара (UTC+4)</option>
                <option value="Asia/Yekaterinburg">Екатеринбург (UTC+5)</option>
                <option value="Asia/Omsk">Омск (UTC+6)</option>
                <option value="Asia/Krasnoyarsk">Красноярск (UTC+7)</option>
                <option value="Asia/Irkutsk">Иркутск (UTC+8)</option>
                <option value="Asia/Yakutsk">Якутск (UTC+9)</option>
                <option value="Asia/Vladivostok">Владивосток (UTC+10)</option>
                <option value="Asia/Magadan">Магадан (UTC+11)</option>
                <option value="Asia/Kamchatka">Камчатка (UTC+12)</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Формат даты</label>
              <select v-model="form.dateFormat" class="input-base" @change="saveSettings">
                <option value="DD.MM.YYYY">ДД.ММ.ГГГГ</option>
                <option value="MM/DD/YYYY">ММ/ДД/ГГГГ</option>
                <option value="YYYY-MM-DD">ГГГГ-ММ-ДД</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Первый день недели</label>
              <select v-model.number="form.weekStart" class="input-base" @change="saveSettings">
                <option :value="1">Понедельник</option>
                <option :value="0">Воскресенье</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Pomodoro -->
        <div class="card">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Pomodoro таймер</h2>
          <div class="grid grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Работа (мин)</label>
              <input
                v-model.number="form.pomodoroWork"
                type="number"
                min="1"
                max="60"
                class="input-base"
                @change="saveSettings"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Короткий перерыв (мин)</label>
              <input
                v-model.number="form.pomodoroBreak"
                type="number"
                min="1"
                max="30"
                class="input-base"
                @change="saveSettings"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Длинный перерыв (мин)</label>
              <input
                v-model.number="form.pomodoroLong"
                type="number"
                min="1"
                max="60"
                class="input-base"
                @change="saveSettings"
              />
            </div>
          </div>
        </div>

        <!-- Save Status -->
        <div v-if="saveSuccess" class="text-green-600 text-sm bg-green-50 p-3 rounded">
          Настройки сохранены
        </div>
        <div v-if="saveError" class="text-red-600 text-sm bg-red-50 p-3 rounded">
          {{ saveError }}
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

const { user, logout } = useAuth()
const { settings, loading, fetchSettings, updateSettings } = useSettings()

const form = ref({
  name: user.value?.name || '',
  theme: 'system',
  language: 'ru',
  timezone: 'Europe/Moscow',
  dateFormat: 'DD.MM.YYYY',
  timeFormat: '24h',
  weekStart: 1,
  pomodoroWork: 25,
  pomodoroBreak: 5,
  pomodoroLong: 15,
})

const saveSuccess = ref(false)
const saveError = ref('')

onMounted(async () => {
  await fetchSettings()
  if (settings.value) {
    form.value = {
      ...form.value,
      ...settings.value,
    }
  }
})

const saveSettings = async () => {
  saveSuccess.value = false
  saveError.value = ''

  try {
    await updateSettings({
      theme: form.value.theme,
      language: form.value.language,
      timezone: form.value.timezone,
      dateFormat: form.value.dateFormat,
      weekStart: form.value.weekStart,
      pomodoroWork: form.value.pomodoroWork,
      pomodoroBreak: form.value.pomodoroBreak,
      pomodoroLong: form.value.pomodoroLong,
    })
    saveSuccess.value = true
    setTimeout(() => (saveSuccess.value = false), 3000)
  } catch (error: any) {
    saveError.value = error.message
  }
}

const handleLogout = async () => {
  await logout()
}
</script>
