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

            <b-form-group  label="Tags">

            <div>
          <label for="tags-remove-on-delete">Enter new tags separated by space</label>
              <b-form-tags 
                input-id="tags-remove-on-delete"
                :input-attrs="{ 'aria-describedby': 'tags-remove-on-delete-help' }"
                v-model="tags"
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
      content: '',
      tags:[]
    };
  },
  methods: {
    onTagState(tag) {
      if (this.tags.includes(tag)) {
        return false;
      }
      return true

      },
    async createDiscussion() {
      if (this.tags.length===0){
        alert("please choose a tags and add space at the end")
        return
      }
      const user = auth.currentUser;
      try {
        await db.collection('discussions').add({
          title: this.title,
          content: this.content,
          author: user.uid,
          createdAt: new Date(),
          tags:this.tags
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
.sidebar {
      background-color: #f4f4f4;
      padding: 20px;
      width: 100%;
      overflow-x: auto;
      white-space: nowrap;
      -webkit-overflow-scrolling: touch; /* Enables momentum scrolling in iOS Safari */
    }
    .sidebar h2 {
      margin-top: 0;
      margin-bottom: 10px;
    }
    .tag-list {
      list-style-type: none;
      padding: 0;
      margin: 0;
      display: inline-block;
    }
    .tag-list li {
      display: inline-block;
      margin-right: 10px;
    }
    .tag-list li a {
      text-decoration: none;
      color: #333;
      font-weight: bold;
      padding: 5px 10px;
      border-radius: 20px;
      background-color: #ddd;
      transition: background-color 0.3s;
      cursor: pointer;
    }
    .tag-list li a:hover {
      background-color: #007bff;
      color: #fff;
    }
 
</style>