<template>
  <TheReviewSideBar
    :view="reviewStates.visible"
    :positionLeft="340"
    :detail="detailAttractionBasket"
    @viewHandler="handlers.reviewVisible"
  ></TheReviewSideBar>
  <aside :class="`card-side-bar-wrapper ${attractionStates.className}`" :style="{ left: `${positionLeft}px` }">
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
        v-if="!reviewStates.visible"
      >
        <img src="../../assets/imgs/arrow-right.svg" v-if="!attractionStates.visible" width="12" height="12" />
        <img src="../../assets/imgs/arrow-left.svg" v-else width="12" height="12" />
      </Button>
      <ul class="cards-container">
        <TheAttractionCard
          v-for="(item, index) in attractionsItems"
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
        </TheAttractionCard>
      </ul>
    </div>
  </aside>
</template>

<script setup>
// attractionsItems에 ref 인자로 넣은 DUMMY_ITEMS를 API로 이용해서 ITEMS를 동적으로 변경하기
import { reactive, ref, toRefs, watch } from "vue";
import { useRoute } from "vue-router";
import { PALETTE } from "../../palette";
import Button from "../BaseButton/BaseButton.vue";
import TheAttractionCard from "./Subs/TheAttractionCard/TheAttractionCard.vue";
import { DUMMY_ITEMS } from "../../dummy";
import TheReviewSideBar from "../TheReviewSideBar/TheReviewSideBar.vue";

const props = defineProps({
  positionLeft: { type: Number, required: true }
});
const { positionLeft } = toRefs(props);

const route = useRoute();

const attractionsItems = ref(DUMMY_ITEMS);
const detailAttractionBasket = ref(attractionsItems.value[0]);

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

watch(
  () => route.params.contentId,
  () => {
    const itemIndex = route.params.contentId - 1;
    detailAttractionBasket.value = attractionsItems.value[itemIndex];
  }
);
</script>

<style lang="scss">
@import "./TheAttractionSideBar.scss";
</style>
