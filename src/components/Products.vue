<template>
  <h1>Hello Products</h1>
  <h2>Products</h2>
  <h2 v-if="loading">Loading</h2>
  <h2 v-if="!!error">{{error}}</h2>
  <div v-if="products.length !== 0">
    <ul>
      <li v-for="product in products" v-bind:key="product.name">
        <span>{{product.name}}</span>, <span>{{product.price}}</span>, <span>{{product.category}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import {api} from '@/api/api';
export default {
  name: "Products",
  data: function() {
    return {
      loading: false,
      error: null,
      products: [],
    }
  },
  methods: {
    getProducts: async function () {
      this.loading = true;
      this.error = null;
      try {
        this.products = await api.getProducts();
        this.loading = false;
        this.error = null;
      } catch (error) {
        this.loading = false;
        this.error = error;
      }
    },
  },
  mounted: function () {
    this.getProducts();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
