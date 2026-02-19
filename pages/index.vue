<template>
  <!-- Показываем лоадер пока auth загружается -->
  <div v-if="loading" class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
      <p class="text-gray-600">Загрузка...</p>
    </div>
  </div>

  <!-- Показываем форму логина если не авторизован -->
  <div v-else-if="!isAuthenticated" class="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] p-4">
    <div class="w-full max-w-md">
      <div class="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/10">
        <!-- Logo / Title -->
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-white mb-2">Enterprise TodoList</h1>
          <p class="text-gray-300">Войдите в свой аккаунт</p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-200 mb-2">
              Email
            </label>
            <input
              id="email"
              v-model="loginEmail"
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
              v-model="loginPassword"
              type="password"
              required
              class="input-dark"
              placeholder="••••••••"
            />
          </div>

          <!-- Error Message -->
          <div v-if="loginError" class="text-red-400 text-sm bg-red-900/30 p-3 rounded-lg border border-red-800">
            {{ loginError }}
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loginLoading"
            class="w-full btn-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loginLoading ? 'Вход...' : 'Войти' }}
          </button>
        </form>

        <!-- Register Link -->
        <div class="mt-6 text-center">
          <p class="text-sm text-gray-300">
            Нет аккаунта?
            <NuxtLink to="/register" class="text-blue-400 hover:text-blue-300 hover:underline font-medium">
              Зарегистрироваться
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Показываем главную если авторизован -->
  <div v-else class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <h1 class="text-xl font-bold text-blue-600">Enterprise TodoList</h1>
          </div>

          <!-- Navigation -->
          <nav class="flex space-x-1">
            <NuxtLink
              to="/"
              class="px-3 py-2 rounded-md text-sm font-medium text-blue-600 bg-blue-50"
            >
              Задачи
            </NuxtLink>
            <NuxtLink
              to="/projects"
              class="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              Проекты
            </NuxtLink>
            <NuxtLink
              to="/kanban"
              class="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              Канбан
            </NuxtLink>
            <NuxtLink
              to="/calendar"
              class="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              Календарь
            </NuxtLink>
            <NuxtLink
              to="/analytics"
              class="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              Аналитика
            </NuxtLink>
            <NuxtLink
              to="/pomodoro"
              class="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              Помодоро
            </NuxtLink>
          </nav>

          <!-- Right side -->
          <div class="flex items-center space-x-4">
            <span v-if="user" class="text-sm text-gray-600">{{ user.name }}</span>
            <button
              @click="handleLogout"
              class="text-sm text-gray-600 hover:text-gray-900"
            >
              Выйти
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Welcome Card -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">
          Добро пожаловать! 👋
        </h2>
        <p class="text-gray-600">
          Это ваше рабочее пространство для управления задачами.
        </p>
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-white rounded-lg shadow p-4">
          <div class="text-sm text-gray-500">Всего задач</div>
          <div class="text-2xl font-bold text-gray-900">{{ tasks.length }}</div>
        </div>
        <div class="bg-white rounded-lg shadow p-4">
          <div class="text-sm text-gray-500">В процессе</div>
          <div class="text-2xl font-bold text-blue-600">{{ pendingTasks.length }}</div>
        </div>
        <div class="bg-white rounded-lg shadow p-4">
          <div class="text-sm text-gray-500">Завершено</div>
          <div class="text-2xl font-bold text-green-600">{{ completedTasks.length }}</div>
        </div>
        <div class="bg-white rounded-lg shadow p-4">
          <div class="text-sm text-gray-500">Важные</div>
          <div class="text-2xl font-bold text-red-600">{{ importantTasks.length }}</div>
        </div>
      </div>

      <!-- Tasks Section -->
      <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 class="text-lg font-semibold text-gray-900">Задачи</h3>
          <button @click="showQuickAdd = true" class="btn-primary">
            + Новая задача
          </button>
        </div>

        <div v-if="tasksLoading" class="px-6 py-8 text-center">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>

        <div v-else-if="tasks.length === 0" class="px-6 py-8 text-center text-gray-500">
          Нет задач. Создайте первую задачу!
        </div>

        <div v-else class="divide-y">
          <div
            v-for="task in tasks"
            :key="task.id"
            class="px-6 py-4 hover:bg-gray-50 flex items-center justify-between"
          >
            <div class="flex items-center space-x-3 flex-1">
              <input
                type="checkbox"
                :checked="task.status === 'COMPLETED'"
                @change="toggleTask(task)"
                class="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div class="flex-1 cursor-pointer" @click="editTask(task)">
                <div class="flex items-center gap-2 mb-1 flex-wrap">
                  <p
                    :class="[
                      'font-medium',
                      task.status === 'COMPLETED' ? 'line-through text-gray-400' : 'text-gray-900',
                    ]"
                  >
                    {{ task.title }}
                  </p>
                  <span
                    :class="[
                      'px-2 py-0.5 text-xs rounded',
                      task.status === 'COMPLETED'
                        ? 'bg-green-100 text-green-800'
                        : task.status === 'IN_PROGRESS'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800',
                    ]"
                    :title="getStatusLabel(task.status)"
                  >
                    {{ getStatusLabel(task.status) }}
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
                <p v-if="task.description" class="text-sm text-gray-500 truncate max-w-md mb-2">
                  {{ task.description }}
                </p>
                <div class="flex items-center gap-3 flex-wrap">
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
                  <span v-if="task.isImportant" class="text-red-500 text-xs" title="Важное">🔴 Важное</span>
                  <span v-if="task.isUrgent" class="text-orange-500 text-xs" title="Срочное">⚡ Срочное</span>
                  <span v-if="task.dueDate" class="text-xs text-gray-500" title="Срок">
                    📅 {{ formatDate(task.dueDate) }}
                  </span>
                  <span v-if="task.estimatedTime" class="text-xs text-gray-500" title="Оценка времени">
                    ⏱️ {{ task.estimatedTime }}м
                  </span>
                </div>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <button
                @click="editTask(task)"
                class="text-gray-400 hover:text-blue-600"
                title="Редактировать"
              >
                ✏️
              </button>
              <button
                @click="handleTaskDeleteRequest(task.id)"
                class="text-gray-400 hover:text-red-600"
                title="Удалить"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Quick Add Modal -->
    <div
      v-if="showQuickAdd"
      class="fixed inset-0 bg-[linear-gradient(145deg,rgba(0,0,0,0.5)_0%,rgb(107,19,188,0.4)_100%)] backdrop-blur-[1px] bg-opacity-50 flex items-center justify-center z-50"
      @click="showQuickAdd = false"
    >
      <div
        class="bg-white rounded-lg p-6 w-full max-w-md"
        @click.stop
      >
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
            placeholder="Описание (необязательно)"
            class="input-base mb-4"
            rows="3"
          ></textarea>

          <!-- Project Selection -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Проект</label>
            <select v-model="newTaskProjectId" class="input-base">
              <option value="">Без проекта</option>
              <option
                v-for="project in projects"
                :key="project.id"
                :value="project.id"
              >
                {{ project.name }}
              </option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Приоритет</label>
            <select v-model="newTaskPriority" class="input-base">
              <option value="NONE">Без приоритета</option>
              <option value="LOW">Низкий</option>
              <option value="MEDIUM" selected>Средний</option>
              <option value="HIGH">Высокий</option>
              <option value="CRITICAL">Критичный</option>
            </select>
          </div>
          <div class="flex justify-end space-x-2">
            <button type="button" @click="showQuickAdd = false" class="btn-secondary">
              Отмена
            </button>
            <button type="submit" class="btn-primary">Создать</button>
          </div>
        </form>
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
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import TaskForm from '~/components/task/TaskForm.vue'
import ConfirmDialog from '~/components/common/ConfirmDialog.vue'
import type { TaskWithRelations } from '~/types'

