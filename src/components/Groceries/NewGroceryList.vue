<template>
  <div>
    <div>
        <h1>works</h1>
    </div>
    <router-link to="/groceries">
        <NewGroceryListButton class="add" @click="addList()" :text="addListButtonText"/>
    </router-link>
    <router-link to="/groceries">
      <NewGroceryListButton class="cancel" :text="cancelListButtonText"/>
    </router-link>
  </div>
</template>

<script>
import NewGroceryListButton from "./NewGroceryListButton";

export default {
  name: "NewGroceryList",
  components: {
    NewGroceryListButton,
  },
  data: function() {
      return {
          addListButtonText: "Add",
          cancelListButtonText: "Cancel"
      }
  },
  methods: {
    addList() {
      console.log('works')
    }
  }
}
</script>

<style scoped>
    .add {
    margin-right: 2%;
    }
    .cancel {
    margin-right: 15%;
    }
</style>