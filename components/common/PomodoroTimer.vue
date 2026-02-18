<template>
  <div class="card max-w-md mx-auto">
    <h2 class="text-2xl font-bold text-center text-gray-900 mb-6">Pomodoro Таймер</h2>

    <!-- Mode Selector -->
    <div class="flex justify-center gap-2 mb-6">
      <button
        v-for="modeOption in modes"
        :key="modeOption.id"
        @click="setMode(modeOption.id)"
        :class="[
          'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
          mode === modeOption.id
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
        ]"
      >
        {{ modeOption.label }}
      </button>
    </div>

    <!-- Timer Display -->
    <div class="text-center mb-6">
      <div class="text-7xl font-bold text-gray-900 mb-4 font-mono">
        {{ formattedTime }}
      </div>

      <!-- Progress Bar -->
      <div class="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div
          class="h-2 rounded-full transition-all duration-1000"
          :class="mode === 'work' ? 'bg-blue-600' : mode === 'shortBreak' ? 'bg-green-600' : 'bg-purple-600'"
          :style="{ width: `${progress}%` }"
        ></div>
      </div>

      <!-- Controls -->
      <div class="flex justify-center gap-4">
        <button
          v-if="!isRunning"
          @click="startTimer"
          class="btn-primary px-8 py-3 text-lg"
        >
          ▶️ Старт
        </button>
        <button
          v-else
          @click="pauseTimer"
          class="btn-secondary px-8 py-3 text-lg"
        >
          ⏸️ Пауза
        </button>
        <button
          @click="resetTimer"
          class="btn-secondary px-8 py-3 text-lg"
        >
          🔄 Сброс
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="border-t pt-4">
      <div class="text-center">
        <p class="text-sm text-gray-600">Завершено помодоро</p>
        <p class="text-2xl font-bold text-blue-600">{{ completedPomodoros }}</p>
      </div>
    </div>

    <!-- Settings -->
    <div class="border-t mt-4 pt-4">
      <details class="text-sm">
        <summary class="cursor-pointer text-gray-600 hover:text-gray-900">
          ⚙️ Настройки
        </summary>
        <div class="mt-4 space-y-3">
          <div class="flex items-center justify-between">
            <label class="text-gray-700">Работа (мин)</label>
            <input
              v-model.number="workDuration"
              type="number"
              min="1"
              max="60"
              class="w-20 px-2 py-1 border rounded text-center"
              @change="updateDurations"
            />
          </div>
          <div class="flex items-center justify-between">
            <label class="text-gray-700">Короткий перерыв (мин)</label>
            <input
              v-model.number="shortBreakDuration"
              type="number"
              min="1"
              max="30"
              class="w-20 px-2 py-1 border rounded text-center"
              @change="updateDurations"
            />
          </div>
          <div class="flex items-center justify-between">
            <label class="text-gray-700">Длинный перерыв (мин)</label>
            <input
              v-model.number="longBreakDuration"
              type="number"
              min="1"
              max="60"
              class="w-20 px-2 py-1 border rounded text-center"
              @change="updateDurations"
            />
          </div>
        </div>
      </details>
    </div>
  </div>
</template>

<script setup lang="ts">
const {
  isRunning,
  mode,
  formattedTime,
  progress,
  completedPomodoros,
  startTimer,
  pauseTimer,
  resetTimer,
  setMode,
  setDurations,
} = usePomodoro()

const modes = [
  { id: 'work' as const, label: 'Работа' },
  { id: 'shortBreak' as const, label: 'Перерыв' },
  { id: 'longBreak' as const, label: 'Отдых' },
]

const workDuration = ref(25)
const shortBreakDuration = ref(5)
const longBreakDuration = ref(15)

const updateDurations = () => {
  setDurations(workDuration.value, shortBreakDuration.value, longBreakDuration.value)
}
</script>
