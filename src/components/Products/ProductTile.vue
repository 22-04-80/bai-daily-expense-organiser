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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductTile",
  props: ["product"],
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