<template>
    <div class="bg-white">
      <pre>{{property}}</pre>
    </div>
  </template>
  
  <script setup>
  import { usePropertiesStore } from '~/store/DataStore'
  
  const route = useRoute()
  const store = usePropertiesStore()
  
  await useAsyncData(
    'property',
    () => store.find(route.params.id)
  )
  
  const property = computed(() => store.property)
  </script>
  