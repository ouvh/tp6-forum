<template>
  <div>
    <Navbar />
    <Login />
  </div>
</template>

<script>
import Navbar from '../components/Layout/Navbar.vue';
import Login from '../components/Auth/Login.vue';

export default {
  components: { Navbar, Login }
};
</script>
