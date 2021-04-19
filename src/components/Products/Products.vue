<template>
  <div>
    <div class="top-bar">
      <div/>
      <div>
        <h1>Products</h1>
      </div>
      <div class="settings">
        <button
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            class="btn btn-primary btn-lg dropdown-toggle"
        >
          filter
        </button>
        <ul class="dropdown-menu">
          <li v-for="category in categories" :key="category" @click="applyFilter(category)">
            <span class="dropdown-item">{{ category }}</span>
          </li>
        </ul>
        <button
            :class="sortType === 'DSC'
              ? 'sort btn btn-primary btn-lg'
              : 'sort btn btn-secondary btn-lg'"
            @click="sort"
        >
          sort
        </button>
      </div>
    </div>
    <hr/>
    <div v-if="filterBy" class="selected-filters">
      <h3>Selected filter</h3>
      <button class="btn btn-primary" @click="applyFilter()">{{ filterBy }} x</button>
      <hr/>
    </div>
    <div v-if="loading.products">
      <h1>Loading...</h1>
    </div>
    <div v-if="!loading.products && products.length > 0" class="product-list">
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
    <div v-if="!loading.products && products.length === 0">
      <h1>No products</h1>
    </div>
    <div v-if="error.products">
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
import {filterByCategory} from "./filterByCategory";
import ProductTile from './ProductTile';
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
      loading: {
        products: false,
        shops: false,
        categories: false,
      },
      error: {
        products: null,
        shops: null,
        categories: null,
      },
      allProducts: [],
      allShops: [],
      categories: [],
      products: [],
      sortType: SORT_TYPE.NONE,
      filterBy: '',
    });
  },
  methods: {
    applyFilter: function (category) {
      this.filterBy = category;
      this.products = filterByCategory(this.allProducts, category);
      sortByPrice(this.products, this.sortType);
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
      this.loading.products = true;
      this.error.products = null;
      try {
        this.allProducts = await api.getProducts();
        this.products = await api.getProducts();
        this.loading.products = false;
      } catch (error) {
        this.loading.products = false;
        this.error.products = error;
      }
    },
    getShops: async function () {
      this.loading.shops = true;
      this.error.shops = null;
      try {
        this.allShops = await api.getShops();
        this.loading.shops = false;
      } catch (getShopsError) {
        this.loading.shops = false;
        this.error.shops = getShopsError;
      }
    },
    getCategories: async function () {
      this.loading.categories = true;
      this.error.categories = null;
      try {
        this.categories = await api.getCategories();
        this.loading.categories = false;
      } catch (getCategoriesError) {
        this.loading.categories = false;
        this.error.categories = getCategoriesError;
      }
    },
    getShopsByCategory: function (category) {
      return this.allShops.filter(shop => shop.category === category);
    },
  },
  mounted: async function () {
    await this.getProducts();
    if (this.$route.query.category) {
      this.filterBy = this.$route.query.category;
      this.products = filterByCategory(this.products, this.filterBy);
    }
    await this.getShops();
    await this.getCategories();
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

.product-list {
  display: flex;
  flex-wrap: wrap;
}

.sort {
  margin-left: 16px;
}

.selected-filters {
  margin: 16px 0;
  text-align: left;
}
</style>
