<template>
  <header>
    <!-- <img src="/logo.png" width="144" height="48" /> -->
    <svg width="72" height="72" @click="() => router.push('/')">
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
        @click.stop="closeUserInteraction"
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
        <img id="user-img" src="../../assets/imgs/unknowen-user.svg" width="32" height="32" />
        <DropBox
          width="120px"
          height="96px"
          :drop-box-view="viewStateBasket.dropBox"
          :drop-box-view-handler="() => viewStateBasketHandler('dropBox')"
        >
          <a class="modal-opener" @click="() => viewStateBasketHandler('login')">로그인</a>
          <a class="modal-opener" @click="() => viewStateBasketHandler('join')">회원가입</a>
        </DropBox>
      </BaseButton>
    </div>
  </header>
  <LoginModal
    width="568px"
    height="412px"
    :handle-request-login="handleRequestLogin"
    :visiblity="viewStateBasket.login"
    :view-handler="() => viewStateBasketHandler('login')"
    :email-value="loginEmail"
    :password-value="loginPassword"
    :input-value-handler="login"
  ></LoginModal>
  <JoinModal
    width="568px"
    height="520px"
    :handle-request-join="handleRequestJoin"
    :visiblity="viewStateBasket.join"
    :view-handler="() => viewStateBasketHandler('join')"
    :email-value="joinEmail"
    :password-value="joinPassword"
    :nickname-value="joinNickname"
    :input-value-handler="join"
  ></JoinModal>
</template>

<script setup>
import { ref, reactive, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import { PALETTE } from "../../palette.js";
import DropBox from "./Subs/DropBox/DropBox.vue";
import BaseButton from "../BaseButton/BaseButton.vue";
import JoinModal from "./Subs/JoinModal/JoinModal.vue";
import LoginModal from "./Subs/LoginModal/LoginModal.vue";
import SelectBoxs from "./Subs/SelectBoxs/SelectBoxs.vue";
import SearchInput from "../TheSearchInput/TheSearchInput.vue";
import { requestLogin, requestJoin } from "../../api/account/index.js";
import { requsetAttractionByKeyword, requsetAttractionByCodes } from "../../api/attraction";
import { useAttrectionStore } from "../../stores/attraction";

const route = useRoute();
const router = useRouter();
const attractionStore = useAttrectionStore();

const { MAIN_BLUE, MAIN_GRAY } = PALETTE;
const searchValue = ref("");
const viewStateBasket = reactive({ dropBox: false, login: false, join: false, selectBoxs: false, searchInput: false });

const loginValues = reactive({ loginEmail: "", loginPassword: "" });
const joinValues = reactive({ joinEmail: "", joinPassword: "", joinNickname: "" });
const { loginEmail, loginPassword } = toRefs(loginValues);
const { joinEmail, joinPassword, joinNickname } = toRefs(joinValues);

const sidoStates = reactive({ placeholder: "지역을 골라주세요", visible: false, areaCode: null, items: null });
const gunGuStates = reactive({ placeholder: "자세한 지역도 알려주세요", visible: false, areaCode: null, items: null });
const contentTypeStates = reactive({
  placeholder: "무엇을 찾고 계신가요",
  visible: false,
  areaCode: null,
  items: null
});

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

const closeUserInteraction = () => {
  viewStateBasket.selectBoxs = false;
  viewStateBasket.searchInput = false;
};

const { search, login, join } = {
  search(e) {
    searchValue.value = e.target.value;
  },
  login(e) {
    loginValues[e.target.id] = e.target.value;
  },
  join(e) {
    joinValues[e.target.id] = e.target.value;
  }
};

const handleRequestJoin = async () => {
  await requestJoin({ email: joinEmail.value, password: joinPassword.value, nickname: joinNickname.value }).then(
    (res) => {
      console.log("res.data :", res.data);
      res.data;
    }
  );
};

const handleRequestLogin = async () => {
  await requestLogin({ principal: loginEmail.value, credentials: loginPassword.value }).then((res) => {
    console.log("res.data :", res.data);
    res.data;
  });
};

const handleAttractionRequest = async () => {
  if (route.path !== "/map") {
    return router.push("/map");
  }
  if (viewStateBasket.searchInput && searchValue.value) {
    const res = await requsetAttractionByKeyword({ keyword: searchValue.value }).then((res) => res.data);
    attractionStore.action.setState(res);
  } else if (sidoStates.areaCode && contentTypeStates.areaCode) {
    const codesBody = {
      sido: sidoStates.areaCode,
      gugun: gunGuStates.areaCode,
      contentType: contentTypeStates.areaCode
    };
    const res = await requsetAttractionByCodes(codesBody).then((res) => res.data);
    attractionStore.action.setState(res);
  }
  closeUserInteraction();
};
</script>

<style lang="scss">
@import "./TheHeader.scss";
</style>
