<template>
  <main class="follow-page-wrapper">
    <section class="alarm-list-wrapper">
      <div
        v-for="(alarm, index) in alarmStore.state.noneReadList"
        class="alarm-card-wrapper none-read-mark"
        :key="index"
        @click="() => handleAlarmClick(alarm.id)"
      >
        <span class="alarm-text-header">
          <span class="main-text">
            {{ alarm.sidoName }}
            <span>{{ useFormatContentType(alarm.contentTypeId).formatText }}</span>
          </span>
          <span class="time-diff">{{ useTimeGapFormat(alarm.createAt) }}</span>
        </span>
        <p>
          {{ alarm.sidoName }}에 <span class="alarm-keyword">{{ alarm.keyword }}</span
          >이 추가 되었습니다.
        </p>
      </div>
      <div v-for="(alarm, index) in alarmStore.state.readList" class="alarm-card-wrapper" :key="index">
        <span class="alarm-text-header">
          <span class="main-text">
            {{ alarm.sidoName }}
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
        v-for="area in listBasket.followList"
        class="area-card-wrapper"
        :key="area.id"
        :style="{ '--follow-background': `url(./follow-${area.name}.jpg)` }"
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
          <span>{{ area.name }}</span>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { reactive, onMounted, watch } from "vue";
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
  listBasket.followList.forEach((sido, i) => {
    if (sido.id === teamId) {
      listBasket.followList[i].followed = !listBasket.followList[i].followed;
    }
  });
};

const handleAlarmClick = async (alarmID) => {
  await requestReadAlarm(alarmID).then((res) => {
    return res.data;
  });

  alarmStore.action.setUserReadedAlarm(alarmID);
};

onMounted(async () => {
  const [followListRes, readAlarmRes, noneReadAlarmRes] = await Promise.all([
    requestTeamListForUser(),
    requestReadAlarmList(),
    requestNoneReadAlarmList()
  ]);
  alarmStore.action.setReadAlramList(readAlarmRes.data);
  alarmStore.action.setNoneReadAlramList(noneReadAlarmRes.data);
  listBasket.followList = followListRes.data;
});
</script>

<style lang="scss">
@import "./FollowView.scss";
</style>
