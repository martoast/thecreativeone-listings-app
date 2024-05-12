<template>
  <div class="container mx-auto">
    <div class="pt-8 px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold leading-6 text-gray-900">Properties</h1>
        <p class="mt-2 text-sm text-gray-700">A list of all the properties in your account including their address, price, and details.</p>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <a href="/admin/properties/create">
          <button type="button" class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add property</button>
        </a>
      </div>
    </div>
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-gray-700 ring-opacity-5 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Address</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Price</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Bedrooms</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Bathrooms</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Square Footage</th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6"> </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="property in properties" :key="property.ID">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ property.address }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ property.price }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ property.bedrooms }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ property.bathrooms }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ property.square_footage }}</td>
                  <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <a :href="'/admin/properties/' + property.ID + '/edit'" class="text-indigo-600 hover:text-indigo-900 mr-6">Edit</a>
                    <button @click="openDeleteModal(property)" class="text-red-600 hover:text-red-800">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <ConfirmationModal v-if="showModal" :property="propertyToDelete" @confirm="deleteProperty" @cancel="hideModal"/>
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
  images: JSON.parse(property.images) // Assuming 'images' is a JSON string of URLs
})))

const showModal = ref(false)
const propertyToDelete = ref(null)

function hideModal() {
  showModal.value = false
  propertyToDelete.value = null
}

function openDeleteModal(property) {
  console.log("setting delete property")
  propertyToDelete.value = property
  showModal.value = true
}

const deleteProperty = async (property) => {
  // Perform the delete operation
  console.log("Property delete confirmed, delete it in the API!." + property.ID)
  await useAsyncData(
    'properties',
    () => store.delete(property.ID)
  )
  showModal.value = false
  propertyToDelete.value = null
}
</script>