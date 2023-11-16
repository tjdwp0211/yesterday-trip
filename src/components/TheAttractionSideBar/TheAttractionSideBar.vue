<template>
  <TheReviewSideBar
    :view="reviewStates.visible"
    :positionLeft="384"
    @viewHandler="handlers.reviewVisible"
  ></TheReviewSideBar>
  <aside
    :class="`card-side-bar-wrapper ${attractionStates.className}`"
    :style="{ left: `${positionLeft}px` }"
    v-if="attractionItems"
  >
    <div class="card-side-bar-container">
      <Button
        class="opener"
        type="button"
        width="22px"
        height="48px"
        :color="PALETTE.MAIN_BLACK"
        backgroundColor="white"
        :eventHandler="handlers.cardVisible"
        :sortCenter="true"
        v-if="!route.params.contentId"
      >
        <img src="../../assets/imgs/arrow-right.svg" v-if="!attractionStates.visible" width="12" height="12" />
        <img src="../../assets/imgs/arrow-left.svg" v-else width="12" height="12" />
      </Button>
      <ul class="cards-container">
        <TheAttractionCard
          v-for="(item, index) in attractionItems"
          :key="index"
          :contentId="index + 1"
          :reviewSideBarHandler="handlers.reviewVisible"
        >
          <p class="side-card-title">{{ item.title }}</p>
          <p class="side-card-address">{{ item.address }}</p>
          <p class="side-card-star-point">
            <img src="../../assets/imgs/star.svg" width="14" height="14" />{{ item.starPoint }}
          </p>
          <p class="side-card-review-count">리뷰({{ item.tel.length + 900 }})</p>
          <img class="side-card-img" v-if="item.imageUrl" :src="item.imageUrl" />
        </TheAttractionCard>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import { reactive, toRefs } from "vue";
import { PALETTE } from "../../palette";
import Button from "../BaseButton/BaseButton.vue";
import TheAttractionCard from "./Subs/TheAttractionCard/TheAttractionCard.vue";
import TheReviewSideBar from "../TheReviewSideBar/TheReviewSideBar.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const props = defineProps({
  attractionItems: { type: Object, required: true },
  positionLeft: { type: Number, required: true }
});
const { attractionItems, positionLeft } = toRefs(props);

const attractionStates = reactive({ className: "show", visible: true });
const reviewStates = reactive({ className: "hidden", visible: false });

const handlers = {
  cardVisible() {
    attractionStates.visible = !attractionStates.visible;
    if (attractionStates.visible) {
      attractionStates.className = "show";
    } else {
      attractionStates.className = "hidden";
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

// address : "경기도 광주시 퇴촌면 광동리"
// contentId : 572404
// contentTypeId : 15
// gugunCode : 5
// imageUrl : "http://tong.visitkorea.or.kr/cms/resource/52/2549352_image2_1.JPG"
// latitude : 37.4728654628
// longitude : 127.3052522935
// mlevel : "6"
// sidoCode : 31
// tel : "031-760-4959"
// title : "퇴촌 토마토축제"
// zipcode : "12711"
</script>

<style lang="scss">
@import "./TheAttractionSideBar.scss";
</style>
