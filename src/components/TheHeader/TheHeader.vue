<template>
  <header>
    <!-- <img src="/logo.png" width="144" height="48" /> -->
    <RouterLink class="logo-wrapper" to="/home">
      <div id="logo"></div>
      <div></div>
    </RouterLink>
    <form
      class="select-boxs-wrapper"
      :style="{ width: !viewStateBasket.selectBoxs ? `35%` : `40%` }"
      @submit.prevent="handleAttractionRequest"
    >
      <div
        class="default-box"
        :style="{ height: viewStateBasket.selectBoxs || viewStateBasket.searchInput ? `48px` : `52px` }"
      >
        <p class="interaction-openner" @click="() => viewStateBasketHandler('selectBoxs')">여러 정보로 찾기</p>
        <p class="interaction-openner" @click="() => viewStateBasketHandler('searchInput')">키워드로 정보 찾기</p>
        <BaseButton
          type="submit"
          width="36px"
          height="36px"
          color="white"
          :backgroundColor="MAIN_BLUE"
          :sortCenter="true"
        >
          <img src="../../assets/imgs/search.svg" width="12" height="12" />
        </BaseButton>
      </div>
      <SelectBoxs
        :visible="viewStateBasket.selectBoxs"
        :sido-states="sidoStates"
        :gun-gu-states="gunGuStates"
        :content-type-states="contentTypeStates"
        @view-handler="() => viewStateBasketHandler('selectBoxs')"
      ></SelectBoxs>
      <SearchInput :visible="viewStateBasket.searchInput" :value="searchValue" :handler="handleSearchValue" />
      <div
        v-if="viewStateBasket.selectBoxs || viewStateBasket.searchInput"
        class="overlay"
        @click.stop="initInteractionState"
      ></div>
    </form>
    <div class="header-right-wrapper">
      <a v-if="!userStore.state?.roles?.includes('ROLE_ADMIN')" class="to-follow" @click="handleToFollowPage">
        여러 지역의 소식을 받아보세요
        <span v-if="alarmStore.state.noneReadCount" class="alram-count">{{ alarmStore.state.noneReadCount }}</span>
      </a>
      <a v-if="userStore.state?.roles?.includes('ROLE_ADMIN')" class="to-admin" @click="handleToAdminPage">
        새로운 컨텐츠를 등록해주세요
      </a>
      <div @focusin="() => viewStateBasketHandler('dropBox')" @focusout="() => viewStateBasketHandler('dropBox')">
        <BaseButton
          type="button"
          width="80px"
          height="48px"
          background-color="white"
          class="drop-box-opener"
          :color="MAIN_GRAY"
        >
          <img src="../../assets/imgs/bars.svg" width="20" height="20" />
          <img
            v-if="!userStore.state?.userKey"
            id="user-img"
            src="../../assets/imgs/unknowen-user.svg"
            width="32"
            height="32"
          />
          <p class="user-icon" v-else>{{ userStore.getter.nickname()?.value.slice(0, 1).toUpperCase() }}</p>
          <DropBox
            width="120px"
            height="96px"
            :drop-box-view="viewStateBasket.dropBox"
            :drop-box-view-handler="() => viewStateBasketHandler('dropBox')"
          >
            <a v-if="!userStore.state?.userKey" class="modal-opener" @click="modalStore.action.setLoginState">로그인</a>
            <a v-if="!userStore.state?.userKey" class="modal-opener" @click="modalStore.action.setJoinState">
              회원가입
            </a>
            <a v-if="userStore.state?.userKey" class="modal-opener" @click="logOut">로그아웃</a>
            <a
              v-if="userStore.state?.userKey"
              @click="router.push({ path: '/user', name: 'User' })"
              class="modal-opener"
            >
              내 정보 보기
            </a>
          </DropBox>
        </BaseButton>
        <FindPassword width="568px" height="384px"></FindPassword>
        <LoginModal width="568px" height="412px"></LoginModal>
        <JoinModal width="568px" height="520px"></JoinModal>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import { PALETTE } from "../../palette.js";
