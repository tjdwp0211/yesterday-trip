<template>
  <article class="review-card-wrapper">
    <div class="review-card-container">
      <div class="texts-wrapper">
        <p>
          <span class="review-card-user-nickname">USER NICKNAME</span>
          <span class="review-card-user-emotion">EMOTION</span>
          <!-- EMOTION COLOR, BORDER COLOR 동적으로 주기 main blue or main red -->
        </p>
        <p class="review-card-create-time">CREATED TIME</p>
        <p class="review-card-user-content">컨텐츠 들어갈 부분</p>
      </div>

      <div class="review-card-imgs-wrapper">
        <img src="../../../../assets/imgs/bars.svg" />
        <img src="../../../../assets/imgs/bars.svg" />
        <img src="../../../../assets/imgs/bars.svg" />
      </div>
    </div>
  </article>
</template>

<script setup>
// review id
// string content
// string emotion
// image[] images
</script>

<style lang="scss">
@import "./TheReviewCard.scss";
</style>
