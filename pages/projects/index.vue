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
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- New Project Card -->
        <div
          class="card border-2 border-dashed border-gray-300 hover:border-blue-500 cursor-pointer flex flex-col items-center justify-center py-12"
          @click="showProjectForm = true"
        >
          <div class="text-4xl mb-2">+</div>
          <span class="text-gray-600 font-medium">Новый проект</span>
        </div>

        <!-- Project Cards -->
        <NuxtLink
          v-for="project in projects"
          :key="project.id"
          :to="`/projects/${project.id}`"
          class="card hover:shadow-lg transition-shadow cursor-pointer"
        >
          <div class="flex items-start justify-between mb-3">
            <div class="flex items-center space-x-2">
              <span
                v-if="project.color"
                class="w-3 h-3 rounded-full"
                :style="{ backgroundColor: project.color }"
              ></span>
              <h3 class="font-semibold text-gray-900">{{ project.name }}</h3>
            </div>
          </div>

          <p v-if="project.description" class="text-sm text-gray-600 mb-3 line-clamp-2">
            {{ project.description }}
          </p>

          <div class="flex items-center justify-between text-sm text-gray-500">
            <span>{{ project._count?.tasks || 0 }} задач</span>
            <span
              :class="[
                'px-2 py-1 rounded-full text-xs',
                project.status === 'ACTIVE'
                  ? 'bg-green-100 text-green-800'
                  : project.status === 'ARCHIVED'
                  ? 'bg-gray-100 text-gray-800'
                  : 'bg-blue-100 text-blue-800',
              ]"
            >
              {{ project.status }}
            </span>
          </div>
        </NuxtLink>
      </div>
    </main>

    <!-- Project Form Modal -->
    <ProjectForm
      v-if="showProjectForm"
      @close="showProjectForm = false"
      @save="saveProject"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

const { user, logout } = useAuth()
const { projects, loading, fetchProjects, createProject } = useProject()

const showProjectForm = ref(false)

onMounted(async () => {
  await fetchProjects()
})

const saveProject = async (data: any) => {
  await createProject(data)
  await fetchProjects()
  showProjectForm.value = false
}

const handleLogout = async () => {
  await logout()
}
</script>
