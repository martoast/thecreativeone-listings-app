// stores/properties.js
import { defineStore } from 'pinia';

export const usePropertiesStore = defineStore('properties', {
  state: () => ({
    properties: [],
    property: {}
  }),

  actions: {
    async get() {
      console.log("Attempting to get properties");
      const url = 'https://mycreativefinancing-wiy7b.ondigitalocean.app/properties/';
      this.properties = await $fetch(url);
    },

    async find(ID) {
      const url = `https://mycreativefinancing-wiy7b.ondigitalocean.app/properties/${ID}`;
      this.property = await $fetch(url);
    },

    async store(params) {
      const url = params.property.ID
        ? `https://mycreativefinancing-wiy7b.ondigitalocean.app/properties/${params.property.ID}`
        : "https://mycreativefinancing-wiy7b.ondigitalocean.app/properties/";
      const method = params.property.ID ? 'put' : 'post';

      return $fetch(url, {
        method: method,
        body: params.property
      });
    },

    async delete(ID) {
      const url = `https://mycreativefinancing-wiy7b.ondigitalocean.app/properties/${ID}`;
      return $fetch(url, {
        method: 'delete'
      });
    }
  },

  getters: {
    getProperties: (state) => state.properties,
    getProperty: (state) => state.property
  }
});
