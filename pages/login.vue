<template>
    <LoginModal/>
</template>

<script setup>

const authCookie = useCookie('auth')

if (authCookie) {
    await navigateTo('/admin')
}


</script>