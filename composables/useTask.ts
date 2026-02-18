import { useTaskStore } from '~/stores/task'
import type { CreateTaskInput, UpdateTaskInput, TaskFilters } from '~/types'

export function useTask() {
  const taskStore = useTaskStore()

  const fetchTasks = async (filters?: TaskFilters) => {
    return taskStore.fetchTasks(filters)
  }

  const createTask = async (data: CreateTaskInput) => {
    return taskStore.createTask(data)
  }

  const updateTask = async (data: UpdateTaskInput) => {
    return taskStore.updateTask(data)
  }

  const deleteTask = async (id: string) => {
    return taskStore.deleteTask(id)
  }

  const completeTask = async (id: string) => {
    return taskStore.completeTask(id)
  }

  const setFilters = (filters: TaskFilters) => {
    taskStore.setFilters(filters)
  }

  const clearFilters = () => {
    taskStore.clearFilters()
  }

  return {
    tasks: computed(() => taskStore.tasks),
    filteredTasks: computed(() => taskStore.filteredTasks),
    completedTasks: computed(() => taskStore.completedTasks),
    pendingTasks: computed(() => taskStore.pendingTasks),
    importantTasks: computed(() => taskStore.importantTasks),
    currentTask: computed(() => taskStore.currentTask),
    loading: computed(() => taskStore.loading),
    error: computed(() => taskStore.error),
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    completeTask,
    setFilters,
    clearFilters,
  }
}
