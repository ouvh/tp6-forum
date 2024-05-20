<template>
  <b-container class="login-container">
    <b-row class="justify-content-center">
      <b-col md="6" lg="4">
        <b-card bg-variant="light" border-variant="success" class="login-card">
          <b-form @submit.prevent="login">
            <b-form-group label="Email">
              <b-form-input v-model="email" type="email" required></b-form-input>
            </b-form-group>
            <b-form-group label="Password">
              <b-form-input v-model="password" type="password" required></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="success" class="btn-block">Login</b-button>
            <b-button @click="goToSignUp" variant=" sucess" class="btn-block ">Sign Up</b-button>
            <b-button @click="goToResetPassword" variant="sucess" class="btn-block">Forgot Password?</b-button>
          </b-form>
        </b-card>
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

<style scoped>
.login-container {
  margin-top: 100px;
}
.login-card {
  padding: 20px;
  border-width: 2px;
}
.btn-block {
  width: 100%;
}
</style>