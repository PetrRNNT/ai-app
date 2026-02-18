<template>
  <div class="task-form-overlay" @click="$emit('close')">
    <div class="task-form-modal" @click.stop>
      <h3 class="text-lg font-semibold mb-4">{{ isEditing ? 'Редактировать задачу' : 'Новая задача' }}</h3>

      <form @submit.prevent="handleSubmit">
        <!-- Title -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Название</label>
          <input
            v-model="form.title"
            type="text"
            required
            class="input-base"
            placeholder="Название задачи"
          />
        </div>

        <!-- Description -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Описание</label>
          <textarea
            v-model="form.description"
            class="input-base"
            rows="3"
            placeholder="Описание задачи"
          ></textarea>
        </div>

        <!-- Project -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Проект</label>
          <select v-model="form.projectId" class="input-base">
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

        <!-- Status -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Статус</label>
          <select v-model="form.status" class="input-base">
            <option value="NEW">Новая</option>
            <option value="IN_PROGRESS">В процессе</option>
            <option value="PAUSED">На паузе</option>
            <option value="WAITING">Ожидание</option>
            <option value="COMPLETED">Завершено</option>
            <option value="CANCELLED">Отменено</option>
          </select>
        </div>

        <!-- Priority -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Приоритет</label>
          <select v-model="form.priority" class="input-base">
            <option value="NONE">Без приоритета</option>
            <option value="LOW">Низкий</option>
            <option value="MEDIUM">Средний</option>
            <option value="HIGH">Высокий</option>
            <option value="CRITICAL">Критичный</option>
          </select>
        </div>

        <!-- Due Date -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Срок выполнения</label>
          <input
            v-model="form.dueDate"
            type="date"
            class="input-base"
          />
        </div>

        <!-- Important & Urgent -->
        <div class="mb-4 space-y-2">
          <label class="flex items-center">
            <input v-model="form.isImportant" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-blue-600" />
            <span class="ml-2 text-sm text-gray-700">Важная</span>
          </label>
          <label class="flex items-center">
            <input v-model="form.isUrgent" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-blue-600" />
            <span class="ml-2 text-sm text-gray-700">Срочная</span>
          </label>
        </div>

        <!-- Estimated Time -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Оценка времени (минуты)</label>
          <input
            v-model.number="form.estimatedTime"
            type="number"
            min="0"
            class="input-base"
          />
        </div>

        <!-- Actions -->
        <div class="flex justify-end space-x-2">
          <button type="button" @click="$emit('close')" class="btn-secondary">
            Отмена
          </button>
          <button type="button" @click="showDeleteConfirm = true" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            Удалить
          </button>
          <button type="submit" class="btn-primary">
            Сохранить
          </button>
        </div>
      </form>
    </div>

    <!-- Delete Confirmation Dialog -->
    <ConfirmDialog
      v-if="showDeleteConfirm"
      title="Удалить задачу?"
      message="Вы уверены, что хотите удалить эту задачу? Это действие нельзя отменить."
      type="danger"
      confirm-text="Удалить"
      cancel-text="Отмена"
      @confirm="handleDeleteConfirm"
      @cancel="showDeleteConfirm = false"
    />
  </div>
</template>

<script setup lang="ts">
import ConfirmDialog from '~/components/common/ConfirmDialog.vue'
import type { TaskWithRelations } from '~/types'

const props = defineProps<{
  task?: TaskWithRelations | null
  projects?: any[]
}>()

const emit = defineEmits<{
  close: []
  save: [data: any]
  delete: [taskId: string]
}>()

const showDeleteConfirm = ref(false)

const isEditing = computed(() => !!props.task?.id)

const form = ref({
  title: props.task?.title || '',
  description: props.task?.description || '',
  projectId: props.task?.projectId || '',
  status: props.task?.status || 'NEW',
  priority: props.task?.priority || 'MEDIUM',
  dueDate: props.task?.dueDate ? new Date(props.task.dueDate).toISOString().split('T')[0] : '',
  isImportant: props.task?.isImportant || false,
  isUrgent: props.task?.isUrgent || false,
  estimatedTime: props.task?.estimatedTime || 0,
})

const handleSubmit = () => {
  emit('save', {
    id: props.task?.id,
    ...form.value,
  })
}

const showDeleteConfirmDialog = () => {
  showDeleteConfirm.value = true
}

const handleDeleteConfirm = () => {
  if (props.task?.id) {
    emit('delete', props.task.id)
  }
  showDeleteConfirm.value = false
}
</script>

<style scoped>
.task-form-overlay {
  position: fixed;
  inset: 0;
  background: linear-gradient(
    145deg, 
    rgba(0,0,0, 0.4) 0%, 
    rgba(107,19,188,0.4) 100%
  );
  backdrop-filter: blur(1px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.task-form-modal {
  background: white;
  border-radius: 12px;
  padding: 24px;
  width: 100%;
  max-width: 28rem;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 
    0 10px 40px rgba(0, 0, 0, 0.15),
    0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
