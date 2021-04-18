<template>
  <div>
    <form>
      <div>
        <label for="new-product-name-input">Name</label>
        <input id="new-product-name-input" type="text" v-model="product.name">
      </div>
      <div>
        <label for="new-product-price-input">Unit price</label>
        <input id="new-product-price-input" type="number" v-model="product.price">
      </div>
      <div v-if="getCategoriesLoading">Loading categories</div>
      <div v-else>
        <label for="new-product-category-select">Category</label>
        <select v-model="product.category" id="new-product-category-select">
          <option disabled value="">Select category</option>
          <option v-for="category in allCategories" :key="category">{{ category }}</option>
        </select>
      </div>
    </form>
    <button @click="postProduct" v-bind:disabled="postProductLoading">Add</button>
    <router-link to="/products">
      <button>Cancel</button>
    </router-link>
  </div>
</template>

<script>
import {api} from "../../api/api";

export default {
  name: "NewProduct",
  data: function () {
    return {
      product: {
        name: '',
        price: 0,
        category: '',
      },
      allCategories: [],
      getCategoriesLoading: false,
      getCategoriesError: null,
      postProductLoading: false,
      postProductError: null,
    };
  },
  methods: {
    getCategories: async function () {
      this.getCategoriesLoading = true;
      this.getCategoriesError = null;
      try {
        this.allCategories = await api.getCategories();
        this.getCategoriesLoading = false;
      } catch (getCategoriesError) {
        this.getCategoriesLoading = false;
        this.getCategoriesError = getCategoriesError;
      }
    },
    postProduct: async function () {
      this.postProductLoading = true;
      this.postProductError = null;
      try {
        await api.postProduct(this.product);
        this.postProductLoading = false;
        this.postProductError = null;
        await this.$router.push('/products');
      } catch (postProductError) {
        this.postProductLoading = false;
        this.postProductError = postProductError;
      }
    },
  },
  mounted() {
    this.getCategories();
  },
};
</script>

<style scoped>

</style>