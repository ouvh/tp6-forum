<template>
  <b-container>
    <b-row>
      <b-col  v-for="discussion in discussions" :key="discussion.id">
        <b-card bg-variant="dark" text-variant="white" title="Card Title" class="mb-3">
          <b-card-title>{{ discussion.title }}</b-card-title>
          <b-card-text>{{ discussion.content }}</b-card-text>
          <b-button variant="success" @click="viewDiscussion(discussion.id)">View</b-button>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { db } from '../../firebase';

export default {
  props: ['categoryId'],
  data() {
    return {
      discussions: []
    };
  },
  async created() {
    const query = this.categoryId ? db.collection('discussions').where('category', '==', this.categoryId) : db.collection('discussions');
    const snapshot = await query.orderBy('createdAt', 'desc').get();
    this.discussions = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },
  methods: {
        viewDiscussion(id) {
      this.$router.push(`/discussion/${id}`);
    }
  }
};
</script>

   
