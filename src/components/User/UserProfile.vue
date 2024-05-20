<template>
  <b-container>
    <b-card>
      <b-card-title>User Profile</b-card-title>
      <b-card-text>
        <p><strong>Name:</strong> {{ user.displayName }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
      </b-card-text>
      <b-button @click="editProfile" variant="primary">Edit Profile</b-button>
    </b-card>
  </b-container>
</template>

<script>
import { auth } from '../../firebase';

export default {
  data() {
    return {
      user: null
    };
  },
  created() {
    this.user = auth.currentUser;
  },
  methods: {
    editProfile() {
      this.$router.push('/edit-profile');
    }
  }
};
</script>
