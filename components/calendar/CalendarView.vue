<template>
  <div class="card">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <div class="flex items-center gap-4">
        <button @click="previousPeriod" class="p-2 hover:bg-gray-100 rounded">
          ←
        </button>
        <h2 class="text-xl font-semibold text-gray-900">
          {{ currentPeriodLabel }}
        </h2>
        <button @click="nextPeriod" class="p-2 hover:bg-gray-100 rounded">
          →
        </button>
      </div>
      <div class="flex gap-2">
        <button
          @click="view = 'month'"
          :class="view === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'"
          class="px-3 py-1.5 rounded text-sm font-medium"
        >
          Месяц
        </button>
        <button
          @click="view = 'week'"
          :class="view === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'"
          class="px-3 py-1.5 rounded text-sm font-medium"
        >
          Неделя
        </button>
        <button
          @click="view = 'day'"
          :class="view === 'day' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'"
          class="px-3 py-1.5 rounded text-sm font-medium"
        >
          День
        </button>
        <button @click="goToToday" class="px-3 py-1.5 bg-gray-100 text-gray-600 rounded text-sm font-medium hover:bg-gray-200">
          Сегодня
        </button>
      </div>
    </div>

    <!-- Month View -->
    <div v-if="view === 'month'" class="month-view">
      <!-- Weekday Headers -->
      <div class="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200 rounded-lg overflow-hidden mb-2">
        <div
          v-for="day in weekdayNames"
          :key="day"
          class="bg-gray-50 p-2 text-center text-sm font-medium text-gray-700"
        >
          {{ day }}
        </div>
      </div>

      <!-- Calendar Grid -->
      <div class="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200 rounded-lg overflow-hidden">
        <div
          v-for="day in calendarDays"
          :key="day.date.toString()"
          @click="selectDate(day)"
          :class="[
            'min-h-[100px] p-2 bg-white hover:bg-gray-50 cursor-pointer',
            !day.currentMonth ? 'bg-gray-50 text-gray-400' : '',
            day.isToday ? 'bg-blue-50' : '',
          ]"
        >
          <div class="flex justify-between items-start mb-1">
            <span
              :class="[
                'text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full',
                day.isToday ? 'bg-blue-600 text-white' : '',
              ]"
            >
              {{ day.day }}
            </span>
            <span v-if="day.eventsCount" class="text-xs text-gray-500">
              {{ day.eventsCount }} задач
            </span>
          </div>
          <div class="space-y-1">
            <div
              v-for="event in day.events?.slice(0, 3)"
              :key="event.id"
              class="text-xs p-1 rounded truncate text-white"
              :style="{ backgroundColor: event.color }"
              :title="event.title"
            >
              {{ event.title }}
            </div>
            <div v-if="day.events?.length > 3" class="text-xs text-gray-500">
              +{{ day.events.length - 3 }} ещё
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Week View -->
    <div v-else-if="view === 'week'" class="week-view">
      <div class="grid grid-cols-8 gap-px bg-gray-200 border border-gray-200 rounded-lg overflow-hidden">
        <!-- Time column header -->
        <div class="bg-gray-50 p-2"></div>
        <!-- Day headers -->
        <div
          v-for="day in weekDays"
          :key="day.date.toString()"
          :class="[
            'p-2 text-center',
            day.isToday ? 'bg-blue-50' : 'bg-gray-50',
          ]"
        >
          <div class="text-sm font-medium text-gray-700">{{ day.weekday }}</div>
          <div
            :class="[
              'text-lg font-bold',
              day.isToday ? 'text-blue-600' : 'text-gray-900',
            ]"
          >
            {{ day.day }}
          </div>
        </div>
      </div>
    </div>

    <!-- Day View -->
    <div v-else-if="view === 'day'" class="day-view p-4">
      <h3 class="text-lg font-semibold mb-4">
        {{ selectedDate.toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' }) }}
      </h3>
      <div class="space-y-2">
        <div
          v-for="event in eventsOnSelectedDate"
          :key="event.id"
          class="p-3 rounded-lg border-l-4"
          :style="{ borderColor: event.color, backgroundColor: event.color + '20' }"
        >
          <div class="font-medium">{{ event.title }}</div>
          <div class="text-sm text-gray-600">{{ event.description }}</div>
        </div>
        <div v-if="!eventsOnSelectedDate.length" class="text-gray-500 text-center py-8">
          Нет задач на этот день
        </div>
      </div>
    </div>

    <!-- Event Modal -->
    <div
      v-if="selectedEvent"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="selectedEvent = null"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-md" @click.stop>
        <h3 class="text-lg font-semibold mb-4">{{ selectedEvent.title }}</h3>
        <p class="text-gray-600 mb-4">{{ selectedEvent.description }}</p>
        <div class="flex justify-end">
          <button @click="selectedEvent = null" class="btn-secondary">
            Закрыть
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CalendarEvent } from '~/types'

const events = defineModel<CalendarEvent[]>('events', { default: () => [] })

const view = ref<'month' | 'week' | 'day'>('month')
const currentDate = ref(new Date())
const selectedDate = ref(new Date())
const selectedEvent = ref<CalendarEvent | null>(null)

const weekdayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

const currentPeriodLabel = computed(() => {
  if (view.value === 'month') {
    return currentDate.value.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })
  } else if (view.value === 'week') {
    const start = getWeekStart(currentDate.value)
    const end = new Date(start)
    end.setDate(end.getDate() + 6)
    return `${start.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })} - ${end.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' })}`
  }
  return currentDate.value.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
})

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()

  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)

  const days: any[] = []
  const today = new Date()

  // Previous month days
  const startDayOfWeek = firstDay.getDay() || 7
  for (let i = startDayOfWeek - 1; i > 0; i--) {
    const day = new Date(year, month, -i + 1)
    days.push({
      day: day.getDate(),
      date: day,
      currentMonth: false,
      isToday: isSameDay(day, today),
      events: getEventsForDay(day),
      eventsCount: getEventsForDay(day).length,
    })
  }

  // Current month days
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const day = new Date(year, month, i)
    days.push({
      day: i,
      date: day,
      currentMonth: true,
      isToday: isSameDay(day, today),
      events: getEventsForDay(day),
      eventsCount: getEventsForDay(day).length,
    })
  }

  // Next month days
  const remainingDays = 42 - days.length
  for (let i = 1; i <= remainingDays; i++) {
    const day = new Date(year, month + 1, i)
    days.push({
      day: i,
      date: day,
      currentMonth: false,
      isToday: isSameDay(day, today),
      events: getEventsForDay(day),
      eventsCount: getEventsForDay(day).length,
    })
  }

  return days
})

