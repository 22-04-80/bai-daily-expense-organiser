<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-2 bg-light vh-100 menu">
        <h5>
          <router-link class="nav-link" to="/">
            Daily expense organiser
          </router-link>
        </h5>
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
      <div class="col-sm-10 content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Groceries from "./components/Groceries/Groceries.vue";
import Products from "./components/Products/Products.vue";
import Categories from "./components/Categories.vue";
import Dashboard from "./components/Dashboard/Dashboard.vue";

export default {
  name: "App",
  components: {
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
}
.menu {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 17%;
}
.content {
  top: 0;
  bottom: 0;
  position: fixed;
  left: 17%;
  overflow: auto;
}
.nav-link {
  color: #2c3e50;
}
.router-link-active {
  color: rgba(27, 104, 8, 0.89);
}

</style>
