export default defineNuxtRouteMiddleware(async (to) => {
  const { loggedIn } = useUserSession()
  
  // Public routes that don't require authentication
  const publicRoutes = ['/auth/login', '/auth/register', '/auth/verify-email']
  
  // Check if route requires authentication
  const requiresAuth = !publicRoutes.includes(to.path)
  
  // If route requires auth and user is not authenticated, redirect to login
  if (requiresAuth && !loggedIn.value) {
    return navigateTo('/auth/login')
  }
  
  // If user is authenticated and trying to access login/register, redirect to profile
  if (loggedIn.value && (to.path === '/auth/login' || to.path === '/auth/register')) {
    return navigateTo('/admin/profile')
  }
})
