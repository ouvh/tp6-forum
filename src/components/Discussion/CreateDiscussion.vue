<template>
  <Navbar />
  <b-container class="create-discussion-container">
    <b-row class="justify-content-center">
      <b-col >
        <b-card bg-variant="light" text-variant="dark" class="create-discussion-card">
          <b-form @submit.prevent="createDiscussion">
            <b-form-group label="Title">
              <b-form-input v-model="title" required></b-form-input>
            </b-form-group>
            <b-form-group label="Content">
              <b-form-textarea v-model="content" required></b-form-textarea>
            </b-form-group>
            <b-button type="submit" variant="success" class="btn-block">Post Discussion</b-button>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Navbar from "@/components/Layout/NavBar.vue";
import { db, auth } from '../../firebase';

export default {
  components: { Navbar },
  data() {
    return {
      title: '',
      content: ''
    };
  },
  methods: {
    async createDiscussion() {
      const user = auth.currentUser;
      try {
        await db.collection('discussions').add({
          title: this.title,
          content: this.content,
          author: user.uid,
          createdAt: new Date()
        });
        this.$router.push('/');
      } catch (error) {
        alert(error.message);
      }
    }
  }
};
</script>

<style scoped>
.create-discussion-container {
  background-color: #f8f9fa; 
  align-items: center;
}
.create-discussion-card {
  padding: 20px;
  border-width: 2px;
}
.btn-block {
  width: 100%;
}
</style>