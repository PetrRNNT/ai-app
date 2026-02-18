<template>
  <div class="kanban-column">
    <!-- Column Header -->
    <div class="flex items-center justify-between mb-3">
      <div class="flex items-center gap-2">
        <span :class="`w-3 h-3 rounded-full ${column.color}`"></span>
        <h3 class="font-semibold text-gray-700">{{ column.title }}</h3>
        <span class="text-xs text-gray-500 bg-white/50 px-2 py-0.5 rounded-full">
          {{ tasks.length }}
        </span>
      </div>
      <button
        @click="$emit('add-task')"
        class="text-gray-400 hover:text-gray-600 text-lg"
        title="Добавить задачу"
      >
        +
      </button>
    </div>

    <!-- Tasks -->
    <div
      class="space-y-2 min-h-[500px] max-h-[calc(100vh-250px)] overflow-y-auto p-2"
      @dragover.prevent="onDragOver"
      @drop="onDrop"
    >
      <KanbanCard
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        draggable="true"
        @click="$emit('click', task)"
        @delete="$emit('delete', $event)"
        @dragstart="onDragStart($event, task)"
      />
      
      <!-- Drop Zone Indicator -->
      <div
        v-if="tasks.length === 0"
        class="h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-sm"
      >
        Перетащите задачу сюда
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TaskWithRelations } from '~/types'

interface Column {
  id: string
  title: string
  color: string
}

const props = defineProps<{
  column: Column
  tasks: TaskWithRelations[]
}>()

const emit = defineEmits<{
  'add-task': []
  'move-task': [taskId: string, status: string]
  'click': [task: TaskWithRelations]
  'delete': [taskId: string]
}>()

const onDragStart = (event: DragEvent, task: TaskWithRelations) => {
  event.dataTransfer?.setData('taskId', task.id)
  event.dataTransfer?.setData('fromStatus', task.status || '')
}

const onDrop = (event: DragEvent) => {
  event.preventDefault()
  const taskId = event.dataTransfer?.getData('taskId')
  const fromStatus = event.dataTransfer?.getData('fromStatus')

  if (taskId && fromStatus !== props.column.id) {
    emit('move-task', taskId, props.column.id)
  }
}

// Prevent default drag behaviors
const onDragOver = (event: DragEvent) => {
  event.preventDefault()
}
</script>

<style scoped>
.kanban-column {
    background: linear-gradient(
    145deg, 
    rgba(215, 205, 215, 0.5) 0%, 
    rgba(248, 249, 250, 0.9) 100%
  );
  backdrop-filter: blur(1px);
  border-radius: 12px;
  padding: 8px;
  min-width: 280px;
  max-width: 280px;
  box-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.05),
    0 1px 2px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.04);
  transition: box-shadow 0.2s ease;
}

.kanban-column:hover {
  box-shadow: 
    0 4px 6px rgba(0, 0, 0, 0.05),
    0 4px 12px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

.kanban-column h3 {
  font-weight: 600;
  font-size: 14px;
  letter-spacing: -0.01em;
}

/* Custom scrollbar */
.kanban-column ::-webkit-scrollbar {
  width: 6px;
}

.kanban-column ::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.02);
  border-radius: 3px;
}

.kanban-column ::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
}

.kanban-column ::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.2);
}
</style>
