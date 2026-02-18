<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-4">
            <NuxtLink to="/" class="text-blue-600 hover:underline">← Назад</NuxtLink>
            <h1 class="text-xl font-bold text-gray-900">Задачи</h1>
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
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Filters Sidebar -->
        <div class="lg:col-span-1">
          <div class="card">
            <h3 class="font-semibold text-gray-900 mb-4">Фильтры</h3>

            <!-- Status Filter -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Статус</label>
              <select
                v-model="filters.status"
                class="input-base text-sm"
                @change="applyFilters"
              >
                <option value="">Все</option>
                <option value="NEW">Новые</option>
                <option value="IN_PROGRESS">В процессе</option>
                <option value="COMPLETED">Завершенные</option>
                <option value="CANCELLED">Отмененные</option>
              </select>
            </div>

            <!-- Priority Filter -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Приоритет</label>
              <select
                v-model="filters.priority"
                class="input-base text-sm"
                @change="applyFilters"
              >
                <option value="">Все</option>
                <option value="CRITICAL">Критичный</option>
                <option value="HIGH">Высокий</option>
                <option value="MEDIUM">Средний</option>
                <option value="LOW">Низкий</option>
              </select>
            </div>

            <!-- Important Filter -->
            <div class="mb-4">
              <label class="flex items-center">
                <input
                  v-model="filters.important"
                  type="checkbox"
                  class="h-4 w-4 text-blue-600 rounded border-gray-300"
                  @change="applyFilters"
                />
                <span class="ml-2 text-sm text-gray-700">Важные</span>
              </label>
            </div>

            <!-- Search -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Поиск</label>
              <input
                v-model="searchQuery"
                type="text"
                class="input-base text-sm"
                placeholder="Поиск задач..."
                @input="debouncedSearch"
              />
            </div>

            <!-- Clear Filters -->
            <button @click="clearFilters" class="w-full btn-secondary text-sm">
              Сбросить фильтры
            </button>
          </div>

          <!-- Tags -->
          <div class="card mt-4">
            <h3 class="font-semibold text-gray-900 mb-4">Теги</h3>
            <TagSelector
              :tags="tags"
              :selected-tags="selectedTagIds"
              show-count
              allow-create
              @select="toggleTag"
              @create="showTagModal = true"
            />
          </div>
        </div>

        <!-- Tasks List -->
        <div class="lg:col-span-3">
          <div class="card">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-lg font-semibold text-gray-900">
                Задачи ({{ filteredTasks.length }})
              </h2>
              <button @click="showQuickAdd = true" class="btn-primary">
                + Новая задача
              </button>
            </div>

            <div v-if="loading" class="text-center py-8">
              <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>

            <div v-else-if="filteredTasks.length === 0" class="text-center py-8 text-gray-500">
              Нет задач по выбранным фильтрам
            </div>

            <div v-else class="space-y-3">
              <div
                v-for="task in filteredTasks"
                :key="task.id"
                class="flex items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div class="flex items-start space-x-3 flex-1">
                  <input
                    type="checkbox"
                    :checked="task.status === 'COMPLETED'"
                    @change="toggleTask(task)"
                    class="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-0.5"
                  />
                  <div class="flex-1">
                    <p
                      :class="[
                        'font-medium',
                        task.status === 'COMPLETED' ? 'line-through text-gray-400' : 'text-gray-900',
                      ]"
                    >
                      {{ task.title }}
                    </p>
                    <p v-if="task.description" class="text-sm text-gray-600 mt-1">
                      {{ task.description }}
                    </p>
                    <div class="flex items-center gap-2 mt-2">
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
                      <span v-if="task.isImportant" class="text-red-500 text-sm">🔴 Важное</span>
                      <span v-if="task.dueDate" class="text-gray-500 text-sm">
                        📅 {{ formatDate(task.dueDate) }}
                      </span>
                    </div>
                  </div>
                </div>
                <button @click="handleDeleteRequest(task.id)" class="text-gray-400 hover:text-red-600 p-2">
                  🗑️
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Quick Add Modal -->
    <div
      v-if="showQuickAdd"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="showQuickAdd = false"
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
          <div class="flex justify-end space-x-2">
            <button type="button" @click="showQuickAdd = false" class="btn-secondary">
              Отмена
            </button>
            <button type="submit" class="btn-primary">Создать</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Create Tag Modal -->
    <div
      v-if="showTagModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="showTagModal = false"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-md" @click.stop>
        <h3 class="text-lg font-semibold mb-4">Новый тег</h3>
        <form @submit.prevent="createNewTag">
          <input
            v-model="newTagName"
            type="text"
            placeholder="Название тега"
            class="input-base mb-4"
            autofocus
          />
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Цвет</label>
            <div class="flex space-x-2">
              <button
                v-for="color in colors"
                :key="color"
                type="button"
                class="w-8 h-8 rounded-full border-2"
                :class="newTagColor === color ? 'border-gray-900' : 'border-transparent'"
                :style="{ backgroundColor: color }"
                @click="newTagColor = color"
              ></button>
            </div>
          </div>
          <div class="flex justify-end space-x-2">
            <button type="button" @click="showTagModal = false" class="btn-secondary">
              Отмена
            </button>
            <button type="submit" class="btn-primary">Создать</button>
          </div>
        </form>
      </div>
    </div>

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
import ConfirmDialog from '~/components/common/ConfirmDialog.vue'
import type { TaskFilters } from '~/types'

