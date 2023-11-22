<template>
  <div class="alarm-card-wrapper none-read-mark" :key="item.id" @click="handleAlarmClick">
    <span class="alarm-text-header">
      <span class="main-text">
        대전
        <span>{{ useFormatContentType(item.contentTypeId).formatText }}</span>
      </span>
      <span class="time-diff">{{ useTimeGapFormat(item.createAt) }}</span>
    </span>
    <p>
      {{ item.sidoName }}에 <span class="alarm-keyword">{{ item.keyword }}</span
      >이 추가 되었습니다.
    </p>
  </div>
  <!-- 읽지 않은 알림 -->
  <!-- 읽은 알림 -->
  <div class="alarm-card-wrapper" :key="item.id">
    <span class="alarm-text-header">
      <span class="main-text">
        대전
        <span>{{ useFormatContentType(item.contentTypeId).formatText }}</span>
      </span>
      <span class="time-diff">{{ useTimeGapFormat(item.createAt) }}</span>
    </span>
    <p>
      {{ item.sidoName }}에 <span class="alarm-keyword">{{ item.keyword }}</span
      >이 추가 되었습니다.
    </p>
  </div>
</template>

<script setup>
import { toRefs } from "vue";
import { useAlarmStore } from "../../stores/alarm";
import { useFormatContentType } from "../../utils/useFormatContentType";
import { useTimeGapFormat } from "../../utils/useTimeGapFormat";

const props = defineProps({ item: Object, required: true });
const { item } = toRefs(props);
const alarmStore = useAlarmStore();
</script>

<style lang="scss">
@import "./TheAlarmCard.scss";
</style>
