<template>
  <Transition name="slide-fade" :duration="300" @after-enter="contentView = !contentView">
    <aside :class="`review-side-bar-wrapper`" :style="{ left: `${positionLeft}px` }" v-if="route.params.contentId">
      <div class="review-side-bar-container" v-if="route.params.contentId || contentView">
        <!-- <div class="item-details-wrapper"> -->
        <h2>{{ route.params.contentId }}리뷰입니다.</h2>
        <Button
          class="review-side-bar-closer"
          type="button"
          width="36px"
          height="36px"
          :color="PALETTE.MAIN_BLACK"
          backgroundColor="white"
          :eventHandler="closeRevieSideBar"
          :sortCenter="true"
        >
          <img src="../../assets/imgs/close.svg" v-if="route.params.contentId || contentView" width="12" height="12" />
        </Button>
        <!-- </div> -->
        <article class="item-details-container"></article>
        <section class="review-cards-wrapper">
          <TheReviewCard></TheReviewCard>
          <TheReviewCard></TheReviewCard>
          <TheReviewCard></TheReviewCard>
          <TheReviewCard></TheReviewCard>
          <TheReviewCard></TheReviewCard>
          <TheReviewCard></TheReviewCard>
          <TheReviewCard></TheReviewCard>
          <TheReviewCard></TheReviewCard>
          <TheReviewCard></TheReviewCard>
          <TheReviewCard></TheReviewCard>
          <TheReviewCard></TheReviewCard>
          <TheReviewCard></TheReviewCard>
          <TheReviewCard></TheReviewCard>
          <TheReviewCard></TheReviewCard>
          <TheReviewCard></TheReviewCard>
          <TheReviewCard></TheReviewCard>
          <TheReviewCard></TheReviewCard>
          <TheReviewCard></TheReviewCard>
          <TheReviewCard></TheReviewCard>
          <TheReviewCard></TheReviewCard>
        </section>
      </div>
    </aside>
  </Transition>
</template>

<script setup>
import { ref, toRefs, watch } from "vue";
import { PALETTE } from "../../palette";
import Button from "../BaseButton/BaseButton.vue";
import TheReviewCard from "./Subs/TheReviewCard/TheReviewCard.vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const emit = defineEmits(["viewHandler"]);
const props = defineProps({
  view: { type: Boolean, required: true },
  positionLeft: { type: Number, required: true },
  detail: { type: Object, required: true }
});
const { positionLeft, view, detail } = toRefs(props);
const contentView = ref(false);

watch(contentView, () => {
  console.log(`IN CHILDREN contentView :`, contentView.value);
});

watch(
  () => route.params.contentId,
  () => {
    if (route.params.contentId) {
      emit("viewHandler", true);
    } else {
      emit("viewHandler", false);
    }
  }
);

const closeRevieSideBar = () => {
  emit("viewHandler", false);
  contentView.value = false;
  router.push("/map");
};
</script>

<style lang="scss">
@import "./TheReviewSideBar.scss";
</style>
