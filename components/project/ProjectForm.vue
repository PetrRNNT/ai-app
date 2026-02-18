<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-md" @click.stop>
      <h3 class="text-lg font-semibold mb-4">
        {{ project ? 'Редактировать проект' : 'Новый проект' }}
      </h3>

      <form @submit.prevent="handleSubmit">
        <!-- Name -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Название</label>
          <input
            v-model="form.name"
            type="text"
            required
            class="input-base"
            placeholder="Например: Работа"
          />
        </div>

        <!-- Description -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Описание</label>
          <textarea
            v-model="form.description"
            class="input-base"
            rows="3"
            placeholder="Описание проекта"
          ></textarea>
        </div>

        <!-- Color -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Цвет</label>
          <div class="flex space-x-2">
            <button
              v-for="color in colors"
              :key="color"
              type="button"
              class="w-8 h-8 rounded-full border-2"
              :class="form.color === color ? 'border-gray-900' : 'border-transparent'"
              :style="{ backgroundColor: color }"
              @click="form.color = color"
            ></button>
          </div>
        </div>

        <!-- Status -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Статус</label>
          <select v-model="form.status" class="input-base">
            <option value="ACTIVE">Активный</option>
            <option value="ON_HOLD">На паузе</option>
            <option value="COMPLETED">Завершен</option>
            <option value="ARCHIVED">Архив</option>
          </select>
        </div>

        <!-- Actions -->
        <div class="flex justify-end space-x-2">
          <button type="button" @click="$emit('close')" class="btn-secondary">
            Отмена
          </button>
          <button type="submit" class="btn-primary">
            {{ project ? 'Сохранить' : 'Создать' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProjectWithRelations } from '~/types'

const props = defineProps<{
  project?: ProjectWithRelations | null
}>()

const emit = defineEmits<{
  close: []
  save: [data: any]
}>()

const colors = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#6B7280']

const form = ref({
  name: props.project?.name || '',
  description: props.project?.description || '',
  color: props.project?.color || colors[0],
  status: props.project?.status || 'ACTIVE',
})

const handleSubmit = () => {
  emit('save', {
    ...form.value,
    id: props.project?.id,
  })
}
</script>
