export default defineNuxtRouteMiddleware((to, from) => {
    console.log("Here in middleware")
    const authCookie = useCookie('auth')
    if (!authCookie.value) {
      return navigateTo('/login')
    }
  })
  