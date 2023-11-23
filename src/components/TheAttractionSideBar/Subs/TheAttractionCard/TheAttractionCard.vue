<template>
  <RouterLink :to="`/map/${contentId}`">
    <li class="cards-wrapper" @click="handleAttractionCardClick">
      <slot></slot>
    </li>
  </RouterLink>
</template>

<script setup>
import { ref, toRefs } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useAttrectionStore } from "../../../../stores/attraction";

const props = defineProps({
  reviewSideBarHandler: { type: Function, required: true },
  contentId: { type: Number, required: true }
});
const { reviewSideBarHandler, contentId } = toRefs(props);

const router = useRouter();
const attractionStore = useAttrectionStore();

const handleAttractionCardClick = () => {
  /* global naver */

  const targetAttraction = attractionStore.state.resAttractions
    .map((attr, i) => {
      if (attr.contentId === contentId.value) {
        return { center: attractionStore.state.resAttractions[i], groupSize: 1 };
      }
    })
    .filter((att) => att);
  console.log(`targetAttraction :`, targetAttraction);
  attractionStore.action.setClusteredState(targetAttraction);
  router.push(`/map/${contentId.value}`);
};
</script>

<style lang="scss">
@import "./TheAttractionCard.scss";
</style>
