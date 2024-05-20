<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Layout/NavBar.vue';

export default {
  components: {
    Navbar
  }
};
</script>

<style>
@import '~bootstrap/dist/css/bootstrap.css';
@import '~bootstrap-vue-3/dist/bootstrap-vue-3.css';

body {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  background-color: #f8f9fa;
}

#app {
  margin-top: 56px; /* Adjust margin to fit navbar */
}
</style>
