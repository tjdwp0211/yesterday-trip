<template>
  <form class="review-form-wrapper" enctype="multipart/form-data">
    <textarea class="content-area" :value="reviewState.content" @input="handler.content"></textarea>
    <section class="file-wrapper">
      <div class="imgs-basket">
        <!-- <img v-for="file in reviewState.files" :src="file" /> -->
        <div v-for="file in reviewState.files">{{ file.decodingURL }}</div>
      </div>
      <label class="file-label" for="file"
        ><img src="../../../../assets/imgs/image.svg" width="48" height="48"
      /></label>
      <input type="file" id="file" accept="image/png, image/jpeg" content multiple @change="handler.files" />
    </section>
  </form>
</template>

<script setup>
import { ref, reactive, watch } from "vue";

const reviewState = reactive({ content: "", files: [] });

const handler = {
  files(e) {
    const newFile = new File([e.target.value], e.target.value, {
      type: "image/png"
    });
    reviewState.files.push({ fileInstance: newFile, decodingURL: URL.createObjectURL(newFile) });
    console.log("File Instance :", reviewState.files.fileInstance);
    console.log("File Instance :", reviewState.files.decodingURL);
  },
  content(e) {
    reviewState.content = e.target.value;
    console.log("e.target.value :", reviewState.content);
  }
};

watch(
  () => reviewState,
  () => {
    console.log("reviewState :", reviewState);
  }
);
</script>

<style lang="scss">
@import "./TheReviewForm.scss";
</style>
