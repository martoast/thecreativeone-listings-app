<template>
    <form @submit.prevent="handleSubmit">
      <div class="space-y-12">
        <div class="border-b border-white/10 pb-12">
          <h2 class="text-base font-semibold leading-7">Property Details</h2>
          <p class="mt-1 text-sm leading-6 text-gray-700">You can add or update the details of the property from here.</p>
          
          <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <!-- Each input field below corresponds to a property attribute -->
            <div class="col-span-full">
              <label for="address" class="block text-sm font-medium leading-6">Address</label>
              <input v-model="property.address" type="text" id="address" class="block w-full border-gray-400 rounded-md py-1.5 shadow-sm focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Property Address">
            </div>
  
            <!-- Additional fields like price, down_payment, etc. -->
            <div class="sm:col-span-3">
              <label for="price" class="block text-sm font-medium leading-6">Price</label>
              <input v-model.number="property.price" type="number" id="price" class="block w-full border-gray-400 rounded-md py-1.5 shadow-sm focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Price in USD">
            </div>
  
            <div class="sm:col-span-3">
              <label for="down-payment" class="block text-sm font-medium leading-6">Down Payment</label>
              <input v-model.number="property.down_payment" type="number" id="down-payment" class="block w-full border-gray-400 rounded-md py-1.5 shadow-sm focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Down Payment in USD">
            </div>
  
            <!-- More fields can be added similarly -->
          </div>
        </div>
  
        <div class="mt-6 flex items-center justify-end gap-x-6">
          <a href="/admin/properties">
            <button type="button" class="text-sm font-semibold leading-6">Cancel</button>
          </a>
          <button type="submit" class="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400">Save</button>
        </div>
      </div>
    </form>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  property: Object
});

const property = ref(props.property || {
  address: '',
  price: null,
  down_payment: null
});

function handleSubmit() {
  if (props.property) {
    // update the existing property
    console.log('Updating property...', property.value);
  } else {
    // create a new property
    console.log('Creating new property...', property.value);
  }
  // Proceed with API call to save/update
}

function cancelEdit() {
  // reset form or redirect
  console.log('Edit cancelled');
}
</script>
