import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomePage.vue';
import Login from '../views/LoginPage.vue';
import SignUp from '../views/SignUp.vue';
import Profile from '../views/ProfilePage.vue';
import Category from '../views/CategoryPage.vue';
import Discussion from '../views/DiscussionPage.vue';
import EditProfile from '../components/User/EditProfile.vue';
import CreateDiscussion from '../components/Discussion/CreateDiscussion.vue';
import ResetPassword from '../components/Auth/ResetPassword.vue'


const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/signup', name: 'SignUp', component: SignUp },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/edit-profile', name: 'EditProfile', component: EditProfile },
  { path: '/categories/:tag', name: 'Category', component: Category ,props:true},
  { path: '/AllCategories', name: 'Allcategories', component: Category ,props:true},
  { path: '/discussion/:id', name: 'Discussion', component: Discussion },
  { path: '/create-discussion', name: 'CreateDiscussion', component: CreateDiscussion },
  { path: '/reset-password', name: 'ResetPassword', component: ResetPassword },

];



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
