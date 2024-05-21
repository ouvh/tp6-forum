<template>


  <b-container class="my-3">
    
            <h2>Search by Tags</h2>
            <div>
          <label for="tags-remove-on-delete">Enter new tags separated by space</label>
              <b-form-tags 
                input-id="tags-remove-on-delete"
                :input-attrs="{ 'aria-describedby': 'tags-remove-on-delete-help' }"
                v-model="tagsfilter"
                :tag-validator="onTagState"
                separator=" "
                placeholder="Enter new tags separated by space"
                remove-on-delete
                no-add-on-enter

              ></b-form-tags>
              <b-form-text id="tags-remove-on-delete-help" class="mt-2">
                Press <kbd>Backspace</kbd> to remove the last tag entered
              </b-form-text>

      </div>


  

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
                    @click.prevent="    this.$router.push('/categories/' + tag);"

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
  props: ['tag'],
  data() {
    return {
      discussions: [],
      loading:true,
      progress: 0,
      searchQuery:'',
      filteredDiscussions:[],
      tagsfilter:[]
    };
  },
 async created() {
    if (this.tag){
        this.tagsfilter = [this.tag]
    }
    
    



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
    this.searchRelevantDiscussions(["temp"])

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
    searchRelevantDiscussions(newvalue) {
        if(this.tagsfilter.length === 0 || newvalue.length ===0){
            this.filteredDiscussions = this.discussions
            return
        }
    // Convert tags to lowercase for case-insensitive search
    const lowerCaseTags = this.tagsfilter.map(tag => tag.toLowerCase());

    // Calculate relevance and filter discussions
    const relevantDiscussions = this.discussions.map(discussion => {
      const matchingTags = discussion.tags
        ? discussion.tags.filter(tag => lowerCaseTags.includes(tag.toLowerCase())).length
        : 0;
      return { ...discussion, relevance: matchingTags };
    });

    // Sort discussions by relevance (highest relevance first)
    this.filteredDiscussions = relevantDiscussions
      .filter(discussion => discussion.relevance > 0)
      .sort((a, b) => b.relevance - a.relevance);


  }
  },
  watch:{
    
    tag(newvalue){
        if (newvalue){
        this.tagsfilter = [newvalue]
       
    }
     else{
                    this.tagsfilter = []

        }
        
    },
    tagsfilter:{handler(newvalue){
        this.searchRelevantDiscussions(newvalue);
    },deep:true}
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

   
