<template>
  <div id="search-input-wrapper">
    <Input id="search" type="text" placeholder="검색창" :value="value" @handle-change="handler" />
  </div>
</template>
<script setup>
import { defineProps, toRefs } from "vue";
import Input from "../BaseInput/BaseInput.vue";

const props = defineProps({
  value: { type: String, required: true },
  handler: { type: Function, required: true }
});

const { value, handler } = toRefs(props);
</script>
<style lang="scss">
@import "./TheSearchInput.scss";
</style>
