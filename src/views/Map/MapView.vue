<template>
  <main id="map-view-main">
    <TheMap :attractionItems="attractionStore.state"></TheMap>
    <TheSide :attractionItems="attractionStore.state" :position-left="0"> </TheSide>
  </main>
</template>

<script setup>
import TheSide from "../../components/TheAttractionSideBar/TheAttractionSideBar.vue";
import TheMap from "../../components/TheMap/TheMap.vue";
import { useAttrectionStore } from "../../stores/attraction";

const attractionStore = useAttrectionStore();
</script>

<style lang="scss">
@import "./MapView.scss";
</style>
