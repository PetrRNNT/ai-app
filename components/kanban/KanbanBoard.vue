<template>
  <div class="kanban-board">
    <div class="flex gap-4 pb-4 w-fit mx-auto">
      <KanbanColumn
        v-for="column in columns"
        :key="column.id"
        :column="column"
        :tasks="getTasksForColumn(column.id)"
        @add-task="showTaskForm = true"
        @move-task="handleMoveTask"
        @click="handleTaskClick"
        @edit="handleEditTask"
        @delete="handleDeleteRequest"
      />
    </div>
  </div>

  <!-- Loading State -->
  <div v-if="!isInitialized" class="fixed inset-0 flex items-center justify-center bg-gray-50 z-50">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p class="text-gray-600">Загрузка...</p>
    </div>
  </div>

  <!-- Edit Task Modal -->
  <TaskForm
    v-if="editingTask"
    :task="editingTask"
    :projects="projects"
    @close="editingTask = null"
    @save="saveTask"
    @delete="handleTaskDeleteRequest"
  />

  <!-- Delete Confirmation Dialog -->
  <ConfirmDialog
    v-if="showDeleteConfirm"
    title="Удалить задачу?"
    message="Вы уверены, что хотите удалить эту задачу? Это действие нельзя отменить."
    type="danger"
    confirm-text="Удалить"
    cancel-text="Отмена"
    @confirm="confirmDeleteTask"
    @cancel="showDeleteConfirm = false"
  />

  <!-- Quick Add Task Modal -->
  <div
    v-if="showTaskForm"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click="showTaskForm = false"
  >
    <div class="bg-white rounded-lg p-6 w-full max-w-md" @click.stop>
      <h3 class="text-lg font-semibold mb-4">Новая задача</h3>
      <form @submit.prevent="createNewTask">
        <input
          v-model="newTaskTitle"
          type="text"
          placeholder="Название задачи"
          class="input-base mb-4"
          autofocus
        />
        <textarea
          v-model="newTaskDescription"
          placeholder="Описание"
          class="input-base mb-4"
          rows="3"
        ></textarea>
        <select v-model="newTaskPriority" class="input-base mb-4">
          <option value="NONE">Без приоритета</option>
          <option value="LOW">Низкий</option>
          <option value="MEDIUM">Средний</option>
          <option value="HIGH">Высокий</option>
          <option value="CRITICAL">Критичный</option>
        </select>
        <div class="flex justify-end space-x-2">
          <button type="button" @click="showTaskForm = false" class="btn-secondary">
            Отмена
          </button>
          <button type="submit" class="btn-primary">Создать</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TaskWithRelations } from '~/types'
import TaskForm from '~/components/task/TaskForm.vue'
import ConfirmDialog from '~/components/common/ConfirmDialog.vue'

const { columns, tasks, loading, getTasksForColumn, fetchTasks, createTask, updateTask, deleteTask, moveTask } = useKanban()
const { projects, fetchProjects } = useProject()

const showTaskForm = ref(false)
const newTaskTitle = ref('')
const newTaskDescription = ref('')
const newTaskPriority = ref('MEDIUM')
const editingTask = ref<TaskWithRelations | null>(null)
const taskToDelete = ref<string | null>(null)
const showDeleteConfirm = ref(false)
const isInitialized = ref(false)

onMounted(async () => {
  await Promise.all([
    fetchTasks(),
    fetchProjects(),
  ])
  isInitialized.value = true
})

const handleMoveTask = async (taskId: string, status: string) => {
  await moveTask(taskId, status)
}

const handleTaskClick = (task: TaskWithRelations) => {
  editingTask.value = task
}

const handleEditTask = (task: TaskWithRelations) => {
  editingTask.value = task
}

const handleDeleteRequest = (taskId: string) => {
  taskToDelete.value = taskId
  showDeleteConfirm.value = true
}

const handleTaskDeleteRequest = (taskId: string) => {
  taskToDelete.value = taskId
  showDeleteConfirm.value = true
}

const confirmDeleteTask = async () => {
  if (taskToDelete.value) {
    await deleteTask(taskToDelete.value)
    taskToDelete.value = null
    showDeleteConfirm.value = false
    editingTask.value = null
    await fetchTasks()
  }
}

const saveTask = async (data: any) => {
  await updateTask(data)
  editingTask.value = null
  await fetchTasks()
}

const createNewTask = async () => {
  if (!newTaskTitle.value.trim()) return

  await createTask({
    title: newTaskTitle.value,
    description: newTaskDescription.value,
    priority: newTaskPriority.value as any,
    status: 'NEW',
  })

  newTaskTitle.value = ''
  newTaskDescription.value = ''
  showTaskForm.value = false
  await fetchTasks()
}
</script>

<style scoped>
.kanban-board {
  min-height: 100%;
}
</style>
