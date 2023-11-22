<template>
  <Header></Header>
  <RouterView></RouterView>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { RouterView } from "vue-router";
import { EventSourcePolyfill } from "event-source-polyfill";
import Header from "../src/components/TheHeader/TheHeader.vue";
import { useUserStore } from "./stores/user";
import { useAlarmStore } from "./stores/alarm";

const { VITE_END_POINT } = import.meta.env;

const userStore = useUserStore();
const alarmStore = useAlarmStore();

onMounted(() => {
  if (userStore.state.STATE_IS_FILL) {
    // 로그인 후 바로 안 읽은 알람을 발생 시킴
    console.log("HI USER :");
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;

    const sse = new EventSourcePolyfill(`${VITE_END_POINT}/team/sse/connect`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    sse.addEventListener("connect", (e) => {
      const { data } = e;
      console.log("SSE CONNECT :", data);
    });

    sse.addEventListener("notification", (e) => {
      const { data } = e;

      if (alarmStore.state.lastAlramID < Number(data)) {
        alarmStore.action.setLastAlramID(Number(data));
      }
    });
  }
});

watch(
  () => userStore.state.STATE_IS_FILL,
  () => {
    if (userStore.state?.roles?.includes("ROLE_USER")) {
      // 로그인 후 바로 안 읽은 알람을 발생 시킴
      console.log("HI USER :");
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) return;

      const sse = new EventSourcePolyfill(`${VITE_END_POINT}/team/sse/connect`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      sse.addEventListener("connect", (e) => {
        const { data } = e;
        console.log("SSE CONNECT :", data);
      });

      sse.addEventListener("notification", (e) => {
        const { data } = e;

        if (alarmStore.state.lastAlramID < Number(data)) {
          alarmStore.action.setLastAlramID(Number(data));
        }
      });

      // sse.addEventListener("flip", (e) => {
      //   const { data: receivedSections } = e;

      // });

      // sse.addEventListener("submit", () => {
      //   navigate(`/enter/${hostId}/spaces/${spaceId}`);
      //   openToast("SUCCESS", "해당 체크리스트는 제출되었습니다.");
      // });
    }
  }
);
/**
 * SSE @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */
/**
 * SSE @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */
</script>

<style></style>
