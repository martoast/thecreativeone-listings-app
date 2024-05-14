<template>
    <div class="container mx-auto pt-3">
        <property-form :property="property"></property-form>
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