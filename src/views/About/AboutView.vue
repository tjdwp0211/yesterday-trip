<template>
  <div class="about">
    <TheReviewForm></TheReviewForm>
    <TheReviewCard :review-item="dummy"></TheReviewCard>
  </div>
</template>

<script setup>
import TheReviewCard from "../../components/TheReviewSideBar/Subs/TheReviewCard/TheReviewCard.vue";
import TheReviewForm from "../../components/TheReviewSideBar/Subs/TheReviewForm/TheReviewForm.vue";

const dummy = {
  nickname: "test01",
  emotion: "natural",
  createAt: "2023-11-11-",
  content: "aslkjdaljsdlkjlwkdjqlkdjlsasjsdljalskdjl",
  imageURLs: ["../../../../assets/imgs/bars.svg"]
};
</script>

<style lang="scss">
.about {
  width: 384px;
}
</style>
