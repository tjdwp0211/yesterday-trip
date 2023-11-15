<template>
  <Transition name="slide-fade" :duration="300" @after-enter="detailContent.view = !detailContent.view">
    <aside
      :class="`review-side-bar-wrapper`"
      :style="{ left: `${positionLeft}px` }"
      v-if="route.params.contentId && detailContent.detail"
    >
      <div class="review-side-bar-container" v-if="route.params.contentId || detailContent.view">
        <!-- <div class="item-details-wrapper"> -->
        <h2>{{ detailContent.detail.title }}</h2>
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
          <img
            src="../../assets/imgs/close.svg"
            width="12"
            height="12"
            v-if="route.params.contentId || detailContent.view"
          />
        </Button>
        <!-- </div> -->
        <article class="item-details-container"></article>
        <TheReviewForm></TheReviewForm>
        <section class="review-cards-wrapper">
          <!-- <TheReviewCard></TheReviewCard>
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
          <TheReviewCard></TheReviewCard> -->
        </section>
      </div>
    </aside>
  </Transition>
</template>

<script setup>
import { reactive, toRefs, watch, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { PALETTE } from "../../palette";
import Button from "../BaseButton/BaseButton.vue";
import TheReviewForm from "./Subs/TheReviewForm/TheReviewForm.vue";
import { useAttrectionStore } from "../../stores/attraction";

const route = useRoute();
const router = useRouter();
const attractionStore = useAttrectionStore();

const emit = defineEmits(["viewHandler"]);
const props = defineProps({
  view: { type: Boolean, required: true },
  positionLeft: { type: Number, required: true }
});
const { positionLeft } = toRefs(props);
const detailContent = reactive({ view: false, detail: null });

watch(
  () => route.params.contentId,
  () => {
    if (route.params.contentId) {
      detailContent.detail = attractionStore.getter.one(route.params.contentId - 1).value;
    }
  }
);

const closeRevieSideBar = () => {
  emit("viewHandler", false);
  detailContent.view = false;
  router.push("/map");
};

onUnmounted(() => {
  router.push("/map");
});
</script>

<style lang="scss">
@import "./TheReviewSideBar.scss";
</style>
