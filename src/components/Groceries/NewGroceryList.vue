<template>
  <div class="mt-5">
    <form class="col-sm-6 offset-sm-3">
      <div class="input-group mb-3">
        <span class="input-group-text">List name</span>
        <input class="form-control" type="text" v-model="listToAdd.name">
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text">Date</span>
        <input class="form-control" type="date" v-model="listToAdd.date">
      </div>
      <div v-if="!loading" class="mb-3">
        <h3>Select bought product</h3>
        <select class="form-select" @click="selectProd()" v-model="lastSelectedProductName">
            <option disabled value="">Select product</option>
            <option v-for="product in allProducts" :key="product">{{product.name}}</option>
        </select>
        <hr>
        <div class="selected-products">
          <h3 v-if="listToAdd.selectedProducts.length">Selected products</h3>
          <div v-for="product in listToAdd.selectedProducts" :key="product">
            <div class="input-group mb-3">
              <span class="input-group-text">{{ product.name }} - {{ product.price }}zł</span>
              <input type="number" class="form-control" aria-describedby="button-addon2" v-model="product.quantity" @change="isValid(product)" />
              <button @click="removeProd($event, product)" class="btn btn-outline-secondary" type="button" id="button-addon2">X</button>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        Loading...
      </div>
      <div class="button-container">
        <router-link to="/groceries">
          <button class="btn btn-secondary btn-lg cancel">Cancel</button>
        </router-link>

        <button class="btn btn-primary btn-lg" :disabled="!isFormValid" @click="addList()">Add</button>
      </div>
    </form>
  </div>
</template>

<script>
import {api} from '../../api/api.js'

export default {
  name: "NewGroceryList",
  data: function() {
      return {
          loading: true,
          allProducts: [],
          listToAdd: {
            name: '',
            date: '',
            selectedProducts: [],
          },
          lastSelectedProductName: ""
      }
  },
  computed: {
    isFormValid() {
      if (this.listToAdd.name !== "" && this.listToAdd.date !== '' && this.listToAdd.selectedProducts.length > 0) {
        return true
      }
      return false
    }
  },
  methods: {
    async addList() {
      let created_at = Math.round(new Date(this.listToAdd.date).getTime()/1000)
      let dataToSend = {
        "list_name": this.listToAdd.name,
        "created_at": created_at,
        "products": this.listToAdd.selectedProducts
      }
      api.postShoppingList(dataToSend)
      await this.$router.push('/groceries');
    },
    idexOf(prodName, list) {
      for (let i=0; i<list.length; i++) {
        if (prodName === list[i].name) {
          return i
        }
      }
      return null
    },
    selectProd() {
      let prod = this.allProducts[this.idexOf(this.lastSelectedProductName, this.allProducts)]
      let index = this.idexOf(prod.name, this.listToAdd.selectedProducts)
      if (index !== null) {
        this.listToAdd.selectedProducts[index].quantity++
      } else {
        prod.quantity = 1
        this.listToAdd.selectedProducts.push(prod)
      }
      this.lastSelectedProductName = ""
    },
    isValid(prod) {
      if (prod.quantity <= 0) {
        let index = this.idexOf(prod.name, this.listToAdd.selectedProducts)
        this.listToAdd.selectedProducts.splice(index, 1)
      }
    },
    removeProd(event, prod) {
      event.preventDefault()
      let index = this.idexOf(prod.name, this.listToAdd.selectedProducts)
      this.listToAdd.selectedProducts.splice(index, 1)
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
    .button-container {
      display: flex;
      justify-content: flex-end;
    }
    .cancel {
      margin-right: 16px;
    }
    .selected-products {
      margin-top: 32px;
    }
</style>