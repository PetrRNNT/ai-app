<template>
  <div class="space-y-6">
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="card">
        <div class="text-sm text-gray-500 mb-1">Всего задач</div>
        <div class="text-3xl font-bold text-gray-900">{{ stats?.totalTasks || 0 }}</div>
      </div>
      <div class="card">
        <div class="text-sm text-gray-500 mb-1">Завершено</div>
        <div class="text-3xl font-bold text-green-600">{{ stats?.completedTasks || 0 }}</div>
      </div>
      <div class="card">
        <div class="text-sm text-gray-500 mb-1">Процент завершения</div>
        <div class="text-3xl font-bold text-blue-600">{{ stats?.completionRate || 0 }}%</div>
      </div>
      <div class="card">
        <div class="text-sm text-gray-500 mb-1">Ср. время выполнения</div>
        <div class="text-3xl font-bold text-purple-600">{{ stats?.avgCompletionTime || 0 }}ч</div>
      </div>
    </div>

    <!-- Charts Row 1 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Tasks by Status -->
      <div class="card">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Задачи по статусам</h3>
        <div class="space-y-3">
          <div
            v-for="(count, status) in stats?.tasksByStatus"
            :key="status"
            class="flex items-center justify-between"
          >
            <span class="text-sm text-gray-600">{{ getStatusLabel(status) }}</span>
            <div class="flex items-center gap-3">
              <div class="w-32 bg-gray-200 rounded-full h-2">
                <div
                  class="h-2 rounded-full"
                  :class="getStatusColor(status)"
                  :style="{ width: `${getPercentage(count, stats?.totalTasks)}%` }"
                ></div>
              </div>
              <span class="text-sm font-medium text-gray-900 w-8 text-right">{{ count }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Tasks by Priority -->
      <div class="card">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Задачи по приоритетам</h3>
        <div class="space-y-3">
          <div
            v-for="(count, priority) in stats?.tasksByPriority"
            :key="priority"
            class="flex items-center justify-between"
          >
            <span class="text-sm text-gray-600">{{ getPriorityLabel(priority) }}</span>
            <div class="flex items-center gap-3">
              <div class="w-32 bg-gray-200 rounded-full h-2">
                <div
                  class="h-2 rounded-full"
                  :class="getPriorityColor(priority)"
                  :style="{ width: `${getPercentage(count, stats?.totalTasks)}%` }"
                ></div>
              </div>
              <span class="text-sm font-medium text-gray-900 w-8 text-right">{{ count }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tasks Completed by Day -->
    <div class="card">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Завершено задач за последние 7 дней</h3>
      <div class="h-48 flex items-end justify-between gap-2">
        <div
          v-for="(day, index) in stats?.tasksCompletedByDay"
          :key="index"
          class="flex-1 flex flex-col items-center gap-2"
        >
          <div
            class="w-full bg-blue-500 rounded-t transition-all hover:bg-blue-600"
            :style="{ height: `${getBarHeight(day.count)}%` }"
          ></div>
          <span class="text-xs text-gray-600">{{ day.date }}</span>
        </div>
      </div>
    </div>

    <!-- Time Tracking -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="card">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Учёт времени</h3>
        <div class="text-center py-8">
          <div class="text-4xl font-bold text-blue-600 mb-2">
            {{ formatTime(stats?.timeTracked || 0) }}
          </div>
          <p class="text-sm text-gray-500">всего отслежено за 30 дней</p>
        </div>
      </div>

      <div class="card">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">План vs Факт</h3>
        <div class="space-y-4">
          <div>
            <div class="flex justify-between text-sm mb-1">
              <span class="text-gray-600">Оценено</span>
              <span class="font-medium">{{ formatTime(stats?.estimatedVsActual?.estimated || 0) }}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-3">
              <div
                class="bg-blue-500 h-3 rounded-full"
                :style="{ width: getEstimatedPercentage() }"
              ></div>
            </div>
          </div>
          <div>
            <div class="flex justify-between text-sm mb-1">
              <span class="text-gray-600">Фактически</span>
              <span class="font-medium">{{ formatTime(stats?.estimatedVsActual?.actual || 0) }}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-3">
              <div
                class="bg-green-500 h-3 rounded-full"
                :style="{ width: getActualPercentage() }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  stats: any
}>()

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    NEW: 'Новые',
    IN_PROGRESS: 'В процессе',
    PAUSED: 'На паузе',
    WAITING: 'Ожидание',
    COMPLETED: 'Завершено',
    CANCELLED: 'Отменено',
    ARCHIVED: 'Архив',
  }
  return labels[status] || status
}

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    NEW: 'bg-blue-500',
    IN_PROGRESS: 'bg-yellow-500',
    PAUSED: 'bg-gray-500',
    WAITING: 'bg-purple-500',
    COMPLETED: 'bg-green-500',
    CANCELLED: 'bg-red-500',
    ARCHIVED: 'bg-gray-400',
  }
  return colors[status] || 'bg-gray-500'
}

const getPriorityLabel = (priority: string) => {
  const labels: Record<string, string> = {
    CRITICAL: 'Критичный',
    HIGH: 'Высокий',
    MEDIUM: 'Средний',
    LOW: 'Низкий',
    NONE: 'Без приоритета',
  }
  return labels[priority] || priority
}

const getPriorityColor = (priority: string) => {
  const colors: Record<string, string> = {
    CRITICAL: 'bg-red-600',
    HIGH: 'bg-red-500',
    MEDIUM: 'bg-yellow-500',
    LOW: 'bg-green-500',
    NONE: 'bg-gray-400',
  }
  return colors[priority] || 'bg-gray-500'
}

const getPercentage = (value: number, total: number) => {
  if (!total) return 0
  return Math.round((value / total) * 100)
}

const getBarHeight = (count: number) => {
  const maxCount = Math.max(...(props.stats?.tasksCompletedByDay?.map((d: any) => d.count) || [1]))
  if (!maxCount) return 0
  return Math.max(10, (count / maxCount) * 100)
}

const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  if (hours > 0) {
    return `${hours}ч ${minutes}м`
  }
  return `${minutes}м`
}

const getMaxTime = () => {
  const estimated = props.stats?.estimatedVsActual?.estimated || 0
  const actual = props.stats?.estimatedVsActual?.actual || 0
  return Math.max(estimated, actual, 1)
}

const getEstimatedPercentage = () => {
  const max = getMaxTime()
  const estimated = props.stats?.estimatedVsActual?.estimated || 0
  return `${(estimated / max) * 100}%`
}

const getActualPercentage = () => {
  const max = getMaxTime()
  const actual = props.stats?.estimatedVsActual?.actual || 0
  return `${(actual / max) * 100}%`
}
</script>
