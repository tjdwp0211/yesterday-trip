<template>
  <div class="about">
    <TheReviewForm></TheReviewForm>
    <TheReviewCard></TheReviewCard>
  </div>
</template>

<script setup>
import TheReviewCard from "../../components/TheReviewSideBar/Subs/TheReviewCard/TheReviewCard.vue";
import TheReviewForm from "../../components/TheReviewSideBar/Subs/TheReviewForm/TheReviewForm.vue";
</script>

<style lang="scss">
.about {
  width: 340px;
}
</style>
