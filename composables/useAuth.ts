import { useAuthStore } from '~/stores/auth'

let initPromise: Promise<void> | null = null

export function useAuth() {
  const authStore = useAuthStore()

  // Ensure auth is initialized
  const ensureInit = async () => {
    if (!initPromise) {
      initPromise = authStore.initAuth()
    }
    await initPromise
  }

  const login = async (email: string, password: string) => {
    await ensureInit()
    authStore.setLoading(true)
    try {
      const data: any = await $fetch('/api/auth', {
        method: 'POST',
        body: { email, password },
      })

      authStore.setAuth(data.data, data.token)
      return { success: true }
    } catch (error: any) {
      authStore.setLoading(false)
      return {
        success: false,
        error: error.message || 'Login failed',
      }
    }
  }

  const register = async (email: string, name: string, password: string) => {
    await ensureInit()
    authStore.setLoading(true)
    try {
      const data: any = await $fetch('/api/auth', {
        method: 'POST',
        body: { email, name, password },
      })

      authStore.setAuth(data.data, data.token)
      return { success: true }
    } catch (error: any) {
      authStore.setLoading(false)
      return {
        success: false,
        error: error.message || 'Registration failed',
      }
    }
  }

  const logout = async () => {
    await authStore.logout()
    navigateTo('/login')
  }

  const refreshUser = async () => {
    await ensureInit()
    return authStore.fetchUser()
  }

  const ensureAuthenticated = async () => {
    await ensureInit()
    if (!authStore.isAuthenticated || !authStore.token) {
      throw new Error('Not authenticated')
    }
    return authStore.token
  }

  return {
    user: computed(() => authStore.user),
    isAuthenticated: computed(() => authStore.isAuthenticated),
    loading: computed(() => authStore.loading),
    userRole: computed(() => authStore.userRole),
    login,
    register,
    logout,
    refreshUser,
    ensureAuthenticated,
  }
}
