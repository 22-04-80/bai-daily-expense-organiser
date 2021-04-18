<template>
  <div class="product">
    <div class="product-image">
      <img src=" https://via.placeholder.com/150/000000" v-bind:alt="product.name">
    </div>
    <div class="product-info">
      <div class="info-top">
        <div class="name">
          {{ product.name }}
        </div>
        <div class="price">
          {{ product.price }} zł
        </div>
      </div>
      <div class="info-bottom">
        <div>
          🏷️ {{ product.category }}
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
  box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.2);
  font-size: 0.9rem;
}

.name {
  font-weight: bold;
}

.price {
  font-style: italic;
}

.product-info {
  display: flex;
  flex-direction: column;
  padding: 8px;
  justify-content: space-between;
}
</style>