<template>
  <Transition name="bounce">
    <div class="select-boxs-container" :style="{ width: !visible ? `332px` : `632px` }" v-show="visible">
      <Transition name="bounce">
        <SelectBox
          :view="sidoStates.visible"
          :placeholder="sidoStates.placeholder"
          :height="26"
          @view-handler="(e) => handleView(e, sidoStates)"
          @area-code-handler="(e) => handleCode(e, sidoStates)"
          :options-items="sidoStates.items && sidoStates.items"
        ></SelectBox
      ></Transition>
      <Transition name="bounce">
        <SelectBox
          :view="gunGuStates.visible"
          :placeholder="gunGuStates.placeholder"
          :height="26"
          @view-handler="(e) => handleView(e, gunGuStates)"
          @area-code-handler="(e) => handleCode(e, gunGuStates)"
          :options-items="gunGuStates.items && gunGuStates.items"
        ></SelectBox
      ></Transition>
      <Transition name="bounce">
        <SelectBox
          :view="contentTypeStates.visible"
          :placeholder="contentTypeStates.placeholder"
          :height="26"
          @view-handler="(e) => handleView(e, contentTypeStates)"
          @area-code-handler="(e) => handleCode(e, contentTypeStates)"
          :options-items="contentTypeStates.items && contentTypeStates.items"
        ></SelectBox
      ></Transition>
    </div>
  </Transition>
  <div v-if="visible" class="overlay" @click.stop="handleOverlayView"></div>
</template>

<script setup>
import { toRefs, Transition, onMounted, watch } from "vue";
import SelectBox from "../../../BaseSelectBox/BaseSelectBox.vue";
import { requsetGuGUn, requsetSido, requsetContentType } from "../../../../api/region";

const props = defineProps({
  visible: { type: Boolean, required: true },
  sidoStates: { type: Object, required: true },
  gunGuStates: { type: Object, required: true },
  contentTypeStates: { type: Object, required: true }
});
const emit = defineEmits(["viewHandler"]);

const { visible, sidoStates, gunGuStates, contentTypeStates } = toRefs(props);

const handleView = (e, state) => {
  state.visible = !state.visible;
  state.placeholder = e.target.innerText;
  if (!sidoStates.value.areaCode && state == gunGuStates.value && !gunGuStates.value.items) {
    gunGuStates.value.placeholder = "지역을 먼저 골라주세요.";
  }
};
const handleCode = (e, state) => {
  state.areaCode = e.target.id;
};
const handleOverlayView = () => {
  emit("viewHandler");
};

onMounted(async () => {
  const [sidoItems, contentTypeItems] = await Promise.all([requsetSido(), requsetContentType()]);
  sidoStates.value.items = sidoItems.data;
  contentTypeStates.value.items = contentTypeItems.data;
});

watch(
  () => sidoStates.value.items,
  async () => {
    if (!sidoStates.value.items) {
      const [sidoItems, contentTypeItems] = await Promise.all([requsetSido(), requsetContentType()]);
      sidoStates.value.items = sidoItems.data;
      contentTypeStates.value.items = contentTypeItems.data;
    }
  }
);

watch(
  () => sidoStates.value.areaCode,
  async () => {
    if (gunGuStates.value.items) {
      gunGuStates.value.placeholder = "지역이 바뀌었네요!";
      gunGuStates.value.visible = true;
      gunGuStates.value.areaCode = null;
    }
    await requsetGuGUn(sidoStates.value.areaCode).then((res) => (gunGuStates.value.items = res.data));
  }
);
</script>

<style lang="scss">
@import "./SelectBoxs.scss";
</style>
