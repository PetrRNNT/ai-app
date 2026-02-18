import { useTaskStore } from '~/stores/task'
import type { CreateTaskInput, UpdateTaskInput, TaskWithRelations } from '~/types'

export function useKanban() {
  const taskStore = useTaskStore()

  const columns = [
    { id: 'NEW', title: 'Новые', color: 'bg-blue-500' },
    { id: 'IN_PROGRESS', title: 'В процессе', color: 'bg-yellow-500' },
    { id: 'PAUSED', title: 'На паузе', color: 'bg-gray-500' },
    { id: 'WAITING', title: 'Ожидание', color: 'bg-purple-500' },
    { id: 'COMPLETED', title: 'Завершено', color: 'bg-green-500' },
  ]

  const getTasksForColumn = (status: string) => {
    return taskStore.tasks.filter((task: TaskWithRelations) => task.status === status)
  }

  const fetchTasks = async () => {
    return taskStore.fetchTasks()
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

  const moveTask = async (taskId: string, status: string) => {
    const authStore = useAuthStore()
    try {
      const result: any = await $fetch('/api/tasks/move', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          'Content-Type': 'application/json',
        },
        body: { taskId, status },
      })
      await fetchTasks()
      return result.data
    } catch (error: any) {
      throw error
    }
  }

  return {
    columns,
    tasks: computed(() => taskStore.tasks),
    loading: computed(() => taskStore.loading),
    error: computed(() => taskStore.error),
    getTasksForColumn,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    moveTask,
  }
}
