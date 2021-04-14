<template>
  <div class="groceryList" @click="expandList()">
    <div class="list">
      <h2><span class="listName">{{ listName }}</span><span class="date"> - {{ createdAt }}</span></h2>
      <div v-if="listActive" class="activeShoppingList">
        <ul>
          <li v-for="product in products" :key="product"> 
            <span>{{ product.name }}: {{ product.quantity }} for {{ product.price }} per one</span> <!-- todo: lepsza prezentacja -->
          </li>
          <p>Summary: {{ summaryCost }} zł</p>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GroceryList",
  props: ['grocery'],
  data: function() {
    return {
      listActive: false,
    }
  },
  computed: {
    listName() {
      return this.grocery.list_name
    },
    createdAt() {
      let timestamp = this.grocery.created_at
      let date = new Date(timestamp * 1000).toLocaleDateString("pl-PL");
      return date
    },
    products() {
      let allProducts = this.grocery.products
      return allProducts
    },
    summaryCost() {
      let sum = 0
      this.grocery.products.forEach(product => {
        let sumForProd = product.quantity * product.price
        sum += sumForProd
      });
      return sum
    }
  },
  methods: {
    expandList() {
      this.listActive = !this.listActive
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
  background-color: rgb(245, 247, 250);
}
.listName {
  user-select: none;
}
.date {
  user-select: none;
}
</style>