import { defineStore } from 'pinia'

interface PomodoroState {
  isRunning: boolean
  mode: 'work' | 'shortBreak' | 'longBreak'
  timeLeft: number
  workDuration: number
  shortBreakDuration: number
  longBreakDuration: number
  completedPomodoros: number
  autoStartBreaks: boolean
  autoStartPomodoros: boolean
}

export const usePomodoroStore = defineStore('pomodoro', {
  state: (): PomodoroState => ({
    isRunning: false,
    mode: 'work',
    timeLeft: 25 * 60,
    workDuration: 25 * 60,
    shortBreakDuration: 5 * 60,
    longBreakDuration: 15 * 60,
    completedPomodoros: 0,
    autoStartBreaks: false,
    autoStartPomodoros: false,
  }),

  getters: {
    formattedTime: (state) => {
      const minutes = Math.floor(state.timeLeft / 60)
      const seconds = state.timeLeft % 60
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    },
    progress: (state) => {
      const total = state.mode === 'work'
        ? state.workDuration
        : state.mode === 'shortBreak'
        ? state.shortBreakDuration
        : state.longBreakDuration
      return ((total - state.timeLeft) / total) * 100
    },
  },

  actions: {
    start() {
      this.isRunning = true
    },
    pause() {
      this.isRunning = false
    },
    reset() {
      this.isRunning = false
      this.timeLeft = this.getCurrentDuration()
    },
    getCurrentDuration() {
      switch (this.mode) {
        case 'work':
          return this.workDuration
        case 'shortBreak':
          return this.shortBreakDuration
        case 'longBreak':
          return this.longBreakDuration
        default:
          return this.workDuration
      }
    },
    setMode(mode: 'work' | 'shortBreak' | 'longBreak') {
      this.mode = mode
      this.timeLeft = this.getCurrentDuration()
      this.isRunning = false
    },
    setDurations(work: number, shortBreak: number, longBreak: number) {
      this.workDuration = work * 60
      this.shortBreakDuration = shortBreak * 60
      this.longBreakDuration = longBreak * 60
      this.timeLeft = this.getCurrentDuration()
    },
    tick() {
      if (this.timeLeft > 0) {
        this.timeLeft--
      } else {
        this.complete()
      }
    },
    complete() {
      if (this.mode === 'work') {
        this.completedPomodoros++
        if (this.completedPomodoros % 4 === 0) {
          this.setMode('longBreak')
          if (this.autoStartBreaks) this.start()
        } else {
          this.setMode('shortBreak')
          if (this.autoStartBreaks) this.start()
        }
      } else {
        this.setMode('work')
        if (this.autoStartPomodoros) this.start()
      }
    },
  },
})
