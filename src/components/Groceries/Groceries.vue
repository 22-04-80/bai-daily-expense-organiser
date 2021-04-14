<template>
  <div>
    <div class="top-bar">
      <div>
        <h1>Groceries</h1>
      </div>
    </div>
    <div class="groceries-list">
      <GroceryList
          v-for="grocery in allGroceries"
          v-bind:key="grocery.list_name"
          :grocery="grocery"
      />
    </div>
    <NewGroceryListButton/>
  </div>
</template>

<script>
import {api} from '../../api/api.js'
import GroceryList from "./GroceryList";
import NewGroceryListButton from "./NewGroceryListButton";

export default {
  name: "Groceries",
  components: {
    GroceryList,
    NewGroceryListButton,
  },
  data: function () {
    return ({
      loading: false,
      error: null,
      allGroceries: [],
    });
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
