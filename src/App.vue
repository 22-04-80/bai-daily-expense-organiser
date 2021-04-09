<template>
  <h1>Daily expense organiser</h1>
  <div id="nav">
    <router-link to="/groceries">Groceries</router-link> |
    <router-link to="/products">Products</router-link> |
    <router-link to="/categories">Categories</router-link> |
    <router-link to="/dashboard">Dashboard</router-link>
  </div>
  <router-view />
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Groceries from "./components/Groceries.vue";
import Products from "./components/Products.vue";
import Categories from "./components/Categories.vue";
import Dashboard from "./components/Dashboard.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
    Groceries,
    Products,
    Categories,
    Dashboard,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
