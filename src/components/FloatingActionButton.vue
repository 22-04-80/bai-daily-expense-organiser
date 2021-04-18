<template>
  <button class="floatingActionButton btn btn-primary btn-lg">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "FloatingActionButton",
  props: ['text']
};
</script>

<style scoped>
.floatingActionButton {
  position: fixed;
  bottom: 8px;
  right: 8px;
}
</style>