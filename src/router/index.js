import { createRouter, createWebHistory } from 'vue-router';
import jobview from '../components/jobview.vue';
import Home from "../components/Home.vue";
import Add from "../components/Add.vue";
import Delete from "../components/Delete.vue";
import Modify from "../components/Modify.vue"
import Tagfilter from "../components/Tagfilter.vue"

const routes = [
  {
    path: '/Blog',
    name: 'jobview',
    components: {jobview:jobview}
    
  }
  
];



const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
