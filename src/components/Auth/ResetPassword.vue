<template>
  <b-container>
    <b-row>
      <b-col>
        <b-form @submit.prevent="resetPassword">
          <b-form-group label="Email">
            <b-form-input v-model="email" type="email" required></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary">Reset Password</b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { auth } from '../../firebase';

export default {
  data() {
    return {
      email: ''
    };
  },
  methods: {
    async resetPassword() {
      try {
        await auth.sendPasswordResetEmail(this.email);
        alert('Password reset email sent');
        this.$router.push('/login');
      } catch (error) {
        alert(error.message);
      }
    }
  }
};

</script>
