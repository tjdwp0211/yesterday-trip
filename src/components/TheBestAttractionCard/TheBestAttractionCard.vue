<template>
  <article class="best-attraction-wrapper" :style="{ '--bg-image': `url(./dummy-${idx}.jpg)` }">
    <div class="best-attraction-container">
      <p class="best-attraction-title">{{ item.name }}</p>
      <!-- <p class="best-attraction-sub-title">{{ item.subTitle }}</p> -->
    </div>
  </article>
</template>

<script setup>
import { ref, toRefs } from "vue";

const props = defineProps({
  item: { type: Object, required: true },
  idx: { type: Number, required: true }
});
const { item, idx } = toRefs(props);
</script>

<style lang="scss">
@import "./TheBestAttractionCard.scss";
</style>
