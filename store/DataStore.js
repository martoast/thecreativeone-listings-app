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
      const url = 'http://localhost:8080/properties/';
      this.properties = await $fetch(url);
    },

    async find(ID) {
      const url = `http://localhost:8080/properties/${ID}`;
      this.property = await $fetch(url);
    },

    async store(params) {
      const url = params.property.ID
        ? `http://localhost:8080/properties/${params.property.ID}`
        : "http://localhost:8080/properties/";
      const method = params.property.ID ? 'put' : 'post';

      return $fetch(url, {
        method: method,
        body: params.form
      });
    },

    async delete(ID) {
      const url = `http://localhost:8080/properties/${ID}`;
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
