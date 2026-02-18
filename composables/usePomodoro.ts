import { usePomodoroStore } from '~/stores/pomodoro'

export function usePomodoro() {
  const pomodoroStore = usePomodoroStore()

  let intervalId: ReturnType<typeof setInterval> | null = null

  const startTimer = () => {
    pomodoroStore.start()
    intervalId = setInterval(() => {
      pomodoroStore.tick()
    }, 1000)
  }

  const pauseTimer = () => {
    pomodoroStore.pause()
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  const resetTimer = () => {
    pomodoroStore.reset()
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  const setMode = (mode: 'work' | 'shortBreak' | 'longBreak') => {
    pomodoroStore.setMode(mode)
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  const setDurations = (work: number, shortBreak: number, longBreak: number) => {
    pomodoroStore.setDurations(work, shortBreak, longBreak)
  }

  onUnmounted(() => {
    if (intervalId) {
      clearInterval(intervalId)
    }
  })

  return {
    isRunning: computed(() => pomodoroStore.isRunning),
    mode: computed(() => pomodoroStore.mode),
    timeLeft: computed(() => pomodoroStore.timeLeft),
    formattedTime: computed(() => pomodoroStore.formattedTime),
    progress: computed(() => pomodoroStore.progress),
    completedPomodoros: computed(() => pomodoroStore.completedPomodoros),
    startTimer,
    pauseTimer,
    resetTimer,
    setMode,
    setDurations,
  }
}
