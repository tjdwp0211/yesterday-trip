<template>
  <header>
    <!-- <img src="/logo.png" width="144" height="48" /> -->
    <svg width="72" height="72">
      <circle cx="36" cy="36" r="100" :fill="MAIN_BLUE" />
    </svg>
    <form class="select-boxs-wrapper" :style="{ width: !viewStateBasket.selectBoxs ? `300px` : `632px` }">
      <div class="default-box" :style="{ height: !viewStateBasket.searchInput ? `60px` : `48px` }">
        <p class="interaction-openner" @click="() => viewStateBasketHandler('selectBoxs')">여러 정보 둘러보기</p>
        <p class="interaction-openner" @click="() => viewStateBasketHandler('searchInput')">키워드로 정보 찾기</p>
      </div>
      <SelectBoxs
        :visible="viewStateBasket.selectBoxs"
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
      <Button
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
      </Button>
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
import Button from "../BaseButton/BaseButton.vue";
import JoinModal from "./Subs/JoinModal/JoinModal.vue";
import LoginModal from "./Subs/LoginModal/LoginModal.vue";
import SelectBoxs from "./Subs/SelectBoxs/SelectBoxs.vue";
import SearchInput from "../TheSearchInput/TheSearchInput.vue";
import { requestLogin, requestJoin } from "../../api/account/index.js";

const route = useRoute();
const router = useRouter();

const { MAIN_BLUE, MAIN_GRAY } = PALETTE;
const searchValue = ref("");
const viewStateBasket = reactive({ dropBox: false, login: false, join: false, selectBoxs: false, searchInput: false });

const loginValues = reactive({ loginEmail: "", loginPassword: "" });
const joinValues = reactive({ joinEmail: "", joinPassword: "", joinNickname: "" });
const { loginEmail, loginPassword } = toRefs(loginValues);
const { joinEmail, joinPassword, joinNickname } = toRefs(joinValues);

const viewStateBasketHandler = (paramsKey) => {
  if (paramsKey == "selectBoxs") {
    viewStateBasket.searchInput = false;
  } else if (paramsKey == "searchInput") {
    viewStateBasket.selectBoxs = false;
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
</script>

<style lang="scss">
@import "./TheHeader.scss";
</style>
