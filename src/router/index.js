import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import SignUp from '../views/SignUp.vue';
import Profile from '../views/Profile.vue';
import Category from '../views/Category.vue';
import Discussion from '../views/Discussion.vue';
import EditProfile from '../views/EditProfile.vue';
import CreateDiscussion from '../components/Discussion/CreateDiscussion.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/signup', name: 'SignUp', component: SignUp },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/edit-profile', name: 'EditProfile', component: EditProfile },
  { path: '/categories', name: 'Category', component: Category },
  { path: '/discussion/:id', name: 'Discussion', component: Discussion },
  { path: '/create-discussion', name: 'CreateDiscussion', component: CreateDiscussion }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
