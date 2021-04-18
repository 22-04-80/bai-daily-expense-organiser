<template>
  <div class="product">
    <div class="product-image">
      <img src=" https://via.placeholder.com/150/000000" v-bind:alt="product.name">
    </div>
    <div class="product-info">
      <div class="info-top">
        <div>
          {{ product.name }}
        </div>
        <div>
          {{ product.price }}
        </div>
      </div>
      <div class="info-bottom">
        <div>
          {{ product.category }}
        </div>
        <ProductShops v-bind:shops="shops"/>
      </div>
    </div>
  </div>
</template>

<script>
import ProductShops from "./ProductShops";

export default {
  name: "ProductTile",
  props: ["product", "shops"],
  components: {ProductShops},
};
</script>

<style scoped>
.product {
  width: 30%;
  display: flex;
  padding: 8px;
  margin: 8px;
  text-align: left;
}

.product-image {

}

.product-info {
  display: flex;
  flex-direction: column;
  padding: 8px;
  justify-content: space-between;
}
</style>