<template>
  <b-container class="discussion-container">
    <b-card bg-variant="light" text-variant="dark" class="discussion-card">
      <b-card-title>{{ discussion.title }}</b-card-title>
      <b-card-text>{{ discussion.content }}</b-card-text>
    </b-card>

    <b-card
      bg-variant="secondary"
      text-variant="white"
      class="mt-3"
      v-for="reply in replies"
      :key="reply.id"
    >
      <b-card-text>{{ reply.content }}</b-card-text>
    </b-card>

    <b-form @submit.prevent="postReply" class="mt-3">
      <b-form-group label="Reply">
        <b-form-textarea v-model="replyContent" required></b-form-textarea>
      </b-form-group>
      <b-button type="submit" variant="success" class="btn-block"
        >Post Reply</b-button
      >
    </b-form>
  </b-container>
</template>

<script>
import { db, auth } from "../../firebase";

export default {
  data() {
    return {
      discussion: {},
      replies: [],
      replyContent: "",
    };
  },
  async created() {
    console.log("relies 1 ");

    const discussionId = this.$route.params.id;
    console.log("relies 2 ");

    const discussionDoc = await db
      .collection("discussions")
      .doc(discussionId)
      .get();
    this.discussion = { id: discussionDoc.id, ...discussionDoc.data() };
    console.log("relies before");

    const repliesSnapshot = await db
      .collection("replies")
      .where("discussionId", "==", discussionId)
      .orderBy("createdAt", "asc")
      .get();
    console.log("relies 3 ");

    this.replies = repliesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },
  methods: {
    async postReply() {
      const user = auth.currentUser;

      if (user === null) {
        alert("you should be logged in to post");
      } else {
        const newReply = {
          discussionId: this.discussion.id,
          content: this.replyContent,
          author: user.uid,
          createdAt: new Date(),
        };
        await db.collection("replies").add(newReply);
        this.replies.push(newReply);
        this.replyContent = "";
      }
    },
  },
};
</script>

<style scoped>
.discussion-container {
  background-color: #f8f9fa;
  padding: 20px;
}
.discussion-card {
  border-width: 2px;
}
.btn-block {
  width: 100%;
}
</style>
