<template>
  <b-container class="signup-container">
    <b-row class="justify-content-center">
      <b-col md="6" lg="4">
        <b-card bg-variant="light" border-variant="success" class="signup-card">
          <b-form @submit.prevent="signUp">
            <b-form-group label="Name">
              <b-form-input v-model="name" type="text" required></b-form-input>
            </b-form-group>
            <b-form-group label="Email">
              <b-form-input
                v-model="email"
                type="email"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Password">
              <b-form-input
                v-model="password"
                type="password"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Confirm Password">
              <b-form-input
                v-model="confirmPassword"
                type="password"
                required
              ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="success" class="btn-block"
              >Sign Up</b-button
            >
            <b-button @click="goToLogin" variant="link" class="btn-block"
              >Login</b-button
            >
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { db,auth } from '../../firebase';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  },
  methods: {
  async signUp() {
      if (this.password !== this.confirmPassword) {
          alert('Passwords do not match');
          return;
        }
        try {
        await auth.createUserWithEmailAndPassword(this.email, this.password);

          try {
          await db.collection('users').doc(auth.currentUser.uid).set({
            userid: auth.currentUser.uid,
            name:this.name
          },{ merge: true });
          this.$router.push('/');
        } catch (error) {``
          alert(error.message);
        }


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

<style scoped>
.signup-container {
  margin-top: 100px;
}
.signup-card {
  padding: 20px;
  border-width: 2px;
}
.btn-block {
  width: 100%;
}
</style>
