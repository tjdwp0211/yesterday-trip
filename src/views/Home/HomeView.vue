<template>
  <main id="home-view-main">
    <section class="home-section">
      <h1>YESTERDAY TRIP</h1>
      <Carousel :items-to-show="1" :wrap-around="true">
        <Slide v-for="(item, index) in bestAttractions.item" :key="index">
          <TheBestAttractionCard :item="item" :idx="index"></TheBestAttractionCard>
        </Slide>
        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </section>
    <section class="home-section"></section>
  </main>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { Carousel, Navigation, Slide } from "vue3-carousel";
import TheBestAttractionCard from "../../components/TheBestAttractionCard/TheBestAttractionCard.vue";
import { requestBestAttraction } from "../../api/attraction";

import "vue3-carousel/dist/carousel.css";

const bestAttractions = reactive({
  isLoad: false,
  item: []
});

onMounted(async () => {
  const res = await requestBestAttraction().then((res) => res.data);
  bestAttractions.item = res;
  bestAttractions.isLoad = true;
  console.log("HOME VIEW :", res);
});
</script>

<style lang="scss">
@import "./HomeView.scss";
</style>
