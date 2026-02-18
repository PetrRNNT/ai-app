<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <h3 class="text-lg font-semibold text-gray-900">Автоматизация</h3>
      <button @click="showCreate = true" class="btn-primary text-sm">
        + Новое правило
      </button>
    </div>

    <div v-if="loading" class="text-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
    </div>

    <div v-else-if="automations.length === 0" class="text-center py-8 text-gray-500">
      Нет правил автоматизации. Создайте первое правило!
    </div>

    <div v-else class="space-y-3">
      <div
        v-for="automation in automations"
        :key="automation.id"
        class="card flex items-center justify-between"
      >
        <div class="flex-1">
          <div class="flex items-center gap-2 mb-1">
            <h4 class="font-semibold text-gray-900">{{ automation.name }}</h4>
            <span
              :class="[
                'px-2 py-0.5 rounded text-xs',
                automation.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800',
              ]"
            >
              {{ automation.isActive ? 'Активно' : 'Неактивно' }}
            </span>
          </div>
          <p v-if="automation.description" class="text-sm text-gray-600 mb-2">
            {{ automation.description }}
          </p>
          <div class="text-xs text-gray-500">
            Триггер: <code class="bg-gray-100 px-1 rounded">{{ automation.trigger?.type }}</code>
            • Действий: {{ automation.actions?.length || 0 }}
            <span v-if="automation.lastRun" class="ml-2">
              • Последнее выполнение: {{ formatDate(automation.lastRun) }}
            </span>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button
            @click="toggleAutomationById(automation.id, !automation.isActive)"
            :class="[
              'px-3 py-1 rounded text-sm',
              automation.isActive ? 'btn-secondary' : 'btn-primary',
            ]"
          >
            {{ automation.isActive ? 'Отключить' : 'Включить' }}
          </button>
          <button
            @click="deleteAutomationById(automation.id)"
            class="text-gray-400 hover:text-red-600 p-2"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>

    <!-- Create Automation Modal -->
    <div
      v-if="showCreate"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="showCreate = false"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-lg" @click.stop>
        <h3 class="text-lg font-semibold mb-4">Новое правило автоматизации</h3>
        <form @submit.prevent="saveAutomation">
          <input
            v-model="newAutomation.name"
            type="text"
            placeholder="Название правила"
            class="input-base mb-4"
            required
          />
          <textarea
            v-model="newAutomation.description"
            placeholder="Описание"
            class="input-base mb-4"
            rows="2"
          ></textarea>

          <!-- Trigger -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Триггер</label>
            <select v-model="newAutomation.triggerType" class="input-base mb-2">
              <option value="task.created">При создании задачи</option>
              <option value="task.completed">При завершении задачи</option>
              <option value="task.dueSoon">Когда задача скоро должна быть выполнена</option>
            </select>
          </div>

          <!-- Actions -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Действия</label>
            <div class="space-y-2">
              <div v-for="(action, index) in newAutomation.actions" :key="index" class="flex gap-2">
                <select v-model="action.type" class="input-base text-sm flex-1">
                  <option value="task.updateStatus">Изменить статус задачи</option>
                  <option value="task.addTag">Добавить тег</option>
                  <option value="notification.send">Отправить уведомление</option>
                </select>
                <button
                  type="button"
                  @click="newAutomation.actions.splice(index, 1)"
                  class="text-red-600 hover:text-red-800"
                >
                  ✕
                </button>
              </div>
              <button
                type="button"
                @click="newAutomation.actions.push({ type: 'task.updateStatus' })"
                class="text-blue-600 hover:text-blue-800 text-sm"
              >
                + Добавить действие
              </button>
            </div>
          </div>

          <div class="flex justify-end gap-2">
            <button type="button" @click="showCreate = false" class="btn-secondary">Отмена</button>
            <button type="submit" class="btn-primary">Создать</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { automations, loading, fetchAutomations, createAutomation, deleteAutomation, toggleAutomation } = useAutomation()

const showCreate = ref(false)
const newAutomation = ref({
  name: '',
  description: '',
  triggerType: 'task.created',
  actions: [{ type: 'task.updateStatus' }] as any[],
})

onMounted(async () => {
  await fetchAutomations()
})

const saveAutomation = async () => {
  await createAutomation({
    name: newAutomation.value.name,
    description: newAutomation.value.description,
    trigger: { type: newAutomation.value.triggerType },
    actions: newAutomation.value.actions,
  })
  showCreate.value = false
  newAutomation.value = {
    name: '',
    description: '',
    triggerType: 'task.created',
    actions: [{ type: 'task.updateStatus' }],
  }
}

const deleteAutomationById = async (id: string) => {
  if (confirm('Удалить это правило?')) {
    await deleteAutomation(id)
  }
}

const toggleAutomationById = async (id: string, isActive: boolean) => {
  await toggleAutomation(id, isActive)
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>
