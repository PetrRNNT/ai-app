export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()

  // Skip on server side during initial load
  if (import.meta.server) {
    return
  }

  // Check if route requires auth
  const requiresAuth = to.meta.auth !== false

  // If still loading, redirect to current route (will re-check after loading)
  if (authStore.loading) {
    // Don't redirect on login/register pages while loading
    if (!['login', 'register'].includes(to.name as string)) {
      return
    }
    return
  }

  if (requiresAuth && !authStore.isLoggedIn) {
    return navigateTo('/login')
  }

  // Redirect to dashboard if already logged in and trying to access auth pages
  if (authStore.isLoggedIn && ['login', 'register'].includes(to.name as string)) {
    return navigateTo('/')
  }
})
