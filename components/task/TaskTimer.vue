<template>
  <div class="flex items-center gap-2">
    <button
      v-if="!isTracking"
      @click="handleStart"
      class="px-3 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors flex items-center gap-1"
      :disabled="loading"
    >
      ▶️ Старт
    </button>
    <button
      v-else
      @click="handleStop"
      class="px-3 py-1.5 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors flex items-center gap-1"
      :disabled="loading"
    >
      ⏹️ Стоп
    </button>

    <span v-if="isTracking || totalTime > 0" class="text-sm font-mono text-gray-600">
      {{ formattedTime }}
    </span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  taskId: string
}>()

const { isTracking, elapsedTime, startTracking, stopTracking, loading } = useTimeTracking()

let timerInterval: ReturnType<typeof setInterval> | null = null

const formattedTime = computed(() => {
  const seconds = elapsedTime.value
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  return `${mins}:${secs.toString().padStart(2, '0')}`
})

const totalTime = ref(0)

const handleStart = async () => {
  await startTracking(props.taskId)
  startTimer()
}

const handleStop = async () => {
  await stopTracking()
  stopTimer()
}

const startTimer = () => {
  if (timerInterval) return
  timerInterval = setInterval(() => {
    // Timer updates automatically via elapsedTime getter
  }, 1000)
}

const stopTimer = () => {
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }
}

onUnmounted(() => {
  stopTimer()
})

// Check if this task has active tracking
onMounted(async () => {
  // Timer will update automatically
})
</script>
