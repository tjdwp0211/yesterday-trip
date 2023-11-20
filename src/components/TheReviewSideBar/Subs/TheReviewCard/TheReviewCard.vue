<template>
  <article class="review-card-wrapper">
    <div class="review-card-container">
      <p>
        <span class="review-card-user-nickname">{{ reviewItem.nickname }}</span>
        <span class="review-card-user-emotion" :style="decodingEmotion().styles">
          <img v-if="reviewItem.emotion === 'POSITIVE'" src="../../../../assets/imgs/smail.svg" />
          <img v-if="reviewItem.emotion === 'NEUTRAL'" src="../../../../assets/imgs/face-meh.svg" />
          <img v-if="reviewItem.emotion === 'NEGATIVE'" src="../../../../assets/imgs/face-down.svg" />
          {{ decodingEmotion().attr.innerText }}
        </span>
        <!-- EMOTION COLOR, BORDER COLOR 동적으로 주기 main blue or main red -->
      </p>
      <p class="review-card-create-time">{{ reviewItem.createAt }}</p>
      <div class="review-card-imgs-wrapper">
        <img v-for="(imgURL, index) in reviewItem.imageURLs" :key="index" :src="imgURL" />
      </div>
      <p class="review-card-user-content">
        {{ reviewItem.content }}
      </p>
    </div>
  </article>
</template>

<script setup>
import { toRefs, reactive } from "vue";
import { PALETTE } from "../../../../palette";

const props = defineProps({
  reviewItem: { type: Object, required: true }
});
const { reviewItem } = toRefs(props);

const dynamicAttrs = reactive({}); // 해야 돼

const emotionTempate = reactive({
  POSITIVE: { color: PALETTE.MAIN_BLUE, innerText: "종았어요", img: "../../../../assets/imgs/smail.svg" },
  NEUTRAL: { color: PALETTE.LIGHT_BLACK, innerText: "그저그랬어요", img: "../../../../assets/imgs/face-meh.svg" },
  NEGATIVE: { color: PALETTE.MAIN_RED, innerText: "별로였어요", img: "../../../../assets/imgs/face-down.svg" }
});

const decodingEmotion = () => {
  const targetTemp = emotionTempate[reviewItem.value.emotion];
  return { attr: targetTemp, styles: { color: targetTemp.color, border: `1px solid ${targetTemp.color}` } };
};
</script>

<style lang="scss">
@import "./TheReviewCard.scss";
</style>
