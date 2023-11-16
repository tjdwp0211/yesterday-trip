<template>
  <header>
    <!-- <img src="/logo.png" width="144" height="48" /> -->
    <svg width="72" height="72" @click="logoClick">
      <circle cx="36" cy="36" r="100" :fill="MAIN_BLUE" />
    </svg>
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
      <SearchInput :visible="viewStateBasket.searchInput" :value="searchValue" :handler="search" />
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
        <img v-if="!userStore.state" id="user-img" src="../../assets/imgs/unknowen-user.svg" width="32" height="32" />
        <p class="user-icon" v-else>{{ userStore.getter.nickname().value.slice(0, 1).toUpperCase() }}</p>
        <DropBox
          width="120px"
          height="96px"
          :drop-box-view="viewStateBasket.dropBox"
          :drop-box-view-handler="() => viewStateBasketHandler('dropBox')"
        >
          <a v-if="!userStore.state" class="modal-opener" @click="() => viewStateBasketHandler('login')">로그인</a>
          <a v-if="!userStore.state" class="modal-opener" @click="() => viewStateBasketHandler('join')">회원가입</a>
          <a v-else class="modal-opener" @click="logOut">로그아웃</a>
        </DropBox>
      </BaseButton>
    </div>
  </header>
  <LoginModal
    width="568px"
    height="412px"
    :visiblity="viewStateBasket.login"
    :view-handler="() => viewStateBasketHandler('login')"
    :request-login="handleRequestLogin"
  ></LoginModal>
  <JoinModal
    width="568px"
    height="520px"
    :visiblity="viewStateBasket.join"
    :view-handler="() => viewStateBasketHandler('join')"
    :request-login="handleRequestJoin"
  ></JoinModal>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
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
import { requestJoin, requestLogin } from "../../api/account";
import { jwtDecode } from "jwt-decode";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const attractionStore = useAttrectionStore();

const { MAIN_BLUE, MAIN_GRAY } = PALETTE;
const searchValue = ref("");
const viewStateBasket = reactive({ dropBox: false, login: false, join: false, selectBoxs: false, searchInput: false });

const sidoStates = reactive({ placeholder: "지역을 골라주세요", visible: false, areaCode: null, items: null });
const gunGuStates = reactive({ placeholder: "자세한 지역도 알려주세요", visible: false, areaCode: null, items: null });
const contentTypeStates = reactive({
  placeholder: "무엇을 찾고 계신가요",
  visible: false,
  areaCode: null,
  items: null
});

const logoClick = () => {
  router.push("/");
};

const logOut = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  userStore.action.clearState();
};

const viewStateBasketHandler = (paramsKey) => {
  if (paramsKey == "selectBoxs" || paramsKey == "searchInput") {
    if (route.path !== "map") {
      router.push("/map");
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
        state.items = null;
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
  viewStateBasket.selectBoxs = false;
  const initPlaceholders = ["지역을 골라주세요", "자세한 지역도 알려주세요", "무엇을 찾고 계신가요"];

  viewStateBasket.selectBoxs = false;
  [sidoStates, gunGuStates, contentTypeStates].forEach((state, idx) => {
    state.placeholder = initPlaceholders[idx];
    state.visible = false;
    state.areaCode = null;
    state.items = null;
  });
};

const initInteractionState = () => {
  initSearchState();
  initSelectBoxsState();
};

const { search } = {
  search(e) {
    searchValue.value = e.target.value;
  }
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
    const res = await requsetAttractionByCodes(codesBody).then((res) => res.data);
    attractionStore.action.setState(res);

    return initSelectBoxsState();
  }
};

const handleRequestLogin = async () => {
  try {
    const token = await requestLogin({ principal: loginEmail.value, credentials: loginPassword.value }).then((res) => {
      console.log("res.data :", res.data);
      return res.data.apiToken;
    });
    localStorage.setItem("accessToken", token);
    localStorage.setItem("refreshToken ", token);

    const decoded = jwtDecode(token);
    userStore.action.setState(decoded);

    viewStateBasketHandler("login");
  } catch (err) {
    alert("알 수 없는 에러가 발생하였습니다.");
  }
};

const handleRequestJoin = async () => {
  try {
    await requestJoin({ email: joinEmail.value, password: joinPassword.value, nickname: joinNickname.value }).then(
      (res) => res.data
    );

    viewStateBasketHandler("join");
  } catch (err) {
    alert("알 수 없는 에러가 발생하였습니다.");
  }
};
</script>

<style lang="scss">
@import "./TheHeader.scss";
</style>
