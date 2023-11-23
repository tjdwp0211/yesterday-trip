<template>
  <main id="map-view-main">
    <TheMap></TheMap>
    <TheAttractionSideBar v-if="attractionStore.state.resAttractions" :position-left="0"></TheAttractionSideBar>
  </main>
</template>

<script setup>
import { onMounted } from "vue";
import TheAttractionSideBar from "../../components/TheAttractionSideBar/TheAttractionSideBar.vue";
import TheMap from "../../components/TheMap/TheMap.vue";
import { useAttrectionStore } from "../../stores/attraction";

const attractionStore = useAttrectionStore();
</script>

<style lang="scss">
@import "./MapView.scss";
</style>
