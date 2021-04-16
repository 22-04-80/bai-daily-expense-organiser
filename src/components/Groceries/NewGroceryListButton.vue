<template>
  <button class="newGroceryListButton">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "NewGroceryListButton",
  props: ['text']
};
</script>

<style scoped>
.newGroceryListButton {
  position: fixed;
  bottom: 8px;
  right: 8px;
  width: 128px;
  height: 64px;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 7%;
}
</style>