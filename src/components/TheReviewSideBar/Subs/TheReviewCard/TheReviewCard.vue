<template>
  <article class="review-card-wrapper">
    <div class="review-card-container">
      <div class="texts-wrapper">
        <p>
          <span class="review-card-user-nickname">{{ reviewItem.nickname }}</span>
          <span class="review-card-user-emotion">{{ reviewItem.emotion }}</span>
          <!-- EMOTION COLOR, BORDER COLOR 동적으로 주기 main blue or main red -->
        </p>
        <p class="review-card-create-time">{{ reviewItem.createAt }}</p>
        <p class="review-card-user-content">
          {{ reviewItem.content }}
        </p>
      </div>

      <div class="review-card-imgs-wrapper">
        <img v-for="(imgURL, index) in reviewItem.imageURLs" :key="index" :src="imgURL" />
      </div>
    </div>
  </article>
</template>

<script setup>
import { toRefs } from "vue";

const props = defineProps({
  reviewItem: { type: Object, required: true }
});
const { reviewItem } = toRefs(props);
</script>

<style lang="scss">
@import "./TheReviewCard.scss";
</style>
