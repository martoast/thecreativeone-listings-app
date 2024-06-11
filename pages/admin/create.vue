<template>
    <div class="container mx-auto pt-3">
        <div class="py-3">
            <a href="/admin">
                <img class="layout_logo" src="https://app.customesignature.com/upload/signature/complete/1056/1056.gif" width="60">
            </a>
        </div>
        <property-form></property-form>
    </div>
    
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})
</script>