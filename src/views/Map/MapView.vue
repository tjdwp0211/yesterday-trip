<template>
  <main id="map-view-main">
    <TheMap :spots="DUMMY_ITEMS"></TheMap>
    <TheSide :position-left="0"> </TheSide>
  </main>
</template>

<script setup>
import { reactive } from "vue";
import TheSide from "../../components/TheAttractionSideBar/TheAttractionSideBar.vue";
import TheMap from "../../components/TheMap/TheMap.vue";
import { DUMMY_ITEMS } from "../../dummy.js";

const sideBarViewStates = reactive({ cards: true, reviews: true });

const handlers = {
  card() {
    sideBarViewStates.cards = !sideBarViewStates.cards;
  },
  review() {
    sideBarViewStates.reviews = !sideBarViewStates.reviews;
  }
};
</script>

<style lang="scss">
@import "./MapView.scss";
</style>
