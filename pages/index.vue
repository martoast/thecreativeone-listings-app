<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div class="flex justify-center mb-8">
        <a href="http://mycreativefinancing.com/" target="_blank">
          <img class="layout_logo" src="https://app.customesignature.com/upload/signature/complete/1056/1056.gif" width="120" style="display: block; margin: auto;">
        </a>
      </div>
      <h2 class="sr-only">Properties</h2>
      <h1 class="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-wide mb-8 text-center">
        <span class="text-indigo-600">EXPLORE</span> <span class="text-gray-900">OUR LISTINGS</span>
      </h1>

      <!-- Filter Controls -->
      <div class="mb-4 flex items-center space-x-4">
        <div class="flex items-center">
          <label for="soldToggle" class="text-gray-900 mr-2">Show Sold Properties</label>
          <Switch v-model="showSold" :class="[showSold ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2']">
            <span class="sr-only">Show Sold Properties</span>
            <span aria-hidden="true" :class="[showSold ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']" />
          </Switch>
        </div>
        <div class="flex items-center">
          <label for="assistedLivingToggle" class="text-gray-900 mr-2">Show Assisted Living Properties</label>
          <Switch v-model="showAssistedLiving" :class="[showAssistedLiving ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2']">
            <span class="sr-only">Show Assisted Living Properties</span>
            <span aria-hidden="true" :class="[showAssistedLiving ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']" />
          </Switch>
        </div>
        <button @click="resetFilters" type="button" class="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Reset Filters</button>
      </div>

      <div class="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
        <div
          v-for="property in properties"
          :key="property.ID"
          class="group relative flex flex-col overflow-hidden rounded-lg border border-gray-300 bg-white shadow-sm"
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
            <div class="mt-2 flex flex-row items-center text-sm text-gray-600">
              <span class="inline-block h-5 w-5 text-gray-600 mr-1" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor">
                  <path d="M32 32c17.7 0 32 14.3 32 32V320H288V160c0-17.7 14.3-32 32-32H544c53 0 96 43 96 96V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V416H352 320 64v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V64C0 46.3 14.3 32 32 32zm144 96a80 80 0 1 1 0 160 80 80 0 1 1 0-160z"/>
                </svg>
              </span>
              {{ property.bedrooms }} bed
              <span class="mx-1">•</span>
              <span class="inline-block h-5 w-5 text-gray-600 mr-1" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
                  <path d="M96 77.3c0-7.3 5.9-13.3 13.3-13.3c3.5 0 6.9 1.4 9.4 3.9l14.9 14.9C130 91.8 128 101.7 128 112c0 19.9 7.2 38 19.2 52c-5.3 9.2-4 21.1 3.8 29c9.4 9.4 24.6 9.4 33.9 0L289 89c9.4-9.4 9.4-24.6 0-33.9c-7.9-7.9-19.8-9.1-29-3.8C246 39.2 227.9 32 208 32c-10.3 0-20.2 2-29.2 5.5L163.9 22.6C149.4 8.1 129.7 0 109.3 0C66.6 0 32 34.6 32 77.3V256c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H96V77.3zM32 352v16c0 28.4 12.4 54 32 71.6V480c0 17.7 14.3 32 32 32s32-14.3 32-32V464H384v16c0 17.7 14.3 32 32 32s32-14.3 32-32V439.6c19.6-17.6 32-43.1 32-71.6V352H32z"/>
                </svg>
              </span>
              {{ property.bathrooms }} bath
              <div v-if="property.lot_size">
                <span class="mx-1">•</span>
              <span class="inline-block h-5 w-5 text-gray-600 mr-1" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                  <path d="M6 3a3 3 0 0 0-3 3v1.5a.75.75 0 0 0 1.5 0V6A1.5 1.5 0 0 1 6 4.5h1.5a.75.75 0 0 0 0-1.5H6ZM16.5 3a.75.75 0 0 0 0 1.5H18A1.5 1.5 0 0 1 19.5 6v1.5a.75.75 0 0 0 1.5 0V6a3 3 0 0 0-3-3h-1.5ZM4.5 16.5a.75.75 0 0 0-1.5 0V18a3 3 0 0 0 3 3h1.5a.75.75 0 0 0 0-1.5H6A1.5 1.5 0 0 1 4.5 18v-1.5ZM21 16.5a.75.75 0 0 0-1.5 0V18a1.5 1.5 0 0 1-1.5 1.5h-1.5a.75.75 0 0 0 0 1.5H18a3 3 0 0 0 3-3v-1.5Z" />
                </svg>
              </span>
              {{ property.lot_size }} sqft
              </div>
            </div>
            <div class="mt-2 text-sm text-gray-600">
              Status: <span class="font-semibold" :class="property.sold ? 'text-red-600' : 'text-green-600'">{{ property.sold ? 'Sold' : 'Available' }}</span>
            </div>
            <div class="mt-4 flex justify-end">
              <a
                :href="`/property/${property.ID}`"
                class="text-indigo-600 font-semibold hover:text-indigo-500"
              >
                View Details
              </a>
            </div>
          </div>
        </div>
      </div>
      <!-- Pagination controls -->
      <div class="mt-8 flex justify-between items-center">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-4 py-2 text-gray-900 bg-indigo-600 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <p class="text-gray-900">
          Page {{ currentPage }} of {{ totalPages }}
        </p>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 text-gray-900 bg-indigo-600 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePropertiesStore } from '~/store/DataStore'
import { Switch } from '@headlessui/vue'

const store = usePropertiesStore()

const currentPage = ref(1)
const itemsPerPage = 10 // Change this to the number of items you want per page
const showSold = ref(null)
const showAssistedLiving = ref(null)

const { data, pending, error, refresh } = await useAsyncData(
  'properties',
  () => store.get(currentPage.value, itemsPerPage, showSold.value, showAssistedLiving.value)
)

const totalPages = computed(() => Math.ceil(store.total / itemsPerPage))

const properties = computed(() => store.properties.map(property => ({
  ...property,
  images: property.images.length ? JSON.parse(property.images) : '[]' // Assuming 'images' is a JSON string of URLs
})))

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    refresh()
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    refresh()
  }
}

// Watch the toggle value and refresh properties when it changes
watch([showSold, showAssistedLiving], () => {
  currentPage.value = 1
  refresh()
})

const resetFilters = () => {
  showSold.value = null
  showAssistedLiving.value = null
  refresh()
}

// Method for formatting currency
function formatCurrency(value) {
  if (typeof value !== 'number') {
    return value;
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}
</script>
