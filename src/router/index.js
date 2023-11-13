import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Home/HomeView.vue";
import MapView from "../views/Map/MapView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/map",
      name: "map",
      component: MapView,
      children: [
        {
          path: ":contentId",
          name: "reviews",
          component: MapView
        }
      ]
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/About/AboutView.vue")
    },
    {
      path: "/board",
      name: "board",
      component: () => import("../views/Board/BoardView.vue"),
      children: [
        {
          path: "detail",
          component: ""
        },
        {
          path: "detail",
          component: ""
        }
      ]
    }
  ]
});

export default router;
