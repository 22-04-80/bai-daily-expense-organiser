<template>
  <div>
    <div class="top-bar">
      <div/>
      <div>
        <h1>Products</h1>
      </div>
      <div class="settings">
        <button v-bind:class="filterApplied ? 'active' : ''" @click="filter">filter</button>
        <button v-bind:class="sortType === 'DSC' ? 'active' : ''" @click="sort">sort</button>
      </div>
    </div>
    <div v-if="loading">
      <h1>
        Loading...
      </h1>
    </div>
    <div v-if="!loading && products.length > 0" class="product-list">
      <ProductTile
          v-for="product in products"
          v-bind:key="product.name"
          v-bind:product="product"
      />
      <router-link to="/new-product">
        <NewProductButton/>
      </router-link>
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
import NewProductButton from "./NewProductButton";
import ProductTile from './ProductTile';
import {sortByPrice} from "./sortByPrice";
import {SORT_TYPE} from "./sortType";

export default {
  name: "Products",
  components: {
    ProductTile,
    NewProductButton,
  },
  data: function () {
    return ({
      loading: false,
      error: null,
      allProducts: [],
      products: [],
      sortType: SORT_TYPE.NONE,
      filterApplied: false,
    });
  },
  methods: {
    filter: function () {
      if (this.filterApplied) {
        this.products = [...this.allProducts];
        sortByPrice(this.products, this.sortType);
        this.filterApplied = false;
      }
      else {
        this.products = this.products.filter((product => product.category === "fish"));
        this.filterApplied = true;
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
  },
  mounted: async function () {
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
