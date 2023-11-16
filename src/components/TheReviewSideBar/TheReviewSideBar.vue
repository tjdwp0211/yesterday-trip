<template>
  <Transition name="slide-fade" :duration="300" @after-enter="detail.view = !detail.view">
    <aside
      :class="`review-side-bar-wrapper`"
      :style="{ left: `${positionLeft}px` }"
      v-if="route.params.contentId && detail.content"
    >
      <div class="review-side-bar-container" v-if="route.params.contentId || detail.view">
        <h2>{{ detail.content.title }}</h2>
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
          <img src="../../assets/imgs/close.svg" width="12" height="12" v-if="route.params.contentId || detail.view" />
        </Button>
        <article class="item-details-container"></article>
        <TheReviewForm :content-id="detail.content.contentId"></TheReviewForm>
        <section class="review-cards-wrapper" v-if="reviewItems">
          <template v-for="item in reviewItems" :key="item.id">
            <TheReviewCard :reviewItem="item"></TheReviewCard>
          </template>
        </section>
      </div>
    </aside>
  </Transition>
</template>

<script setup>
import { ref, reactive, toRefs, watch, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { PALETTE } from "../../palette";
import Button from "../BaseButton/BaseButton.vue";
import TheReviewForm from "./Subs/TheReviewForm/TheReviewForm.vue";
import TheReviewCard from "./Subs/TheReviewCard/TheReviewCard.vue";
import { useAttrectionStore } from "../../stores/attraction";
import { requestReviewList } from "../../api/review";

const route = useRoute();
const router = useRouter();
const attractionStore = useAttrectionStore();

const emit = defineEmits(["viewHandler"]);
const props = defineProps({
  view: { type: Boolean, required: true },
  positionLeft: { type: Number, required: true }
});
const { positionLeft } = toRefs(props);
const detail = reactive({ view: false, content: null });
const reviewItems = ref(null);

watch(
  () => route.params.contentId,
  async () => {
    if (route.params.contentId) {
      detail.content = attractionStore.getter.one(route.params.contentId - 1).value;
      const reviewList = await requestReviewList(detail.content.contentId).then((res) => res.data);
      reviewItems.value = reviewList;
    }
    console.log("detail :", detail.content);
  }
);

const closeRevieSideBar = () => {
  emit("viewHandler", false);
  detail.view = false;
  router.push("/map");
};

onUnmounted(() => {
  router.push("/map");
});
</script>

<style lang="scss">
@import "./TheReviewSideBar.scss";
</style>
