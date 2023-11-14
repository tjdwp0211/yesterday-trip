<template>
  <Transition name="bounce">
    <div id="search-input-wrapper" v-if="visible">
      <BaseInput id="search" type="text" placeholder="검색창" :value="value" @handle-change="handler" />
      <BaseButton
        type="submit"
        width="36px"
        height="36px"
        color="white"
        :backgroundColor="MAIN_BLUE"
        :eventHandler="closeRevieSideBar"
        :sortCenter="true"
      >
        <img src="../../assets/imgs/search.svg" width="12" height="12" />
      </BaseButton>
    </div>
  </Transition>
</template>
<script setup>
import { defineProps, toRefs, Transition } from "vue";
import { PALETTE } from "../../palette";
import BaseInput from "../BaseInput/BaseInput.vue";
import BaseButton from "../BaseButton/BaseButton.vue";

const props = defineProps({
  visible: { type: Boolean, required: true },
  value: { type: String, required: true },
  handler: { type: Function, required: true }
});
const { value, handler, visible } = toRefs(props);
const { MAIN_BLUE } = PALETTE;
</script>
<style lang="scss">
@import "./TheSearchInput.scss";
</style>
