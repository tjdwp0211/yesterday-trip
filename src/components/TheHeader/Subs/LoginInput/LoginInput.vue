<template>
  <div class="input-wrapper">
    <Input :id="id" :type="type" :value="value" @handle-change="handler" @focus="handleFocus" @blur="handleBlur" />
    <div v-show="!isFocused" class="init-border"></div>
    <div class="animation-border" :style="{ width: animationBoarderState.width + '%' }"></div>
    <label
      :for="id"
      :style="{
        top: animationLabelState.top + 'px',
        left: animationLabelState.left + 'px',
        color: animationLabelState.color
      }"
      class="placeholder-label"
      >{{ placeholder }}</label
    >
  </div>
</template>

<script setup>
import { defineProps, reactive, ref, toRefs } from "vue";
import Input from "../../../BaseInput/BaseInput.vue";
import { PALETTE } from "../../../../palette";

const props = defineProps({
  id: { type: String, required: true },
  type: { type: String, required: true },
  placeholder: { type: String, required: false },
  value: { type: String, required: true },
  handler: { type: Function, required: true }
});
const { id, type, placeholder, value, handler } = toRefs(props);
const isFocused = ref(false);
const animationBoarderState = reactive({ width: 0 });
const animationLabelState = reactive({ top: 10, left: 12, color: PALETTE.MAIN_GRAY });

const handleFocus = () => {
  isFocused.value = true;
  animationBoarderState.width = 100;

  animationLabelState.top = -12;
  animationLabelState.left = 0;
  animationLabelState.color = PALETTE.MAIN_BLUE;
};

const handleBlur = () => {
  console.log("ON BLUR value.value :", value.value);
  if (!value.value) {
    isFocused.value = false;
    animationBoarderState.width = 0;

    animationLabelState.top = 10;
    animationLabelState.left = 12;
    animationLabelState.color = PALETTE.MAIN_GRAY;
  }
};
</script>

<style lang="scss">
@import "./LoginInput.scss";
</style>
