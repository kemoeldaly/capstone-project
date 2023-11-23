// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import MainView from "../views/MainView.vue";
import Page1 from "../components/Page1.vue";
import Page2 from "../components/Page2.vue";

const routes = [
  { path: "/", component: MainView },
  { path: "/page1", component: Page1 },
  { path: "/page2", component: Page2 },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
