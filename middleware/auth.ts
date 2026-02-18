export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()

  // Skip on server side during initial load
  if (import.meta.server) {
    return
  }

  // Skip if auth is still initializing
  if (authStore.loading) {
    return
  }

  // Check if route requires auth
  const requiresAuth = to.meta.auth !== false

  if (requiresAuth && !authStore.isAuthenticated) {
    return navigateTo('/login')
  }

  // Redirect to dashboard if already logged in and trying to access auth pages
  if (authStore.isAuthenticated && ['login', 'register'].includes(to.name as string)) {
    return navigateTo('/')
  }
})
