<template>
  <main class="follow-page-wrapper">
    <section class="alarm-list-wrapper">
      <div
        v-for="(alarm, index) in alarmStore.state.noneReadList"
        class="alarm-card-wrapper none-read-mark"
        :key="alarm.id"
        @click="handleAlarmClick"
      >
        <span class="alarm-text-header">
          <span class="main-text">
            대전
            <span>{{ useFormatContentType(alarm.contentTypeId).formatText }}</span>
          </span>
          <span class="time-diff">{{ useTimeGapFormat(alarm.createAt) }}</span>
        </span>
        <p>
          {{ alarm.sidoName }}에 <span class="alarm-keyword">{{ alarm.keyword }}</span
          >이 추가 되었습니다.
        </p>
      </div>
      <div v-for="(alarm, index) in alarmStore.state.readList" class="alarm-card-wrapper" :key="alarm.id">
        <span class="alarm-text-header">
          <span class="main-text">
            대전
            <span>{{ useFormatContentType(alarm.contentTypeId).formatText }}</span>
          </span>
          <span class="time-diff">{{ useTimeGapFormat(alarm.createAt) }}</span>
        </span>
        <p>
          {{ alarm.sidoName }}에 <span class="alarm-keyword">{{ alarm.keyword }}</span
          >이 추가 되었습니다.
        </p>
      </div>
    </section>
    <section class="area-cards-list-wrapper">
      <div
        v-for="area in listBasket.list"
        class="area-card-wrapper"
        :key="area.id"
        :style="{ '--follow-background': `url(./follow-${area.name && area.name}.jpg)` }"
      >
        <img
          class="heart-img"
          v-if="area.followed"
          src="../../assets/imgs/heart-fill.svg"
          @click="() => handleFollowing({ teamId: area.id, willFollowing: false })"
        />
        <img
          class="heart-img"
          v-if="!area.followed"
          src="../../assets/imgs/heart-blank.svg"
          @click="() => handleFollowing({ teamId: area.id, willFollowing: true })"
        />
        <div class="text-container">
          <h4>{{ area.name }}</h4>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { requestFollowingForUser, requestUnFollowingTeamForUser, requestTeamListForUser } from "../../api/team";
import { requestReadAlarmList, requestNoneReadAlarmList, requestReadAlarm } from "../../api/alarm";
import { useAlarmStore } from "../../stores/alarm";
import { useFormatContentType } from "../../utils/useFormatContentType";
import { useTimeGapFormat } from "../../utils/useTimeGapFormat";

const alarmStore = useAlarmStore();
const listBasket = reactive({ followList: [] });

const handleFollowing = async ({ teamId, willFollowing }) => {
  if (willFollowing) {
    await requestFollowingForUser(teamId).then((res) => {
      return res.data;
    });
  } else {
    await requestUnFollowingTeamForUser(teamId).then((res) => {
      return res.data;
    });
  }
  listBasket.list.forEach((sido, i) => {
    if (sido.id === teamId) {
      listBasket.list[i].followed = !listBasket.list[i].followed;
    }
  });
};

onMounted(async () => {
  const [followListRes, readAlarmRes, noneReadAlarmRes] = await Promise.all([
    requestTeamListForUser(),
    requestReadAlarmList(),
    requestNoneReadAlarmList()
  ]);
  alarmStore.action.setReadAlramList(noneReadAlarmRes.data);
  alarmStore.action.setNoneReadAlramList(readAlarmRes.data);
  listBasket.followList = followListRes.data;
});
</script>

<style lang="scss">
@import "./FollowView.scss";
</style>
