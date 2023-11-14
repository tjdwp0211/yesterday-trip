<template>
  <header>
    <!-- <img src="/logo.png" width="144" height="48" /> -->
    <svg width="72" height="72">
      <circle cx="36" cy="36" r="100" :fill="MAIN_BLUE" />
    </svg>
    <SelectBoxs :visible="viewStateBasket.selectBoxs" @view-handler="selectBoxs"></SelectBoxs>
    <!-- <SearchInput :value="searchValue" :handler="search" /> -->
    <div @focusin="dropBox" @focusout="dropBox">
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
        <DropBox width="120px" height="96px" :drop-box-view="viewStateBasket.dropBox" :drop-box-view-handler="dropBox">
          <a class="modal-opener" @click="loginModal">로그인</a>
          <a class="modal-opener" @click="joinModal">회원가입</a>
        </DropBox>
      </Button>
    </div>
  </header>
  <LoginModal
    width="568px"
    height="412px"
    :handle-request-login="handleRequestLogin"
    :visiblity="viewStateBasket.login"
    :view-handler="loginModal"
    :email-value="loginEmail"
    :password-value="loginPassword"
    @input-value-handler="login"
  ></LoginModal>
  <JoinModal
    width="568px"
    height="520px"
    :handle-request-join="handleRequestJoin"
    :visiblity="viewStateBasket.join"
    :view-handler="joinModal"
    :email-value="joinEmail"
    :password-value="joinPassword"
    :nickname-value="joinNickname"
    :input-value-handler="join"
  ></JoinModal>
</template>

<script setup>
import { ref, reactive, toRefs } from "vue";
import { PALETTE } from "../../palette.js";
import DropBox from "./Subs/DropBox/DropBox.vue";
import Button from "../BaseButton/BaseButton.vue";
import JoinModal from "./Subs/JoinModal/JoinModal.vue";
import LoginModal from "./Subs/LoginModal/LoginModal.vue";
import SelectBoxs from "./Subs/SelectBoxs/SelectBoxs.vue";
import { requestLogin, requestJoin, checkEmail } from "../../api/account/index.js";

const { MAIN_BLUE, MAIN_GRAY } = PALETTE;
const searchValue = ref("");
const visibleStates = ref(false);

const viewStateBasket = reactive({ dropBox: false, login: false, join: false, selectBoxs: false });

const loginValues = reactive({ loginEmail: "", loginPassword: "" });
const joinValues = reactive({ joinEmail: "", joinPassword: "", joinNickname: "" });
const { loginEmail, loginPassword } = toRefs(loginValues);
const { joinEmail, joinPassword, joinNickname } = toRefs(joinValues);

const { dropBox, loginModal, joinModal, selectBoxs } = {
  dropBox() {
    viewStateBasket.dropBox = !viewStateBasket.dropBox;
  },
  loginModal() {
    viewStateBasket.login = !viewStateBasket.login;
  },
  joinModal() {
    viewStateBasket.join = !viewStateBasket.join;
  },
  selectBoxs() {
    visibleStates.selectBoxs = !visibleStates.selectBoxs;
  }
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
