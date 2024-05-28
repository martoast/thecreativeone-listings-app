<template>
    <div class="container mx-auto pt-3">
      <div class="py-3">
            <a href="/admin">
                <img src="/logo.png" alt="Logo" class="h-8 w-auto" />
            </a>
        </div>
        <property-form :property="property"></property-form>
    </div>
  </template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

import { usePropertiesStore } from '~/store/DataStore'


const route = useRoute()
const store = usePropertiesStore()

await useAsyncData(
  'property',
  () => store.find(route.params.id)
)

const property = computed(() => store.property)
</script>