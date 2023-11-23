<template>
  <article class="best-attraction-wrapper" :style="{ '--bg-image': `url(./dummy-${idx}.jpg)` }">
    <div class="best-attraction-container">
      <span class="best-attraction-title">
        이번 여행은 <span class="best-attraction-keyword">{{ item.name }}</span
        >{{ exceptionTexts.includes(item.name) ? "로" : "으로" }} 어떠신가요?
      </span>
      <BaseButton
        :style="{ border: '0px' }"
        background-color="inherit"
        color="white"
        width="180px"
        height="32px"
        :event-handler="handleClickBestAttractionCard"
      >
        베스트 여행지 보러 가기
        <img src="../../assets/imgs/arrow-right-white.svg" width="12" height="12" />
      </BaseButton>
    </div>
  </article>
</template>

<script setup>
import { ref, toRefs } from "vue";
import BaseButton from "../BaseButton/BaseButton.vue";
import { useAttrectionStore } from "../../stores/attraction";
import { useRouter } from "vue-router";
import { requestBestAttractionBySido, requsetAttractionByKeyword } from "../../api/attraction";

const props = defineProps({
  item: { type: Object, required: true },
  idx: { type: Number, required: true }
});
const { item, idx } = toRefs(props);
const exceptionTexts = ["대구", "광주", "경기", "제주"];

const router = useRouter();
const attractionStore = useAttrectionStore();

const handleClickBestAttractionCard = async () => {
  const res = await requestBestAttractionBySido({ sido: item.value.id }).then((res) => res.data);
  // const res = await requsetAttractionByKeyword({ keyword: item.value.name }).then((res) => res.data);
  attractionStore.action.setResState(res.shortestPath);
  console.log(`attractionStore.state :`, attractionStore.state);
  router.push("/map");
};
</script>

<style lang="scss">
@import "./TheBestAttractionCard.scss";
</style>
