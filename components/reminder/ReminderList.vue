<template>
  <div class="space-y-2">
    <div class="flex justify-between items-center mb-2">
      <h4 class="text-sm font-medium text-gray-700">Напоминания</h4>
      <button @click="showAdd = !showAdd" class="text-blue-600 text-sm hover:underline">
        + Добавить
      </button>
    </div>

    <!-- Add Reminder Form -->
    <div v-if="showAdd" class="bg-gray-50 p-3 rounded-lg space-y-2">
      <select v-model="newReminder.type" class="input-base text-sm">
        <option value="TIME">По времени</option>
        <option value="CONTEXT">По контексту</option>
      </select>
      <input
        v-if="newReminder.type === 'TIME'"
        v-model="newReminder.triggerAt"
        type="datetime-local"
        class="input-base text-sm"
      />
      <input
        v-model="newReminder.context"
        placeholder="Контекст (необязательно)"
        class="input-base text-sm"
      />
      <div class="flex gap-2">
        <button @click="saveReminder" class="btn-primary text-sm">Сохранить</button>
        <button @click="showAdd = false" class="btn-secondary text-sm">Отмена</button>
      </div>
    </div>

    <!-- Reminders List -->
    <div v-if="reminders.length > 0" class="space-y-1">
      <div
        v-for="reminder in reminders"
        :key="reminder.id"
        class="flex items-center justify-between p-2 bg-gray-50 rounded text-sm"
      >
        <div class="flex items-center gap-2">
          <span :class="reminder.isTriggered ? 'text-gray-400' : 'text-blue-600'">
            {{ reminder.isTriggered ? '✅' : '⏰' }}
          </span>
          <div>
            <div :class="reminder.isTriggered ? 'line-through text-gray-400' : 'text-gray-900'">
              {{ formatReminder(reminder) }}
            </div>
          </div>
        </div>
        <button @click="deleteReminderById(reminder.id)" class="text-gray-400 hover:text-red-600">
          🗑️
        </button>
      </div>
    </div>

    <div v-else class="text-sm text-gray-500 text-center py-2">
      Нет напоминаний
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  taskId: string
  reminders: any[]
}>()

const emit = defineEmits<{
  'create': [data: any]
  'delete': [id: string]
}>()

const showAdd = ref(false)
const newReminder = ref({
  type: 'TIME',
  triggerAt: '',
  context: '',
})

const formatReminder = (reminder: any) => {
  if (reminder.type === 'TIME' && reminder.triggerAt) {
    const date = new Date(reminder.triggerAt)
    return `📅 ${date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}`
  }
  if (reminder.context) {
    return `📍 ${reminder.context}`
  }
  return reminder.type
}

const saveReminder = async () => {
  emit('create', {
    taskId: props.taskId,
    type: newReminder.value.type,
    triggerAt: newReminder.value.triggerAt || null,
    context: newReminder.value.context || null,
  })
  showAdd.value = false
  newReminder.value = { type: 'TIME', triggerAt: '', context: '' }
}

const deleteReminderById = (id: string) => {
  emit('delete', id)
}
</script>
