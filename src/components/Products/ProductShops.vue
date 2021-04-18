<template>
  <div class="product-shops">
    <span class="text">
      <span v-if="shops.length === 0">❌</span>
      <span v-else>✅</span>
      Check availability
    </span>
    <div class="tooltip-text">
      <div v-for="shop in shops" :key="shop.name">
        <span>🛍️ {{ shop.name }}</span>
        <br/>
        <span>📌 {{ shop.address }}</span>
        <hr/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductShops",
  props: ["shops"],
};
</script>

<style scoped>
.product-shops {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
  cursor: help;
}

.product-shops .text {
  font-size: 0.8rem;
}

.product-shops .tooltip-text {
  visibility: hidden;
  width: 240px;
  max-height: 240px;
  overflow: auto;
  background-color: #f8f9fa;
  color: #2c3e50;
  padding: 4px;
  border-radius: 8px;
  opacity: 0;
  font-size: 0.8rem;
  box-shadow: 2px 2px 4px 4px rgba(0, 0, 0, 0.2);

  position: absolute;
  z-index: 1;
  transition: opacity 0.2s;
}

.product-shops:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}

hr {
  margin: 4px 0;
}
</style>
