<template>
  <Header></Header>
  <RouterView></RouterView>
</template>

<script setup>
import { ref, onUpdated } from "vue";
import { RouterView } from "vue-router";
import Header from "../src/components/TheHeader/TheHeader.vue";
import { useUserStore } from "./stores/user";
const userStore = useUserStore();

const sseBasket = ref(); // SSE @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

onUpdated(
  () => userStore,
  () => {
    console.log(`userStore :`, userStore);
  }
);
// /**
//  * SSE @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//  */
// const { VITE_END_POINT } = import.meta.env;

// const sse = new EventSource(`${VITE_END_POINT}/sse/connect`, {
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("accessToken")}`
//   }
// });

// sse.addEventListener("connect", (e) => {
//   const { data: receivedConnectData } = e;
//   console.log("connect event data: ", receivedConnectData); // "connected!"
// });

// sse.addEventListener("count", (e) => {
//   const { data: receivedCount } = e;
//   console.log("count event data", receivedCount);
//   sseBasket.value = receivedCount;
// });
// /**
//  * SSE @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//  */
</script>

<style></style>
