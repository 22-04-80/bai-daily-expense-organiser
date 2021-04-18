<template>
  <h1>Dashboard</h1>
  <hr />
  <div v-if="loading.shoppingList || loading.products">
    <h1>Loading...</h1>
  </div>
  <div class="row" v-if="!loading.shoppingList && !loading.products">
    <div class="col-sm-12 mb-5">
      <LineChart
        v-bind:chartData="groceriesHistoryChartData"
        v-bind:chartOptions="groceriesHistoryChartOptions"
      />
    </div>
    <hr />
    <div class="col-sm-12 mb-5">
      <PieChart
        v-bind:chartData="productsCountPerCategoryChartData"
        v-bind:chartOptions="productsCountPerCategoryChartOptions"
      />
    </div>
    <hr />
    <div class="col-sm-12">
      <BarChart
        v-bind:chartData="mostFrequentlyPurchasedChartData"
        v-bind:chartOptions="mostFrequentlyPurchasedChartOptions"
      />
    </div>
  </div>
</template>

<script>
import LineChart from "./Chart/LineChart.vue";
import PieChart from "./Chart/PieChart.vue";
import BarChart from "./Chart/BarChart.vue";
import {
  getChartOptions,
  prepareGroceriesHistoryChartData,
  prepareProductsCountPerCategoryChartData,
  prepareMostFrequentlyPurchasedChartData,
} from "./dashboardUtil";
import { api } from "@/api/api";
export default {
  name: "Dashboard",
  components: {
    LineChart,
    PieChart,
    BarChart,
  },
  data: function () {
    return {
      loading: {
        shoppingLists: true,
        products: true,
      },
      groceriesHistoryChartData: null,
      groceriesHistoryChartOptions: null,
      productsCountPerCategoryChartData: null,
      productsCountPerCategoryChartOptions: null,
      mostFrequentlyPurchasedChartData: null,
      mostFrequentlyPurchasedChartOptions: null,
    };
  },
  methods: {
    getGroceriesHistory: async function () {
      const shoppingList = await api.getShoppingLists();
      this.groceriesHistoryChartData = prepareGroceriesHistoryChartData(
        shoppingList
      );
      this.groceriesHistoryChartOptions = getChartOptions(
        "History of grocery expenses"
      );

      this.mostFrequentlyPurchasedChartData = prepareMostFrequentlyPurchasedChartData(
        shoppingList
      );
      this.mostFrequentlyPurchasedChartOptions = getChartOptions(
        "Most frequently purchased groceries"
      );
      this.loading.shoppingLists = false;
    },
    getProducts: async function () {
      const products = await api.getProducts();
      this.productsCountPerCategoryChartData = prepareProductsCountPerCategoryChartData(
        products
      );
      this.productsCountPerCategoryChartOptions = getChartOptions(
        "Products count per category"
      );
      this.loading.products = false;
    },
  },
  mounted: async function () {
    await this.getGroceriesHistory();
    await this.getProducts();
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
