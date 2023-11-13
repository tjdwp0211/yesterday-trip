<template>
  <Transition name="slide-fade" :duration="300">
    <aside :class="`review-side-bar-wrapper`" :style="{ left: `${positionLeft}px` }" v-show="route.params.contentId">
      <div class="review-side-bar-container">
        <Button
          class="opener"
          type="button"
          width="22px"
          height="48px"
          :color="PALETTE.MAIN_BLACK"
          backgroundColor="white"
          :eventHandler="closeRevieSideBar"
          :sortCenter="true"
        >
          <img src="../../../../assets/imgs/close.svg" v-if="route.params.contentId" width="12" height="12" />
        </Button>
        <h2>{{ route.params.contentId }}리뷰입니다.</h2>
      </div>
    </aside>
  </Transition>
</template>

<script setup>
import { ref, toRefs, watch } from "vue";
import { PALETTE } from "../../../../palette";
import Button from "../../../BaseButton/BaseButton.vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const emit = defineEmits(["viewHandler"]);
const props = defineProps({
  positionLeft: { type: Number, required: true }
});
const { positionLeft } = toRefs(props);

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
  router.push("/map");
};
</script>

<style lang="scss">
@import "./TheReviewSideBar.scss";
</style>
