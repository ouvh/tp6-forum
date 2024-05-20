<template>
  <b-container>
    <b-row>
      <b-col>
        <b-form @submit.prevent="createDiscussion">
          <b-form-group label="Title">
            <b-form-input v-model="title" required></b-form-input>
          </b-form-group>
          <b-form-group label="Content">
            <b-form-textarea v-model="content" required></b-form-textarea>
          </b-form-group>
          <b-button type="submit" variant="primary">Post Discussion</b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { db, auth } from '../../firebase';

export default {
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
