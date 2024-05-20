<template>
  <div>
    <Navbar />
    <b-container>
      <b-row>
        <b-col cols="3">
          <Sidebar />
        </b-col>
        <b-col>
          <DiscussionList />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Navbar from '../components/Layout/NavBar.vue';
import Sidebar from '../components/Layout/SideBar.vue';
import DiscussionList from '../components/Discussion/DiscussionList.vue';

export default {
  components: { Navbar, Sidebar, DiscussionList }
};
</script>
