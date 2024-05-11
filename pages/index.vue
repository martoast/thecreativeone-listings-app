<template>
  <div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 class="sr-only">Properties</h2>

      <div class="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
        <div v-for="property in properties" :key="property.ID" class="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
          <div class="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
            <img :src="property.images[0]" alt="Main image of the property" class="h-full w-full object-cover object-center sm:h-full sm:w-full" />
          </div>
          <div class="flex flex-1 flex-col space-y-2 p-4">
            <h3 class="text-sm font-medium text-gray-900">
              <a :href="`/properties/${property.ID}`">
                <span aria-hidden="true" class="absolute inset-0" />
                {{ property.address }}
              </a>
            </h3>
            <p class="text-sm text-gray-500">{{ property.description }}</p>
            <div class="flex flex-1 flex-col justify-end">
              <p class="text-sm italic text-gray-500">{{ property.benefits }}</p>
              <p class="text-base font-medium text-gray-900">{{ formatCurrency(property.price) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePropertiesStore } from '~/store/DataStore'
import { computed } from 'vue'
import { useAsyncData } from '#app'

const store = usePropertiesStore()

const { data, pending, error, refresh } = await useAsyncData(
  'properties',
  () => store.get()
)

const properties = computed(() => store.properties.map(property => ({
  ...property,
  images: JSON.parse(property.images) // Assuming 'images' is a JSON string of URLs
})))

// Method for formatting currency
function formatCurrency(value) {
  if (typeof value !== 'number') {
    return value;
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}
</script>
