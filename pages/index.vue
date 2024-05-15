<template>
  <div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 class="sr-only">Properties</h2>

      <div class="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
        <div
          v-for="property in properties"
          :key="property.ID"
          class="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
        >
          <div class="aspect-w-3 aspect-h-2 bg-gray-200 sm:aspect-none sm:h-64 group-hover:opacity-75">
            <img
              :src="property.images[0]"
              alt="Main image of the property"
              class="h-full w-full object-cover object-center sm:h-full sm:w-full"
            />
          </div>
          <div class="flex flex-1 flex-col p-4">
            <h3 class="text-lg font-bold text-gray-900">
              <a :href="`/${property.ID}`">
                <span aria-hidden="true" class="absolute inset-0" />
                {{ property.address }}
              </a>
            </h3>
            <p class="text-lg font-semibold text-gray-900">{{ formatCurrency(property.price) }}</p>
            <div class="mt-2 flex flex-row items-center text-sm text-gray-500">
              <span class="inline-block h-5 w-5 text-indigo-600 mr-1" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                  <path d="M32 32c17.7 0 32 14.3 32 32V320H288V160c0-17.7 14.3-32 32-32H544c53 0 96 43 96 96V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V416H352 320 64v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V64C0 46.3 14.3 32 32 32zm144 96a80 80 0 1 1 0 160 80 80 0 1 1 0-160z"/>
                </svg>
              </span>
              {{ property.bedrooms }} bed
              <span class="mx-1">•</span>
              <span class="inline-block h-5 w-5 text-indigo-600 mr-1" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M96 77.3c0-7.3 5.9-13.3 13.3-13.3c3.5 0 6.9 1.4 9.4 3.9l14.9 14.9C130 91.8 128 101.7 128 112c0 19.9 7.2 38 19.2 52c-5.3 9.2-4 21.1 3.8 29c9.4 9.4 24.6 9.4 33.9 0L289 89c9.4-9.4 9.4-24.6 0-33.9c-7.9-7.9-19.8-9.1-29-3.8C246 39.2 227.9 32 208 32c-10.3 0-20.2 2-29.2 5.5L163.9 22.6C149.4 8.1 129.7 0 109.3 0C66.6 0 32 34.6 32 77.3V256c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H96V77.3zM32 352v16c0 28.4 12.4 54 32 71.6V480c0 17.7 14.3 32 32 32s32-14.3 32-32V464H384v16c0 17.7 14.3 32 32 32s32-14.3 32-32V439.6c19.6-17.6 32-43.1 32-71.6V352H32z"/>
                </svg>
              </span>
              {{ property.bathrooms }} bath
            </div>
            <div class="mt-2 text-sm text-gray-500">
              Status: <span class="font-semibold">{{ property.sold ? 'Sold' : 'Available' }}</span>
            </div>
            <div class="mt-4 flex justify-end">
              <a
                :href="`/property/${property.ID}`"
                class="text-indigo-600 hover:text-indigo-900 font-semibold"
              >
                View Details
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePropertiesStore } from '~/store/DataStore'

const store = usePropertiesStore()

const { data, pending, error, refresh } = await useAsyncData(
  'properties',
  () => store.get()
)

const properties = computed(() => store.properties.map(property => ({
  ...property,
  images: property.images.length ? JSON.parse(property.images) : '[]' // Assuming 'images' is a JSON string of URLs
})))

// Method for formatting currency
function formatCurrency(value) {
  if (typeof value !== 'number') {
    return value;
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}
</script>
