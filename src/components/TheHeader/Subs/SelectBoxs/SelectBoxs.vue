<template>
  <form
    class="select-boxs-wrapper"
    :style="{ width: !visibleStates.selectBox ? `332px` : `600px` }"
    @click="visibleStates.selectBox = !visibleStates.selectBox"
  >
    <div class="default-box">지역 선택 해줘~~~</div>
    <Transition name="bounce" @after-enter="handleOverlayView">
      <div
        class="select-boxs-container"
        :style="{ width: !visibleStates.selectBox ? `332px` : `600px` }"
        v-show="visibleStates.selectBox"
      >
        <Transition name="bounce">
          <SelectBox
            :view="areaStates.visible"
            :placeholder="areaStates.placeholder"
            :height="32"
            @view-handler="(e) => handleView(e, areaStates)"
            @area-code-handler="(e) => handleCode(e, areaStates)"
            :options-items="areaStates.items"
          ></SelectBox
        ></Transition>

        <Transition name="bounce">
          <SelectBox
            :view="siGunGuStates.visible"
            :placeholder="siGunGuStates.placeholder"
            :height="32"
            @view-handler="(e) => handleView(e, siGunGuStates)"
            @area-code-handler="(e) => handleCode(e, siGunGuStates)"
            :options-items="siGunGuStates.items"
          ></SelectBox
        ></Transition>

        <Transition name="bounce">
          <SelectBox
            :view="contentTpyeStates.visible"
            :placeholder="contentTpyeStates.placeholder"
            :height="32"
            @view-handler="(e) => handleView(e, contentTpyeStates)"
            @area-code-handler="(e) => handleCode(e, contentTpyeStates)"
            :options-items="contentTpyeStates.items"
          ></SelectBox
        ></Transition>
      </div>
    </Transition>
    <div v-if="visibleStates.overlay" class="overlay" @click="handleOverlayView"></div>
  </form>
</template>

<script setup>
import { ref, reactive, Transition, onMounted } from "vue";
import SelectBox from "../../../BaseSelectBox/BaseSelectBox.vue";
import { requsetSido } from "../../../../api/region";

const visibleStates = reactive({ selectBox: false, overlay: false });

const areaStates = reactive({ placeholder: "지역을 골라주세요.", visible: false, areaCode: 1, items: [] });
const siGunGuStates = reactive({ placeholder: "지역을 골라주세요.", visible: false, areaCode: 1, items: [] });
const contentTpyeStates = reactive({ placeholder: "지역을 골라주세요.", visible: false, areaCode: 1, items: [] });

const handleView = (e, state) => {
  state.visible = !state.visible;
  state.placeholder = e.target.innerText;
};
const handleCode = (e, state) => {
  state.areaCode = e.target.id;
  console.log(`IN CODE placeholder :`, state.placeholder);
  console.log(`IN CODE areaCode :`, state.areaCode);
};
const handleOverlayView = (test) => {
  visibleStates.overlay = !visibleStates.overlay;
};

onMounted(async () => {
  await requsetSido().then((res) => {
    console.log(`res.data :`, res.data);
    return res.data;
  });
});
</script>

<style lang="scss">
@import "./SelectBoxs.scss";
</style>
