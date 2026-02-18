import { defineStore } from 'pinia'
import type { User, UserSettings } from '@prisma/client'

interface AuthState {
  user: (Omit<User, 'password'> & { settings?: UserSettings | null }) | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: true,
  }),

  getters: {
    isLoggedIn: (state) => state.isAuthenticated,
    currentUser: (state) => state.user,
    userRole: (state) => state.user?.role,
    validToken: (state) => {
      // Check if token exists and user is authenticated
      return state.isAuthenticated && state.token ? state.token : null
    },
  },

  actions: {
    setAuth(user: AuthState['user'], token: string) {
      this.user = user
      this.token = token
      this.isAuthenticated = true
      this.loading = false

      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
      }
    },

    logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      this.loading = false

      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    },

    setLoading(loading: boolean) {
      this.loading = loading
    },

    async initAuth() {
      if (typeof localStorage !== 'undefined') {
        const token = localStorage.getItem('token')
        const userStr = localStorage.getItem('user')
        if (token) {
          this.token = token
          if (userStr) {
            try {
              this.user = JSON.parse(userStr)
              this.isAuthenticated = true
            } catch {}
          }
          await this.fetchUser()
        } else {
          this.loading = false
        }
      }
    },

    async fetchUser() {
      try {
        if (!this.token) {
          this.loading = false
          return
        }
        
        const data = await $fetch('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        this.user = data.data
        this.isAuthenticated = true
      } catch {
        this.logout()
      } finally {
        this.loading = false
      }
    },
  },
})
