<template>
  <b-container>
    <b-row>
      <b-col>
        <b-form @submit.prevent="signUp">
          <b-form-group label="Email">
            <b-form-input v-model="email" type="email" required></b-form-input>
          </b-form-group>
          <b-form-group label="Password">
            <b-form-input v-model="password" type="password" required></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary">Sign Up</b-button>
          <b-button @click="goToLogin" variant="link">Login</b-button>
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
    async signUp() {
      try {
        await auth.createUserWithEmailAndPassword(this.email, this.password);
        this.$router.push('/');
      } catch (error) {
        alert(error.message);
      }
    },
    goToLogin() {
      this.$router.push('/login');
    }
  }
};
</script>
