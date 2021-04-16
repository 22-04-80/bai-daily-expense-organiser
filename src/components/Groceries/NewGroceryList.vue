<template>
  <div>
    <form>
      <div>
        <label for="name">List name</label>
        <input type="text" v-model="name" id="name">
      </div>
      <div>
        <label for="date">Date</label>
        <input type="date" v-model="date" id="date">
      </div>
      <div>
        <label for="products">Select bought product:</label>
        <select class="form-select" v-model="products" id="products" @change="selectProd($event)">
            <option disabled value="">Select product:</option>
            <option v-for="product in allProducts" :key="product.name">{{product.name}}</option>
        </select>
        <div>
          <p>Selected products:</p>
          <ul>
          <li v-for="product in selectedProducts" :key="product"> 
            <span>{{ product.name }} - {{ product.price }}zł</span>
            <span>
              <div>
                <input type="number" v-model="product.quantity">
              </div>
            </span>
          </li>
        </ul>
        </div>
      </div>

    </form>
    <router-link to="/groceries">
        <NewGroceryListButton class="add" @click="addList()" :text="addListButtonText"/>
    </router-link>
    <router-link to="/groceries">
      <NewGroceryListButton class="cancel" :text="cancelListButtonText"/>
    </router-link>
  </div>
</template>

<script>
import {api} from '../../api/api.js'
import NewGroceryListButton from "./NewGroceryListButton";

export default {
  name: "NewGroceryList",
  components: {
    NewGroceryListButton,
  },
  data: function() {
      return {
          addListButtonText: "Add",
          cancelListButtonText: "Cancel",
          allProducts: [],
          selectedProducts: [],
      }
  },
  methods: {
    addList() {
      console.log(this.name)
      console.log(this.date)
      let d = new Date(this.date).getTime()
      console.log(d)
    },
    selectProd(event) {
      console.log(event.target.value)
      this.selectedProducts.push(event.target.value)
    }
  },
  mounted: async function () {
    this.loading = true;
    this.error = null;
    try {
      this.allProducts= await api.getProducts();
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.error = error;
    }
  },
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