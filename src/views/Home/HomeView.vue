<template>
  <main>
    <div id="map">지도입니다.</div>
    <TheSide :position-left="0"></TheSide>
    <!-- <TheSide :position-left="340"></TheSide> -->
  </main>
</template>

<script setup>
import { reactive } from "vue";
import TheSide from "../../components/TheSideBar/TheSideBar.vue";

const sideBarViewStates = reactive({ cardsSideBarView: false, reviewsSideBarView: false });
</script>

<style lang="scss">
@import "./HomeView.scss";
</style>