definePageMeta({
  middleware: ['auth'],
})

const { user, logout } = useAuth()
const { tasks, filteredTasks, loading, fetchTasks, createTask, updateTask, deleteTask, setFilters, clearFilters } = useTask()
const { tags, fetchTags, createTag } = useTag()

const filters = ref<TaskFilters>({
  status: [],
  priority: [],
  important: false,
  search: '',
})

const searchQuery = ref('')
const selectedTagIds = ref<string[]>([])
const showQuickAdd = ref(false)
const showTagModal = ref(false)
const showDeleteConfirm = ref(false)
const taskToDelete = ref<string | null>(null)
const newTaskTitle = ref('')
const newTaskDescription = ref('')
const newTagName = ref('')
const newTagColor = ref('#3B82F6')

const colors = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#6B7280']

onMounted(async () => {
  await Promise.all([fetchTasks(), fetchTags()])
})

const applyFilters = () => {
  const filterData: TaskFilters = {}

  if (filters.value.status) {
    filterData.status = [filters.value.status as any]
  }
  if (filters.value.priority) {
    filterData.priority = [filters.value.priority as any]
  }
  if (filters.value.important) {
    filterData.isImportant = true
  }
  if (filters.value.search) {
    filterData.search = filters.value.search
  }

  setFilters(filterData)
}

const debouncedSearch = () => {
  clearTimeout(timeoutId)
  timeoutId = setTimeout(() => {
    filters.value.search = searchQuery.value
    applyFilters()
  }, 300) as any
}

let timeoutId: any

const toggleTag = (tagId: string) => {
  const index = selectedTagIds.value.indexOf(tagId)
  if (index === -1) {
    selectedTagIds.value.push(tagId)
  } else {
    selectedTagIds.value.splice(index, 1)
  }
}

const toggleTask = async (task: any) => {
  const newStatus = task.status === 'COMPLETED' ? 'NEW' : 'COMPLETED'
  await updateTask({ id: task.id, status: newStatus })
  await fetchTasks()
}

const handleDeleteRequest = (id: string) => {
  taskToDelete.value = id
  showDeleteConfirm.value = true
}

const confirmDeleteTask = async () => {
  if (taskToDelete.value) {
    await deleteTask(taskToDelete.value)
    taskToDelete.value = null
    showDeleteConfirm.value = false
    await fetchTasks()
  }
}

const createNewTask = async () => {
  if (!newTaskTitle.value.trim()) return

  await createTask({
    title: newTaskTitle.value,
    description: newTaskDescription.value,
    priority: 'MEDIUM',
  })

  newTaskTitle.value = ''
  newTaskDescription.value = ''
  showQuickAdd.value = false
  await fetchTasks()
}

const createNewTag = async () => {
  if (!newTagName.value.trim()) return

  await createTag(newTagName.value, newTagColor.value)
  await fetchTags()

  newTagName.value = ''
  showTagModal.value = false
}

const formatDate = (dateString: string | Date) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })
}

const handleLogout = async () => {
  await logout()
}
</script>
