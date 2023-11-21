<template>
  <Transition name="slide-fade" :duration="300" @after-enter="handleAttractionDetailView">
    <aside
      class="review-side-bar-wrapper"
      :style="{ left: `${positionLeft}px` }"
      v-if="route.params.contentId && attractionDetail.content"
    >
      <div class="review-side-bar-container" v-if="route.params.contentId || attractionDetail.view">
        <article class="item-details-container">
          <h2>{{ attractionDetail.content.title }}</h2>
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
              v-if="route.params.contentId || attractionDetail.view"
            />
          </Button>
          <p class="info-text">
            <img src="../../assets/imgs/star.svg" width="20" height="20" /><span>{{
              !attractionDetail.content.avgScore ? "0.0" : attractionDetail.content.avgScore
            }}</span>
          </p>
          <p class="info-text">
            <img src="../../assets/imgs/location.svg" width="12" height="12" /><span>{{
              attractionDetail.content.address
            }}</span>
          </p>
          <p class="info-text">
            <img src="../../assets/imgs/tel.svg" width="12" height="12" /><span>{{
              attractionDetail.content.tel
            }}</span>
          </p>
        </article>
        <div class="write-review-wrapper">
          <Button
            class="will-write-review"
            type="button"
            width="80px"
            height="36px"
            color="white"
            :background-color="PALETTE.MAIN_BLUE"
            :eventHandler="handleWillWriteReview"
            :sortCenter="true"
            >{{ willWriteReview ? "닫기" : "리뷰 쓰기" }}</Button
          >
          <TheReviewForm
            :visible="willWriteReview"
            :handle-request-create-review="handleRequestCreateReview"
          ></TheReviewForm>
        </div>
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
// address: "강원특별자치도 횡성군 둔내면 청태산로 610"
// avgScore: 0
// contentId: 125266
// contentTypeId: 12
// gugunCode: 18
// imageUrl: "http://tong.visitkorea.or.kr/cms/resource/21/2657021_image2_1.jpg"
// latitude: 37.5225141217
// longitude: 128.291911539
// mlevel: "6"
// sidoCode: 32
// tel: ""
// title: "국립 청태산자연휴양림"
// zipcode: "25261"
import { ref, reactive, toRefs, watch, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { PALETTE } from "../../palette";
import Button from "../BaseButton/BaseButton.vue";
import TheReviewForm from "./Subs/TheReviewForm/TheReviewForm.vue";
import TheReviewCard from "./Subs/TheReviewCard/TheReviewCard.vue";
import { useAttrectionStore } from "../../stores/attraction";
import { requestReviewList, requestCreateReview } from "../../api/review";
import { useUserStore } from "../../stores/user";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const attractionStore = useAttrectionStore();

const emit = defineEmits(["viewHandler"]);
const props = defineProps({
  view: { type: Boolean, required: true },
  positionLeft: { type: Number, required: true }
});
const { positionLeft } = toRefs(props);
const attractionDetail = reactive({ view: false, content: {} });
const reviewItems = ref([]);
const willWriteReview = ref(false);

const handleAttractionDetailView = () => {
  attractionDetail.view = !attractionDetail.view;
};

const handleWillWriteReview = () => {
  if (userStore.state.STATE_IS_FILL) {
    willWriteReview.value = !willWriteReview.value;
  } else {
    alert("리뷰를 쓰기 위해 로그인을 해주세요");
  }
};

const handleRequestCreateReview = async ({ content, files }) => {
  const formDataBasket = new FormData();
  formDataBasket.set("content", content);
  formDataBasket.set("uploadImages", []);
  files.forEach((file, i) => formDataBasket.append("uploadImages", file.instance));
  await requestCreateReview({ contentId: attractionDetail.content.contentId, formData: formDataBasket }).then((res) => {
    willWriteReview.value = false;
  });

  const newReviewList = await requestReviewList(attractionDetail.content.contentId).then((res) => res.data);
  reviewItems.value = newReviewList;
};

watch(
  () => route.params.contentId,
  async () => {
    if (route.params.contentId) {
      attractionDetail.content = attractionStore.getter.one(route.params.contentId - 1).value;
      const reviewList = await requestReviewList(attractionDetail.content.contentId).then((res) => res.data);
      reviewItems.value = reviewList;
      console.log("reviewItems :", attractionDetail.content);
    }
    willWriteReview.value = false;
  }
);

const closeRevieSideBar = () => {
  emit("viewHandler", false);
  attractionDetail.view = false;
  router.push("/map");
};

onUnmounted(() => {
  if (route.params.contentId) {
    router.push("/map");
  }
});
</script>

<style lang="scss">
@import "./TheReviewSideBar.scss";
</style>
