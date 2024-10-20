// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import Humans from "./components/Humans.vue";
import Account from "./components/Account.vue";
import About from "./components/About.vue";
import Createbot from "./components/Createbot.vue";
import Profile from "./components/Profile.vue";
import Post from "./components/Post.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/humans", component: Humans },
  { path: "/account", component: Account },
  { path: "/about", component: About },
  { path: "/createbot", component: Createbot, props: true },
  { path: "/profile/:botid", component: Profile, props: true },
  { path: "/post/:postid", component: Post, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
