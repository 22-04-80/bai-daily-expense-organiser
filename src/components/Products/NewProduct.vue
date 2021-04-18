<template>
  <div>
    <h1>Add new product</h1>
    <form class="col-sm-6 offset-sm-3">
      <div class="input-group mb-3">
        <span class="input-group-text">Name</span>
        <input class="form-control" type="text" v-model="product.name">
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text">Unit price</span>
        <input class="form-control" type="number" v-model="product.price">
      </div>
      <div v-if="getCategoriesLoading">Loading...</div>
      <div class="input-group mb-3" v-else>
        <span class="input-group-text">Category</span>
        <select class="form-select" v-model="product.category">
          <option disabled value="">Select category</option>
          <option v-for="category in allCategories" :key="category">{{ category }}</option>
        </select>
      </div>
      <div class="button-container">
        <router-link to="/products">
          <button class="btn btn-secondary btn-lg cancel">Cancel</button>
        </router-link>
        <button @click="postProduct" v-bind:disabled="!isFormValid || postProductLoading" class="btn btn-primary btn-lg">Add</button>
    </div>
    </form>
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
  computed: {
    isFormValid() {
      if (this.product.name && this.product.price > 0 && this.product.category) {
        return true
      }
      return false
    }
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
        api.postProduct(this.product);
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
  .button-container {
      display: flex;
      justify-content: flex-end;
    }
  .cancel {
      margin-right: 16px;
    }
</style>