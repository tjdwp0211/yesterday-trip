<template>
  <header>
    <!-- <img src="/logo.png" width="144" height="48" /> -->
    <RouterLink to="/home">
      <div id="logo"></div>
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
          <a v-if="!userStore.state?.userKey" class="modal-opener" @click="modalStore.action.setJoinState">회원가입</a>
          <a v-if="userStore.state?.userKey" class="modal-opener" @click="logOut">로그아웃</a>
          <RouterLink v-if="userStore.state?.userKey" to="/" class="modal-opener">내 정보 보기</RouterLink>
        </DropBox>
      </BaseButton>
    </div>
  </header>
  <LoginModal width="568px" height="412px"></LoginModal>
  <JoinModal width="568px" height="520px"></JoinModal>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import { PALETTE } from "../../palette.js";
import DropBox from "./Subs/DropBox/DropBox.vue";
import BaseButton from "../BaseButton/BaseButton.vue";
import JoinModal from "./Subs/JoinModal/JoinModal.vue";
import LoginModal from "./Subs/LoginModal/LoginModal.vue";
import SelectBoxs from "./Subs/SelectBoxs/SelectBoxs.vue";
import SearchInput from "../TheSearchInput/TheSearchInput.vue";
import { requsetAttractionByKeyword, requsetAttractionByCodes } from "../../api/attraction";
import { useAttrectionStore } from "../../stores/attraction";
import { useUserStore } from "../../stores/user";
import { useModalStore } from "../../stores/modal";
import { requestLogOut } from "../../api/account";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const modalStore = useModalStore();
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
      console.log(`res.data :`, res.data);
      // if (res.status === 200) {
      alert("로그아웃 되었습니다");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      userStore.action.clearState();
      // }
    });
  } catch (err) {
    console.log(`err :`, err);
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
    attractionStore.action.setState(res);

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
    attractionStore.action.setState(res);

    return initSelectBoxsState();
  }
};
</script>

<style lang="scss">
@import "./TheHeader.scss";
</style>