const authStore = useAuthStore()
const { user, isAuthenticated, loading } = storeToRefs(authStore)
const { logout } = authStore

const { tasks, pendingTasks, completedTasks, importantTasks, loading: tasksLoading, fetchTasks, createTask, updateTask, deleteTask } = useTask()
const { projects, fetchProjects } = useProject()

// Login state
const loginEmail = ref('')
const loginPassword = ref('')
const loginError = ref('')
const loginLoading = ref(false)

// UI state
const showQuickAdd = ref(false)
const editingTask = ref<TaskWithRelations | null>(null)
const newTaskTitle = ref('')
const newTaskDescription = ref('')
const newTaskPriority = ref('MEDIUM')
const newTaskProjectId = ref('')
const taskToDelete = ref<string | null>(null)
const showDeleteConfirm = ref(false)

onMounted(async () => {
  if (isAuthenticated.value) {
    await Promise.all([
      fetchTasks(),
      fetchProjects(),
    ])
  }
})

const handleLogin = async () => {
  loginError.value = ''
  loginLoading.value = true

  const result = await useAuth().login(loginEmail.value, loginPassword.value)

  loginLoading.value = false

  if (!result.success) {
    loginError.value = result.error
  }
}

const handleLogout = async () => {
  await logout()
}

const toggleTask = async (task: any) => {
  const newStatus = task.status === 'COMPLETED' ? 'NEW' : 'COMPLETED'
  await updateTask({ id: task.id, status: newStatus })
  await fetchTasks()
}

const editTask = (task: TaskWithRelations) => {
  editingTask.value = task
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
    priority: newTaskPriority.value,
    projectId: newTaskProjectId.value || undefined,
  })

  newTaskTitle.value = ''
  newTaskDescription.value = ''
  newTaskPriority.value = 'MEDIUM'
  newTaskProjectId.value = ''
  showQuickAdd.value = false
  await fetchTasks()
}

const handleTaskDeleteRequest = (taskId: string) => {
  taskToDelete.value = taskId
  showDeleteConfirm.value = true
}

const confirmDeleteTask = async () => {
  if (taskToDelete.value) {
    await deleteTask(taskToDelete.value)
    if (editingTask.value?.id === taskToDelete.value) {
      editingTask.value = null
    }
    taskToDelete.value = null
    showDeleteConfirm.value = false
    await fetchTasks()
  }
}

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    NEW: 'Новая',
    IN_PROGRESS: 'В процессе',
    PAUSED: 'На паузе',
    WAITING: 'Ожидание',
    COMPLETED: 'Завершено',
    CANCELLED: 'Отменено',
    ARCHIVED: 'Архив',
  }
  return labels[status] || status
}

const formatDate = (dateString: string | Date) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' })
}
</script>

<style scoped>
.input-dark {
  width: 100%;
  padding: 0.875rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
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
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
}

.btn-primary-dark {
  width: 100%;
  padding: 0.875rem 1.5rem;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: white;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 0.75rem;
  transition: all 0.3s;
  border: none;
  cursor: pointer;
}

.btn-primary-dark:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(59, 130, 246, 0.4);
}

.btn-primary-dark:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}
</style>
