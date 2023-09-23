export default defineNuxtRouteMiddleware((to, from) => {
    const auth = useCookie('_a')
    if (auth.value == null){
        return navigateTo('/login')
    }
})