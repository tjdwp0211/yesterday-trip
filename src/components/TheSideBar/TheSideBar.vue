<template>
  <aside :class="`side-bar-wrapper ${sideBarState.className}`" :style="{ left: `${positionLeft}px` }">
    <div class="side-bar-opener-wrapper">
      <Button
        class="opener"
        type="button"
        width="22px"
        height="48px"
        :color="PALETTE.MAIN_BLACK"
        backgroundColor="white"
        :eventHandler="handleSideBarVisible"
        :sortCenter="true"
      >
        <img src="../../assets/imgs/arrow-right.svg" v-if="sideBarState.visible" width="12" height="12" />
        <img src="../../assets/imgs/arrow-left.svg" v-else width="12" height="12" />
      </Button>
      <ul class="cards-container">
        <TheReviewCard v-for="(item, index) in items" :key="index">
          <p class="side-card-title">{{ item.title }}</p>
          <p class="side-card-address-1">{{ item.add1 }} {{ item.add2 }}</p>
          <p class="side-card-address-2"></p>
          <p class="side-card-star-point">
            <img src="../../assets/imgs/star.svg" width="14" height="14" />{{ item.starPoint }}
          </p>
          <p class="side-card-review-count">리뷰({{ item.reviewCount }})</p>
          <img class="side-card-img" :src="item.img" />
        </TheReviewCard>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import { reactive, ref, toRefs } from "vue";
import { PALETTE } from "../../palette";
import Button from "../BaseButton/BaseButton.vue";
import TheReviewCard from "./Subs/TheReviewCard.vue";

const props = defineProps({ positionLeft: { type: Number, required: true } });
const { positionLeft } = toRefs(props);
console.log(`positionLeft.value :`, positionLeft.value);

const sideBarState = reactive({ visible: true, className: "show" });
const items = ref(
  Array.from({ length: 40 }).map((_) => ({
    title: "후라토식당 경복궁 본점",
    starPoint: 4.5,
    reviewCount: 120,
    add1: "서울 종로구 사직로8길 34",
    add2: "경희궁의아침 3단지 사발 142호",
    content: "CARDS",
    img: "src/assets/imgs/unknowen-user.svg"
  }))
);

const handleSideBarVisible = () => {
  sideBarState.visible = !sideBarState.visible;
  console.log(`sideBarState.visible :`, sideBarState.visible);
  if (sideBarState.visible) {
    sideBarState.className = "show";
  } else {
    sideBarState.className = "hidden";
  }
};
</script>

<style lang="scss">
@import "./TheSideBar.scss";
</style>
