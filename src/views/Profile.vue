<template>
  <div>
    <Navbar />
    <UserProfile />
  </div>
</template>

<script>
import Navbar from '../components/Layout/Navbar.vue';
import UserProfile from '../components/User/UserProfile.vue';

export default {
  components: { Navbar, UserProfile }
};
</script>
