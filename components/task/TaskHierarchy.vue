<template>
  <div class="space-y-2">
    <div
      v-for="task in tasks"
      :key="task.id"
      class="border rounded-lg overflow-hidden"
    >
      <!-- Parent Task -->
      <div
        class="p-3 bg-gray-50 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
        @click="toggleExpand(task.id)"
      >
        <div class="flex items-center gap-3 flex-1">
          <button
            v-if="task.children?.length || task._count?.children > 0"
            class="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-gray-700"
          >
            {{ expandedTasks.has(task.id) ? '▼' : '▶' }}
          </button>
          <span v-else class="w-5"></span>

          <input
            type="checkbox"
            :checked="task.status === 'COMPLETED'"
            @change.stop="toggleTask(task)"
            class="h-4 w-4 rounded border-gray-300 text-blue-600"
          />

          <span :class="{ 'line-through text-gray-400': task.status === 'COMPLETED' }">
            {{ task.title }}
          </span>

          <span
            v-if="task.isImportant"
            class="text-red-500 text-xs"
            title="Важное"
          >
            🔴
          </span>

          <!-- Project Badge -->
          <span
            v-if="task.project"
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

        <div class="flex items-center gap-2">
          <span
            :class="[
              'px-2 py-0.5 text-xs rounded',
              task.priority === 'HIGH'
                ? 'bg-red-100 text-red-800'
                : task.priority === 'MEDIUM'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-gray-100 text-gray-800',
            ]"
          >
            {{ task.priority }}
          </span>
          <button
            @click.stop="deleteTaskById(task.id)"
            class="text-gray-400 hover:text-red-600"
          >
            🗑️
          </button>
        </div>
      </div>

      <!-- Children Tasks -->
      <div
        v-if="expandedTasks.has(task.id) && (task.children?.length || task._count?.children > 0)"
        class="border-t bg-white"
      >
        <TaskHierarchy
          :tasks="(task.children || []) as any[]"
          :level="level + 1"
          @toggle-task="$emit('toggle-task', $event)"
          @delete-task="$emit('delete-task', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TaskWithRelations } from '~/types'

defineProps<{
  tasks: (TaskWithRelations & { _count?: { children: number } })[]
  level?: number
}>()

defineEmits<{
  'toggle-task': [task: any]
  'delete-task': [taskId: string]
}>()

const expandedTasks = ref(new Set<string>())

const toggleExpand = (taskId: string) => {
  if (expandedTasks.value.has(taskId)) {
    expandedTasks.value.delete(taskId)
  } else {
    expandedTasks.value.add(taskId)
  }
}

const toggleTask = (task: any) => {
  // Emit to parent to handle task toggle
}

const deleteTaskById = (taskId: string) => {
  // Emit to parent to handle task deletion
}
</script>

<style scoped>
.task-children {
  margin-left: 1.5rem;
}
</style>
