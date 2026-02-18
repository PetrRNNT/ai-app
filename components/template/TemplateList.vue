<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <h3 class="text-lg font-semibold text-gray-900">Шаблоны</h3>
      <button @click="showCreate = true" class="btn-primary text-sm">
        + Новый шаблон
      </button>
    </div>

    <div v-if="loading" class="text-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
    </div>

    <div v-else-if="templates.length === 0" class="text-center py-8 text-gray-500">
      Нет шаблонов. Создайте первый шаблон!
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="template in templates"
        :key="template.id"
        class="card hover:shadow-md transition-shadow cursor-pointer"
        @click="selectTemplate(template)"
      >
        <div class="flex items-start justify-between mb-2">
          <h4 class="font-semibold text-gray-900">{{ template.name }}</h4>
          <button
            @click.stop="deleteTemplateById(template.id)"
            class="text-gray-400 hover:text-red-600"
          >
            🗑️
          </button>
        </div>
        <div class="flex items-center gap-2 text-sm">
          <span
            :class="[
              'px-2 py-0.5 rounded text-xs',
              template.type === 'TASK'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-green-100 text-green-800',
            ]"
          >
            {{ template.type === 'TASK' ? 'Задача' : 'Проект' }}
          </span>
          <span v-if="template.isPublic" class="text-green-600 text-xs">🌍 Публичный</span>
        </div>
      </div>
    </div>

    <!-- Create Template Modal -->
    <div
      v-if="showCreate"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="showCreate = false"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-md" @click.stop>
        <h3 class="text-lg font-semibold mb-4">Новый шаблон</h3>
        <form @submit.prevent="saveTemplate">
          <input
            v-model="newTemplate.name"
            type="text"
            placeholder="Название"
            class="input-base mb-4"
            required
          />
          <select v-model="newTemplate.type" class="input-base mb-4">
            <option value="TASK">Шаблон задачи</option>
            <option value="PROJECT">Шаблон проекта</option>
          </select>
          <textarea
            v-model="newTemplate.description"
            placeholder="Описание"
            class="input-base mb-4"
            rows="3"
          ></textarea>
          <label class="flex items-center gap-2 mb-4">
            <input v-model="newTemplate.isPublic" type="checkbox" class="rounded" />
            <span class="text-sm text-gray-700">Публичный шаблон</span>
          </label>
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
const { templates, loading, fetchTemplates, createTemplate, deleteTemplate } = useTemplate()

const showCreate = ref(false)
const newTemplate = ref({
  name: '',
  type: 'TASK',
  description: '',
  isPublic: false,
})

onMounted(async () => {
  await fetchTemplates()
})

const selectTemplate = (template: any) => {
  console.log('Selected template:', template)
  // Apply template logic here
}

const saveTemplate = async () => {
  await createTemplate({
    name: newTemplate.value.name,
    type: newTemplate.value.type,
    content: {
      title: newTemplate.value.name,
      description: newTemplate.value.description,
    },
    isPublic: newTemplate.value.isPublic,
  })
  showCreate.value = false
  newTemplate.value = { name: '', type: 'TASK', description: '', isPublic: false }
}

const deleteTemplateById = async (id: string) => {
  if (confirm('Удалить этот шаблон?')) {
    await deleteTemplate(id)
  }
}
</script>
