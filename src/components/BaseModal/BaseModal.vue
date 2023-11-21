<template>
  <div v-show="visiblity" @click="handleVisiblity" class="modal-overlay"></div>
  <article v-show="visiblity" class="modal-wrapper" :style="{ width: width, height: height }">
    <button @click="handleVisiblity" class="required-button">
      <img src="../../assets/imgs/close.svg" width="20" height="20" />
    </button>
    <div class="modal-container">
      <slot></slot>
    </div>
  </article>
</template>

<script setup>
import { toRefs } from "vue";

const props = defineProps({
  visiblity: { type: Boolean, required: true },
  width: { type: String, required: true },
  height: { type: String, required: true }
});

const { visiblity, width, height } = toRefs(props);

const emit = defineEmits(["toggle-visiblity"]);

const handleVisiblity = () => {
  emit("toggle-visiblity", visiblity);
};
</script>

<style lang="scss">
@import "./BaseModal.scss";
</style>
