<template>
  <b-container>
    <b-card>
      <b-card-title>{{ discussion.title }}</b-card-title>
      <b-card-text>{{ discussion.content }}</b-card-text>
    </b-card>
    <b-card class="mt-3" v-for="reply in replies" :key="reply.id">
      <b-card-text>{{ reply.content }}</b-card-text>
    </b-card>
    <b-form @submit.prevent="postReply" class="mt-3">
      <b-form-group label="Reply">
        <b-form-textarea v-model="replyContent" required></b-form-textarea>
      </b-form-group>
      <b-button type="submit" variant="primary">Post Reply</b-button>
    </b-form>
  </b-container>
</template>

<script>
import { db, auth } from '../../firebase';

export default {
  data() {
    return {
      discussion: {},
      replies: [],
      replyContent: ''
    };
  },
  async created() {
    const discussionId = this.$route.params.id;
    const discussionDoc = await db.collection('discussions').doc(discussionId).get();
    this.discussion = { id: discussionDoc.id, ...discussionDoc.data() };

    const repliesSnapshot = await db.collection('replies').where('discussionId', '==', discussionId).orderBy('createdAt', 'asc').get();
    this.replies = repliesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },
  methods: {
    async postReply() {
      const user = auth.currentUser;
      const newReply = {
        discussionId: this.discussion.id,
        content: this.replyContent,
        author: user.uid,
        createdAt: new Date()
      };
      await db.collection('replies').add(newReply);
      this.replies.push(newReply);
      this.replyContent = '';
    }
  }
};
</script>
