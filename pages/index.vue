<template>
    <div>
      <pre>{{properties}}</pre>
    </div>
  </template>
<script setup>
import { usePropertiesStore } from '~/store/DataStore'

const store = usePropertiesStore()

const { data, pending, error, refresh } = await useAsyncData(
  'properties',
  () => store.get()
)

// Optional: if you need to reactively access the properties from the store
const properties = computed(() => store.properties)
</script>