<template>
  <div class="mt-2 ml-8 space-y-2">
    <div class="flex items-center gap-2">
      <button
        @click="showAddSubtask = !showAddSubtask"
        class="text-sm text-blue-600 hover:text-blue-800"
      >
        + Подзадача
      </button>
    </div>

    <div v-if="showAddSubtask" class="flex gap-2">
      <input
        v-model="newSubtaskTitle"
        type="text"
        placeholder="Название подзадачи"
        class="input-base text-sm flex-1"
        @keyup.enter="createSubtask"
      />
      <button @click="createSubtask" class="btn-primary text-sm">
        Создать
      </button>
      <button @click="showAddSubtask = false" class="btn-secondary text-sm">
        Отмена
      </button>
    </div>

    <div v-if="subtasks.length > 0" class="space-y-1">
      <div
        v-for="subtask in subtasks"
        :key="subtask.id"
        class="flex items-center gap-2 p-2 bg-gray-50 rounded hover:bg-gray-100"
      >
        <input
          type="checkbox"
          :checked="subtask.status === 'COMPLETED'"
          @change="toggleSubtask(subtask)"
          class="h-4 w-4 rounded border-gray-300 text-blue-600"
        />
        <span
          :class="{ 'line-through text-gray-400': subtask.status === 'COMPLETED' }"
          class="flex-1 text-sm"
        >
          {{ subtask.title }}
        </span>
        <button
          @click="deleteSubtask(subtask.id)"
          class="text-gray-400 hover:text-red-600 text-sm"
        >
          🗑️
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '@prisma/client'

const props = defineProps<{
  taskId: string
  subtasks: Task[]
}>()

const emit = defineEmits<{
  'create': [title: string]
  'update': [task: Partial<Task> & { id: string }]
  'delete': [taskId: string]
}>()

const showAddSubtask = ref(false)
const newSubtaskTitle = ref('')

const createSubtask = async () => {
  if (!newSubtaskTitle.value.trim()) return

  emit('create', newSubtaskTitle.value)
  newSubtaskTitle.value = ''
  showAddSubtask.value = false
}

const toggleSubtask = async (subtask: Task) => {
  const newStatus = subtask.status === 'COMPLETED' ? 'NEW' : 'COMPLETED'
  emit('update', { id: subtask.id, status: newStatus })
}

const deleteSubtask = async (taskId: string) => {
  if (confirm('Удалить эту подзадачу?')) {
    emit('delete', taskId)
  }
}
</script>
