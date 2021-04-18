<template>
  <div>
    <div class="top-bar">
      <div/>
      <div>
        <h1>Products</h1>
      </div>
      <div class="settings">
        <button v-bind:class="filterBy ? 'active' : ''" @click="filter">filter</button>
        <button v-bind:class="sortType === 'DSC' ? 'active' : ''" @click="sort">sort</button>
      </div>
    </div>
    <hr />
    <div v-if="loading">
      <h1>Loading...</h1>
    </div>
    <div v-if="!loading && products.length > 0" class="product-list">
      <ProductTile
          v-for="product in products"
          v-bind:key="product.name"
          v-bind:product="product"
          v-bind:shops="getShopsByCategory(product.category)"
      />
      <router-link to="/new-product">
        <FloatingActionButton text='Add'/>
      </router-link>
    </div>
    <div v-if="!loading && products.length === 0">
      <h1>No products</h1>
    </div>
    <div v-if="error">
      <p>
        Something went wrong when loading products
      </p>
      <p>
        Please try again later
      </p>
    </div>
  </div>
</template>

<script>
import {api} from "../../api/api";
import FloatingActionButton from "./../FloatingActionButton";
import ProductTile from './ProductTile';
import {filterByCategory} from "./filterByCategory";
import {sortByPrice} from "./sortByPrice";
import {SORT_TYPE} from "./sortType";

export default {
  name: "Products",
  components: {
    ProductTile,
    FloatingActionButton,
  },
  data: function () {
    return ({
      loading: false,
      error: null,
      allProducts: [],
      products: [],
      sortType: SORT_TYPE.NONE,
      filterBy: '',

      getShopsLoading: false,
      getShopsError: null,
      allShops: [],
    });
  },
  methods: {
    filter: function () {
      if (this.filterBy) {
        this.products = [...this.allProducts];
        sortByPrice(this.products, this.sortType);
        this.filterBy = '';
      }
      else {
        this.filterBy = 'fish';
        this.products = this.products.filter((product => product.category === this.filterBy));
      }
    },
    sort: function () {
      if (!this.sortType || this.sortType === "DSC") {
        sortByPrice(this.products, SORT_TYPE.ASCENDING);
        this.sortType = SORT_TYPE.ASCENDING;
      }
      else {
        sortByPrice(this.products, SORT_TYPE.DESCENDING);
        this.sortType = SORT_TYPE.DESCENDING;
      }
    },
    getProducts: async function () {
      this.loading = true;
      this.error = null;
      try {
        this.allProducts = await api.getProducts();
        this.products = await api.getProducts();
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.error = error;
      }
    },
    getShops: async function () {
      this.getShopsLoading = true;
      this.getShopsError = null;
      try {
        this.allShops = await api.getShops();
        this.getShopsLoading = false;
      } catch (getShopsError) {
        this.getShopsLoading = false;
        this.getShopsError = getShopsError;
      }
    },
    getShopsByCategory: function (category) {
      return this.allShops.filter(shop => shop.category === category);
    },
  },
  mounted: async function () {
    await this.getProducts();
    await this.getShops();
    if (this.$route.query.category) {
      this.filterBy = this.$route.query.category;
      this.products = filterByCategory(this.products, this.filterBy);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.settings {
  display: flex;
}

button {
  transition: 0.2s color;
}

button:hover {
  color: orange;
}

button.active {
  color: orange;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
}
</style>
