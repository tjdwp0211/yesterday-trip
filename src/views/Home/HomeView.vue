<template>
  <main id="home-view-main">
    <section class="home-section">
      <h1>YESTERDAY TRIP</h1>
      <Carousel :items-to-show="1" :wrap-around="true">
        <Slide v-for="(item, index) in DUMMY_ITEM" :key="index">
          <TheBestAttractionCard :item="item" :idx="index" :key="index"></TheBestAttractionCard>
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
import { Carousel, Navigation, Slide } from "vue3-carousel";
import TheBestAttractionCard from "../../components/TheBestAttractionCard/TheBestAttractionCard.vue";

import "vue3-carousel/dist/carousel.css";

const DUMMY_ITEM = [
  { title: "테스트1", subTitle: "응애응애으애으애으ㅐ으ㅐ앵애애ㅡ애으ㅐ애애앵" },
  { title: "테스트2", subTitle: "응애응애으애으애으ㅐ으ㅐ앵애애ㅡ애으ㅐ애애앵" },
  { title: "테스트3", subTitle: "응애응애으애으애으ㅐ으ㅐ앵애애ㅡ애으ㅐ애애앵" },
  { title: "테스트4", subTitle: "응애응애으애으애으ㅐ으ㅐ앵애애ㅡ애으ㅐ애애앵" },
  { title: "테스트5", subTitle: "응애응애으애으애으ㅐ으ㅐ앵애애ㅡ애으ㅐ애애앵" },
  { title: "테스트6", subTitle: "응애응애으애으애으ㅐ으ㅐ앵애애ㅡ애으ㅐ애애앵" }
];
</script>

<style lang="scss">
@import "./HomeView.scss";
</style>
