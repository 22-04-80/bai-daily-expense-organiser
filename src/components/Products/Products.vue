<template>
  <div>
    <div class="top-bar">
      <div/>
      <div>
        <h1>Products</h1>
      </div>
      <div class="settings">
        <div class="filter" @click="filter">filter</div>
        <div class="sort" @click="sort">sort</div>
      </div>
    </div>
    <div class="product-list">
      <ProductTile
          v-for="product in products"
          v-bind:key="product.name"
          v-bind:product="product"
      />
    </div>
  </div>
</template>

<script>
import {getProducts} from "./getProducts";
import ProductTile from './ProductTile';

export default {
  name: "Products",
  components: {
    ProductTile,
  },
  data: function () {
    return ({
      loading: false,
      error: null,
      allProducts: [],
      products: [],
      sortType: "",
      filterApplied: false,
    });
  },
  methods: {
    filter: function () {
      if (this.filterApplied) {
        this.products = [...this.allProducts];
        this.filterApplied = false;
      }
      else {
        this.products = this.products.filter((prodcut => prodcut.category === "fish"));
        this.filterApplied = true;
      }
    },
    sort: function () {
      if (!this.sortType) {
        this.products.sort((product1, product2) => {
          if (product1.price > product2.price) return 1;
          if (product1.price < product2.price) return -1;
          if (product1.price === product2.price) return 0;
        });
        this.sortType = "ASC";
      }
      else if (this.sortType === "ASC") {
        this.products.sort((product1, product2) => {
          if (product1.price > product2.price) return -1;
          if (product1.price < product2.price) return 1;
          if (product1.price === product2.price) return 0;
        });
        this.sortType = "DSC";
      }
      else if (this.sortType === "DSC") {
        this.products = [...this.allProducts];
        this.sortType = "";
      }
    },
  },
  mounted: async function () {
    this.loading = true;
    this.error = null;
    try {
      this.allProducts = await getProducts();
      this.products = await getProducts();
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

.filter, .sort {
  padding: 16px;
  transition: 0.2s color;
}

.filter:hover, .sort:hover {
  color: orange;
  cursor: pointer;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
}
</style>
