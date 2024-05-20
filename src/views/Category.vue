<template>
  <div>
    <Navbar />
    <b-container>
      <b-row>
        <b-col cols="3">
          <Sidebar />
        </b-col>
        <b-col>
          <DiscussionList :categoryId="$route.params.id" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Navbar from '../components/Layout/Navbar.vue';
import Sidebar from '../components/Layout/Sidebar.vue';
import DiscussionList from '../components/Discussion/DiscussionList.vue';

export default {
  components: { Navbar, Sidebar, DiscussionList }
};
</script>