const weekDays = computed(() => {
  const start = getWeekStart(currentDate.value)
  const days: any[] = []
  const today = new Date()

  for (let i = 0; i < 7; i++) {
    const day = new Date(start)
    day.setDate(day.getDate() + i)
    days.push({
      day: day.getDate(),
      weekday: weekdayNames[i],
      date: day,
      isToday: isSameDay(day, today),
    })
  }

  return days
})

const eventsOnSelectedDate = computed(() => {
  return getEventsForDay(selectedDate.value)
})

function getWeekStart(date: Date) {
  const d = new Date(date)
  const day = d.getDay() || 7
  d.setDate(d.getDate() - day + 1)
  return d
}

function getEventsForDay(date: Date) {
  return events.value.filter((event) => {
    const eventDate = new Date(event.start)
    return isSameDay(eventDate, date)
  })
}

function isSameDay(d1: Date, d2: Date) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  )
}

function previousPeriod() {
  if (view.value === 'month') {
    currentDate.value.setMonth(currentDate.value.getMonth() - 1)
  } else if (view.value === 'week') {
    currentDate.value.setDate(currentDate.value.getDate() - 7)
  } else {
    currentDate.value.setDate(currentDate.value.getDate() - 1)
  }
}

function nextPeriod() {
  if (view.value === 'month') {
    currentDate.value.setMonth(currentDate.value.getMonth() + 1)
  } else if (view.value === 'week') {
    currentDate.value.setDate(currentDate.value.getDate() + 7)
  } else {
    currentDate.value.setDate(currentDate.value.getDate() + 1)
  }
}

function goToToday() {
  currentDate.value = new Date()
  selectedDate.value = new Date()
}

function selectDate(day: any) {
  selectedDate.value = day.date
  if (day.events?.length === 1) {
    selectedEvent.value = day.events[0]
  }
}
</script>
