<template>
  <b-container>
    <b-row>
      <b-col>
        <b-form @submit.prevent="login">
          <b-form-group label="Email">
            <b-form-input v-model="email" type="email" required></b-form-input>
          </b-form-group>
          <b-form-group label="Password">
            <b-form-input v-model="password" type="password" required></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary">Login</b-button>
          <b-button @click="goToSignUp" variant="link">Sign Up</b-button>
          <b-button @click="goToResetPassword" variant="link">Forgot Password?</b-button>
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
      email: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        await auth.signInWithEmailAndPassword(this.email, this.password);
        this.$router.push('/');
      } catch (error) {
        alert(error.message);
      }
    },
    goToSignUp() {
      this.$router.push('/signup');
    },
    goToResetPassword() {
      this.$router.push('/reset-password');
    }
  }
};
</script>
