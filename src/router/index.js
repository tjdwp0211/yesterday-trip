import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Home/HomeView.vue";
import MapView from "../views/Map/MapView.vue";
import UserView from "../views/User/UserView.vue";

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
      component: MapView,
      children: [
        {
          path: ":contentId",
          name: "Reviews",
          component: MapView
        }
      ]
    },
    {
      path: "/user",
      name: "User",
      component: UserView
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/About/AboutView.vue")
    }
  ]
});

export default router;
