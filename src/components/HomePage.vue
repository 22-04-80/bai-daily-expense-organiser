<template>
  <div class="main-welcome">
    <div class="jumbotron">
      <h1 class="display-4">Welcome to Daily expense organiser!</h1>
      <p class="lead">This is a simple daily expense organiser to help you keep an eye on your expenses.</p>
      <router-link class="nav-link" to="/groceries">
        <a class="btn btn-primary btn-lg" role="button">Start now!</a>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-welcome {
  display: flex;
  height: 70%;
  justify-content: center;
  align-items: center;
}
</style>
