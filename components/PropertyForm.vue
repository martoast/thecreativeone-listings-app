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
              <input v-model="property.address" required type="text" id="address" class="block w-full border-gray-400 rounded-md py-1.5 shadow-sm focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Property Address">
            </div>
  
            <!-- Additional fields like price, down_payment, etc. -->
            <div class="sm:col-span-3">
              <label for="price" class="block text-sm font-medium leading-6">Price</label>
              <input v-model="property.price" required type="number" id="price" class="block w-full border-gray-400 rounded-md py-1.5 shadow-sm focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Price in USD">
            </div>

            <div class="sm:col-span-3">
                <label for="bedrooms" class="block text-sm font-medium leading-6">Bedrooms</label>
                <input v-model="property.bedrooms" required type="number" id="bedrooms" class="block w-full border-gray-400 rounded-md py-1.5 shadow-sm focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Number of Bedrooms">
            </div>

            <div class="sm:col-span-3">
                <label for="bathrooms" class="block text-sm font-medium leading-6">Bathrooms</label>
                <input v-model="property.bathrooms" required type="number" step="0.5" id="bathrooms" class="block w-full border-gray-400 rounded-md py-1.5 shadow-sm focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Number of Bathrooms">
            </div>

            <div class="sm:col-span-3">
                <label for="square-footage" class="block text-sm font-medium leading-6">Square Footage</label>
                <input v-model="property.square_footage" type="number" id="square-footage" class="block w-full border-gray-400 rounded-md py-1.5 shadow-sm focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Square Footage">
            </div>

            <div class="sm:col-span-3">
                <label for="rent-zestimate" class="block text-sm font-medium leading-6">Rent Zestimate</label>
                <input v-model="property.rent_zestimate" type="number" id="rent-zestimate" class="block w-full border-gray-400 rounded-md py-1.5 shadow-sm focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Estimated Rent">
            </div>
  
  
            <div class="sm:col-span-3">
            <label for="down-payment" class="block text-sm font-medium leading-6">Down Payment</label>
            <input v-model="property.down_payment" type="number" id="down-payment" class="block w-full border-gray-400 rounded-md py-1.5 shadow-sm focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Down Payment in USD">
          </div>

          <!-- Total Price -->
          <div class="sm:col-span-3">
            <label for="total-price" class="block text-sm font-medium leading-6">Total Price</label>
            <input v-model="property.total_price" type="number" id="total-price" class="block w-full border-gray-400 rounded-md py-1.5 shadow-sm focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Total Price in USD">
          </div>

          <!-- Monthly Payment -->
          <div class="sm:col-span-3">
            <label for="monthly-payment" class="block text-sm font-medium leading-6">Monthly Payment</label>
            <input v-model="property.monthly_payment" type="number" id="monthly-payment" class="block w-full border-gray-400 rounded-md py-1.5 shadow-sm focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Monthly Payment in USD">
          </div>

          <!-- Description -->
          <div class="col-span-full">
            <label for="description" class="block text-sm font-medium leading-6">Description</label>
            <textarea v-model="property.description" id="description" rows="3" class="block w-full border-gray-400 rounded-md py-1.5 shadow-sm focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Description of the property"></textarea>
          </div>

          <!-- ARV (After Repair Value) -->
          <div class="sm:col-span-3">
            <label for="arv" class="block text-sm font-medium leading-6">ARV (After Repair Value)</label>
            <input v-model="property.arv" type="number" id="arv" class="block w-full border-gray-400 rounded-md py-1.5 shadow-sm focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="After Repair Value in USD">
          </div>

          <!-- Benefits -->
          <div class="col-span-full">
            <label for="benefits" class="block text-sm font-medium leading-6">Benefits</label>
            <textarea v-model="property.benefits" id="benefits" rows="3" class="block w-full border-gray-400 rounded-md py-1.5 shadow-sm focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Key benefits of the property"></textarea>
          </div>

          <!-- Images (JSON array input as string) -->
          <div class="col-span-full">
            <label for="images" class="block text-sm font-medium leading-6">Images (URLs)</label>
            <input v-model="property.images" type="text" id="images" class="block w-full border-gray-400 rounded-md py-1.5 shadow-sm focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder='["URL1", "URL2"]'>
          </div>

          <div class="sm:col-span-3">
        <label for="property-type" class="block text-sm font-medium leading-6">Property Type</label>
        <input v-model="property.property_type" type="text" id="property-type" class="block w-full border-gray-400 rounded-md py-1.5 shadow-sm focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Type of Property">
        </div>

        <!-- Parking Details -->
        <div class="sm:col-span-3">
        <label for="parking-details" class="block text-sm font-medium leading-6">Parking Details</label>
        <input v-model="property.parking_details" type="text" id="parking-details" class="block w-full border-gray-400 rounded-md py-1.5 shadow-sm focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Parking Information">
        </div>

        <!-- Year Built -->
        <div class="sm:col-span-3">
        <label for="year-built" class="block text-sm font-medium leading-6">Year Built</label>
        <input v-model="property.year_built" type="number" id="year-built" class="block w-full border-gray-400 rounded-md py-1.5 shadow-sm focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Year the Property Was Built">
        </div>

        <!-- Lot Size -->
        <div class="sm:col-span-3">
        <label for="lot-size" class="block text-sm font-medium leading-6">Lot Size (sq ft)</label>
        <input v-model="property.lot_size" type="number" id="lot-size" class="block w-full border-gray-400 rounded-md py-1.5 shadow-sm focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Lot Size in Square Feet">
        </div>

        <!-- Mortgage Balance -->
        <div class="sm:col-span-3">
        <label for="mortgage-balance" class="block text-sm font-medium leading-6">Mortgage Balance</label>
        <input v-model="property.mortgage_balance" type="number" id="mortgage-balance" class="block w-full border-gray-400 rounded-md py-1.5 shadow-sm focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Current Mortgage Balance">
        </div>

        <!-- Interest Rate -->
        <div class="sm:col-span-3">
        <label for="interest-rate" class="block text-sm font-medium leading-6">Interest Rate (%)</label>
        <input v-model="property.interest_rate" type="number" step="0.1" id="interest-rate" class="block w-full border-gray-400 rounded-md py-1.5 shadow-sm focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Interest Rate">
        </div>

        <!-- PITI -->
        <div class="sm:col-span-3">
        <label for="piti" class="block text-sm font-medium leading-6">PITI (Monthly)</label>
        <input v-model="property.piti" type="number" id="piti" class="block w-full border-gray-400 rounded-md py-1.5 shadow-sm focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Principal, Interest, Taxes, Insurance Monthly">
        </div>

        <!-- Exit ROI Strategy -->
        <div class="sm:col-span-6">
        <label for="exit-roi-strategy" class="block text-sm font-medium leading-6">Exit ROI Strategy</label>
        <input v-model="property.exit_roi_strategy" type="text" id="exit-roi-strategy" class="block w-full border-gray-400 rounded-md py-1.5 shadow-sm focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Exit Strategy for ROI">
        </div>

        <!-- Estimate ROI -->
        <div class="sm:col-span-3">
        <label for="estimate-roi" class="block text-sm font-medium leading-6">Estimated ROI (%)</label>
        <input v-model="property.estimate_roi" type="number" id="estimate-roi" class="block w-full border-gray-400 rounded-md py-1.5 shadow-sm focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Estimated ROI in Percentage">
        </div>

        <!-- Monthly Cash Flow -->
        <div class="sm:col-span-3">
        <label for="monthly-cash-flow" class="block text-sm font-medium leading-6">Monthly Cash Flow</label>
        <input v-model="property.monthly_cash_flow" type="number" id="monthly-cash-flow" class="block w-full border-gray-400 rounded-md py-1.5 shadow-sm focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Estimated Monthly Cash Flow">
        </div>

        <!-- Equity Buildup -->
        <div class="sm:col-span-3">
        <label for="equity-buildup" class="block text-sm font-medium leading-6">Equity Buildup</label>
        <input v-model="property.equity_buildup" type="number" id="equity-buildup" class="block w-full border-gray-400 rounded-md py-1.5 shadow-sm focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Equity Buildup Amount">
        </div>

          
          
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

const defaultProperty = {
  address: '',
  price: null,
  down_payment: null,
  total_price: null,
  interest: null,
  monthly_payment: null,
  description: '',
  arv: null,
  benefits: '',
  images: '[]', // Initialize as a JSON string
  sold: false,
  bedrooms: null,
  bathrooms: null,
  square_footage: null,
  rent_zestimate: null,
  property_type: '',
  parking_details: '',
  year_built: null,
  lot_size: null,
  mortgage_balance: null,
  interest_rate: null,
  piti: null,
  exit_roi_strategy: '',
  estimate_roi: null,
  monthly_cash_flow: null,
  equity_buildup: null
};


const property = ref(props.property || {...defaultProperty});

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