import DropBox from "./Subs/DropBox/DropBox.vue";
import BaseButton from "../BaseButton/BaseButton.vue";
import LoginModal from "../LoginModal/LoginModal.vue";
import JoinModal from "../JoinModal/JoinModal.vue";
import FindPassword from "../FindPassword/FindPassword.vue";
import SelectBoxs from "./Subs/SelectBoxs/SelectBoxs.vue";
import SearchInput from "../TheSearchInput/TheSearchInput.vue";
import { requsetAttractionByKeyword, requsetAttractionByCodes } from "../../api/attraction";
import { useAttrectionStore } from "../../stores/attraction";
import { useUserStore } from "../../stores/user";
import { useModalStore } from "../../stores/modal";
import { requestLogOut } from "../../api/account";
import { useAlarmStore } from "../../stores/alarm";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const modalStore = useModalStore();
const alarmStore = useAlarmStore();
const attractionStore = useAttrectionStore();

const { MAIN_BLUE, MAIN_GRAY } = PALETTE;
const searchValue = ref("");
const viewStateBasket = reactive({ dropBox: false, selectBoxs: false, searchInput: false });

const sidoStates = reactive({ placeholder: "지역을 골라주세요", visible: false, areaCode: null, items: [] });
const gunGuStates = reactive({ placeholder: "자세한 지역도 알려주세요", visible: false, areaCode: null, items: [] });
const contentTypeStates = reactive({
  placeholder: "무엇을 찾고 계신가요",
  visible: false,
  areaCode: null,
  items: []
});

const logOut = async () => {
  try {
    await requestLogOut().then((res) => {
      if (res.status === 200) {
        alert("로그아웃 되었습니다");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        userStore.action.clearState();
        alarmStore.action.clearState();
      }
    });
  } catch (err) {
    console.log(`err :`, err);
  }
};

const handleToFollowPage = () => {
  if (userStore.state?.userKey) {
    router.push("/follow");
  } else {
    alert("로그인을 먼저 해주세요");
    modalStore.action.setLoginState();
  }
};

const handleToAdminPage = () => {
  if (userStore.state?.userKey) {
    router.push("/admin");
  }
};

const viewStateBasketHandler = (paramsKey) => {
  if (paramsKey == "selectBoxs" || paramsKey == "searchInput") {
    if (route.path !== "map") {
      router.push({ path: "/map", name: "Map" });
    }
    if (paramsKey === "selectBoxs") {
      viewStateBasket.searchInput = false;
      searchValue.value = "";
    } else if (paramsKey == "searchInput") {
      const initPlaceholders = ["지역을 골라주세요", "자세한 지역도 알려주세요", "무엇을 찾고 계신가요"];

      viewStateBasket.selectBoxs = false;
      [sidoStates, gunGuStates, contentTypeStates].forEach((state, idx) => {
        state.placeholder = initPlaceholders[idx];
        state.visible = false;
        state.areaCode = null;
        state.items = [];
      });
    }
  }
  viewStateBasket[paramsKey] = !viewStateBasket[paramsKey];
};

const initSearchState = () => {
  viewStateBasket.searchInput = false;
  searchValue.value = "";
};

const initSelectBoxsState = () => {
  const initPlaceholders = ["지역을 골라주세요", "자세한 지역도 알려주세요", "무엇을 찾고 계신가요"];

  viewStateBasket.selectBoxs = false;
  [sidoStates, gunGuStates, contentTypeStates].forEach((state, idx) => {
    state.placeholder = initPlaceholders[idx];
    state.visible = false;
    state.areaCode = null;
    state.items = [];
  });
};

const initInteractionState = () => {
  initSearchState();
  initSelectBoxsState();
};

const handleSearchValue = (e) => {
  searchValue.value = e.target.value;
};

const handleAttractionRequest = async () => {
  if (route.path !== "/map") {
    return router.push("/map");
  }
  if (viewStateBasket.searchInput && searchValue.value) {
    const res = await requsetAttractionByKeyword({ keyword: searchValue.value }).then((res) => res.data);
    attractionStore.action.setResState(res);

    return initSearchState();
  }
  if (sidoStates.areaCode && contentTypeStates.areaCode) {
    const codesBody = {
      sido: sidoStates.areaCode,
      gugun: gunGuStates.areaCode,
      contentType: contentTypeStates.areaCode
    };
    console.log("codesBody :", codesBody);
    const res = await requsetAttractionByCodes(codesBody).then((res) => res.data);
    attractionStore.action.setResState(res);

    return initSelectBoxsState();
  }
};
</script>

<style lang="scss">
@import "./TheHeader.scss";
</style>
