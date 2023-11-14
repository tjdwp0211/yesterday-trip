<template>
  <!-- <form class="select-boxs-wrapper" :style="{ width: !visible ? `332px` : `632px` }" @click.stop="handleOverlayView">
    <div class="default-box">
      <p id="selectBoxs">여러 정보 둘러보기</p>
      <p id="searchInput">키워드로 정보 찾기</p>
    </div> -->
  <Transition name="bounce">
    <div class="select-boxs-container" :style="{ width: !visible ? `332px` : `632px` }" v-show="visible">
      <Transition name="bounce">
        <SelectBox
          :view="sidoStates.visible"
          :placeholder="sidoStates.placeholder"
          :height="94"
          @view-handler="(e) => handleView(e, sidoStates)"
          @area-code-handler="(e) => handleCode(e, sidoStates)"
          :options-items="sidoStates.items && sidoStates.items"
        ></SelectBox
      ></Transition>
      <Transition name="bounce">
        <SelectBox
          :view="gunGuStates.visible"
          :placeholder="gunGuStates.placeholder"
          :height="94"
          @view-handler="(e) => handleView(e, gunGuStates)"
          @area-code-handler="(e) => handleCode(e, gunGuStates)"
          :options-items="gunGuStates.items && gunGuStates.items"
        ></SelectBox
      ></Transition>
      <Transition name="bounce">
        <SelectBox
          :view="contentTypeStates.visible"
          :placeholder="contentTypeStates.placeholder"
          :height="94"
          @view-handler="(e) => handleView(e, contentTypeStates)"
          @area-code-handler="(e) => handleCode(e, contentTypeStates)"
          :options-items="contentTypeStates.items && contentTypeStates.items"
        ></SelectBox
      ></Transition>
    </div>
  </Transition>
  <div v-if="visible" class="overlay" @click.stop="handleOverlayView"></div>
  <!-- </form> -->
</template>

<script setup>
import { ref, toRefs, reactive, Transition, onMounted, watch } from "vue";
import SelectBox from "../../../BaseSelectBox/BaseSelectBox.vue";
import { requsetGuGUn, requsetSido, requsetContentType } from "../../../../api/region";
import { PALETTE } from "../../../../palette";

const props = defineProps({
  visible: { type: Boolean, required: true }
});
const emit = defineEmits(["viewHandler"]);

const sidoStates = reactive({ placeholder: "지역을 골라주세요", visible: false, areaCode: null, items: null });
const gunGuStates = reactive({ placeholder: "자세한 지역도 알려주세요", visible: false, areaCode: null, items: null });
const contentTypeStates = reactive({
  placeholder: "무엇을 찾고 계신가요",
  visible: false,
  areaCode: null,
  items: null
});

const { MAIN_BLACK } = PALETTE;
const { visible } = toRefs(props);

const handleView = (e, state) => {
  state.visible = !state.visible;
  state.placeholder = e.target.innerText;
  if (!sidoStates.areaCode && state == gunGuStates && !gunGuStates.items) {
    gunGuStates.placeholder = "지역을 먼저 골라주세요.";
  }
};
const handleCode = (e, state) => {
  state.areaCode = e.target.id;
};
const handleOverlayView = () => {
  emit("viewHandler");
};

onMounted(async () => {
  // const [sidoItems, contentTypeItems] = await Promise.all([requsetSido(), requsetContentType()]);
  // sidoStates.items = sidoItems.data;
  // contentTypeStates.items = contentTypeItems.data;
});

watch(
  () => sidoStates.areaCode,
  () => {
    requsetGuGUn(sidoStates.areaCode).then((res) => (gunGuStates.items = res.data));
  }
);
watch(visible, () => {
  console.log(`visible.value :`, visible.value);
});
</script>

<style lang="scss">
@import "./SelectBoxs.scss";
</style>
