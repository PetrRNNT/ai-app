<template>
  <div class="flex flex-wrap gap-2">
    <button
      v-for="tag in tags"
      :key="tag.id"
      type="button"
      class="px-3 py-1 rounded-full text-sm font-medium transition-colors"
      :class="isSelected(tag.id) ? 'ring-2 ring-offset-2 ring-gray-400' : 'hover:opacity-80'"
      :style="{ backgroundColor: tag.color, color: '#fff' }"
      @click="$emit('select', tag.id)"
    >
      {{ tag.name }}
      <span v-if="showCount" class="ml-1 text-xs opacity-80">({{ tag._count?.tasks || 0 }})</span>
    </button>

    <button
      v-if="allowCreate"
      type="button"
      class="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200"
      @click="$emit('create')"
    >
      + Тег
    </button>
  </div>
</template>

<script setup lang="ts">
interface Tag {
  id: string
  name: string
  color: string
  _count?: { tasks: number }
}

defineProps<{
  tags: Tag[]
  selectedTags?: string[]
  showCount?: boolean
  allowCreate?: boolean
}>()

defineEmits<{
  select: [tagId: string]
  create: []
}>()

const isSelected = (tagId: string) => {
  return props.selectedTags?.includes(tagId) || false
}
</script>
