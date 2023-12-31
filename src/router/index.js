import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Home/HomeView.vue";
import MapView from "../views/Map/MapView.vue";
import UserView from "../views/User/UserView.vue";
import FollowView from "../views/Follow/FollowView.vue";
import AdminView from "../views/Admin/AdminView.vue";
import TestView from "../views/Test/TestView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.VIEW_BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      name: "Home",
      component: HomeView
    },
    {
      path: "/map",
      name: "Map",
      component: () => import("../views/Map/MapView.vue"),
      children: [
        {
          path: ":contentId",
          name: "Reviews",
          component: () => import("../views/Map/MapView.vue")
        }
      ]
    },
    {
      path: "/user",
      name: "User",
      component: UserView
    },
    {
      path: "/follow",
      name: "Follow",
      component: FollowView
    },
    {
      path: "/admin",
      name: "Admin",
      component: AdminView
    },
    {
      path: "/test",
      name: "Test",
      component: TestView
    }
  ]
});

export default router;
