<template>
  <div>
    <div class="top-bar">
      <div>
        <h1>Groceries</h1>
      </div>
    </div>
    <div class="groceries-list">
      <GroceryList
          v-for="grocery in elementsToDisplay"
          v-bind:key="grocery.list_name"
          :grocery="grocery"
      />
    </div>
    <router-link class="nav-link" to="/new-grocery-list">
      <NewGroceryListButton :text="buttonText" class="newGroceryListButton"/>
    </router-link>
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
      buttonText: "Add new list",
      elementsToDisplay: []
    });
  },
  methods: {
    modifyLists() {
      if (api.mockedShoppingLists.length > 0) {
        this.elementsToDisplay =  this.allGroceries.concat(api.mockedShoppingLists)
      } else {
        this.elementsToDisplay =  this.allGroceries
      }
      this.elementsToDisplay.sort((a, b) => (a.created_at != b.created_at) ? a.created_at - b.created_at: a.created_at - b.created_at+1)
    }
  },
  mounted: async function () {
    this.loading = true;
    this.error = null;
    try {
      this.allGroceries = await api.getShoppingLists();
      this.loading = false;
      this.modifyLists()
    } catch (error) {
      this.loading = false;
      this.error = error;
    }
  },
};
</script>

<style scoped>
.newGroceryListButton {
  margin-right: 40%;
}
</style>
