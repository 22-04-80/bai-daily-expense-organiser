<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-2 bg-light vh-100">
        <h5>Daily expense organiser</h5>
        <hr />
        <ul class="nav flex-column">
          <li class="nav-item">
            <router-link class="nav-link" to="/groceries"
              >Groceries</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/products">Products</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/categories"
              >Categories</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/dashboard"
              >Dashboard</router-link
            >
          </li>
        </ul>
      </div>
      <div class="col-sm-10">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Groceries from "./components/Groceries/Groceries.vue";
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
