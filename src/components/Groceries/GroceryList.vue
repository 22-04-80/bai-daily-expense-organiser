<template>
  <div class="groceryList">
    <div class="list">
      <h2><span class="listName">{{ listName }}</span> - <span class="date"> {{ createdAt }}</span></h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "GroceryList",
  props: ['grocery'],
  computed: {
    listName() {
      return this.grocery.list_name
    },
    createdAt() {
      let timestamp = this.grocery.created_at
      let date = new Date(timestamp * 1000).toLocaleDateString("pl-PL");
      return date
    }
  }
};
</script>

<style scoped>
.groceryList {
  width: 100%;
  display: flex;
  padding: 8px;
  margin: 8px;
  text-align: left;
}
.groceryList:hover {
  background-color: rgb(227, 232, 240);
}
</style>