<template>
  <aside :class="`card-side-bar-wrapper ${cardStates.className}`" :style="{ left: `${positionLeft}px` }">
    <div class="card-side-bar-container">
      <TheReviewSideBar :positionLeft="340" @viewHandler="handlers.reviewVisible"></TheReviewSideBar>
      <Button
        class="opener"
        type="button"
        width="22px"
        height="48px"
        :color="PALETTE.MAIN_BLACK"
        backgroundColor="white"
        :eventHandler="handlers.cardVisible"
        :sortCenter="true"
      >
        <img src="../../assets/imgs/arrow-right.svg" v-if="!cardStates.visible" width="12" height="12" />
        <img src="../../assets/imgs/arrow-left.svg" v-else width="12" height="12" />
      </Button>
      <ul class="cards-container">
        <TheReviewCard
          v-for="(item, index) in DUMMY_ITEMS"
          :key="index"
          :contentId="index + 1"
          :reviewSideBarHandler="handlers.reviewVisible"
        >
          <p class="side-card-title">{{ item.title }}</p>
          <p class="side-card-address-1">{{ item.addr1 }} {{ item.addr2 }}</p>
          <!-- address -->
          <p class="side-card-address-2"></p>
          <p class="side-card-star-point">
            <img src="../../assets/imgs/star.svg" width="14" height="14" />{{ item.starPoint }}
          </p>
          <p class="side-card-review-count">리뷰({{ item.tel.length }})</p>
          <img class="side-card-img" :src="item.firstimage" />
          <!-- imageUrl -->
        </TheReviewCard>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import { reactive, ref, toRefs } from "vue";
import { PALETTE } from "../../palette";
import Button from "../BaseButton/BaseButton.vue";
import TheReviewCard from "./Subs/TheReviewCard/TheReviewCard.vue";
import { DUMMY_ITEMS } from "../../dummy";
import TheReviewSideBar from "./Subs/TheReviewSideBar/TheReviewSideBar.vue";

const props = defineProps({
  positionLeft: { type: Number, required: true }
});

const { view, positionLeft } = toRefs(props);

const cardStates = reactive({ className: "show", visible: true });
const reviewStates = reactive({ className: "hidden", visible: false });

const handlers = {
  cardVisible() {
    cardStates.visible = !cardStates.visible;
    if (cardStates.visible) {
      cardStates.className = "show";
    } else {
      cardStates.className = "hidden";
    }
  },
  reviewVisible(isVisible) {
    reviewStates.visible = isVisible;
    if (reviewStates.visible) {
      reviewStates.className = "show";
    } else {
      reviewStates.className = "hidden";
    }
  }
};
</script>

<style lang="scss">
@import "./TheSideBar.scss";
</style>
