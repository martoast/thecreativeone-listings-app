<template>
    <form @submit.prevent="handleSubmit">
      <div class="space-y-12">
        <div class="border-b border-white/10 pb-4" :class="property.address ? 'pb-8' : 'pb-0'">
          <h2 class="text-base font-semibold leading-7">Property Details</h2>
          <p class="mt-1 text-sm leading-6 text-gray-700">You can add or update the details of the property from here.</p>
           <!-- Toggle for apartment -->
        <div v-if="!props.property">
          <div class="mt-5 flex items-center">
          <input v-model="data.form.is_appartment" type="checkbox" id="is_appartment" class="mr-2">
          <label for="is_appartment" class="block text-sm font-medium leading-6">Is it an apartment or condo?</label>
          </div>

          <!-- Unit Number and Property Type -->
          <div v-if="data.form.is_appartment" class="mt-3 flex space-x-4">
            <div class="flex-1">
              <label for="type" class="block text-sm font-medium leading-6">Property Type</label>
              <select v-model="data.form.type" id="type" class="block w-full border-gray-400 rounded-md py-1.5 shadow-sm focus:ring-indigo-500 sm:text-sm sm:leading-6">
                <option value="">Select Property Type</option>
                <option value="SUITE">Suite</option>
                <option value="UNIT">Unit</option>
                <option value="APARTMENT">Apartment</option>
                <option value="RM">Room</option>
              </select>
            </div>
            <div class="flex-1">
              <label for="unit-number" class="block text-sm font-medium leading-6">Unit Number</label>
              <input v-model="data.form.unit_number" type="text" id="unit-number" class="block w-full border-gray-400 rounded-md py-1.5 shadow-sm focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Unit Number">
            </div>
          </div>

          <div class="mt-5">
            <mapbox-search-box
                :access-token="access_token"
                placeholder="Search Address"
                :options="{
                  country: 'US',
                  limit:6,
                  bbox: [-171.791110603, 18.91619, -66.96466, 71.3577635769],
                }"
                types="address"
                @retrieve="handleRetrieve"
                proximity="ip"
              >
            </mapbox-search-box>
          </div>

          <GoogleMap ref="mapRef" :api-key="googleMapsApiKey" class="map" :zoom="15">
        </GoogleMap>
        </div>

          
          <div v-if="!data.loading && data.form.address || props.property" class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mt-5">
            <!-- Each input field below corresponds to a property attribute -->
            
            <div class="col-span-3">
              <label for="address" class="block text-sm font-medium leading-6">Full Address</label>
              <input v-model="property.address" required type="text" id="address" class="block w-full border-gray-400 rounded-md py-1.5 shadow-sm focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Property Address">
            </div>

            <div>
              <!-- Sold Checkbox -->
            <div class="sm:col-span-3 flex items-center mb-3">
              <input v-model="property.sold" type="checkbox" id="sold" class="mr-2">
              <label for="sold" class="block text-sm font-medium leading-6">Sold: {{property.sold}}</label>
            </div>

            <!-- Assisted Living Checkbox -->
            <div class="sm:col-span-3 flex items-center">
              <input v-model="property.assisted_living" type="checkbox" id="assisted_living" class="mr-2">
              <label for="assisted_living" class="block text-sm font-medium leading-6">Assisted Living: {{property.assisted_living}}</label>
            </div>
            </div>

            <div class="sm:col-span-3">
                <label for="property-type" class="block text-sm font-medium leading-6">Property Type</label>
                <input v-model="property.property_type" type="text" id="property-type" class="block w-full border-gray-400 rounded-md py-1.5 shadow-sm focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Type of Property">
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
              <label for="price" class="block text-sm font-medium leading-6">Price</label>
              <input v-model="property.price" required type="number" id="price" class="block w-full border-gray-400 rounded-md py-1.5 shadow-sm focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Price in USD">
            </div>

            <div v-if="property.assisted_living" class="sm:col-span-3">
              <label for="assisted_living_rate" class="block text-sm font-medium leading-6">AssistedLiving Rate</label>
              <input v-model="property.assisted_living_rate" :required="property.assisted_living" type="number" id="assisted_living_rate" class="block w-full border-gray-400 rounded-md py-1.5 shadow-sm focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Price in USD">
            </div>

            <div v-if="property.assisted_living" class="sm:col-span-3">
                <label for="google-review-url" class="block text-sm font-medium leading-6">Google review URL</label>
                <input v-model="property.google_review_url" type="text" id="google-review-url" class="block w-full border-gray-400 rounded-md py-1.5 shadow-sm focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="URL for google reviews">
            </div>

            <div class="sm:col-span-3">
              <label for="monthly_hoa_fee" class="block text-sm font-medium leading-6">Monthly HOA Fee</label>
              <input v-model="property.monthly_hoa_fee" type="number" id="monthly_hoa_fee" class="block w-full border-gray-400 rounded-md py-1.5 shadow-sm focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="HOA Fee in USD">
            </div>

        
            <!-- Description -->
          <div class="col-span-full">
            <label for="description" class="block text-sm font-medium leading-6">Description</label>
            <textarea v-model="property.description" id="description" rows="3" class="block w-full border-gray-400 rounded-md py-1.5 shadow-sm focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Description of the property"></textarea>
          </div>


          <div class="sm:col-span-3">
              <label for="latitude" class="block text-sm font-medium leading-6">Latitude</label>
              <input v-model="property.latitude" required type="number" step="any" id="latitude" class="block w-full border-gray-400 rounded-md py-1.5 shadow-sm focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Latitude">
          </div>

          <div class="sm:col-span-3">
              <label for="longitude" class="block text-sm font-medium leading-6">Longitude</label>
              <input v-model="property.longitude" required type="number" step="any" id="longitude" class="block w-full border-gray-400 rounded-md py-1.5 shadow-sm focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Longitude">
          </div>


          











            <div class="sm:col-span-3">
                <label for="rent-zestimate" class="block text-sm font-medium leading-6">Estimated Rent</label>
                <input v-model="property.rent_zestimate" type="number" id="rent-zestimate" class="block w-full border-gray-400 rounded-md py-1.5 shadow-sm focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Estimated Rent">
            </div>

            <div class="sm:col-span-3">
                <label for="zestimate" class="block text-sm font-medium leading-6">Estimated Value</label>
                <input v-model="property.zestimate" type="number" id="zestimate" class="block w-full border-gray-400 rounded-md py-1.5 shadow-sm focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Estimated Value">
            </div>

            <div class="sm:col-span-3">
                <label for="price_per_square_foot" class="block text-sm font-medium leading-6">Price Per Square Foot</label>
                <input v-model="property.price_per_square_foot" type="number" id="price_per_square_foot" class="block w-full border-gray-400 rounded-md py-1.5 shadow-sm focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Price Per Square Foot">
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

        <!-- Living Area -->
        <div class="sm:col-span-3">
        <label for="lot-size" class="block text-sm font-medium leading-6">Living Area (sq ft)</label>
        <input v-model="property.living_area" type="number" id="living-area" class="block w-full border-gray-400 rounded-md py-1.5 shadow-sm focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Living Area in Square Feet">
        </div>

        <div class="sm:col-span-3">
        <label for="zoning" class="block text-sm font-medium leading-6">Zoning</label>
        <input v-model="property.zoning" type="text" id="zoning" class="block w-full border-gray-400 rounded-md py-1.5 shadow-sm focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Zoning">
        </div>

        <!-- Dynamic Image URL Fields -->
        <div class="col-span-full">
            <label for="images" class="block text-sm font-medium leading-6">Images (URLs)</label>
            <div v-for="(image, index) in property.images" :key="index" class="flex space-x-2 mb-2">
              <input v-model="property.images[index]" type="text" class="block w-full border-gray-400 rounded-md py-1.5 shadow-sm focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Image URL">
              <button @click.prevent="removeImage(index)" type="button" class="text-red-500 hover:text-red-700">Remove</button>
            </div>
            <button @click.prevent="addImage" type="button" class="mt-2 text-indigo-500 hover:text-indigo-700">Add Image URL</button>
          </div>

          <div class="col-span-full">
            <label for="amenities" class="block text-sm font-medium leading-6">Amenities</label>
            <div v-for="(amenity, index) in property.amenities" :key="index" class="flex space-x-2 mb-2">
              <input v-model="property.amenities[index]" type="text" class="block w-full border-gray-400 rounded-md py-1.5 shadow-sm focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Describe amenity...">
              <button @click.prevent="removeAmenity(index)" type="button" class="text-red-500 hover:text-red-700">Remove</button>
            </div>
            <button @click.prevent="addAmenity" type="button" class="mt-2 text-indigo-500 hover:text-indigo-700">Add Amenity</button>
          </div>

      

          <div class="sm:col-span-3">
              <label for="purchase_price" class="block text-sm font-medium leading-6">Purchase Price</label>
              <input v-model="property.purchase_price" type="number" id="purchase_price" class="block w-full border-gray-400 rounded-md py-1.5 shadow-sm focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Purchase Price">
            </div>

            <div class="sm:col-span-3">
              <label for="balance_to_close" class="block text-sm font-medium leading-6">Balance to Close</label>
              <input v-model="property.balance_to_close" type="number" id="balance_to_close" class="block w-full border-gray-400 rounded-md py-1.5 shadow-sm focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Balance to Close">
            </div>

            <div class="sm:col-span-3">
              <label for="monthly_holding_cost" class="block text-sm font-medium leading-6">Monthly Holding Cost</label>
              <input v-model="property.monthly_holding_cost" type="number" id="monthly_holding_cost" class="block w-full border-gray-400 rounded-md py-1.5 shadow-sm focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Monthly Holding Cost">
            </div>

            <div class="sm:col-span-3">
              <label for="interest_rate" class="block text-sm font-medium leading-6">Interest Rate</label>
              <input 
                v-model="property.interest_rate" 
                type="number" 
                id="interest_rate" 
                class="block w-full border-gray-400 rounded-md py-1.5 shadow-sm focus:ring-indigo-500 sm:text-sm sm:leading-6" 
                placeholder="Interest Rate" 
                step="0.01" 
                min="0"
                max="100"
              >
            </div>
          
          </div>

          <div v-else-if="data.loading">
            Loading

          </div>
        </div>
  
        <div class="mt-6 pb-6 flex items-center justify-end gap-x-6">
          <a href="/admin">
            <button type="button" class="text-sm font-semibold leading-6">Cancel</button>
          </a>
          <button :disabled="data.form.loading || !property.price" type="submit" class="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400">Save</button>
        </div>
      </div>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import { usePropertiesStore } from '~/store/DataStore'
