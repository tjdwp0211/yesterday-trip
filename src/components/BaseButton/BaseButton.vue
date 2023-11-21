<template>
  <button :type="type" @click="eventHandler && eventHandler()" :style="styleObject" :class="willBindClassName">
    <slot></slot>
  </button>
</template>

<script setup>
import { ref, toRefs } from "vue";

const props = defineProps({
  type: { type: String, required: true },
  eventHandler: { type: Function, required: false },
  width: { type: String, required: false },
  height: { type: String, required: false },
  backgroundColor: { type: String, required: true },
  color: { type: String, required: true },
  sortCenter: { type: Boolean, required: false }
});

const { type, eventHandler, backgroundColor, color, width, height, sortCenter } = toRefs(props);
const willBindClassName = ref("round-button-root");
const justifyContent = ref("space-between");

if (sortCenter.value) {
  justifyContent.value = "center";
}

const styleObject = ref({
  backgroundColor,
  color,
  width,
  height,
  justifyContent,
  border: `1px solid ${color.value}`
});
</script>

<style lang="scss">
@import "./BaseButton.scss";
</style>
