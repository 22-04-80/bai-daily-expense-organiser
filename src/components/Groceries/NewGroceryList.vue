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
        <select v-model="products" id="products">
            <option disabled value="Select product:">Select product:</option>
            <option @click="selectProd(product)" v-for="product in allProducts" :key="product" v-bind="product">{{product.name}}</option>
        </select>
        <div>
          <p v-if="selectedProducts.length">Selected products:</p>
          <ul>
            <li v-for="product in selectedProducts" :key="product"> 
              <span>{{ product.name }} - {{ product.price }}zł</span>
              <span>
                <div>
                  <input type="number" v-model="product.quantity" @change="isValid(product)">
                  <button @click="removeProd($event, product)">X</button>
                </div>
              </span>
            </li>
            </ul>
        </div>
      </div>

    </form>
    <router-link to="/groceries">
      <NewGroceryListButton :disabled="!isFormValid" class="add" @click="addList()" :text="addListButtonText"/>
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
          products: [],
          allProducts: [],
          selectedProducts: [],
          name: '',
          date: ''
      }
  },
  computed: {
    isFormValid() {
      if (this.name !== "" && this.date !== '' && this.selectedProducts.length > 0) {
        return true
      }
      return false
    }
  },
  methods: {
    addList() {
      let created_at = Math.round(new Date(this.date).getTime()/1000)
      let dataToSend = {
        "list_name": this.name,
        "created_at": created_at,
        "products": this.selectedProducts
      }
      api.postShoppingList(dataToSend)
    },
    idexOf(prodName) {
      for (let i=0; i<this.selectedProducts.length; i++) {
        if (prodName === this.selectedProducts[i].name) {
          return i
        }
      }
      return null
    },
    selectProd(prod) {
      let index = this.idexOf(prod.name)
      if (index !== null) {
        this.selectedProducts[index].quantity++
      } else {
        prod.quantity = 1
        this.selectedProducts.push(prod)
      }
    },
    isValid(prod) {
      if (prod.quantity <= 0) {
        let index = this.idexOf(prod.name)
        this.selectedProducts.splice(index, 1)
      }
    },
    removeProd(event, prod) {
      event.preventDefault()
      let index = this.idexOf(prod.name)
      this.selectedProducts.splice(index, 1)
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