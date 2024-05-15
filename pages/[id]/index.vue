<template>
  <div class="bg-white container mx-auto">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
        <!-- Image gallery -->
        <TabGroup as="div" class="flex flex-col-reverse">
          <!-- Image selector -->
          <div class="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
            <TabList class="grid grid-cols-4 gap-6">
              <Tab
                v-for="(image, index) in property.images"
                :key="index"
                class="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
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
                    selected ? 'ring-indigo-500' : 'ring-transparent',
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
            >
              <img
                :src="image"
                :alt="`Image ${index + 1}`"
                class="h-full w-full object-cover object-center sm:rounded-lg"
              />
            </TabPanel>
          </TabPanels>
        </TabGroup>

        <!-- Property info -->
        <div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900">
            {{ property.address }}
          </h1>

          <div class="mt-3">
            <h2 class="sr-only">Property information</h2>
            <p class="text-3xl tracking-tight text-gray-900">
              {{ formatCurrency(property.price) }}
            </p>
          </div>

          <!-- Info Sections -->
          <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <!-- General Information -->
            <section>
              <h3 class="text-xl font-semibold text-gray-900">General Information</h3>
              <div class="space-y-2 text-base text-gray-700 mt-2">
                <p><span class="font-medium">Property Type:</span> {{ property.property_type }}</p>
                <p><span class="font-medium">Year Built:</span> {{ property.year_built }}</p>
                <p v-if="property.square_footage !== null"><span class="font-medium">Square Footage:</span> {{ property.square_footage }} sq ft</p>
                <p v-if="property.lot_size !== null"><span class="font-medium">Lot Size:</span> {{ property.lot_size }}</p>
                <p v-if="property.living_area !== null"><span class="font-medium">Living Area:</span> {{ property.living_area }}</p>
                <p><span class="font-medium">Bedrooms:</span> {{ property.bedrooms }}</p>
                <p><span class="font-medium">Bathrooms:</span> {{ property.bathrooms }}</p>
                <p><span class="font-medium">Status:</span> {{ property.sold ? 'Sold' : 'Available' }}</p>
              </div>
            </section>

            <!-- Financial Information -->
            <section>
              <h3 class="text-xl font-semibold text-gray-900">Financial Information</h3>
              <div class="space-y-2 text-base text-gray-700 mt-2">
                <p v-if="property.down_payment !== null"><span class="font-medium">Down Payment:</span> {{ formatCurrency(property.down_payment) }}</p>
                <p v-if="property.total_price !== null"><span class="font-medium">Total Price:</span> {{ formatCurrency(property.total_price) }}</p>
                <p v-if="property.interest !== null"><span class="font-medium">Interest Rate:</span> {{ property.interest }}%</p>
                <p v-if="property.monthly_payment !== null"><span class="font-medium">Monthly Payment:</span> {{ formatCurrency(property.monthly_payment) }}</p>
                <p v-if="property.mortgage_balance !== null"><span class="font-medium">Mortgage Balance:</span> {{ formatCurrency(property.mortgage_balance) }}</p>
                <p v-if="property.rent_zestimate !== null"><span class="font-medium">Rent Zestimate:</span> {{ formatCurrency(property.rent_zestimate) }}</p>
                <p v-if="property.zestimate !== null"><span class="font-medium">Zestimate:</span> {{ formatCurrency(property.zestimate) }}</p>
                <p v-if="property.price_per_square_foot !== null"><span class="font-medium">Price per Square Foot:</span> {{ formatCurrency(property.price_per_square_foot) }}</p>
                <p v-if="property.piti !== null"><span class="font-medium">PITI:</span> {{ formatCurrency(property.piti) }}</p>
                <p v-if="property.estimate_roi !== null"><span class="font-medium">Estimated ROI:</span> {{ property.estimate_roi }}%</p>
                <p v-if="property.monthly_cash_flow !== null"><span class="font-medium">Monthly Cash Flow:</span> {{ formatCurrency(property.monthly_cash_flow) }}</p>
                <p v-if="property.equity_buildup !== null"><span class="font-medium">Equity Buildup:</span> {{ formatCurrency(property.equity_buildup) }}</p>
              </div>
            </section>
          </div>

          <!-- Description -->
          <section class="mt-6">
            <h3 class="text-xl font-semibold text-gray-900">Description</h3>
            <div class="space-y-2 text-base text-gray-700 mt-2">
              <p>{{ property.description }}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/vue'
import { PlusIcon, MinusIcon } from '@heroicons/vue/24/outline'
import { usePropertiesStore } from '~/store/DataStore'

const route = useRoute()
const store = usePropertiesStore()

await useAsyncData('property', () => store.find(route.params.id))

const property = computed(() => ({
  ...store.property,
  images: store.property.images.length ? JSON.parse(store.property.images) : [],
}))

function formatCurrency(value) {
  if (typeof value !== 'number') {
    return value;
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}
</script>