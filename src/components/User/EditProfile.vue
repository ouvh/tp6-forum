<template>
  <b-container>
    <b-form @submit.prevent="updateProfile">
      <b-form-group label="Name">
        <b-form-input v-model="name" required></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Update Profile</b-button>
    </b-form>
  </b-container>
</template>

<script>
import { auth, db } from '../../firebase';

export default {
  data() {
    return {
      name: auth.currentUser.displayName || ''
    };
  },
  methods: {
    async updateProfile() {
      const user = auth.currentUser;
      await user.updateProfile({ displayName: this.name });
      await db.collection('users').doc(user.uid).update({ name: this.name });
      this.$router.push('/profile');
    }
  }
};
</script>