import { GoogleMap, Marker } from 'vue3-google-map';
import debounce from 'lodash.debounce'

const config = useRuntimeConfig()

const access_token = config.public.MAPBOX_API_TOKEN;
const zillowApiKey = config.public.ZILLOW_API_KEY;
const googleMapsApiKey = config.public.GOOGLE_MAPS_API_KEY;

const props = defineProps({
  property: Object
});

const mapRef = ref(null);


const data = reactive({
  loading: false,
  errors: {},
  form: {
    latitude: null,
    longitude: null,
    address: null,
    unit_number: null,
    is_appartment: null,
    type: null,
    loading: false
  },
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
  images: [], // Initialize as a JSON string
  sold: false,
  bedrooms: null,
  bathrooms: null,
  rent_zestimate: null,
  zestimate: null,
  property_type: '',
  zoning: '',
  lot_size: null,
  living_area: null,
  year_built: null,
  price_per_square_foot: null,
  purchase_price: null,
  balance_to_close: null,
  monthly_holding_cost: null,
  interest_rate: null,
  nearby_schools: [],
  price_history: [],
  tax_history: [],
  monthly_hoa_fee: null,
  assisted_living: false,
  latitude: null,
  longitude: null,
  assisted_living_rate: null,
  amenities: [],
  google_review_url: null

};


const property = ref({ ...defaultProperty });

onMounted(() => {
  if (props.property) {
    property.value = { ...props.property };
    if (typeof property.value.images === 'string') {
      try {
        property.value.images = JSON.parse(property.value.images);
        if (!Array.isArray(property.value.images)) {
          property.value.images = [];
        }
      } catch (error) {
        property.value.images = [];
      }
    }

    // Handle amenities
    if (typeof property.value.amenities === 'string') {
      try {
        property.value.amenities = JSON.parse(property.value.amenities);
        if (!Array.isArray(property.value.amenities)) {
          property.value.amenities = [];
        }
      } catch (error) {
        property.value.amenities = [];
      }
    } else if (!Array.isArray(property.value.amenities)) {
      property.value.amenities = [];
    }
  }
});

const apiUrl = ref(`https://zillow-com1.p.rapidapi.com/property?address=`);

const updateAddress = async () => {
  let fullAddress = data.form.address;
  if (data.form.is_appartment && data.form.unit_number) {
    fullAddress += `, ${data.form.type} ${data.form.unit_number}`;
  }
  property.value.address = fullAddress;

  // Trigger the API request with the updated address
  if (!props.property) {
    data.loading = true;
    apiUrl.value = `https://zillow-com1.p.rapidapi.com/property?address=${encodeURIComponent(fullAddress)}`;
    await fetchPropertyData();
  }
};



watch(
  () => property.value.balance_to_close,
  (newBalanceToClose) => {
    if (Number(newBalanceToClose > 0)) {
      property.value.price = Number(newBalanceToClose);
    }
  }
);

const fetchPropertyData = async () => {
  const { data, error } = await $fetch(apiUrl.value, {
    headers: {
      'X-RapidAPI-Key': zillowApiKey,
      'X-RapidAPI-Host': 'zillow-com1.p.rapidapi.com'
    },
    onRequest({ request, options }) {
      // Set the request headers
      options.headers = options.headers || {};
    },
    onRequestError({ request, options, error }) {
      // Handle the request errors
      console.error('Request error:', error);
    },
    onResponse({ request, response, options }) {
      // Process the response data
      if (response.ok) {
        fetchPropertyImages(response._data.zpid);
        property.value.price = response._data.price;
        property.value.bedrooms = response._data.bedrooms;
        property.value.bathrooms = response._data.bathrooms;
        property.value.description = response._data.description;
        property.value.rent_zestimate = response._data.rentZestimate;
        property.value.zestimate = response._data.zestimate;
        property.value.property_type = response._data.homeType;
        property.value.zoning = response._data.zoning ? response._data.zoning : response._data.resoFacts.zoning;
        property.value.lot_size = response._data.lotSize ? response._data.lotSize : null;
        property.value.living_area = response._data.livingArea;
        property.value.year_built = response._data.yearBuilt;
        property.value.price_per_square_foot = response._data.resoFacts.pricePerSquareFoot;
        property.value.nearby_schools = response._data.schools;
        property.value.price_history = response._data.priceHistory;
        property.value.tax_history = response._data.taxHistory;
        property.value.monthly_hoa_fee = response._data.monthlyHoaFee;
        property.value.latitude = response._data.latitude;
        property.value.longitude = response._data.longitude;
        // Update other properties as needed
      } else {
        console.error('Response error:', response.status);
      }
    },
    onResponseError({ request, response, options }) {
      // Handle the response errors
      console.error('Response error:', response.status);
    }
  });
};

const handleSubmit = async (e) => {
  data.form.loading = true;
  const propertiesStore = usePropertiesStore();
  

  if (props.property && props.property.ID) {
    // update the existing property
    let propertyToSubmit = {
    ...property.value,
    images: JSON.stringify(property.value.images),
    amenities: JSON.stringify(property.value.amenities),
  };
    console.log('Updating property...', propertyToSubmit);
    await propertiesStore.store({ property: propertyToSubmit });
  } else {
    // create a new property
    let propertyToSubmit = {
    ...property.value,
    nearby_schools: JSON.stringify(property.value.nearby_schools),
    images: JSON.stringify(property.value.images),
    price_history: JSON.stringify(property.value.price_history),
    tax_history: JSON.stringify(property.value.tax_history),
    amenities: JSON.stringify(property.value.amenities),
  };
    console.log('Creating new property...', propertyToSubmit);
    await propertiesStore.store({ property: propertyToSubmit });
  }
  data.form.loading = false;
  await navigateTo('/admin/');
};

const handleRetrieve = async (event) => {
  if (event.detail.features.length) {
    data.form.latitude = event.detail.features[0].properties.coordinates.latitude;
    data.form.longitude = event.detail.features[0].properties.coordinates.longitude;
    data.form.address = event.detail.features[0].properties.full_address;
    updateAddress();
    if (data.form.is_appartment && data.form.unit_number) {
      property.value.address += ` Unit ${data.form.unit_number}, ${data.form.type}`;
    }

  } else {
    alert('You must search a location and select from the dropdown menu.');
  }
};

const fetchPropertyImages = async (zpid) => {
  const apiUrl = `https://zillow-com1.p.rapidapi.com/images?zpid=${zpid}`;
  const response = await $fetch(apiUrl, {
    headers: {
      'X-RapidAPI-Key': zillowApiKey,
      'X-RapidAPI-Host': 'zillow-com1.p.rapidapi.com'
    }
  });
  if (response.images.length) {
    property.value.images = response.images.slice(0, 12);
  } else {
    console.error('Error fetching images');
  }
  data.loading = false;
};

const addImage = () => {
  property.value.images.push('');
};

const removeImage = (index) => {
  property.value.images.splice(index, 1);
};

const addAmenity = () => {
  property.value.amenities.push('');
};

const removeAmenity = (index) => {
  property.value.amenities.splice(index, 1);
};



</script>
