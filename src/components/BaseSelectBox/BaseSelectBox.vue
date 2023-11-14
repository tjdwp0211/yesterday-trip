<template>
  <div class="drop-wrapper" @click.stop="selectBoxViewHandler">
    <div class="placeholder">{{ placeholder }}</div>
    <div
      class="drop-container"
      :style="{ height: view ? `${32 * 7.5}px` : `0px`, top: `${height - 2}px` }"
      @click.stop="optionsClickHandler"
    >
      <div class="custom-option" id="1">서울</div>
      <div class="custom-option" id="2">인천</div>
      <div class="custom-option" id="3">대전</div>
      <div class="custom-option" id="4">대구</div>
      <div class="custom-option" id="5">광주</div>
      <div class="custom-option" id="6">부산</div>
      <div class="custom-option" id="7">울산</div>
      <div class="custom-option" id="8">세종</div>
      <div class="custom-option" id="31">경기</div>
      <div class="custom-option" id="32">강원</div>
      <div class="custom-option" id="33">충청북도</div>
      <div class="custom-option" id="34">충청남도</div>
      <div class="custom-option" id="35">경상북도</div>
      <div class="custom-option" id="36">경상남도</div>
      <div class="custom-option" id="37">전라북도</div>
      <div class="custom-option" id="38">전라남도</div>
      <div class="custom-option" id="39">제주도</div>
    </div>
  </div>
</template>

<script setup>
// :style="{ height: view ? `${32 * 7.5}px` : `32px` }"
import { toRefs } from "vue";
const props = defineProps({
  view: { type: Boolean, required: true },
  placeholder: { type: String, required: true },
  optionsItems: { type: Object, required: true },
  height: { type: Number, required: true }
});
const { view, placeholder, optionsItems, height } = toRefs(props);
const areaOptions = [
  { id: 1, innerText: "서울" },
  { id: 2, innerText: "인천" },
  { id: 3, innerText: "대전" },
  { id: 4, innerText: "대구" },
  { id: 5, innerText: "광주" },
  { id: 6, innerText: "부산" },
  { id: 7, innerText: "울산" },
  { id: 8, innerText: "세종" },
  { id: 31, innerText: "경기" },
  { id: 32, innerText: "강원" },
  { id: 33, innerText: "충청북도" },
  { id: 34, innerText: "충청남도" },
  { id: 35, innerText: "경상북도" },
  { id: 36, innerText: "경상남도" },
  { id: 37, innerText: "전라북도" },
  { id: 38, innerText: "전라남도" },
  { id: 39, innerText: "제주도" }
];

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
