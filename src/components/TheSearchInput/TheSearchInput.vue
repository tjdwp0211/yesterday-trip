<template>
  <Transition name="bounce" :duration="300">
    <div id="search-input-wrapper" v-if="visible">
      <BaseInput id="search" type="text" placeholder="검색창" :value="value" @handle-change="handler" />
    </div>
  </Transition>
</template>
<script setup>
import { toRefs, Transition } from "vue";
import BaseInput from "../BaseInput/BaseInput.vue";

const props = defineProps({
  visible: { type: Boolean, required: true },
  value: { type: String, required: true },
  handler: { type: Function, required: true }
});
const { value, handler, visible } = toRefs(props);
</script>
<style lang="scss">
@import "./TheSearchInput.scss";
</style>
