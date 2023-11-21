<template>
  <Header></Header>
  <RouterView></RouterView>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { RouterView } from "vue-router";
import Header from "../src/components/TheHeader/TheHeader.vue";
import { useUserStore } from "./stores/user";
import { useAlarmStore } from "./stores/alarm";
const userStore = useUserStore();
const alarmStore = useAlarmStore();

const sseBasket = ref(); // SSE @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// onMounted(async () => {
//   await console.log("test :");
// });

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
