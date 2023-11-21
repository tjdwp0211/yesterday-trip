<template>
  <form
    class="review-form-wrapper"
    enctype="multipart/form-data"
    @submit.prevent="() => handleRequestCreateReview({ content: reviewState.content, files: reviewState.files })"
    v-if="visible"
  >
    <textarea class="content-area" :value="reviewState.content" @input="handler.content"></textarea>
    <BaseButton
      class="review-submit-btn"
      type="submit"
      width="48px"
      height="36px"
      :color="MAIN_BLUE"
      background-color="white"
      >작성</BaseButton
    >
    <section class="file-wrapper">
      <div class="imgs-basket">
        <!-- <img v-for="file in reviewState.files" :src="file" /> -->
        <div v-for="file in reviewState.files" :key="file.key">
          <img class="uploaded-file" :src="file.fileURL" width="24" height="24" />
        </div>
      </div>
      <label class="file-label" for="file">
        <img src="../../../../assets/imgs/image.svg" width="48" height="48" />
      </label>
      <input type="file" id="file" accept="image/png, image/jpeg" content multiple @change="handler.files" />
    </section>
  </form>
</template>

<script setup>
import { reactive, toRefs } from "vue";
import BaseButton from "../../../BaseButton/BaseButton.vue";

import { PALETTE } from "../../../../palette";

const props = defineProps({
  visible: { type: Boolean, reqired: true },
  handleRequestCreateReview: { type: Function, reqired: true }
});
const { visible, handleRequestCreateReview } = toRefs(props);

const reviewState = reactive({ content: "", files: [] });
const { MAIN_BLUE } = PALETTE;

const handler = {
  files(e) {
    const originFiles = e.target.files;
    for (let i = 0; i < originFiles.length; i++) {
      const instance = new File([originFiles[i]], originFiles[i].name, { type: "image/png" });
      const fileURL = URL.createObjectURL(instance);
      reviewState.files.push({ instance: instance, fileURL: fileURL, key: originFiles[i].name });
    }
  },
  content(e) {
    reviewState.content = e.target.value;
  }
};
</script>

<style lang="scss">
@import "./TheReviewForm.scss";
</style>
