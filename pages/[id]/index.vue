<template>
  <div class="bg-black" style="height: -webkit-fill-available;">
    <div class="container mx-auto">
      <div class="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div class="mb-4">
          <button @click="hanldeBackButton" type="button" class="rounded-full bg-primary p-2 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>

            
          </button>
        </div>
      <div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
        <!-- Image gallery -->
        <TabGroup as="div" class="flex flex-col-reverse">
          <!-- Image selector -->
          <div class="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
            <TabList class="grid grid-cols-4 gap-6">
              <Tab
                v-for="(image, index) in property.images"
                :key="index"
                class="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-gray-800 text-sm font-medium uppercase text-white hover:bg-gray-700 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                v-slot="{ selected }"
              >
                <span class="sr-only">Image {{ index + 1 }}</span>
                <span class="absolute inset-0 overflow-hidden rounded-md">
                  <img
                    :src="image"
                    alt=""
                    class="h-full w-full object-cover object-center"
                  />
                </span>
                <span
                  :class="[
                    selected ? 'ring-primary' : 'ring-transparent',
                    'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                  ]"
                  aria-hidden="true"
                />
              </Tab>
            </TabList>
          </div>

          <TabPanels class="aspect-h-1 aspect-w-1 w-full">
            <TabPanel
              v-for="(image, index) in property.images"
              :key="index"
              @click="openModal(index)"
            >
              <img
                :src="image"
                :alt="`Image ${index + 1}`"
                class="h-full w-full object-cover object-center sm:rounded-lg cursor-pointer"
              />
            </TabPanel>
          </TabPanels>
        </TabGroup>

        <!-- Property info -->
        <div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
          <h1 class="text-3xl font-bold tracking-tight text-white">
            {{ property.address }}
          </h1>

          <div class="mt-3">
            <h2 class="sr-only">Property information</h2>
            <p class="text-3xl tracking-tight text-white mb-3">
              {{ formatCurrency(property.price) }}
            </p>
            <p v-if="property.sold !== null" class="font-medium text-gray-300"><span>Status:</span> {{ property.sold ? 'Sold' : 'Available' }}</p>
          </div>

          <!-- Info Sections -->
          <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <!-- General Information -->
            <section>
              <h3 class="text-xl font-semibold text-white">General Information</h3>
              <div class="space-y-2 text-base text-gray-300 mt-2">
                <p><span class="font-medium">Property Type:</span> {{ property.property_type }}</p>
                <p><span class="font-medium">Bedrooms:</span> {{ property.bedrooms }}</p>
                <p><span class="font-medium">Bathrooms:</span> {{ property.bathrooms }}</p>
                <p><span class="font-medium">Year Built:</span> {{ property.year_built ?? 'N/A' }}</p>
                <p><span class="font-medium">Lot Size:</span> {{ property.lot_size ?? 'N/A' }}</p>
                <p><span class="font-medium">Living Area:</span> {{ property.living_area ?? 'N/A' }}</p>
              </div>
            </section>

            <!-- Financial Information -->
            <section>
              <h3 class="text-xl font-semibold text-white">Financial Information</h3>
              <div class="space-y-2 text-base text-gray-300 mt-2">
                <p><span class="font-medium">Rent Zestimate:</span> {{ formatCurrency(property.rent_zestimate) ?? 'N/A'}}</p>
                <p><span class="font-medium">Zestimate:</span> {{ formatCurrency(property.zestimate) ?? 'N/A'}}</p>
                <p><span class="font-medium">Price per Square Foot:</span> {{ formatCurrency(property.price_per_square_foot) ?? 'N/A' }}</p>
                <p><span class="font-medium">Zoning:</span> {{ property.zoning ?? 'N/A'}}</p>
                <p><span class="font-medium">Purchase Price:</span> {{ formatCurrency(property.purchase_price) ?? 'N/A' }}</p>
                <p><span class="font-medium">Balance to Close:</span> {{ formatCurrency(property.balance_to_close) ?? 'N/A' }}</p>
                <p><span class="font-medium">Monthly Holding Cost:</span> {{ formatCurrency(property.monthly_holding_cost) ?? 'N/A' }}</p>
                <p><span class="font-medium">Interest Rate:</span> {{ property.interest_rate ? `${parseFloat(property.interest_rate) * 100}%` : 'N/A' }}</p>
              </div>
            </section>
          </div>

          <!-- Description -->
          <section class="mt-6">
            <h3 class="text-xl font-semibold text-white">Description</h3>
            <div class="space-y-2 text-base text-gray-300 mt-2">
              <p>{{ property.description }}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
    <ModalCarousel
      :showModal="isModalOpen"
      :images="property.images"
      :startIndex="selectedImageIndex"
      @close="isModalOpen = false"
    />

    </div>
    
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import {
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@headlessui/vue'
import { usePropertiesStore } from '~/store/DataStore'
import ModalCarousel from '~/components/ModalCarousel.vue'

const route = useRoute()
const store = usePropertiesStore()

await useAsyncData('property', () => store.find(route.params.id))

const property = computed(() => ({
  ...store.property,
  images: store.property.images.length ? JSON.parse(store.property.images) : [],
}))

const isModalOpen = ref(false)
const selectedImageIndex = ref(0)

function openModal(index) {
  selectedImageIndex.value = index
  isModalOpen.value = true
}

function formatCurrency(value) {
  if (typeof value !== 'number') {
    return value;
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

const hanldeBackButton = async () => {
  await navigateTo('/')
}
</script>
