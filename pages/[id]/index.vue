<template>
  <div class="bg-white container mx-auto">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
        <!-- Image gallery -->
        <TabGroup as="div" class="flex flex-col-reverse">
          <!-- Image selector -->
          <div class="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
            <TabList class="grid grid-cols-4 gap-6">
              <Tab v-for="(image, index) in JSON.parse(property.images)" :key="index" class="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4" v-slot="{ selected }">
                <span class="sr-only">Image {{ index + 1 }}</span>
                <span class="absolute inset-0 overflow-hidden rounded-md">
                  <img :src="image" alt="" class="h-full w-full object-cover object-center" />
                </span>
                <span :class="[selected? 'ring-indigo-500' : 'ring-transparent', 'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2']" aria-hidden="true" />
              </Tab>
            </TabList>
          </div>

          <TabPanels class="aspect-h-1 aspect-w-1 w-full">
            <TabPanel v-for="(image, index) in JSON.parse(property.images)" :key="index">
              <img :src="image" :alt="`Image ${index + 1}`" class="h-full w-full object-cover object-center sm:rounded-lg" />
            </TabPanel>
          </TabPanels>
        </TabGroup>

        <!-- Property info -->
        <div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900">{{ property.address }}</h1>

          <div class="mt-3">
            <h2 class="sr-only">Property information</h2>
            <p class="text-3xl tracking-tight text-gray-900">$ {{ property.price.toLocaleString() }}</p>
          </div>

          <!-- Description and main information -->
          <div class="mt-6">
            <h3 class="sr-only">Description and main information</h3>

            <div class="space-y-6 text-base text-gray-700">
              <p>{{ property.description }}</p>

              <ul class="list-none mb-6">
                <li>
                  <span class="text-gray-600">Bedrooms:</span>
                  <span class="text-gray-900 ml-1">{{ property.bedrooms }}</span>
                </li>
                <li>
                  <span class="text-gray-600">Bathrooms:</span>
                  <span class="text-gray-900 ml-1">{{ property.bathrooms }}</span>
                </li>
                <li>
                  <span class="text-gray-600">Status:</span>
                  <span class="text-gray-900 ml-1">{{ property.sold? 'Sold' : 'Available' }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Additional details -->
          <section aria-labelledby="details-heading" class="mt-12">
            <h2 id="details-heading" class="sr-only">Additional details</h2>

            <div class="divide-y divide-gray-200 border-t">
              <Disclosure as="div" v-for="(detail, index) in [
                { name: 'Square Footage', value: property.square_footage },
                { name: 'Year Built', value: property.year_built },
                { name: 'Lot Size', value: property.lot_size },
              ]" :key="index" v-slot="{ open }">
                <h3>
                  <DisclosureButton class="group relative flex w-full items-center justify-between py-6 text-left">
                    <span :class="[open? 'text-indigo-600' : 'text-gray-900', 'text-sm font-medium']">{{ detail.name }}</span>
                    <span class="ml-6 flex items-center">
                      <PlusIcon v-if="!open" class="block h-6 w-6 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                      <MinusIcon v-else class="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500" aria-hidden="true" />
                    </span>
                  </DisclosureButton>
                </h3>
                <DisclosurePanel as="div" class="prose prose-sm pb-6">
                  <p>{{ detail.value }}</p>
                </DisclosurePanel>
              </Disclosure>
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
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/vue'
import { StarIcon } from '@heroicons/vue/20/solid'
import { HeartIcon, MinusIcon, PlusIcon } from '@heroicons/vue/24/outline'
import { usePropertiesStore } from '~/store/DataStore'

const route = useRoute()
const store = usePropertiesStore()

await useAsyncData(
  'property',
  () => store.find(route.params.id)
)

const property = computed(() => store.property)
</script>
