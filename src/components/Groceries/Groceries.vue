<template>
  <div>
    <div class="top-bar">
      <div>
        <h1>Groceries</h1>
      </div>
    </div>
    <hr />
    <div v-if="!loading" class="groceries-list">
      <GroceryList
          v-for="grocery in sortGroceries()"
          v-bind:key="grocery.list_name"
          :grocery="grocery"
      />
    </div>
    <div v-else>
      <h1>Loading...</h1>
    </div>
    <router-link class="nav-link" to="/new-grocery-list">
      <FloatingActionButton text="Add new list"/>
    </router-link>
  </div>
</template>

<script>
import {api} from '../../api/api.js'
import GroceryList from "./GroceryList";
import FloatingActionButton from "./../FloatingActionButton";

export default {
  name: "Groceries",
  components: {
    GroceryList,
    FloatingActionButton,
  },
  data: function () {
    return ({
      loading: false,
      error: null,
      allGroceries: [],
    });
  },
  methods: {
    sortGroceries() {
      return this.allGroceries.sort((a, b) => (a.created_at != b.created_at) ? a.created_at - b.created_at: a.created_at - b.created_at+1)
    }
  },
  mounted: async function () {
    this.loading = true;
    this.error = null;
    try {
      this.allGroceries = await api.getShoppingLists();
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.error = error;
    }
  },
};
</script>

<style scoped>
</style>
