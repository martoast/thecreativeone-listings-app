<template>
    <div>
        <button type="button" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Button text</button>
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