<template>
    <div class="container mx-auto pt-3">
        <property-form></property-form>
    </div>
    
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})
</script>