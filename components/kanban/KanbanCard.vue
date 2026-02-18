<template>
  <div
    class="bg-white rounded-lg shadow p-3 mb-2 cursor-pointer hover:shadow-md transition-shadow"
    @click="$emit('click', task)"
  >
    <div class="flex items-start justify-between mb-2">
      <h4 class="font-medium text-gray-900 text-sm line-clamp-2">{{ task.title }}</h4>
      <div class="flex items-center gap-1 flex-shrink-0 ml-2">
        <button
          @click.stop="$emit('edit', task)"
          class="text-gray-400 hover:text-blue-600"
          title="Редактировать"
        >
          ✏️
        </button>
        <button
          @click.stop="$emit('delete', task.id)"
          class="text-gray-400 hover:text-red-600"
          title="Удалить"
        >
          🗑️
        </button>
      </div>
    </div>

    <p v-if="task.description" class="text-xs text-gray-600 mb-2 line-clamp-2">
      {{ task.description }}
    </p>

    <!-- Project Badge -->
    <div v-if="task.project" class="mb-2">
      <span
        class="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full font-medium"
        :style="{ 
          backgroundColor: task.project.color + '20',
          color: task.project.color || '#3B82F6'
        }"
        :title="task.project.name"
      >
        <span
          v-if="task.project.color"
          class="w-2 h-2 rounded-full"
          :style="{ backgroundColor: task.project.color }"
        ></span>
        {{ task.project.name }}
      </span>
    </div>

    <div class="flex items-center gap-2 flex-wrap">
      <span
        :class="[
          'px-2 py-0.5 text-xs rounded',
          task.priority === 'CRITICAL'
            ? 'bg-red-600 text-white'
            : task.priority === 'HIGH'
            ? 'bg-red-100 text-red-800'
            : task.priority === 'MEDIUM'
            ? 'bg-yellow-100 text-yellow-800'
            : task.priority === 'LOW'
            ? 'bg-green-100 text-green-800'
            : 'bg-gray-100 text-gray-800',
        ]"
      >
        {{ task.priority }}
      </span>

      <span v-if="task.isImportant" class="text-red-500 text-xs" title="Важное">🔴</span>
      <span v-if="task.isUrgent" class="text-orange-500 text-xs" title="Срочное">⚡</span>

      <span v-if="task.dueDate" class="text-xs text-gray-500">
        📅 {{ formatDate(task.dueDate) }}
      </span>

      <span v-if="task.estimatedTime" class="text-xs text-gray-500">
        ⏱️ {{ task.estimatedTime }}м
      </span>
    </div>

    <div v-if="task.tags?.length" class="flex gap-1 mt-2 flex-wrap">
      <span
        v-for="tagTask in task.tags"
        :key="tagTask.tagId"
        class="px-2 py-0.5 text-xs rounded text-white"
        :style="{ backgroundColor: tagTask.tag.color }"
      >
        {{ tagTask.tag.name }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TaskWithRelations } from '~/types'

defineProps<{
  task: TaskWithRelations
}>()

defineEmits<{
  click: [task: TaskWithRelations]
  edit: [task: TaskWithRelations]
  delete: [taskId: string]
}>()

const formatDate = (dateString: string | Date) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })
}
</script>
