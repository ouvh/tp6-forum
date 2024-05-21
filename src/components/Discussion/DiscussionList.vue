<template>
  <b-container>
    <b-row>
      <b-col v-for="discussion in discussions" :key="discussion.id" cols="12">
        <b-card bg-variant="dark" text-variant="white" class="mb-3">
          <b-card-header class="d-flex justify-content-between align-items-center">
            <h5 class="mb-0">{{ discussion.title }}</h5>
            <div class="created-by text-light small">
              <i class="fas fa-user"></i>Posted by : {{ discussion.username }}
            </div>
          </b-card-header>
          <b-card-body>
            <b-card-text>{{ truncateContent(discussion.content) }}</b-card-text>
            <b-row class="mt-3">
              <b-col cols="auto">
                <b-button variant="success" @click="viewDiscussion(discussion.id)">View</b-button>
              </b-col>
              <b-col>
                <div class="tags">
                  <b-badge
                    v-for="(tag, index) in discussion.tags"
                    :key="index"
                    variant="info"
                    class="mr-1"
                    @click.prevent="this.$router.push('/tag/' + tag)"
                    >{{ tag }}</b-badge
                  >
                </div>
              </b-col>
            </b-row>
          </b-card-body>
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
  try {
    const query = this.categoryId ? db.collection('discussions').where('category', '==', this.categoryId) : db.collection('discussions');
    const snapshot = await query.orderBy('createdAt', 'desc').get();

    // Initialize an array to store discussions with user details
    this.discussions = [];

    // Fetch user details for each discussion
    for (const doc of snapshot.docs) {
      const discussion = { id: doc.id, ...doc.data() };
      const userSnapshot = await db.collection('users').doc(discussion.author).get();
      if (userSnapshot.exists) {
        discussion.username = userSnapshot.data().username;
      } else {
        discussion.username = 'Unknown'; // or handle as needed
      }
      this.discussions.push(discussion);
    }
  } catch (error) {
    console.error('Error fetching discussions or users:', error);
  }
}
,
  methods: {
        viewDiscussion(id) {
      this.$router.push(`/discussion/${id}`);
    },truncateContent(content) {
      const limit = 100; // Set your character limit here
      if (content.length > limit) {
        return content.substring(0, limit) + '...';
      }
      return content;
    }
  }
};
</script>

<style scoped>
.tags {
  display: flex;
  flex-wrap: wrap;
}
.tags .badge {
  cursor: pointer;
}
.created-by {
  color: #f8f9fa !important; /* Lighter color for better visibility */
}
</style>

   
