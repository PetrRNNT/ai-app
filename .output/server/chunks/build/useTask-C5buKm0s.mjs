import { u as useTaskStore } from './task-6PAKZffB.mjs';
import { computed } from 'vue';

function useTask() {
  const taskStore = useTaskStore();
  const fetchTasks = async (filters) => {
    return taskStore.fetchTasks(filters);
  };
  const createTask = async (data) => {
    return taskStore.createTask(data);
  };
  const updateTask = async (data) => {
    return taskStore.updateTask(data);
  };
  const deleteTask = async (id) => {
    return taskStore.deleteTask(id);
  };
  const completeTask = async (id) => {
    return taskStore.completeTask(id);
  };
  const setFilters = (filters) => {
    taskStore.setFilters(filters);
  };
  const clearFilters = () => {
    taskStore.clearFilters();
  };
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
    clearFilters
  };
}

export { useTask as u };
//# sourceMappingURL=useTask-C5buKm0s.mjs.map
