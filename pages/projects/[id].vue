<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-4">
            <NuxtLink to="/" class="text-blue-600 hover:underline">← Назад</NuxtLink>
            <h1 class="text-xl font-bold text-gray-900">Проекты</h1>
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
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Projects List -->
        <div class="lg:col-span-1">
          <ProjectList
            :projects="projects"
            :loading="loading"
            @create="showProjectForm = true"
            @select="selectProject"
            @edit="editProject"
          />
        </div>

        <!-- Project Detail -->
        <div class="lg:col-span-2">
          <div v-if="currentProject" class="card">
            <div class="flex items-start justify-between mb-6">
              <div>
                <h2 class="text-2xl font-bold text-gray-900">{{ currentProject.name }}</h2>
                <p v-if="currentProject.description" class="text-gray-600 mt-1">
                  {{ currentProject.description }}
                </p>
              </div>
              <button @click="showTaskForm = true" class="btn-primary">
                + Новая задача
              </button>
            </div>

            <!-- Sections with Tasks -->
            <div v-if="currentProject.sections?.length" class="space-y-6">
              <div
                v-for="section in currentProject.sections"
                :key="section.id"
                class="border-t pt-4"
              >
                <h3 class="font-semibold text-gray-700 mb-3">{{ section.name }}</h3>
                <div class="space-y-2">
                  <div
                    v-for="task in currentProject.tasks?.filter(t => t.sectionId === section.id)"
                    :key="task.id"
                    class="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100"
                  >
                    <div class="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        :checked="task.status === 'COMPLETED'"
                        @change="toggleTask(task)"
                        class="h-4 w-4 rounded border-gray-300 text-blue-600"
                      />
                      <span :class="{ 'line-through text-gray-400': task.status === 'COMPLETED' }">
                        {{ task.title }}
                      </span>
                    </div>
                    <span
                      :class="[
                        'px-2 py-1 text-xs rounded',
                        task.priority === 'HIGH'
                          ? 'bg-red-100 text-red-800'
                          : task.priority === 'MEDIUM'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800',
                      ]"
                    >
                      {{ task.priority }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Tasks without section -->
            <div v-if="currentProject.tasks?.filter(t => !t.sectionId).length" class="border-t pt-4">
              <h3 class="font-semibold text-gray-700 mb-3">Без раздела</h3>
              <div class="space-y-2">
                <div
                  v-for="task in currentProject.tasks?.filter(t => !t.sectionId)"
                  :key="task.id"
                  class="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100"
                >
                  <div class="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      :checked="task.status === 'COMPLETED'"
                      @change="toggleTask(task)"
                      class="h-4 w-4 rounded border-gray-300 text-blue-600"
                    />
                    <span :class="{ 'line-through text-gray-400': task.status === 'COMPLETED' }">
                      {{ task.title }}
                    </span>
                  </div>
                  <span
                    :class="[
                      'px-2 py-1 text-xs rounded',
                      task.priority === 'HIGH'
                        ? 'bg-red-100 text-red-800'
                        : task.priority === 'MEDIUM'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800',
                    ]"
                  >
                    {{ task.priority }}
                  </span>
                </div>
              </div>
            </div>

            <div v-else-if="!currentProject.tasks?.length" class="text-center py-8 text-gray-500">
              В этом проекте пока нет задач
            </div>
          </div>

          <div v-else class="card text-center py-12 text-gray-500">
            Выберите проект для просмотра задач
          </div>
        </div>
      </div>
    </main>

    <!-- Project Form Modal -->
    <ProjectForm
      v-if="showProjectForm || editingProject"
      :project="editingProject"
      @close="closeProjectForm"
      @save="saveProject"
    />

    <!-- Quick Task Form Modal -->
    <div
      v-if="showTaskForm"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="showTaskForm = false"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-md" @click.stop>
        <h3 class="text-lg font-semibold mb-4">Новая задача</h3>
        <form @submit.prevent="createTask">
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
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

const { user, logout } = useAuth()
const { projects, loading, fetchProjects, createProject, updateProject } = useProject()
const { createTask: createTaskApi, updateTask } = useTask()

const currentProject = ref<any>(null)
const showProjectForm = ref(false)
const editingProject = ref<any>(null)
const showTaskForm = ref(false)
const newTaskTitle = ref('')
const newTaskDescription = ref('')
const newTaskPriority = ref('MEDIUM')

onMounted(async () => {
  await fetchProjects()
})

const selectProject = async (project: any) => {
  try {
    currentProject.value = await fetchProjectById(project.id)
  } catch (error: any) {
    console.error('Failed to load project:', error)
    // Use the project from the list as fallback
    currentProject.value = project
  }
}

const fetchProjectById = async (id: string) => {
  const authStore = useAuthStore()
  try {
    const data: any = await $fetch(`/api/projects/${id}`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })
    return data.data
  } catch (error: any) {
    console.error('Error fetching project:', error)
    throw error
  }
}

const editProject = (project: any) => {
  editingProject.value = project
  showProjectForm.value = true
}

const closeProjectForm = () => {
  showProjectForm.value = false
  editingProject.value = null
}

const saveProject = async (data: any) => {
  if (data.id) {
    await updateProject(data)
  } else {
    await createProject(data)
  }
  await fetchProjects()
  closeProjectForm()
}

const createTask = async () => {
  if (!newTaskTitle.value.trim() || !currentProject.value) return

  await createTaskApi({
    title: newTaskTitle.value,
    description: newTaskDescription.value,
    priority: newTaskPriority.value as any,
    projectId: currentProject.value.id,
  })

  newTaskTitle.value = ''
  newTaskDescription.value = ''
  showTaskForm.value = false

  // Reload project
  currentProject.value = await fetchProjectById(currentProject.value.id)
}

const toggleTask = async (task: any) => {
  const newStatus = task.status === 'COMPLETED' ? 'NEW' : 'COMPLETED'
  await updateTask({ id: task.id, status: newStatus })

  // Reload project
  currentProject.value = await fetchProjectById(currentProject.value.id)
}

const handleLogout = async () => {
  await logout()
}
</script>
