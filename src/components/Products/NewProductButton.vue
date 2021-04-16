<template>
  <button class="new-product-button">
    Add
  </button>
</template>

<script>
export default {
  name: "NewProductButton",
};
</script>

<style scoped>
.new-product-button {
  position: fixed;
  bottom: 8px;
  right: 8px;
  width: 64px;
  height: 64px;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}
</style>