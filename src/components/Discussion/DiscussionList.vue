<template>


  <b-container class="my-3">
    <b-row class="justify-content-center">
      <b-col cols="12" md="8" lg="6">
        <b-input-group>
          <b-form-input
            v-model="searchQuery"
            placeholder="Search..."
            @keydown="searchPosts"
          ></b-form-input>
          <b-input-group-append>
            <b-button variant="primary" @click="searchPosts">Search</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-col>
    </b-row>
  </b-container>



  <b-container v-if="!loading">
    <b-row>
      <b-col v-for="discussion in filteredDiscussions" :key="discussion.id" cols="12">
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

   <div v-if="loading" class="loading-page">

    <div class="loading-container">
      <div class="loading-text">Loading, please wait...</div>
      <b-progress :value="progress" max="100" class="loading-bar"></b-progress>
    </div>
  </div>


</template>





<script>
import { db } from '../../firebase';

export default {
  props: ['categoryId'],
  data() {
    return {
      discussions: [],
      loading:true,
      progress: 0,
      searchQuery:'',
      filteredDiscussions:[]
    };
  },
 async created() {
  try {
    const query = this.categoryId ? db.collection('discussions').where('category', '==', this.categoryId) : db.collection('discussions');
    const snapshot = await query.orderBy('createdAt', 'desc').get();
    this.progress += 30
    // Initialize an array to store discussions with user details
    this.discussions = [];

    // Fetch user details for each discussion
    for (const doc of snapshot.docs) {
      const discussion = { id: doc.id, ...doc.data() };
      const userSnapshot = await db.collection('users').doc(discussion.author).get();
      if (userSnapshot.exists) {
        discussion.username = userSnapshot.data().name;
      } else {
        discussion.username = 'Unknown'; // or handle as needed
      }
      this.discussions.push(discussion);
    }
    this.filteredDiscussions = this.discussions;
  } catch (error) {
    console.error('Error fetching discussions or users:', error);
  }

  this.loading = false
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
    },
    searchPosts() {
    // Convert the query to lowercase for case-insensitive search
    const lowerCaseQuery = this.searchQuery.toLowerCase();

    // Filter the discussions based on the query
    this.filteredDiscussions = this.discussions.filter(discussion => {
      // Check if the query is in the title
      const titleMatch = discussion.title.toLowerCase().includes(lowerCaseQuery);

      // Check if the query is in the content
      const contentMatch = discussion.content.toLowerCase().includes(lowerCaseQuery);

      // Check if the query is in any of the tags
      const tagsMatch = discussion.tags ? discussion.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery)) : false;

      // Return true if any of the above conditions are met
      return titleMatch || contentMatch || tagsMatch;
    });
    console.log("kjjj")
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

.loading-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #343a40;
  color: #f8f9fa;
}

.loading-container {
  text-align: center;
}

.loading-text {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.loading-bar {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.loading-bar .progress-bar {
  background-color: #28a745;
}
</style>

   
