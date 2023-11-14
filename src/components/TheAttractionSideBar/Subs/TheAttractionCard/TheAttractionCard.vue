<template>
  <RouterLink :to="`/map/${contentId}`">
    <li class="cards-wrapper">
      <slot></slot>
    </li>
  </RouterLink>
</template>

<script setup>
import { ref, toRefs } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps({
  reviewSideBarHandler: { type: Function, required: true },
  contentId: { type: Number, required: true }
});
const { reviewSideBarHandler } = toRefs(props);
</script>

<style lang="scss">
@import "./TheAttractionCard.scss";
</style>
