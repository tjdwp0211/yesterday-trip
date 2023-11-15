<template>
  <div class="drop-wrapper" @click.stop="selectBoxViewHandler" :style="{ height: `${height}px` }">
    <div class="placeholder" :style="{ height: `${height}px` }">{{ placeholder }}</div>
    <div
      v-if="optionsItems"
      class="drop-container"
      :style="{ height: view ? `${26 * 7.5}px` : `0px`, top: `${height - 2}px` }"
      @click.stop="optionsClickHandler"
    >
      <div v-for="item in optionsItems" class="custom-option" :key="item.id" :id="item.id">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { toRefs } from "vue";
const props = defineProps({
  view: { type: Boolean, required: true },
  placeholder: { type: String, required: true },
  optionsItems: { type: Object, required: true },
  height: { type: Number, required: true }
});
const { view, placeholder, optionsItems, height } = toRefs(props);

const emit = defineEmits(["viewHandler", "areaCodeHandler"]);

const selectBoxViewHandler = (e) => {
  emit("viewHandler", e);
};

const optionsClickHandler = (e) => {
  emit("areaCodeHandler", e);
  emit("viewHandler", e);
};
</script>

<style lang="scss">
@import "./BaseSelectBox.scss";
</style>
