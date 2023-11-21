<template>
  <div class="drop-box-wrapper" :style="{ width: width }" @keydown.esc="handler" v-show="view">
    <slot></slot>
  </div>
</template>

<script setup>
import { toRefs } from "vue";
const props = defineProps({
  dropBoxView: { type: Boolean, required: true },
  dropBoxViewHandler: { type: Function, required: true },
  width: { type: String, required: true },
  height: { type: String, required: true }
});
const { dropBoxView: view, dropBoxViewHandler: handler, width, height } = toRefs(props);
</script>

<style lang="scss">
@import "./DropBox.scss";
</style>
