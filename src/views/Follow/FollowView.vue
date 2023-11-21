<template>
  <main class="follow-page-wrapper">
    <section class="alarm-list-wrapper">
      <div v-for="(alarm, index) in 11" class="alarm-card-wrapper">
        <h4>대전<span>타입</span></h4>
        <p>ㅇㅇㅇㅇ이 추가 되었습니다.</p>
      </div>
    </section>
    <section class="area-cards-list-wrapper">
      <div
        v-for="(area, index) in sidoFollowList.list"
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

const sidoFollowList = reactive({ list: [] });

const handleFollowing = async ({ teamId, willFollowing }) => {
  if (willFollowing) {
    await requestFollowingForUser(teamId).then((res) => {
      console.log("WILL FOLLOWING :", res.data);
      return res.data;
    });
  } else {
    await requestUnFollowingTeamForUser(teamId).then((res) => {
      console.log("UN FOLLOWING :", res.data);
      return res.data;
    });
  }
  sidoFollowList.list.forEach((sido, i) => {
    if (sido.id === teamId) {
      sidoFollowList.list[i].followed = !sidoFollowList.list[i].followed;
    }
  });
};

onMounted(async () => {
  const list = await requestTeamListForUser().then((res) => {
    console.log("REQUEST LIST :", res.data);
    return res.data;
  });

  sidoFollowList.list = list;
  console.log("sidoFollowList :", sidoFollowList);
});
</script>

<style lang="scss">
@import "./FollowView.scss";
</style>
