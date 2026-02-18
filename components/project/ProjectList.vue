<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-semibold text-gray-900">Проекты</h2>
      <button @click="$emit('create')" class="btn-primary text-sm">
        + Новый проект
      </button>
    </div>

    <div v-if="loading" class="text-center py-8">
      <div class="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
    </div>

    <div v-else-if="projects.length === 0" class="text-center py-8 text-gray-500">
      Нет проектов. Создайте первый проект!
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="project in projects"
        :key="project.id"
        class="card hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
        @click="handleSelect(project)"
      >
        <!-- Header with color indicator -->
        <div
          class="h-2 w-full"
          :style="{ backgroundColor: project.color || '#3B82F6' }"
        ></div>

        <div class="p-4">
          <div class="flex items-start justify-between mb-3">
            <div class="flex items-center gap-2 flex-1">
              <div
                v-if="project.icon"
                class="text-xl"
              >
                {{ project.icon }}
              </div>
              <h3 class="font-semibold text-gray-900 line-clamp-2">{{ project.name }}</h3>
            </div>
            <button
              @click.stop="$emit('edit', project)"
              class="text-gray-400 hover:text-gray-600 flex-shrink-0 ml-2"
              title="Редактировать"
            >
              ✏️
            </button>
          </div>

          <p v-if="project.description" class="text-sm text-gray-600 mb-3 line-clamp-3">
            {{ project.description }}
          </p>

          <div class="flex items-center justify-between text-sm">
            <div class="flex items-center gap-1 text-gray-500">
              <span>📁</span>
              <span>{{ project._count?.tasks || 0 }} задач</span>
            </div>
            <span
              :class="[
                'px-2 py-1 rounded-full text-xs font-medium',
                project.status === 'ACTIVE'
                  ? 'bg-green-100 text-green-800'
                  : project.status === 'ARCHIVED'
                  ? 'bg-gray-100 text-gray-800'
                  : project.status === 'COMPLETED'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-yellow-100 text-yellow-800',
              ]"
              :title="getStatusLabel(project.status)"
            >
              {{ getStatusLabel(project.status) }}
            </span>
          </div>

          <!-- Dates -->
          <div v-if="project.startDate || project.endDate" class="mt-3 pt-3 border-t text-xs text-gray-500">
            <div v-if="project.startDate" class="flex items-center gap-1">
              <span>📅</span>
              <span>Начало: {{ formatDate(project.startDate) }}</span>
            </div>
            <div v-if="project.endDate" class="flex items-center gap-1">
              <span>🏁</span>
              <span>Конец: {{ formatDate(project.endDate) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProjectWithRelations } from '~/types'

const props = defineProps<{
  projects: ProjectWithRelations[]
  loading: boolean
}>()

const emit = defineEmits<{
  create: []
  select: [project: ProjectWithRelations]
  edit: [project: ProjectWithRelations]
}>()

const handleSelect = (project: ProjectWithRelations) => {
  emit('select', project)
}

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    ACTIVE: 'Активный',
    ARCHIVED: 'Архив',
    COMPLETED: 'Завершен',
    ON_HOLD: 'На паузе',
  }
  return labels[status] || status
}

const formatDate = (dateString: string | Date) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' })
}
</script>
